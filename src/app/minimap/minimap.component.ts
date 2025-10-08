import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from '../services/map.service';
import { OverlayKind } from '../models/overlays';

interface MiniTile {
  terrain: string;
  discovered: boolean;
}

@Component({
  selector: 'app-minimap',
  standalone: true,
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.scss']
})
export class MinimapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('minimapCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() size = 200;        // taille du canvas
  @Input() hexSize = 3;       // taille d’un hex sur la minimap

  private ctx!: CanvasRenderingContext2D;
  private subs: Subscription[] = [];

  zoom = 6; // facteur de zoom
  offsetX = 0;
  offsetY = 0;
  isDragging = false;
  dragStart = { x: 0, y: 0 };

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.subs.push(
      this.mapService.playerMoved.subscribe(() => this.draw()),
      this.mapService.tileChange.subscribe(() => this.draw()),
      this.mapService.overlayChange.subscribe(() => this.draw())
    );
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.size;
    canvas.height = this.size;
    this.ctx = canvas.getContext('2d')!;
    this.draw();

    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      this.zoom = Math.min(8, Math.max(0.5, this.zoom - delta * 0.3));
      this.draw();
    });
    
    canvas.addEventListener('mousedown', e => {
      this.isDragging = true;
      this.dragStart = { x: e.clientX, y: e.clientY };
    });
    
    window.addEventListener('mouseup', () => (this.isDragging = false));
    
    canvas.addEventListener('mousemove', e => {
      if (!this.isDragging) return;
      const dragSpeed = Math.max(1, this.zoom * 0.5);
      this.offsetX += (e.clientX - this.dragStart.x) / dragSpeed;
      this.offsetY += (e.clientY - this.dragStart.y) / dragSpeed;      
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.draw();
    });

    // === Touch controls (mobile) ===
    let lastTouchDistance = 0;
    let isPinching = false;
    
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        // un seul doigt → drag
        this.isDragging = true;
        this.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        // deux doigts → pinch
        isPinching = true;
        lastTouchDistance = this.getTouchDistance(e.touches);
      }
    });
    
    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      if (isPinching && e.touches.length === 2) {
        const newDistance = this.getTouchDistance(e.touches);
        const delta = newDistance - lastTouchDistance;
        this.zoom = Math.min(8, Math.max(0.5, this.zoom + delta * 0.005));
        lastTouchDistance = newDistance;
        this.draw();
      } else if (this.isDragging && e.touches.length === 1) {
        const touch = e.touches[0];
        const dragSpeed = Math.max(1, this.zoom * 0.5);
        this.offsetX += (touch.clientX - this.dragStart.x) / dragSpeed;
        this.offsetY += (touch.clientY - this.dragStart.y) / dragSpeed;        
        this.dragStart = { x: touch.clientX, y: touch.clientY };
        this.draw();
      }
    });
    
    canvas.addEventListener('touchend', () => {
      this.isDragging = false;
      isPinching = false;
    });
  }

  private draw(): void {
    if (!this.ctx) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.size, this.size);

    const tiles = (this.mapService as any).tiles as Record<string, MiniTile>;
    const playerPos = (this.mapService as any).playerPos ?? { q: 0, r: 0 };

    const scale = this.zoom;
    const centerX = this.size / 2 + this.offsetX;
    const centerY = this.size / 2 + this.offsetY;
    
    for (const [key, tileData] of Object.entries(tiles as Record<string, any>)) {
      if (!tileData.discovered) continue;
      const [q, r] = key.split(',').map(Number);
      const { x, y } = this.hexToPixel(q - playerPos.q, r - playerPos.r);
      ctx.fillStyle = this.terrainColor(tileData.terrain);

      const base = this.hexSize;
      const hexSize = base * scale;
      const hexX = centerX + x * scale;
      const hexY = centerY + y * scale;
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angleDeg = 60 * i - 30;
        const angleRad = (Math.PI / 180) * angleDeg;
        const px = hexX + hexSize * Math.cos(angleRad);
        const py = hexY + hexSize * Math.sin(angleRad);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      
      ctx.fillStyle = this.terrainColor(tileData.terrain);
      ctx.fill();
      ctx.lineWidth = Math.max(0.3, 0.5 * scale);
      ctx.strokeStyle = '#000000';
      ctx.stroke();
    }

    // overlays
    const overlays = this.mapService.overlays;
    ctx.fillStyle = '#ffcc00';
    for (const [key] of Object.entries(overlays)) {
      const [q, r] = key.split(',').map(Number);
      const { x, y } = this.hexToPixel(q - playerPos.q, r - playerPos.r);
      // overlays (follow scale)
      const overlays = (this.mapService as any).overlayTypes ?? {};
      ctx.fillStyle = '#ffcc00';
      for (const [key] of Object.entries(overlays)) {
        const [q, r] = key.split(',').map(Number);
        const { x, y } = this.hexToPixel(q - playerPos.q, r - playerPos.r);
        const size = 3 * scale;
        ctx.fillRect(centerX + x * scale - size / 2, centerY + y * scale - size / 2, size, size);
      }      
    }

    // player
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, this.hexSize + 1, 0, Math.PI * 2);
    ctx.fill();
  }

  private hexToPixel(q: number, r: number) {
    const x = this.hexSize * Math.sqrt(3) * (q + r / 2);
    const y = this.hexSize * 1.5 * r;
    return { x, y };
  }

  private terrainColor(t: string): string {
    switch (t) {
      case 'plain': return '#88c070';
      case 'forest': return '#228833';
      case 'desert': return '#d9c96c';
      case 'mountain': return '#777777';
      case 'volcano': return '#993333';
      case 'swamp': return '#446655';
      case 'jungle': return '#337755';
      case 'water': return '#3a6ea5';
      default: return '#555555';
    }
  }

  private getTouchDistance(touches: TouchList): number {
    const [t1, t2] = [touches[0], touches[1]];
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }  

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
