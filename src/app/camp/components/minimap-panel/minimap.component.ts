import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from '../../../game/services/map.service';
import { OverlayRegistryService } from '../../../overlays/services/overlay-registry.service';
import { OverlayFactory } from '../../../overlays/factories/overlay.factory';
import { OverlayKind } from '../../../overlays/models/overlays.model';
import { Terrain } from '../../../game/factories/tile.factory';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-minimap',
  standalone: true,
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.scss'],
})
export class MinimapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('minimapCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() size = 200;   // canvas size
  @Input() hexSize = 3;  // base hex radius on minimap

  private ctx!: CanvasRenderingContext2D;
  private subs: Subscription[] = [];

  zoom = 6;
  offsetX = 0;
  offsetY = 0;

  private isDragging = false;
  private dragStart = { x: 0, y: 0 };

  private mapService = inject(MapService);
  private overlayRegistry = inject(OverlayRegistryService);
  private translate = inject(TranslateService);

  // -------------------------------------------------------------
  // COLORS (centralized palette)
  // -------------------------------------------------------------
  private readonly overlayColors: Record<OverlayKind, string> = {
    [OverlayKind.None]:        '#ffffff',

    [OverlayKind.City]:        '#4fc3f7',
    [OverlayKind.Village]:     '#ffb74d',
    [OverlayKind.Farm]:        '#f0e68c',

    [OverlayKind.Mine]:        '#bdbdbd',
    [OverlayKind.Forest]:      '#66bb6a',

    [OverlayKind.Ruins]:       '#ab47bc',
    [OverlayKind.Tower]:       '#9575cd',
    [OverlayKind.Shrine]:      '#ce93d8',
    [OverlayKind.Spirit]:      '#81d4fa',
    [OverlayKind.Ritual]:      '#ba68c8',
    [OverlayKind.Wanderer]:    '#ffd54f',
    [OverlayKind.Caravan]:     '#ffe082',
    [OverlayKind.Anomaly]:     '#ff8a65',
    [OverlayKind.Treasure]:    '#ffd700',
    [OverlayKind.Portal]:      '#5c6bc0',
  };

  legendEntries = [
    { kind: OverlayKind.City,    label: 'Ville',    color: this.overlayColors[OverlayKind.City] },
    { kind: OverlayKind.Village, label: 'Village',  color: this.overlayColors[OverlayKind.Village] },
    { kind: OverlayKind.Farm,    label: 'Ferme',    color: this.overlayColors[OverlayKind.Farm] },
    { kind: OverlayKind.Forest,  label: 'Forêt',    color: this.overlayColors[OverlayKind.Forest] },
    { kind: OverlayKind.Mine,    label: 'Mine',     color: this.overlayColors[OverlayKind.Mine] },
    { kind: OverlayKind.Ruins,   label: 'Ruines',   color: this.overlayColors[OverlayKind.Ruins] },
    { kind: OverlayKind.Portal,  label: 'Portail',  color: this.overlayColors[OverlayKind.Portal] },
  ];

  // -------------------------------------------------------------
  // INIT
  // -------------------------------------------------------------
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
    this.installMouseControls(canvas);
    this.installTouchControls(canvas);

    this.draw();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  // -------------------------------------------------------------
  // INPUT SNAPSHOTS (tiles, overlays, player)
  // -------------------------------------------------------------

  private getTileSnapshot() {
    const entries = Object.entries(
      (this.mapService as any).tiles // ⚠️ see below, we can fix this if needed
    ) as Array<
      [
        string,
        { terrain: Terrain; discovered: boolean; variant: string }
      ]
    >;

    return entries.map(([key, tile]) => {
      const [q, r] = key.split(',').map(Number);
      return {
        q,
        r,
        terrain: tile.terrain,
        discovered: tile.discovered,
      };
    });
  }

  /**
   * Clean, typed overlay snapshot.
   * Using OverlayRegistry as single source of truth.
   */
  private getOverlaySnapshot() {
    const list: {
      id: string;
      kind: OverlayKind;
      q: number;
      r: number;
      name: string | null;
    }[] = [];

    for (const [id, entry] of this.overlayRegistry['assigned'].entries()) {
      const table = OverlayFactory.getTable(entry.kind);
      const template = table?.find((t) => t.id === id);

      list.push({
        id,
        kind: entry.kind,
        q: entry.coords.q,
        r: entry.coords.r,
        name: template?.name ?? null,
      });
    }

    return list;
  }

  private getPlayerPos() {
    return this.mapService.getPlayerPosition();
  }

  // -------------------------------------------------------------
  // DRAW
  // -------------------------------------------------------------
  private draw(): void {
    if (!this.ctx) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.size, this.size);

    const player = this.getPlayerPos();
    const tiles = this.getTileSnapshot();
    const overlays = this.getOverlaySnapshot();

    const scale = this.zoom;
    const centerX = this.size / 2 + this.offsetX;
    const centerY = this.size / 2 + this.offsetY;

    // --- TILES ---
    for (const tile of tiles) {
      if (!tile.discovered) continue;

      const { x, y } = this.hexToPixel(tile.q - player.q, tile.r - player.r);
      const drawX = centerX + x * scale;
      const drawY = centerY + y * scale;
      const radius = this.hexSize * scale;

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = ((60 * i - 30) * Math.PI) / 180;
        const px = drawX + radius * Math.cos(angle);
        const py = drawY + radius * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = this.terrainColor(tile.terrain);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = Math.max(0.3, 0.5 * scale);
      ctx.stroke();
    }

    // --- OVERLAYS ---
    for (const ov of overlays) {
      const { x, y } = this.hexToPixel(ov.q - player.q, ov.r - player.r);
      const px = centerX + x * scale;
      const py = centerY + y * scale;

      const size = 3 * scale; // square marker
      ctx.fillStyle = this.overlayColors[ov.kind] ?? '#fff';
      ctx.fillRect(px - size / 2, py - size / 2, size, size);

      // City / Village labels
      if ((ov.kind === OverlayKind.City || ov.kind === OverlayKind.Village)
          && ov.name) {
        ctx.font = `${4 * scale}px Cinzel`;
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';

        let translated = this.translate.instant(ov.name) || ov.name;
        ctx.strokeText(translated, px, py - 6 * scale);
        ctx.fillText(translated, px, py - 6 * scale);
      }
    }

    // --- PLAYER ---
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.arc(centerX, centerY, this.hexSize + 1, 0, Math.PI * 2);
    ctx.fill();
  }

  // -------------------------------------------------------------
  // UTILS
  // -------------------------------------------------------------
  private hexToPixel(q: number, r: number) {
    const x = this.hexSize * Math.sqrt(3) * (q + r / 2);
    const y = this.hexSize * 1.5 * r;
    return { x, y };
  }

  private terrainColor(t: Terrain): string {
    switch (t) {
      case 'plain': return '#88c070';
      case 'forest': return '#228833';
      case 'desert': return '#d9c96c';
      case 'mountain': return '#777777';
      case 'volcano': return '#4d4d4d';
      case 'swamp': return '#446655';
      case 'jungle': return '#337755';
      case 'sea': return '#3a6ea5';
      default: return '#555';
    }
  }

  // -------------------------------------------------------------
  // MOUSE + TOUCH CONTROLS
  // -------------------------------------------------------------
  private installMouseControls(canvas: HTMLCanvasElement) {
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      this.zoom = Math.min(8, Math.max(0.5, this.zoom - delta * 0.3));
      this.draw();
    });

    canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragStart = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => (this.isDragging = false));

    canvas.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dragSpeed = Math.max(1, this.zoom * .02);
      this.offsetX += (e.clientX - this.dragStart.x) / dragSpeed;
      this.offsetY += (e.clientY - this.dragStart.y) / dragSpeed;
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.draw();
    });
  }

  private installTouchControls(canvas: HTMLCanvasElement) {
    let lastDist = 0;
    let pinching = false;

    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.dragStart = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      } else if (e.touches.length === 2) {
        pinching = true;
        lastDist = this.touchDist(e.touches);
      }
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();

      if (pinching && e.touches.length === 2) {
        const dist = this.touchDist(e.touches);
        const delta = dist - lastDist;
        this.zoom = Math.min(8, Math.max(0.5, this.zoom + delta * 0.01));
        lastDist = dist;
        this.draw();
      } else if (this.isDragging && e.touches.length === 1) {
        const t = e.touches[0];
        const dragSpeed = Math.max(1, this.zoom * 0.15);
        this.offsetX += (t.clientX - this.dragStart.x) / dragSpeed;
        this.offsetY += (t.clientY - this.dragStart.y) / dragSpeed;
        this.dragStart = { x: t.clientX, y: t.clientY };
        this.draw();
      }
    });

    canvas.addEventListener('touchend', () => {
      this.isDragging = false;
      pinching = false;
    });
  }

  private touchDist(touches: TouchList) {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
  }
}
