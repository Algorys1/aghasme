import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { createNoise2D } from 'simplex-noise';
import { Application, Container, Sprite, Assets, Texture } from 'pixi.js';

import { createTile, Terrain } from '../factories/tile.factory';
import { OverlayKind } from '../models/overlay-types';
import { overlayPools } from '../models/overlay-pools';
import { CHARACTER_ASSETS } from '../models/characters-assets';
import { CharacterService } from './character.service';

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
  private app!: Application;
  private mapContainer!: Container;
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

  // --- Assets ---
  private textures: Record<string, Texture> = {} as any;
  private iconTextures: Record<string, Texture> = {} as any;

  // --- State / Events ---
  private mapRadius = 4;
  private activeOverlay: OverlayKind | null = null;
  overlayChange = new Subject<OverlayKind>();
  tileChange = new Subject<{ type: string; description?: string }>();
  playerMoved = new Subject<{ q: number; r: number }>();

  constructor(private characterService: CharacterService) {}

  // === INIT / GENERATION ==========================================================
  async initMap(canvasId: string, mapRadius: number, seed?: number): Promise<void> {
    if (this.app) {
      console.log('🧹 Destruction ancienne instance Pixi');
      this.app.destroy(true, { children: true, texture: false, context: true });
      this.app = undefined as any;
    }

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
    await this.loadPlayerTexture();

    this.mapContainer = new Container();
    this.app.stage.addChild(this.mapContainer);
    this.mapRadius = mapRadius;

    this.seed = seed ?? Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    this.randState = this.seed;
    this.noiseAltitude = createNoise2D(() => this.nextRand());
    this.noiseHumidity = createNoise2D(() => this.nextRand());

    this.overlaySprites = {};
    this.overlayTypes = {};
    this.tiles = {};

    this.buildMap(mapRadius);
    this.createPlayer();

    this.centerCamera(false);
    this.updateVisibility();

    window.addEventListener('resize', () => this.centerCamera(false));
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
    if (altitude > 0.75) return 'mountain';
    if (humidity < 0.3) return 'desert';
    if (humidity < 0.6) return 'plain';
    if (humidity < 0.85) return 'forest';
    return 'jungle';
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
            container: this.mapContainer,
            textures: this.textures,
            onClick: () => this.movePlayer(q, r)
          });

          this.tiles[`${q},${r}`] = { gfx: tile, terrain, discovered: false };

          const overlay = this.pickOverlayForTerrain(terrain);
          if (overlay !== OverlayKind.None) this.addOverlay(q, r, overlay);
        }
      }
    }
  }

  // === TEXTURES & PLAYER ==========================================================
  private async loadTextures() {
    if (Object.keys(this.textures).length > 0) return; // déjà chargé

    const manifest = await fetch('assets/tiles/tiles.json').then(res => res.json());
    const textures: Record<string, Texture> = {};
    for (const [key, path] of Object.entries(manifest)) {
      textures[key] = await Assets.load(path as string);
    }
    this.textures = textures;
  }

  private async loadIconTextures() {
    if (Object.keys(this.iconTextures).length > 0) return; // déjà chargé

    this.iconTextures = {
      city: await Assets.load('assets/overlays/city.png'),
      village: await Assets.load('assets/overlays/village.png'),
      bandits: await Assets.load('assets/overlays/bandits.png')
    };
  }

  private async loadPlayerTexture() {
    const char = this.characterService.getCharacter();
    if (!char) throw new Error('Aucun personnage disponible pour charger la texture du joueur');

    const path = CHARACTER_ASSETS[char.archetype];
    if (!this.textures['player']) {
      this.textures['player'] = await Assets.load(path);
    }
  }

  private createPlayer() {
    this.player = new Sprite(this.textures['player']);
    this.player.anchor.set(0.5);
    this.player.width = this.size * 1.2;
    this.player.height = this.size * 1.2;
    this.mapContainer.addChild(this.player);
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
        this.centerCamera();
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

  private centerCamera(animated = false) {
    if (!this.mapContainer || !this.app) return;

    const { x, y } = this.hexToPixel(this.playerPos.q, this.playerPos.r);
    const targetX = this.app.screen.width / 2 - x;
    const targetY = this.app.screen.height / 2 - y;
    this.mapContainer.x = targetX;
    this.mapContainer.y = targetY;
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
    (this.overlaySprites[key] ||= []).push(s);
    (this.overlayTypes[key] ||= []).push(kind);
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

  public async loadFromSnapshot(snapshot: MapSnapshot): Promise<void> {
    console.log('🧩 Chargement snapshot...', snapshot.tiles.length, 'tuiles');

    // 🧹 Si une instance Pixi existe déjà, la détruire
    if (this.app) {
      console.log('🧹 Destruction ancienne instance Pixi avant rechargement');
      this.app.destroy(true, { children: true, texture: true, context: true });
      this.app = undefined as any;
    }

    // --- Recréation de l’app
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement | null;
    if (!canvas) throw new Error('Canvas introuvable !');

    this.app = new Application();
    await this.app.init({
      resizeTo: canvas.parentElement!,
      backgroundColor: 0x111111,
      canvas
    });

    // --- Recréation du container et reset complet
    this.mapContainer = new Container();
    this.app.stage.addChild(this.mapContainer);
    this.overlaySprites = {};
    this.overlayTypes = {};

    await this.loadTextures();
    await this.loadIconTextures();
    await this.loadPlayerTexture();

    this.seed = snapshot.seed ?? Date.now();
    this.randState = this.seed;
    this.noiseAltitude = createNoise2D(() => this.nextRand());
    this.noiseHumidity = createNoise2D(() => this.nextRand());
    this.tiles = {};

    for (const tile of snapshot.tiles) {
      const { x, y } = this.hexToPixel(tile.q, tile.r);
      const tileContainer = createTile({
        x,
        y,
        size: this.size,
        terrain: tile.terrain ?? 'plain',
        container: this.mapContainer,
        textures: this.textures,
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
    this.playerPos = snapshot.player ?? { q: 0, r: 0 };
    this.updatePlayerPosition();
    this.centerCamera(false);

    console.log(`✅ Carte restaurée (${snapshot.tiles.length} tuiles, ${snapshot.tiles.filter(t => t.discovered).length} découvertes).`);
  }

  // === TERRAIN DESCRIPTIONS ==========================================================
  private describeTerrain(terrain: Terrain): string {
    switch (terrain) {
      case 'plain': return 'A vast plain, punctuated here and there with stones and emerging trees.';
      case 'forest': return 'A dense, yet warm forest. You can hear animals slithering through the flora.';
      case 'desert': return "You're dying of heat in this desert, but where's the next watering hole?";
      case 'mountain': return 'These mountains are endless! The wind whistling in your ears will drive you crazy...';
      case 'jungle': return 'This jungle is impenetrable and your feet are soaking wet! The mosquitoes don’t help either.';
      case 'water': return "Water, water as far as the eye can see. You're starting to miss land.";
      default: return 'Unknown lands';
    }
  }
}
