import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Application, Container, Sprite, Assets, Texture } from 'pixi.js';
import { createTile, Terrain } from '../factories/tile.factory';
import { OverlayKind } from '../models/overlay-types';
import { overlayPools } from '../models/overlay-pools';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private app!: Application;
  private mapContainer!: Container;
  private tiles: Record<string, { gfx: Container; terrain: Terrain; discovered: boolean }> = {};
  private size = 80;
  private mapRadius: number = 4;

  private player!: Sprite;
  private playerPos = { q: 0, r: 0 };

  private terrains: Terrain[] = ['plain', 'forest', 'desert', 'mountain', 'water'];

  private textures: Record<string, Texture> = {} as any;
  private overlaySprites: Record<string, Sprite[]> = {};
  private overlayTypes: Record<string, OverlayKind[]> = {};
  private activeOverlay: OverlayKind | null = null;
  overlayChange = new Subject<OverlayKind>();
  tileChange = new Subject<{ type: string; description?: string }>();

  playerMoved = new Subject<{ q: number; r: number }>();

  private iconTextures: Record<string, Texture> = {} as any;

  private seed: number = Date.now();
  private randState = 1;
  private nextRand(): number {
    // LCG (Linear Congruential Generator)
    this.randState = (this.randState * 48271) % 0x7fffffff;
    return this.randState / 0x7fffffff;
  }

  // === initMap ===
  async initMap(canvasId: string, mapRadius: number, seed?: number): Promise<void> {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (!canvas) throw new Error('Canvas introuvable !');

    this.app = new Application();
    await this.app.init({
      resizeTo: canvas.parentElement!,
      backgroundColor: 0x111111,
      canvas
    });

    await this.loadTextures();
    await this.loadIconTextures();

    this.mapContainer = new Container();
    this.app.stage.addChild(this.mapContainer);
    this.mapRadius = mapRadius;

    if (seed !== undefined) {
      this.seed = seed;
    } else {
      this.seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }
    this.randState = this.seed; // initialise le générateur pseudo-aléatoire
    this.buildMap(mapRadius);

    this.player = new Sprite(this.textures['player']);
    this.player.anchor.set(0.5);
    this.player.width = this.size * 1.2;
    this.player.height = this.size * 1.2;
    this.mapContainer.addChild(this.player);
    this.updatePlayerPosition();

    const key = `${this.playerPos.q},${this.playerPos.r}`;
    const tileData = this.tiles[key];
    if (tileData) {
      this.tileChange.next({
        type: tileData.terrain,
        description: this.describeTerrain(tileData.terrain)
      });
    }

    this.centerCamera(false);
    this.updateVisibility();

    window.addEventListener('resize', () => {
      this.centerCamera(false);
    });
  }

  // === textures loading ===
  private async loadTextures() {
    const manifest = await fetch('assets/tiles/tiles.json').then(res => res.json());
    const textures: Record<string, Texture> = {};
    for (const [key, path] of Object.entries(manifest)) {
      textures[key] = await Assets.load(path as string);
    }
    textures['player'] = await Assets.load('assets/player.png');
    this.textures = textures;
  }

  private async loadIconTextures() {
    this.iconTextures = {
      city: await Assets.load('assets/overlays/city.png'),
      village: await Assets.load('assets/overlays/village.png'),
      bandits: await Assets.load('assets/overlays/bandits.png'),
    };
  }

  // === overlay management ===
  addOverlay(q: number, r: number, kind: OverlayKind) {
    if (!this.mapContainer) return;

    const key = `${q},${r}`;
    const { x, y } = this.hexToPixel(q, r);
    const tex = this.iconTextures[kind];
    if (!tex) return;

    const s = new Sprite(tex);
    s.anchor.set(0.5);
    s.x = x;
    s.y = y;
    s.width = this.size * 0.8;
    s.height = this.size * 0.8;

    this.mapContainer.addChild(s);

    if (!this.overlaySprites[key]) this.overlaySprites[key] = [];
    this.overlaySprites[key].push(s);

    if (!this.overlayTypes[key]) this.overlayTypes[key] = [];
    this.overlayTypes[key].push(kind);
  }

  private pickOverlayForTerrain(terrain: Terrain): OverlayKind {
    const pool = overlayPools[terrain] ?? [{ kind: OverlayKind.None, weight: 1 }];
    const total = pool.reduce((sum, o) => sum + o.weight, 0);
    let roll = this.nextRand() * total;
    for (const o of pool) {
      if (roll < o.weight) return o.kind;
      roll -= o.weight;
    }
    return OverlayKind.None;
  }

  // === map building ===
  private hexToPixel(q: number, r: number) {
    const x = this.size * Math.sqrt(3) * (q + r / 2);
    const y = this.size * 1.5 * r;
    return { x, y };
  }

  private randomTerrain(): Terrain {
    const index = Math.floor(this.nextRand() * this.terrains.length);
    return this.terrains[index];
  }

  private buildMap(mapRadius: number) {
    const N = mapRadius;
    this.tiles = {};

    for (let q = -N; q <= N; q++) {
      for (let r = -N; r <= N; r++) {
        const s = -q - r;
        if (Math.abs(q) <= N && Math.abs(r) <= N && Math.abs(s) <= N) {
          const { x, y } = this.hexToPixel(q, r);
          const terrain = this.randomTerrain();
          const tile = createTile({
            x, y,
            size: this.size,
            terrain,
            container: this.mapContainer,
            textures: this.textures,
            onClick: () => this.movePlayer(q, r)
          });

          this.tiles[`${q},${r}`] = { gfx: tile, terrain, discovered: false };

          const overlay = this.pickOverlayForTerrain(terrain);
          if (overlay !== OverlayKind.None) {
            this.addOverlay(q, r, overlay);
          }
        }
      }
    }
  }

  // === player & camera ===
  private updatePlayerPosition() {
    const { x, y } = this.hexToPixel(this.playerPos.q, this.playerPos.r);
    if (this.player) {
      this.player.x = x;
      this.player.y = y;
    }
  }

  private movePlayer(q: number, r: number) {
    const neighbors = [
      [1, 0], [1, -1], [0, -1],
      [-1, 0], [-1, 1], [0, 1]
    ];
    for (const [dq, dr] of neighbors) {
      if (this.playerPos.q + dq === q && this.playerPos.r + dr === r) {
        this.playerPos = { q, r };
        this.playerMoved.next(this.playerPos);
        this.updatePlayerPosition();
        this.centerCamera();
        this.updateVisibility();

        const key = `${q},${r}`;
        const overlays = this.overlayTypes[key] || [];
        this.activeOverlay = overlays.length > 0 ? overlays[0] : OverlayKind.None;
        this.overlayChange.next(this.activeOverlay);

        const tileData = this.tiles[`${q},${r}`];
        if (tileData) {
          this.tileChange.next({
            type: tileData.terrain,
            description: this.describeTerrain(tileData.terrain)
          });
        }
        return;
      }
    }
  }

  private centerCamera(animated = false) {
    const { x, y } = this.hexToPixel(this.playerPos.q, this.playerPos.r);
    const targetX = this.app.screen.width / 2 - x;
    const targetY = this.app.screen.height / 2 - y;

    if (!animated) {
      this.mapContainer.x = targetX;
      this.mapContainer.y = targetY;
      return;
    }
    const startX = this.mapContainer.x;
    const startY = this.mapContainer.y;
    const duration = 300;
    const startTime = performance.now();
    const animate = (time: number) => {
      const t = Math.min((time - startTime) / duration, 1);
      this.mapContainer.x = startX + (targetX - startX) * t;
      this.mapContainer.y = startY + (targetY - startY) * t;
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  private updateVisibility() {
    for (const key in this.tiles) {
      const [q, r] = key.split(',').map(Number);
      const dist = this.hexDistance(this.playerPos, { q, r });
      const tileData = this.tiles[key];
      const tile = tileData.gfx as any;
      if (tile && tile.fog) {
        if (dist <= 1) {
          tile.fog.visible = false;
          tileData.discovered = true;
        } else if (!tileData.discovered) {
          tile.fog.visible = true;
        }
      }
    }
  }

  private hexDistance(a: { q: number, r: number }, b: { q: number, r: number }) {
    return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
  }

  private describeTerrain(terrain: Terrain): string {
    switch (terrain) {
      case 'plain': return 'Une vaste plaine ouverte.';
      case 'forest': return 'Une forêt dense.';
      case 'desert': return 'Un désert aride.';
      case 'mountain': return 'De hautes montagnes.';
      case 'water': return 'Un lac ou une mer calme.';
      default: return 'Terrain inconnu.';
    }
  }

  public setPlayerHex(q: number, r: number): void {
    this.playerPos.q = q;
    this.playerPos.r = r;
    this.updatePlayerPosition();
  }

  public getMapState(): {
    seed: number,
    radius: number,
    player: { q: number; r: number },
    overlays: { q: number; r: number; kind: OverlayKind }[],
    discovered: { q: number; r: number }[]
  } {
    const overlays: { q: number; r: number; kind: OverlayKind }[] = [];
    for (const key in this.overlayTypes) {
      const [q, r] = key.split(',').map(Number);
      for (const kind of this.overlayTypes[key]) {
        overlays.push({ q, r, kind });
      }
    }

    const discovered = Object.entries(this.tiles)
      .filter(([_, t]) => t.discovered)
      .map(([key]) => {
        const [q, r] = key.split(',').map(Number);
        return { q, r };
      });

    return {
      seed: this.seed,
      radius: this.mapRadius, // récupéré depuis la propriété interne
      player: { ...this.playerPos },
      overlays,
      discovered
    };
  }

  // 🆕 Restauration de la map depuis une sauvegarde
  public async loadMapState(state: {
    seed: number,
    player: { q: number; r: number },
    overlays: { q: number; r: number; kind: OverlayKind }[],
    discovered: { q: number; r: number }[]
  }, canvasId: string, mapRadius: number) {
    await this.initMap(canvasId, mapRadius, state.seed);

    this.setPlayerHex(state.player.q, state.player.r);

    for (const o of state.overlays) {
      this.addOverlay(o.q, o.r, o.kind);
    }

    for (const d of state.discovered) {
      const key = `${d.q},${d.r}`;
      if (this.tiles[key]) {
        this.tiles[key].discovered = true;
        const tile = this.tiles[key].gfx as any;
        if (tile && tile.fog) tile.fog.visible = false;
      }
    }
  }
}
