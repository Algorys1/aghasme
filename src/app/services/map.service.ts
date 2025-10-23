import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { createNoise2D } from 'simplex-noise';

import { createTile, Terrain } from '../factories/tile.factory';
import { OverlayKind, OVERLAY_COMPATIBILITY } from '../models/overlays.model';
import { CharacterService } from './character.service';
import { RendererService } from './renderer.service';
import { Container, Sprite } from 'pixi.js';
import { OverlayRegistryService } from './overlay-registry.service';
import { OverlayFactory } from '../factories/overlay.factory';
import { EnemyFactory } from '../factories/enemy.factory';
import { CombatService } from './combat.service';
import { Enemy } from '../models/enemy.model';

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
}

@Injectable({ providedIn: 'root' })
export class MapService {
  private size = 80;

  private tiles: Record<string, { gfx: Container; terrain: Terrain; discovered: boolean, variant: string }> = {};
  private overlaySprites: Record<string, Sprite[]> = {};
  private overlayTypes: Record<string, OverlayKind[]> = {};

  private noiseAltitude = createNoise2D();
  private noiseHumidity = createNoise2D();
  private scaleAltitude = 0.05;
  private scaleHumidity = 0.05;
  private seed: number = Date.now();
  private randState = 1;

  private player!: Sprite;
  private playerPos = { q: 0, r: 0 };

  private mapRadius = 10;

  private activeOverlay: OverlayKind | null = null;
  overlayChange = new Subject<OverlayKind>();
  tileChange = new Subject<{ type: string; description?: string }>();
  playerMoved = new BehaviorSubject<{ q: number; r: number }>(this.playerPos);

  private encounterMeter = 0;
  private baseIncrease = 5;
  private baseThreshold = 30;
  private cooldown = 0;
  public startCombat$ = new Subject<Enemy>();

