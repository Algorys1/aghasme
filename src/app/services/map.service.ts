import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { createNoise2D } from 'simplex-noise';

import { createTile, Terrain } from '../factories/tile.factory';
import { OverlayKind, OVERLAY_POOLS } from '../models/overlays';
import { CharacterService } from './character.service';
import { RendererService } from './renderer.service'; 
import { Container, Sprite } from 'pixi.js';

export interface MapTileSnapshot {
  key: string;
  q: number;
  r: number;
  terrain: Terrain;
  discovered: boolean;
  overlay?: OverlayKind | null;
}

export interface MapSnapshot {
  version: 1;
  size: number;
  seed: number;
  player: { q: number; r: number };
  overlays: { q: number; r: number; kind: OverlayKind }[];
  tiles: MapTileSnapshot[];
}

@Injectable({ providedIn: 'root' })
export class MapService {
  // --- PIXI Core ---
  private size = 80;

  // --- Map Data ---
  private tiles: Record<string, { gfx: Container; terrain: Terrain; discovered: boolean }> = {};
  private overlaySprites: Record<string, Sprite[]> = {};
  private overlayTypes: Record<string, OverlayKind[]> = {};

  // --- Noise generation ---
  private noiseAltitude = createNoise2D();
  private noiseHumidity = createNoise2D();
  private scaleAltitude = 0.05;
  private scaleHumidity = 0.05;
  private seed: number = Date.now();
  private randState = 1;

  // --- Player ---
  private player!: Sprite;
  private playerPos = { q: 0, r: 0 };

  // --- State / Events ---
  private mapRadius = 10;
  private activeOverlay: OverlayKind | null = null;
  overlayChange = new Subject<OverlayKind>();
  tileChange = new Subject<{ type: string; description?: string }>();
  playerMoved = new Subject<{ q: number; r: number }>();

  constructor(
    private characterService: CharacterService,
    private renderer: RendererService
  ) {}

  get overlays() {
    return this.overlayTypes;
  }

  private nextRand(): number {
    this.randState = (this.randState * 48271) % 0x7fffffff;
    return this.randState / 0x7fffffff;
  }

  private generateTerrain(q: number, r: number): Terrain {
    const altRaw = this.noiseAltitude(q * this.scaleAltitude, r * this.scaleAltitude);
    const humRaw = this.noiseHumidity(q * this.scaleHumidity, r * this.scaleHumidity);

    const altitude = (altRaw + 1) / 2;
    const humidity = (humRaw + 1) / 2;

    if (altitude < 0.3) return 'water';
    if (altitude > 0.7) return 'mountain';
    if (altitude > 0.8) return 'volcano';
    if (humidity < 0.3) return 'desert';
    if (humidity < 0.5) return 'plain';
    if (humidity < 0.6) return 'forest';
    if (humidity < 0.7) return 'jungle';
    return 'swamp';
  }

  private hexToPixel(q: number, r: number) {
    const x = this.size * Math.sqrt(3) * (q + r / 2);
    const y = this.size * 1.5 * r;
    return { x, y };
  }

  private buildMap(radius: number) {
    const N = radius;
    for (let q = -N; q <= N; q++) {
      for (let r = -N; r <= N; r++) {
        const s = -q - r;
        if (Math.abs(q) <= N && Math.abs(r) <= N && Math.abs(s) <= N) {
          const { x, y } = this.hexToPixel(q, r);
          const terrain = this.generateTerrain(q, r);

          const tile = createTile({
            x,
            y,
            size: this.size,
            terrain,
            container: this.renderer.container,
            textures: this.renderer.textures,            
            onClick: () => this.movePlayer(q, r)
          });

          this.tiles[`${q},${r}`] = { gfx: tile, terrain, discovered: false };

          const overlay = this.pickOverlayForTerrain(terrain);
          if (overlay !== OverlayKind.None) this.addOverlay(q, r, overlay);
        }
      }
    }
  }

