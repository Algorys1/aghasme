import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { createNoise2D } from 'simplex-noise';

import { createTile, Terrain, TileContainer } from '../factories/tile.factory';
import { OverlayKind } from '../../overlays/models/overlays.model';
import { CharacterService } from '../../character/services/character.service';
import { RendererService } from './renderer.service';
import { WorldGenerationService } from './world-generation.service';
import { Container, Sprite } from 'pixi.js';
import { OverlayRegistryService } from '../../overlays/services/overlay-registry.service';
import { EnemyFactory } from '../../combat/factories/enemy.factory';
import { CombatService } from '../../combat/services/combat.service';
import { hexKey, hexNeighborsInBounds } from '../utils/hex.utils';
import { OverlayFactory } from '../../overlays/factories/overlay.factory';
import { RegionService, RegionTile, CityRegionSeed, RegionsSaveData } from './region.service';
import { ClusterService } from './cluster.service';

export interface MapTileSnapshot {
  key: string;
  q: number;
  r: number;
  terrain: Terrain;
  discovered: boolean;
  overlay?: OverlayKind | null;
  variant?: string
}

export interface MapSnapshot {
  version: 1;
  size: number;
  seed: number;
  player: { q: number; r: number };
  overlays: { q: number; r: number; kind: OverlayKind }[];
  tiles: MapTileSnapshot[];
  overlayRegistry: { id: string; kind: OverlayKind; q: number; r: number }[];
  regions: RegionsSaveData;
}

@Injectable({ providedIn: 'root' })
export class MapService {
  private size = 80;

  private tiles: Record<string, { gfx: TileContainer; terrain: Terrain; discovered: boolean; variant: string }> = {};
  private overlaySprites: Record<string, Sprite[]> = {};
  private overlayTypes: Record<string, OverlayKind[]> = {};

  private noiseAltitude = createNoise2D();
  private noiseHumidity = createNoise2D();
  private scaleAltitude = 0.10;
  private scaleHumidity = 0.17;
  private seed: number = Date.now();
  private randState = 1;

  private player!: Sprite;
  private playerPos = { q: 0, r: 0 };

  private mapRadius = 40;

  private activeOverlay: OverlayKind | null = null;
  overlayChange = new Subject<OverlayKind>();
  tileChange = new Subject<{ type: string; description?: string }>();
  private selectedTile: { q: number; r: number } | null = null;
  private selectedSprite: Container | null = null;
  playerMoved = new BehaviorSubject<{ q: number; r: number }>(this.playerPos);

  private encounterMeter = 0;
  private baseIncrease = 5;
  private baseThreshold = 30;
  private cooldown = 0;

  constructor(
    private characterService: CharacterService,
    private renderer: RendererService,
    private overlayRegistry: OverlayRegistryService,
    private combatService: CombatService,
    private worldGen: WorldGenerationService,
    private regionService: RegionService,
    private clusterService: ClusterService
  ) {}

  get overlays() {
    return this.overlayTypes;
  }

  get hasActiveOverlay(): boolean {
    return this.activeOverlay !== null && this.activeOverlay !== OverlayKind.None;
  }

  get currentOverlay(): OverlayKind | null {
    return this.activeOverlay;
  }

  get getRenderer() {
    return this.renderer;
  }

  // PRNG for noises
  private nextRand(): number {
    this.randState = (this.randState * 48271) % 0x7fffffff;
    return this.randState / 0x7fffffff;
  }

  // ---------- TERRAIN ----------
  private generateTerrain(q: number, r: number): Terrain {
    // Multi-octaves height + humidity
    const altRaw = this.fractalNoise2D(
      this.noiseAltitude,
      q * this.scaleAltitude,
      r * this.scaleAltitude,
      3,
      0.55,
      2.0
    );

    const humRaw = this.fractalNoise2D(
      this.noiseHumidity,
      q * this.scaleHumidity,
      r * this.scaleHumidity,
      3,
      0.50,
      2.0
    );

    const altitude = (altRaw + 1) / 2;
    const humidity = (humRaw + 1) / 2;

    // --- SEA (medium)
    if (altitude < 0.28) return "sea";

    // --- HIGH ALTITUDE biomes
    if (altitude > 0.78) return "volcano";     // small
    if (altitude > 0.72) return "mountain";    // large

    // --- MID ALTITUDE (depends on humidity)
    if (humidity < 0.32) return "desert";      // medium
    if (humidity < 0.50) return "plain";       // large
    if (humidity < 0.62) return "forest";      // large
    if (humidity < 0.72) return "jungle";      // small
    return "swamp";                            // small
  }