  constructor(
    private characterService: CharacterService,
    private renderer: RendererService,
    private overlayRegistry: OverlayRegistryService,
    private combatService: CombatService
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

  private nextRand(): number {
    this.randState = (this.randState * 48271) % 0x7fffffff;
    return this.randState / 0x7fffffff;
  }

  private generateTerrain(q: number, r: number): Terrain {
    const altRaw = this.noiseAltitude(q * this.scaleAltitude, r * this.scaleAltitude);
    const humRaw = this.noiseHumidity(q * this.scaleHumidity, r * this.scaleHumidity);

    const altitude = (altRaw + 1) / 2;
    const humidity = (humRaw + 1) / 2;

    if (altitude < 0.3) return 'sea';
    if (altitude > 0.9) return 'volcano';
    if (altitude > 0.7) return 'mountain';
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
    this.overlayRegistry.reset();

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

          this.tiles[`${q},${r}`] = {
            gfx: tile,
            terrain,
            discovered: false,
            variant: (tile as any).variantKey ?? `${terrain}-1`
          };
        }
      }
    }

    this.placeCivilizationOverlays();
    this.placeNarrativeOverlays();
    this.placePortals();
    this.logOverlayStats();
    this.overlayRegistry.getRemainingStockSummary();
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

  private placeNarrativeOverlays(): void {
    console.group('🌀 Phase narrative: placement des overlays fixes');

    const desired: Partial<Record<OverlayKind, number>> = {
      [OverlayKind.Ritual]: 4,
      [OverlayKind.Ruins]: 5,
      [OverlayKind.Tower]: 3,
      [OverlayKind.Spirit]: 3,
      [OverlayKind.Shrine]: 3,
      [OverlayKind.Anomaly]: 4,
      [OverlayKind.Caravan]: 3,
      [OverlayKind.Wanderer]: 3,
      [OverlayKind.Treasure]: 3,
    };

    let totalPlaced = 0;

    for (const [kind, count] of Object.entries(desired)) {
      const typedKind = kind as OverlayKind;
      const table = OverlayFactory.getTable(typedKind);
      if (!table || table.length === 0) continue;

      let placed = 0;

      for (let i = 0; i < (count ?? 0); i++) {
        const id = this.overlayRegistry.getRandomAvailableId(typedKind);
        if (!id) continue;

        const template = table.find(t => t.id === id);
        const allowedTerrains =
          template?.allowedTerrains ?? OVERLAY_COMPATIBILITY[typedKind] ?? [];
        const minDist = template?.minDistance ?? 0;
        const maxCityDist = template?.maxDistanceFromCity ?? 0;

        const coords = this.findValidTileForOverlay(
          allowedTerrains,
          typedKind,
          minDist,
          maxCityDist
        );

        if (!coords) {
          console.warn(`⚠️ Aucune tuile valide pour ${typedKind}/${id}`);
          continue;
        }

        this.overlayRegistry.register(id, typedKind, coords);
        this.addOverlay(coords.q, coords.r, typedKind);
        placed++;
        totalPlaced++;
      }

      console.log(`✅ ${placed}/${count} overlays placés pour le type ${kind}`);
    }

    console.log(`🎯 ${totalPlaced} overlays narratifs placés au total.`);
    console.groupEnd();
  }

  private placeCivilizationOverlays(): void {
    console.group('🏙️ Phase civilisation: placement des villes, villages et ressources');

    const factor = this.mapRadius / 10;
    const desired: Partial<Record<OverlayKind, number>> = {
      [OverlayKind.City]: Math.round(3 * factor),
      [OverlayKind.Village]: Math.round(7 * factor),
      [OverlayKind.Farm]: Math.round(10 * factor),
      [OverlayKind.Mine]: Math.round(5 * factor),
      [OverlayKind.Forest]: Math.round(7 * factor),
    };

    // CITIES
    this.placeOverlayType(OverlayKind.City, desired[OverlayKind.City] ?? 0, ['plain', 'desert'], 7);

    // VILLAGES & FARMS
    this.placeOverlayType(OverlayKind.Village, desired[OverlayKind.Village] ?? 0, ['plain', 'forest', 'jungle'], 3, 5, true);
    this.placeOverlayType(OverlayKind.Farm, desired[OverlayKind.Farm] ?? 0, ['plain', 'jungle'], 2, 5, true);

    // MINES & FORESTS
    this.placeOverlayType(OverlayKind.Mine, desired[OverlayKind.Mine] ?? 0, ['mountain', 'plain'], 4);
    this.placeOverlayType(OverlayKind.Forest, desired[OverlayKind.Forest] ?? 0, ['forest', 'jungle'], 0);

    console.groupEnd();
  }

  private hasAnyCity(): boolean {
    return Object.values(this.overlayTypes).some(kinds => kinds.includes(OverlayKind.City));
  }

  private placeOverlayType(
    kind: OverlayKind,
    count: number,
    terrains: string[],
    minDistance: number,
    maxDistanceFromCity?: number,
    nearCities: boolean = false
  ): void {
    let placed = 0;
    const allKeys = Object.keys(this.tiles).sort(() => Math.random() - 0.5);

    for (const key of allKeys) {
      if (placed >= count) break;
      const [q, r] = key.split(',').map(Number);
      const tile = this.tiles[key];
      if (!tile || !terrains.includes(tile.terrain)) continue;

      const hasOverlay = this.overlayTypes[key]?.length;
      if (hasOverlay) continue;

      if (maxDistanceFromCity && maxDistanceFromCity > 0 && !this.hasAnyCity() && nearCities) continue;
      if (minDistance > 0 && !this.isFarEnoughFromSameType(q, r, kind, minDistance)) continue;
      if (nearCities && maxDistanceFromCity && !this.isCloseEnoughToCity(q, r, maxDistanceFromCity)) continue;
      if (!nearCities && maxDistanceFromCity && this.isCloseEnoughToCity(q, r, maxDistanceFromCity)) continue;

      const id = this.overlayRegistry.getRandomAvailableId(kind);
      if (!id) continue;

      this.overlayRegistry.register(id, kind, { q, r });
      this.addOverlay(q, r, kind);
      placed++;
    }

    console.log(`✅ ${placed}/${count} ${kind} placés`);
  }

  private findValidTileForOverlay(
    allowedTerrains: string[],
    kind: OverlayKind,
    minDistance: number,
    maxDistanceFromCity: number
  ): { q: number; r: number } | null {
    const allKeys = Object.keys(this.tiles);
    const shuffled = allKeys.sort(() => Math.random() - 0.5);

    for (const key of shuffled) {
      const [q, r] = key.split(',').map(Number);
      const tile = this.tiles[key];
      if (!tile) continue;

      if (allowedTerrains.length && !allowedTerrains.includes(tile.terrain)) continue;

      const hasOverlay = this.overlayTypes[key]?.length;
      if (hasOverlay) continue;

      if (minDistance > 0 && !this.isFarEnoughFromSameType(q, r, kind, minDistance)) continue;

      if (maxDistanceFromCity > 0 && !this.isCloseEnoughToCity(q, r, maxDistanceFromCity)) continue;

      return { q, r };
    }

    return null;
  }

  private isFarEnoughFromSameType(
    q: number,
    r: number,
    kind: OverlayKind,
    minDist: number
  ): boolean {
    for (const [key, kinds] of Object.entries(this.overlayTypes)) {
      if (kinds.includes(kind)) {
        const [oq, orr] = key.split(',').map(Number);
        const dist = this.hexDistance({ q, r }, { q: oq, r: orr });
        if (dist < minDist) return false;
      }
    }
    return true;
  }

  private isCloseEnoughToCity(q: number, r: number, maxDist: number): boolean {
    for (const [key, kinds] of Object.entries(this.overlayTypes)) {
      if (kinds.includes(OverlayKind.City)) {
        const [cq, cr] = key.split(',').map(Number);
        const dist = this.hexDistance({ q, r }, { q: cq, r: cr });
        if (dist <= maxDist) return true;
      }
    }
    return false;
  }