  private createPlayer() {
    this.player = this.renderer.createPlayerSprite(this.size);
    this.updatePlayerPosition();    
  }

  // === PLAYER MOVEMENT / CAMERA ====================================================
  private updatePlayerPosition() {
    const { x, y } = this.hexToPixel(this.playerPos.q, this.playerPos.r);
    this.player.x = x;
    this.player.y = y;
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
        this.renderer.centerCamera(this.playerPos.q, this.playerPos.r, this.size);
        this.updateVisibility();

        const key = `${q},${r}`;
        const overlays = this.overlayTypes[key] || [];
        this.activeOverlay = overlays.length > 0 ? overlays[0] : OverlayKind.None;
        this.overlayChange.next(this.activeOverlay);

        const tileData = this.tiles[key];
        if (tileData) {
          this.tileChange.next({
            type: tileData.terrain,
            description: this.describeTerrain(tileData.terrain)
          });
        }
      }
    }
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

  private hexDistance(a: { q: number; r: number }, b: { q: number; r: number }) {
    return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
  }

  // === OVERLAYS ===================================================================
  addOverlay(q: number, r: number, kind: OverlayKind) {
    const { x, y } = this.hexToPixel(q, r);
    const sprite = this.renderer.createOverlaySprite(kind, x, y, this.size);
    if (!sprite) return;
  
    const key = `${q},${r}`;
    (this.overlaySprites[key] ||= []).push(sprite);
    (this.overlayTypes[key] ||= []).push(kind);
  }  

  private pickOverlayForTerrain(terrain: Terrain): OverlayKind {
    const poolObj = OVERLAY_POOLS[terrain];
    if (!poolObj) return OverlayKind.None;
  
    const pool = Object.entries(poolObj).map(([kind, weight]) => ({
      kind: kind as OverlayKind,
      weight: weight as number,
    }));
  
    const total = pool.reduce((sum, o) => sum + o.weight, 0);
    let roll = this.nextRand() * total;
    for (const o of pool) {
      if (roll < o.weight) return o.kind;
      roll -= o.weight;
    }
    return OverlayKind.None;
  }

  // === SAVE / LOAD ================================================================
  public serializeMap(): MapSnapshot {
    const tiles: MapTileSnapshot[] = [];
    for (const [key, entry] of Object.entries(this.tiles)) {
      const [qs, rs] = key.split(',');
      tiles.push({
        key,
        q: Number(qs),
        r: Number(rs),
        terrain: entry.terrain,
        discovered: entry.discovered,
        overlay: (entry as any).overlay ?? null
      });
    }

    const overlays: { q: number; r: number; kind: OverlayKind }[] = [];
    for (const key in this.overlayTypes) {
      const [q, r] = key.split(',').map(Number);
      for (const kind of this.overlayTypes[key]) overlays.push({ q, r, kind });
    }

    return {
      version: 1,
      size: this.mapRadius,
      seed: this.seed,
      player: { ...this.playerPos },
      overlays,
      tiles
    };
  }

  // === TERRAIN DESCRIPTIONS ==========================================================
  private describeTerrain(terrain: Terrain): string {
    switch (terrain) {
      case 'plain': return 'A vast plain, punctuated here and there with stones and emerging trees.';
      case 'forest': return 'A dense, yet warm forest. You can hear animals slithering through the flora.';
      case 'desert': return "You're dying of heat in this desert, but where's the next watering hole?";
      case 'mountain': return 'These mountains are endless! The wind whistling in your ears will drive you crazy...';
      case 'volcano': return 'The heat keeps rising, rising, and rising... In the distance you hear the mountain rumbling. Better not hang around here!';
      case 'jungle': return 'This jungle is impenetrable and your feet are soaking wet! The mosquitoes don’t help either.';
      case 'swamp': return "These swamps make you feel nauseous... All you want to do is take a nice bath! The worst part is, there are creatures living here...";
      case 'water': return "Water, water as far as the eye can see. You're starting to miss land.";
      default: return 'Unknown lands';
    }
  }

  public clearAll(): void {
    this.renderer.clear();
    this.tiles = {};
    this.overlaySprites = {};
    this.overlayTypes = {};
    this.playerPos = { q: 0, r: 0 };
    this.seed = Date.now();
    this.randState = 1;
  }
  

  public generateNewSeed(): number {
    this.seed = Math.floor(Math.random() * Date.now());
    this.randState = this.seed;
    this.noiseAltitude = createNoise2D(() => this.nextRand());
    this.noiseHumidity = createNoise2D(() => this.nextRand());
    return this.seed;
  }

  private async bootPixi(canvas: HTMLCanvasElement) {
    await this.renderer.init(canvas);
  }  

  async initMapWithCanvas(canvas: HTMLCanvasElement, mapRadius: number, seed?: number): Promise<void> {
    await this.bootPixi(canvas);
    await this.prepareRenderer();

    this.mapRadius = mapRadius;
    this.seed = seed ?? Math.floor(Math.random() * Date.now());
    this.randState = this.seed;
    this.noiseAltitude = createNoise2D(() => this.nextRand());
    this.noiseHumidity = createNoise2D(() => this.nextRand());

    this.overlaySprites = {};
    this.overlayTypes = {};
    this.tiles = {};

    this.buildMap(mapRadius);
    this.createPlayer();
    this.renderer.centerCamera(this.playerPos.q, this.playerPos.r, this.size);
    this.updateVisibility();
    window.addEventListener('resize', () => this.renderer.centerCamera());
  }

  private async prepareRenderer() {
    await this.renderer.loadTileTextures();
    await this.renderer.loadOverlayTextures();
  
    const char = this.characterService.getCharacter();
    if (!char) throw new Error('No character found to load player texture');
    await this.renderer.loadPlayerTexture(char.archetype);
  }

  async loadFromSnapshotWithCanvas(snapshot: MapSnapshot, canvas: HTMLCanvasElement): Promise<void> {
    console.log('🧩 Chargement snapshot (canvas direct)...', snapshot.tiles.length, 'tuiles');

    await this.bootPixi(canvas);
    await this.prepareRenderer();

    this.seed = snapshot.seed ?? Date.now();
    this.randState = this.seed;
    this.noiseAltitude = createNoise2D(() => this.nextRand());
    this.noiseHumidity = createNoise2D(() => this.nextRand());

    this.overlayTypes = {};

    for (const tile of snapshot.tiles) {
      const { x, y } = this.hexToPixel(tile.q, tile.r);
      const tileContainer = createTile({
        x, y,
        size: this.size,
        terrain: tile.terrain ?? 'plain',
        container: this.renderer.container,
        textures: this.renderer.textures,
        onClick: () => this.movePlayer(tile.q, tile.r)
      });
      this.tiles[tile.key] = {
        gfx: tileContainer,
        terrain: tile.terrain,
        discovered: tile.discovered
      };
      const tileGfx = tileContainer as any;
      if (tileGfx.fog) tileGfx.fog.visible = !tile.discovered;
    }

    for (const o of snapshot.overlays ?? []) this.addOverlay(o.q, o.r, o.kind);

    this.createPlayer();
    this.renderer.centerCamera(this.playerPos.q, this.playerPos.r, this.size);    

    console.log(`✅ Map restored (${snapshot.tiles.length} tiles).`);
  }

  public getCurrentTile(): { q: number; r: number; terrain: Terrain } | null {
    const key = `${this.playerPos.q},${this.playerPos.r}`;
    const tileData = this.tiles[key];
    if (!tileData) return null;

    return {
      q: this.playerPos.q,
      r: this.playerPos.r,
      terrain: tileData.terrain,
    };
  }

}