  private fractalNoise2D(
    noiseFn: (x: number, y: number) => number,
    x: number,
    y: number,
    octaves: number,
    persistence: number,
    lacunarity: number
  ) {
    let amplitude = 1;
    let frequency = 1;
    let value = 0;
    let maxAmplitude = 0;

    for (let i = 0; i < octaves; i++) {
      value += noiseFn(x * frequency, y * frequency) * amplitude;
      maxAmplitude += amplitude;

      amplitude *= persistence;   // controls weight of each octave
      frequency *= lacunarity;    // controls scale of next octave
    }

    return value / maxAmplitude;
  }


  private hexToPixel(q: number, r: number) {
    const x = this.size * Math.sqrt(3) * (q + r / 2);
    const y = this.size * 1.5 * r;
    return { x, y };
  }

  private smoothBiomes() {
    const newTerrains: Record<string, Terrain> = {};

    const dirs = [
      [1, 0], [1, -1], [0, -1],
      [-1, 0], [-1, 1], [0, 1]
    ];

    for (const key in this.tiles) {
      const entry = this.tiles[key];
      const [q, r] = key.split(',').map(Number);

      const counts: Record<Terrain, number> = {
        plain: 0,
        forest: 0,
        desert: 0,
        mountain: 0,
        volcano: 0,
        sea: 0,
        jungle: 0,
        swamp: 0
      };

      for (const [dq, dr] of dirs) {
        const nk = `${q + dq},${r + dr}`;
        const n = this.tiles[nk];
        if (!n) continue;
        counts[n.terrain] = (counts[n.terrain] || 0) + 1;
      }

      // Find dominant terran
      let dominant: Terrain = entry.terrain;
      let max = 0;
      for (const [t, c] of Object.entries(counts)) {
        if (c > max) {
          max = c;
          dominant = t as Terrain;
        }
      }

      // If 4 or less neighbors are the same, we put this type
      if (max >= 4 && dominant !== entry.terrain) {
        newTerrains[key] = dominant;
      } else {
        newTerrains[key] = entry.terrain;
      }
    }

    // Apply changes
    for (const key in newTerrains) {
      this.tiles[key].terrain = newTerrains[key];
    }
  }