private placePortals(): void {
  console.group('🌀 Phase Portals: place portals');

  const desiredCount = 4;
  let placed = 0;

  // Terrains compatibles
  const validTerrains: Terrain[] = ['plain', 'desert', 'mountain', 'forest', 'jungle'];

  const allKeys = Object.keys(this.tiles).sort(() => Math.random() - 0.5);

  for (const key of allKeys) {
    if (placed >= desiredCount) break;

    const [q, r] = key.split(',').map(Number);
    const tile = this.tiles[key];
    if (!tile || !validTerrains.includes(tile.terrain)) continue;

    const hasOverlay = this.overlayTypes[key]?.length;
    if (hasOverlay) continue;

    const minPortalDistance = 6;
    if (!this.isFarEnoughFromSameType(q, r, OverlayKind.Portal, minPortalDistance)) continue;

    const id = this.overlayRegistry.getRandomAvailableId(OverlayKind.Portal);
    if (!id) continue;

    this.overlayRegistry.register(id, OverlayKind.Portal, { q, r });
    this.addOverlay(q, r, OverlayKind.Portal);

    placed++;
  }

  console.log(`✅ ${placed}/${desiredCount} Portals placed.`);
  console.groupEnd();
}
  checkForEncounter() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }

    this.encounterMeter += this.baseIncrease;
    let terrain = this.getCurrentTile()?.terrain;
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

    this.combatService.startCombat(enemy);
    this.startCombat$.next(enemy);
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

    return {
      version: 1,
      size: this.mapRadius,
      seed: this.seed,
      player: { ...this.playerPos },
      overlays,
      tiles,
      overlayRegistry: overlayRegistryData
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
      case 'sea': return "Water, water as far as the eye can see. You're starting to miss land.";
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
        onClick: () => this.movePlayer(tile.q, tile.r),
        variantKey
      });

      this.tiles[tile.key] = {
        gfx: tileContainer,
        terrain: tile.terrain,
        discovered: tile.discovered,
        variant: variantKey
      };

      const tileGfx = tileContainer as any;
      if (tileGfx.fog) tileGfx.fog.visible = !tile.discovered;
    }

    if (snapshot.overlayRegistry?.length) {
      this.overlayRegistry.deserialize(
        snapshot.overlayRegistry.map(e => ({
          id: e.id,
          kind: e.kind,
          coords: { q: e.q, r: e.r },
        }))
      );
      console.log(`💾 OverlayRegistry restauré (${snapshot.overlayRegistry.length} entrées).`);
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

  public getPlayerPosition(): {q:number, r:number} {
    return this.playerPos;
  }
}
