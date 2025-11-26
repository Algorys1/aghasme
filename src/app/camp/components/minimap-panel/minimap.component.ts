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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../../../game/services/settings.service';
import { RegionService } from '../../../game/services/region.service';

interface Edge {
  x1: number; y1: number;
  x2: number; y2: number;
}

interface CachedTile {
  q: number;
  r: number;
  px: number;  // pré-calculé
  py: number;  // pré-calculé
  terrain: Terrain;
  discovered: boolean;
}

@Component({
  selector: 'app-minimap',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.scss'],
})
export class MinimapComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('minimapCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  size = 0;
  @Input() hexSize = 3;

  private ctx!: CanvasRenderingContext2D;
  private subs: Subscription[] = [];
  private readonly FIXED_SCALE = 6;

  offsetX = 0;
  offsetY = 0;

  private isDragging = false;
  private dragStart = { x: 0, y: 0 };

  private mapService = inject(MapService);
  private overlayRegistry = inject(OverlayRegistryService);
  private translate = inject(TranslateService);
  private regionService = inject(RegionService);

  constructor(private settings: SettingsService) {
    const lang = this.settings.language || 'en';
    this.translate.use(lang);
  }

  // ===== COLORS ===============================================

  private readonly overlayColors: Record<OverlayKind, string> = {
    [OverlayKind.None]: '#ffffff',
    [OverlayKind.City]: '#4fc3f7',
    [OverlayKind.Village]: '#ffb74d',
    [OverlayKind.Farm]: '#f0e68c',
    [OverlayKind.Mine]: '#bdbdbd',
    [OverlayKind.Forest]: '#66bb6a',
    [OverlayKind.Ruins]: '#ab47bc',
    [OverlayKind.Tower]: '#9575cd',
    [OverlayKind.Shrine]: '#ce93d8',
    [OverlayKind.Spirit]: '#81d4fa',
    [OverlayKind.Ritual]: '#ba68c8',
    [OverlayKind.Wanderer]: '#ffd54f',
    [OverlayKind.Caravan]: '#ffe082',
    [OverlayKind.Anomaly]: '#ff8a65',
    [OverlayKind.Treasure]: '#ffd700',
    [OverlayKind.Portal]: '#5c6bc0',
  };

  private readonly clanColors: Record<string, string> = {
    anims: "#d9534f",
    sylvaris: "#5cb85c",
    frostfire: "#5bc0de",
    engineers: "#777777",
    all: "#c9a54b"
  };

  private readonly overlayLetters: Record<OverlayKind, string> = {
    [OverlayKind.City]: "C",
    [OverlayKind.Village]: "V",
    [OverlayKind.Farm]: "F",
    [OverlayKind.Mine]: "M",
    [OverlayKind.Forest]: "Fo",
    [OverlayKind.Ruins]: "R",
    [OverlayKind.Tower]: "T",
    [OverlayKind.Shrine]: "S",
    [OverlayKind.Spirit]: "Sp",
    [OverlayKind.Ritual]: "Ri",
    [OverlayKind.Anomaly]: "A",
    [OverlayKind.Caravan]: "Ca",
    [OverlayKind.Wanderer]: "W",
    [OverlayKind.Treasure]: "Tr",
    [OverlayKind.Portal]: "P",
    [OverlayKind.None]: ""
  };

  // ===== LEGEND ===============================================

  legendEntries = [
    { kind: OverlayKind.City,     label: 'MAP.LEGENDS.CITY',     color: this.overlayColors[OverlayKind.City],     letter: this.overlayLetters[OverlayKind.City] },
    { kind: OverlayKind.Village,  label: 'MAP.LEGENDS.VILLAGE',  color: this.overlayColors[OverlayKind.Village],  letter: this.overlayLetters[OverlayKind.Village] },
    { kind: OverlayKind.Farm,     label: 'MAP.LEGENDS.FARM',     color: this.overlayColors[OverlayKind.Farm],     letter: this.overlayLetters[OverlayKind.Farm] },
    { kind: OverlayKind.Forest,   label: 'MAP.LEGENDS.FOREST',   color: this.overlayColors[OverlayKind.Forest],   letter: this.overlayLetters[OverlayKind.Forest] },
    { kind: OverlayKind.Mine,     label: 'MAP.LEGENDS.MINE',     color: this.overlayColors[OverlayKind.Mine],     letter: this.overlayLetters[OverlayKind.Mine] },
    { kind: OverlayKind.Ruins,    label: 'MAP.LEGENDS.RUINS',    color: this.overlayColors[OverlayKind.Ruins],    letter: this.overlayLetters[OverlayKind.Ruins] },
    { kind: OverlayKind.Tower,    label: 'MAP.LEGENDS.TOWER',    color: this.overlayColors[OverlayKind.Tower],    letter: this.overlayLetters[OverlayKind.Tower] },
    { kind: OverlayKind.Shrine,   label: 'MAP.LEGENDS.SHRINE',   color: this.overlayColors[OverlayKind.Shrine],   letter: this.overlayLetters[OverlayKind.Shrine] },
    { kind: OverlayKind.Spirit,   label: 'MAP.LEGENDS.SPIRIT',   color: this.overlayColors[OverlayKind.Spirit],   letter: this.overlayLetters[OverlayKind.Spirit] },
    { kind: OverlayKind.Ritual,   label: 'MAP.LEGENDS.RITUAL',   color: this.overlayColors[OverlayKind.Ritual],   letter: this.overlayLetters[OverlayKind.Ritual] },
    { kind: OverlayKind.Wanderer, label: 'MAP.LEGENDS.WANDERER', color: this.overlayColors[OverlayKind.Wanderer], letter: this.overlayLetters[OverlayKind.Wanderer] },
    { kind: OverlayKind.Caravan,  label: 'MAP.LEGENDS.CARAVAN',  color: this.overlayColors[OverlayKind.Caravan],  letter: this.overlayLetters[OverlayKind.Caravan] },
    { kind: OverlayKind.Anomaly,  label: 'MAP.LEGENDS.ANOMALY',  color: this.overlayColors[OverlayKind.Anomaly],  letter: this.overlayLetters[OverlayKind.Anomaly] },
    { kind: OverlayKind.Treasure, label: 'MAP.LEGENDS.TREASURE', color: this.overlayColors[OverlayKind.Treasure], letter: this.overlayLetters[OverlayKind.Treasure] },
    { kind: OverlayKind.Portal,   label: 'MAP.LEGENDS.PORTAL',   color: this.overlayColors[OverlayKind.Portal],   letter: this.overlayLetters[OverlayKind.Portal] },
    { kind: 'player', label: 'MAP.LEGENDS.PLAYER', color: '#7fc6ff', type: 'player' },
  ];

  // ===== OPTIMISATION : CACHE =============================================

  private cachedTiles: CachedTile[] = [];
  private cachedBorders: { color: string, segments: Edge[] }[] = [];

  private scheduled = false;

  // ===== INIT =============================================================

  ngOnInit(): void {
    this.subs.push(
      this.mapService.playerMoved.subscribe(() => this.requestDraw()),
      this.mapService.tileChange.subscribe(() => this.requestDraw()),
      this.mapService.overlayChange.subscribe(() => this.requestDraw())
    );
  }

  ngAfterViewInit(): void {
    const vw = window.innerWidth;

    this.size = Math.min(vw * 0.9, 350);

    const canvas = this.canvasRef.nativeElement;

    // Retina
    const dpr = window.devicePixelRatio || 1;
    canvas.width = this.size * dpr;
    canvas.height = this.size * dpr;
    canvas.style.width = `${this.size}px`;
    canvas.style.height = `${this.size}px`;

    this.ctx = canvas.getContext('2d')!;
    this.ctx.scale(dpr, dpr);

    this.installMouseControls(canvas);
    this.installTouchControls(canvas);

    this.precomputeTiles();
    this.precomputeBorders();

    this.draw();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  // ========================================================================
  // OPTIMISATION 1: REDESSIN À 30 FPS MAX
  // ========================================================================

  private requestDraw() {
    if (this.scheduled) return;
    this.scheduled = true;

    requestAnimationFrame(() => {
      this.scheduled = false;
      this.draw();
    });
  }

  // ========================================================================
  // OPTIMISATION 2 : PRÉ-CALCUL DES TUILES
  // ========================================================================

  private precomputeTiles() {
    const raw = (this.mapService as any).tiles as Record<
      string,
      { terrain: Terrain; discovered: boolean }
    >;

    const tiles: CachedTile[] = [];

    for (const [key, t] of Object.entries(raw)) {
      const [q, r] = key.split(',').map(Number);
      const { x, y } = this.hexToPixel(q, r);  // position ABSOLUE

      tiles.push({
        q, r,
        px: x,
        py: y,
        terrain: t.terrain,
        discovered: t.discovered
      });
    }

    this.cachedTiles = tiles;
  }

  // ========================================================================
  // OPTIMISATION 3 : PRÉ-CALCUL DES SEGMENTS DE FRONTIÈRE
  // ========================================================================

  private precomputeBorders() {
    const results: { color: string, segments: Edge[] }[] = [];

    const directions: [number, number][] = [
      [1, 0], [0, 1], [-1, 1],
      [-1, 0], [0, -1], [1, -1]
    ];

    const cityRegions = this.regionService.getCityRegions();

    for (const region of cityRegions) {
      const tiles = new Set(region.tiles);
      const color = this.clanColors[region.clan ?? 'all'] ?? '#ff3366';

      const segments: Edge[] = [];

      for (const key of tiles) {
        const [q, r] = key.split(',').map(Number);

        // Position absolue
        const { x, y } = this.hexToPixel(q, r);

        const radius = this.hexSize;

        for (let i = 0; i < 6; i++) {
          const [dq, dr] = directions[i];
          const neighborKey = `${q + dq},${r + dr}`;

          if (tiles.has(neighborKey)) continue;

          const angle1 = ((60 * i - 30) * Math.PI) / 180;
          const angle2 = ((60 * (i + 1) - 30) * Math.PI) / 180;

          segments.push({
            x1: x + radius * Math.cos(angle1),
            y1: y + radius * Math.sin(angle1),
            x2: x + radius * Math.cos(angle2),
            y2: y + radius * Math.sin(angle2),
          });
        }
      }

      results.push({ color, segments });
    }

    this.cachedBorders = results;
  }

  // ========================================================================
  // DRAW
  // ========================================================================

  private draw(): void {
    if (!this.ctx) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.size, this.size);

    const scale = this.FIXED_SCALE;
    const player = this.getPlayerPos();

    const centerX = this.size / 2 + this.offsetX;
    const centerY = this.size / 2 + this.offsetY;

    // DRAW TILES (SUPER FAST)
    for (const tile of this.cachedTiles) {
      const px = centerX + (tile.px - player.q * this.hexSize * Math.sqrt(3) - player.r * this.hexSize * Math.sqrt(3) / 2) * scale;
      const py = centerY + (tile.py - player.r * this.hexSize * 1.5) * scale;

      const radius = this.hexSize * scale;

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = ((60 * i - 30) * Math.PI) / 180;
        const tx = px + radius * Math.cos(angle);
        const ty = py + radius * Math.sin(angle);
        i === 0 ? ctx.moveTo(tx, ty) : ctx.lineTo(tx, ty);
      }
      ctx.closePath();

      ctx.fillStyle = this.terrainColor(tile.terrain);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // DRAW REGION BORDERS (super rapide)
    this.drawPrecomputedBorders(ctx, player, scale, centerX, centerY);

    // MAP BORDER (inchangé)
    this.drawMapBorder(ctx, player, scale, centerX, centerY);

    // OVERLAYS + LABELS
    this.drawOverlays(ctx, player, scale, centerX, centerY);

    // PLAYER MARKER
    this.drawPlayer(ctx, centerX, centerY);
  }

  // ========================================================================
  // REGIONS — drawing only (borders are precomputed)
  // ========================================================================

  private drawPrecomputedBorders(
    ctx: CanvasRenderingContext2D,
    player: { q: number; r: number },
    scale: number,
    centerX: number,
    centerY: number
  ) {
    for (const region of this.cachedBorders) {
      ctx.strokeStyle = region.color;
      ctx.lineWidth = 2.5;

      ctx.shadowBlur = 6;
      ctx.shadowColor = region.color;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      for (const seg of region.segments) {
        const px1 = centerX + (seg.x1 - player.q * this.hexSize * Math.sqrt(3) - player.r * this.hexSize * Math.sqrt(3) / 2) * scale;
        const py1 = centerY + (seg.y1 - player.r * this.hexSize * 1.5) * scale;

        const px2 = centerX + (seg.x2 - player.q * this.hexSize * Math.sqrt(3) - player.r * this.hexSize * Math.sqrt(3) / 2) * scale;
        const py2 = centerY + (seg.y2 - player.r * this.hexSize * 1.5) * scale;

        ctx.beginPath();
        ctx.moveTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
    }
  }

  // ========================================================================
  // DRAW MAP BORDER (inchangé)
  // ========================================================================

  private drawMapBorder(
    ctx: CanvasRenderingContext2D,
    player: { q: number; r: number },
    scale: number,
    centerX: number,
    centerY: number
  ) {
    const radiusMap = (this.mapService as any).mapRadius;
    const R = radiusMap + 1;

    const t = performance.now() * 0.0015;
    const pulse = 0.25 + Math.sin(t) * 0.10;

    ctx.strokeStyle = `rgba(255, 215, 130, ${pulse})`;
    ctx.lineWidth = 1.4;

    const corners = [
      { q: R, r: -R },
      { q: 0, r: -R },
      { q: -R, r: 0 },
      { q: -R, r: R },
      { q: 0, r: R },
      { q: R, r: 0 },
    ];

    ctx.beginPath();

    corners.forEach((c, i) => {
      const { x, y } = this.hexToPixel(c.q - player.q, c.r - player.r);
      const px = centerX + x * scale;
      const py = centerY + y * scale;

      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });

    ctx.closePath();
    ctx.stroke();
  }

  // ========================================================================
  // DRAW OVERLAYS & LABELS (inchangé)
  // ========================================================================

  private getOverlaySnapshot() {
    const list: { id: string; kind: OverlayKind; q: number; r: number; name: string | null; }[] = [];

    for (const [id, entry] of this.overlayRegistry['assigned'].entries()) {
      const table = OverlayFactory.getTable(entry.kind);
      const template = table?.find(t => t.id === id);

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

  private drawOverlays(
    ctx: CanvasRenderingContext2D,
    player: { q: number; r: number },
    scale: number,
    centerX: number,
    centerY: number
  ) {
    const overlays = this.getOverlaySnapshot();
    type LabelTask = { text: string; x: number; y: number };
    const labels: LabelTask[] = [];

    for (const ov of overlays) {
      const { x, y } = this.hexToPixel(ov.q - player.q, ov.r - player.r);
      const px = centerX + x * scale;
      const py = centerY + y * scale;

      const size = 3 * scale;
      const half = size / 2;

      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.roundRect(px - half + 1, py - half + 1, size, size, 2);
      ctx.fill();

      ctx.fillStyle = this.overlayColors[ov.kind] ?? '#fff';
      ctx.beginPath();
      ctx.roundRect(px - half, py - half, size, size, 2);
      ctx.fill();

      const letter = this.overlayLetters[ov.kind];
      if (letter) {
        ctx.fillStyle = '#000';
        ctx.font = `${Math.max(8, 2.2 * scale)}px Cinzel`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, px, py);
      }

      ctx.strokeStyle = 'rgba(0,0,0,0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(px - half, py - half, size, size, 2);
      ctx.stroke();

      if ((ov.kind === OverlayKind.City || ov.kind === OverlayKind.Village) && ov.name) {
        const label = this.translate.instant(ov.name) || ov.name;
        labels.push({
          text: label,
          x: px,
          y: py - 5 * scale,
        });
      }
    }

    labels.forEach(l => this.drawLabel(ctx, l.text, l.x, l.y, scale));
  }

  // ========================================================================
  // PLAYER
  // ========================================================================

  private drawPlayer(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
    const r = this.hexSize * 1.6;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY - r);
    ctx.lineTo(centerX + r, centerY + r);
    ctx.lineTo(centerX - r, centerY + r);
    ctx.closePath();

    ctx.fillStyle = '#7fc6ff';
    ctx.fill();

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }

  // ========================================================================
  // LABELS
  // ========================================================================

  private drawLabel(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    scale: number
  ) {
    const fontSize = Math.min(11, Math.max(8, 2.2 * scale));
    ctx.font = `${fontSize}px Spectral`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const paddingX = 3 * scale;
    const paddingY = 1.5 * scale;

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;

    const bgWidth = textWidth + paddingX * 2;
    const bgHeight = fontSize + paddingY * 2;

    const bgX = x - bgWidth / 2;
    const bgY = y - bgHeight / 2;

    ctx.fillStyle = 'rgba(0,0,0,0.50)';
    ctx.beginPath();
    ctx.roundRect(bgX, bgY, bgWidth, bgHeight, 3);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.fillText(text, x, y);
  }

  // ========================================================================
  // UTILS
  // ========================================================================

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

  private getPlayerPos() {
    return this.mapService.getPlayerPosition();
  }

  // ========================================================================
  // DRAG CONTROLS
  // ========================================================================

  private installMouseControls(canvas: HTMLCanvasElement) {
    canvas.addEventListener('mousedown', e => {
      this.isDragging = true;
      this.dragStart = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    canvas.addEventListener('mousemove', e => {
      if (!this.isDragging) return;

      const dragSpeed = 1.5;
      this.offsetX += (e.clientX - this.dragStart.x) / dragSpeed;
      this.offsetY += (e.clientY - this.dragStart.y) / dragSpeed;

      this.dragStart = { x: e.clientX, y: e.clientY };
      this.requestDraw();
    });
  }

  private installTouchControls(canvas: HTMLCanvasElement) {
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.dragStart = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    });

    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      if (!this.isDragging || e.touches.length !== 1) return;

      const t = e.touches[0];
      const dragSpeed = 1.5;
      this.offsetX += (t.clientX - this.dragStart.x) / dragSpeed;
      this.offsetY += (t.clientY - this.dragStart.y) / dragSpeed;

      this.dragStart = { x: t.clientX, y: t.clientY };
      this.requestDraw();
    });

    canvas.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }
}