  private buildMap(radius: number) {
    const N = radius;
    this.overlayRegistry.reset();

    // Generate all tiles (raw land)
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
            onClick: () => this.onTileClicked(q, r)
          });
          tile.lootIcon = this.renderer.createLootSprite(x, y, this.size);

          // At start all hidden, ready for flip
          tile.visible = false;
          tile.scale.x = 0;

          this.tiles[hexKey(q,r)] = {
            gfx: tile,
            terrain,
            discovered: false,
            variant: (tile as any).variantKey ?? `${terrain}-1`
          };
        }
      }
    }

    this.smoothBiomes();

    this.worldGen.generate({
      tiles: this.tiles,
      overlayTypes: this.overlayTypes,
      registry: this.overlayRegistry,
      addOverlay: this.addOverlay.bind(this),
      mapRadius: this.mapRadius,
      getTile: (q, r) => this.tiles[hexKey(q,r)],
      neighbors: (q, r) => hexNeighborsInBounds(q, r, this.mapRadius)
    });

    this.logOverlayStats();
    this.overlayRegistry.getRemainingStockSummary();

    // Generate City Regions
    const citySeeds = this.buildCityRegionSeeds();
    const regionTiles = this.buildRegionTilesArray();
    this.regionService.generateCityRegions(regionTiles, citySeeds);
    this.clusterService.generateNaturalRegions(regionTiles);
  }

  private createPlayer() {
    this.player = this.renderer.createPlayerSprite(this.size);
    this.updatePlayerPosition();
  }

  // PLAYER MOVEMENT / CAMERA
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

        const key = hexKey(q, r);
        const overlays = this.overlayTypes[key] || [];

        if (overlays.length > 0) {
          // On regarde si l'overlay à ces coords est autoTrigger ou non
          const entry = this.overlayRegistry.getByCoords(q, r);
          let autoTrigger = true;

          if (entry) {
            const table = OverlayFactory.getTable(entry.kind);
            const template = table?.find(t => t.id === entry.id);
            if (template && typeof template.autoTrigger === 'boolean') {
              autoTrigger = template.autoTrigger;
            }
          }

          if (autoTrigger) {
            this.activeOverlay = overlays[0];
            this.overlayChange.next(this.activeOverlay);
          } else {
            // Overlay présent mais optionnel → pas d'ouverture automatique
            this.activeOverlay = OverlayKind.None;
            this.overlayChange.next(this.activeOverlay);
          }
        } else {
          this.activeOverlay = OverlayKind.None;
          this.overlayChange.next(this.activeOverlay);
        }

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

  onTileClicked(q: number, r: number) {
    const mv = this.getCurrentMV();
    const player = this.playerPos;

    const dist = this.hexDistance(player.q, player.r, q, r);

    // Si trop loin
    if (dist > mv) {
      this.clearSelection();
      return;
    }

    // Si déjà sélectionnée → on confirme
    if (this.selectedTile?.q === q && this.selectedTile?.r === r) {
      this.movePlayer(q, r);
      this.clearSelection();
      return;
    }

    // Sinon → nouvelle sélection
    this.selectTile(q, r);
  }

  private hexDistance(q1: number, r1: number, q2: number, r2: number): number {
    const s1 = -q1 - r1;
    const s2 = -q2 - r2;
    return (Math.abs(q1 - q2) + Math.abs(r1 - r2) + Math.abs(s1 - s2)) / 2;
  }

  private selectTile(q: number, r: number) {
    this.clearSelection();

    const key = `${q},${r}`;
    const entry = this.tiles[key];
    if (!entry) return;

    const tile = entry.gfx;
    this.selectedTile = { q, r };
    this.selectedSprite = tile;

    // Elevate
    tile.y -= 8;
  }

  private clearSelection() {
    if (this.selectedSprite) {
      // restore heigh
      this.selectedSprite.y += 8;
    }

    this.selectedSprite = null;
    this.selectedTile = null;
  }

  private getCurrentMV(): number {
    const char = this.characterService.getCharacter();
    return char?.secondaryStats?.mv ?? 1;
  }

  // Local reveal : center + 6 neighbors */
  private updateVisibility() {
    const centerQ = this.playerPos.q;
    const centerR = this.playerPos.r;

    const coords = [
      { q: centerQ,     r: centerR     },
      { q: centerQ + 1, r: centerR     },
      { q: centerQ + 1, r: centerR - 1 },
      { q: centerQ,     r: centerR - 1 },
      { q: centerQ - 1, r: centerR     },
      { q: centerQ - 1, r: centerR + 1 },
      { q: centerQ,     r: centerR + 1 },
    ];

    for (const { q, r } of coords) {
      const key = hexKey(q, r);
      const tileData = this.tiles[key];
      if (!tileData) continue;

      const tile = tileData.gfx;

      if (!tileData.discovered) {
        tileData.discovered = true;

        tile.visible = true;
        tile.scale.x = 0;

        this.renderer.animateTileReveal(tile);
      } else {
        tile.visible = true;
      }
    }
  }

  // REGIONS
  // Construit les RegionTile à partir du record this.tiles
  private buildRegionTilesArray(): RegionTile[] {
    const result: RegionTile[] = [];
    for (const key of Object.keys(this.tiles)) {
      const entry = this.tiles[key];
      const [qs, rs] = key.split(',');
      result.push({
        key,
        q: Number(qs),
        r: Number(rs),
        terrain: entry.terrain,
      });
    }
    return result;
  }

  // Identifie les villes à partir de l'OverlayRegistry
  private buildCityRegionSeeds(): CityRegionSeed[] {
    const ids = [
      'aghasme',
      'rivertown',
      'eldergate',
      'highwall',
      'ironvale',
      'mechanica',
      'stormhold',
      'leafhaven',
    ];

    const seeds: CityRegionSeed[] = [];
    for (const id of ids) {
      const entry = this.overlayRegistry.getById(id);
      if (!entry) continue;
      const key = hexKey(entry.coords.q, entry.coords.r);
      seeds.push({ cityId: id, centerKey: key });
    }
    return seeds;
  }

  // OVERLAYS
  addOverlay(q: number, r: number, kind: OverlayKind) {
    const { x, y } = this.hexToPixel(q, r);
    const sprite = this.renderer.createOverlaySprite(kind, x, y, this.size);
    if (!sprite) return;

    const k = hexKey(q,r);
    (this.overlaySprites[k] ||= []).push(sprite);
    (this.overlayTypes[k] ||= []).push(kind);
  }

  private logOverlayStats(): void {
    const counts: Record<string, number> = {};
    for (const key in this.overlayTypes) {
      const kinds = this.overlayTypes[key];
      for (const kind of kinds) {
        counts[kind] = (counts[kind] || 0) + 1;
      }
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    console.groupCollapsed(`🧭 Overlay distribution (${total} total)`);
    for (const [kind, count] of Object.entries(counts)) {
      const pct = ((count / total) * 100).toFixed(1);
      console.log(`${kind}: ${count} (${pct}%)`);
    }
    console.groupEnd();
  }

  public getOptionalOverlayAtPlayer(): { id: string; kind: OverlayKind } | null {
    const current = this.getCurrentTile();
    if (!current) return null;

    const entry = this.overlayRegistry.getByCoords(current.q, current.r);
    if (!entry) return null;

    const table = OverlayFactory.getTable(entry.kind);
    const template = table?.find(t => t.id === entry.id);
    if (!template) return null;

    // Par défaut, autoTrigger = true si non défini
    const auto = typeof template.autoTrigger === 'boolean' ? template.autoTrigger : true;
    if (auto) return null;

    return { id: entry.id, kind: entry.kind };
  }

  public openOverlayAtCurrentTile(): void {
    const current = this.getCurrentTile();
    if (!current) return;

    const entry = this.overlayRegistry.getByCoords(current.q, current.r);
    if (!entry) return;

    this.activeOverlay = entry.kind;
    this.overlayChange.next(this.activeOverlay);
  }

  // ENCOUNTERS
  checkForEncounter() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }

    this.encounterMeter += this.baseIncrease;
    const terrain = this.getCurrentTile()?.terrain;
    if (!terrain) return;
    const terrainFactor = this.getTerrainRiskFactor(terrain);
    const roll = Math.random() * 100;

    if (roll < this.baseThreshold * terrainFactor + this.encounterMeter) {
      this.triggerRandomEncounter();
      this.encounterMeter = 0;
      this.cooldown = 2;
    }
  }

  private getTerrainRiskFactor(terrain: Terrain): number {
    switch (terrain) {
      case "forest":
      case "mountain":
        return 1.4;
      case "desert":
        return 1.2;
      case "plain":
        return 0.8;
      default:
        return 1.0;
    }
  }

  triggerRandomEncounter() {
    const terrain = this.getCurrentTile()?.terrain;
    if (!terrain) return;
    const char = this.characterService.getCharacter();
    if(!char) return;

    const playerLevel = char.level;
    const enemy = EnemyFactory.generate({ playerLevel, terrain });

    this.combatService.startPreCombat(enemy);
  }

  // SAVE / LOAD
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
        overlay: (entry as any).overlay ?? null,
        variant: (entry as any).variant ?? `${entry.terrain}-1`
      });
    }

    const overlays: { q: number; r: number; kind: OverlayKind }[] = [];
    for (const key in this.overlayTypes) {
      const [q, r] = key.split(',').map(Number);
      for (const kind of this.overlayTypes[key]) overlays.push({ q, r, kind });
    }

    const overlayRegistryData = this.overlayRegistry.serialize().map(entry => ({
      id: entry.id,
      kind: entry.kind,
      q: entry.coords.q,
      r: entry.coords.r,
    }));

    const regions = this.regionService.exportForSave();

    return {
      version: 1,
      size: this.mapRadius,
      seed: this.seed,
      player: { ...this.playerPos },
      overlays,
      tiles,
      overlayRegistry: overlayRegistryData,
      regions
    };
  }

  // TERRAIN DESCRIPTIONS
  private describeTerrain(terrain: Terrain): string {
    switch (terrain) {
      case 'plain': return 'A vast plain, punctuated here and there with stones and emerging trees.';
      case 'forest': return 'A dense, yet warm forest. You can hear animals slithering through the flora.';
      case 'desert': return "You're dying of heat in this desert, but where's the next watering hole?";
      case 'mountain': return 'These mountains are endless! The wind whistling in your ears will drive you crazy...';
      case 'volcano': return 'The heat keeps rising, rising, and rising... In the distance you hear the mountain rumbling. Better not hang around here!';
      case 'jungle': return 'This jungle is impenetrable and your feet are soaking wet! The mosquitoes don’t help either.';
      case 'swamp': return "These swamps make you feel nauseous... All you want to do is take a nice bath! The worst part is, there are creatures living here...";
      case 'sea': return "Water, water as far as the eye can see. You're starting to miss land.";
      default: return 'Unknown lands';
    }
  }

  // BOOT / INIT
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

  async initMapWithCanvas(canvas: HTMLCanvasElement): Promise<void> {
    await this.bootPixi(canvas);
    await this.prepareRenderer();

    this.seed = Math.floor(Math.random() * Date.now());
    this.randState = this.seed;
    this.noiseAltitude = createNoise2D(() => this.nextRand());
    this.noiseHumidity = createNoise2D(() => this.nextRand());

    this.overlaySprites = {};
    this.overlayTypes = {};
    this.tiles = {};

    this.buildMap(this.mapRadius);

    // Player
    if (this.characterService.consumeNewGameFlag()) {
      const rivertown = this.findRivertown();
      if (rivertown) {
        const adj = this.findAdjacentWalkableTile(rivertown.q, rivertown.r);
        if (adj) {
          console.log("🏙️ Spawn new game NEAR Rivertown:", adj);
          this.playerPos = adj;
        } else {
          this.playerPos = rivertown;
        }
      }
    }

    this.createPlayer();
    this.renderer.centerCamera(this.playerPos.q, this.playerPos.r, this.size);
    this.updateVisibility();
    window.addEventListener('resize', () => this.renderer.centerCamera());
  }

  private findRivertown(): { q: number; r: number } | null {
    const entry = this.overlayRegistry.getById("rivertown");
    return entry ? entry.coords : null;
  }

  private findAdjacentWalkableTile(q: number, r: number): { q: number; r: number } | null {
    const directions = [
      [1, 0], [1, -1], [0, -1],
      [-1, 0], [-1, 1], [0, 1]
    ];

    for (const [dq, dr] of directions) {
      const nq = q + dq;
      const nr = r + dr;
      const key = `${nq},${nr}`;
      const tile = this.tiles[key];

      if (!tile) continue;

      // On évite la mer et le volcan
      if (tile.terrain === "plain")
        return { q: nq, r: nr };
      else
         continue;
    }

    return null;
  }

  private async prepareRenderer() {
    await this.renderer.loadTileTextures();
    await this.renderer.loadOverlayTextures();
    await this.renderer.loadLootTexture();

    const char = this.characterService.getCharacter();
    if (!char) throw new Error('No character found to load player texture');
    await this.renderer.loadPlayerTexture(char.gender, char.archetype);
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
      const variantKey = tile.variant ?? `${tile.terrain}-1`;

      const tileContainer = createTile({
        x, y,
        size: this.size,
        terrain: tile.terrain ?? 'plain',
        container: this.renderer.container,
        textures: this.renderer.textures,
        onClick: () => this.onTileClicked(tile.q, tile.r),
        variantKey
      });
      tileContainer.lootIcon = this.renderer.createLootSprite(x, y, this.size);

      this.tiles[tile.key] = {
        gfx: tileContainer,
        terrain: tile.terrain,
        discovered: tile.discovered,
        variant: variantKey
      };

      tileContainer.visible = tile.discovered;
      tileContainer.scale.x = tile.discovered ? 1 : 0;
    }

    // Restore player position BEFORE creating sprite
    if (snapshot.player) {
      this.playerPos = { q: snapshot.player.q, r: snapshot.player.r };
      console.log(`📍 Player restored to (${this.playerPos.q}, ${this.playerPos.r})`);
    }

    if (snapshot.overlayRegistry?.length) {
      this.overlayRegistry.deserialize(
        snapshot.overlayRegistry.map(e => ({
          id: e.id,
          kind: e.kind,
          coords: { q: e.q, r: e.r },
        }))
      );
      console.log(`💾 OverlayRegistry restored (${snapshot.overlayRegistry.length} entrées).`);
    }

    for (const o of snapshot.overlays ?? []) this.addOverlay(o.q, o.r, o.kind);

    this.regionService.importFromSave(snapshot.regions);
    console.log(`🧭 Regions restored (${snapshot.regions.regions.length} regions).`);

    this.createPlayer();
    this.renderer.centerCamera(this.playerPos.q, this.playerPos.r, this.size);

    this.updateVisibility();

    console.log(`✅ Map restored (${snapshot.tiles.length} tiles).`);
  }

  public getCurrentTile(): { q: number; r: number; terrain: Terrain } | null {
    const key = hexKey(this.playerPos.q, this.playerPos.r);
    const tileData = this.tiles[key];
    if (!tileData) return null;

    return {
      q: this.playerPos.q,
      r: this.playerPos.r,
      terrain: tileData.terrain,
    };
  }

  public getPlayerPosition(): {q:number, r:number} {
    return this.playerPos;
  }
}
