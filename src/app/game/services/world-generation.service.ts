import { Injectable } from '@angular/core';
import { Terrain } from '../factories/tile.factory';
import { OverlayRegistryService } from '../../overlays/services/overlay-registry.service';
import { OverlayKind, OverlayTemplate, OVERLAY_COMPATIBILITY } from '../../overlays/models/overlays.model';
import { OverlayFactory } from '../../overlays/factories/overlay.factory';
import { hexDistance } from '../utils/hex.utils';

export interface WorldGenContext {
  tiles: Record<string, { terrain: Terrain }>;
  overlayTypes: Record<string, OverlayKind[]>;
  registry: OverlayRegistryService;
  addOverlay(q: number, r: number, kind: OverlayKind): void;
  mapRadius: number;

  // helpers
  getTile(q: number, r: number): { terrain: Terrain } | undefined;
  neighbors(q: number, r: number): Array<{ q: number; r: number }>;
}

@Injectable({ providedIn: 'root' })
export class WorldGenerationService {

  generate(ctx: WorldGenContext): void {
    console.group('🌍 WORLD GENERATION PIPELINE');

    this.placeCitiesAnchored(ctx);
    this.placeCivilizationOverlays(ctx);
    this.placeNarrativeOverlays(ctx);
    this.placePortals(ctx);

    console.groupEnd();
  }

  // ------------------------------------------------------------
  // 1. CITIES
  // ------------------------------------------------------------
  private placeCitiesAnchored(ctx: WorldGenContext): void {
    console.group('🏙️ Anchor cities');

    const cityTemplates = OverlayFactory.getTable(OverlayKind.City) ?? [];

    type CityDef = {
      id: string;
      allowedTerrains: Terrain[];
      requireAdjSea: boolean;
      minCityDistance: number;
    };

    const defs: CityDef[] = cityTemplates.map((t: OverlayTemplate) => ({
      id: t.id,
      allowedTerrains: (t.allowedTerrains as Terrain[]) ?? ['plain'],
      requireAdjSea: t.requireAdjSea ?? false,
      minCityDistance: t.minCityDistance ?? 8,
    }));

    const placed: { id: string; q: number; r: number }[] = [];

    for (const def of defs) {
      if (ctx.registry.getById(def.id)) continue;

      const candidates: Array<{ q: number; r: number }> = [];

      for (const key of Object.keys(ctx.tiles)) {
        const [q, r] = key.split(',').map(Number);
        const tile = ctx.tiles[key];
        if (!tile) continue;

        if (!def.allowedTerrains.includes(tile.terrain)) continue;

        if (def.requireAdjSea) {
          const hasSea = ctx.neighbors(q, r).some(n => ctx.getTile(n.q, n.r)?.terrain === 'sea');
          if (!hasSea) continue;
        }

        const tooClose = placed.some(c => hexDistance(c, { q, r }) < def.minCityDistance);
        if (tooClose) continue;

        candidates.push({ q, r });
      }

      if (!candidates.length) {
        console.warn(`⚠️ No valid position for city ${def.id}`);
        continue;
      }

      const pos = candidates[Math.floor(Math.random() * candidates.length)];

      ctx.registry.register(def.id, OverlayKind.City, pos);
      ctx.addOverlay(pos.q, pos.r, OverlayKind.City);
      placed.push({ id: def.id, ...pos });

      console.log(`✔ City ${def.id} placed at (${pos.q},${pos.r})`);
    }

    console.groupEnd();
  }

  // ------------------------------------------------------------
  // 2. CIVILIZATION
  // ------------------------------------------------------------
  private placeCivilizationOverlays(ctx: WorldGenContext): void {
    console.group('🏡 Secondary civilization');

    const allCities = this.getAllCities(ctx);

    const desired: Partial<Record<OverlayKind, number>> = {
      [OverlayKind.Village]: 12,
      [OverlayKind.Farm]: 16,
      [OverlayKind.Mine]: 6,
      [OverlayKind.Forest]: 8,
    };

    // Villages
    for (const city of allCities) {
      this.placeNearCity(ctx, city, OverlayKind.Village, ['plain','forest'], 3, 6,
        Math.ceil((desired[OverlayKind.Village] ?? 0) / allCities.length));
    }

    // Farms
    for (const city of allCities) {
      this.placeNearCity(ctx, city, OverlayKind.Farm, ['plain'], 2, 5,
        Math.ceil((desired[OverlayKind.Farm] ?? 0) / allCities.length));
    }

    // Mines
    const mineCities = allCities.filter(c => ['ironvale','aghasme','mechanica'].includes(c.id));
    for (const city of mineCities) {
      this.placeNearCity(ctx, city, OverlayKind.Mine, ['mountain','plain','desert'], 4, 8,
        Math.ceil((desired[OverlayKind.Mine] ?? 0) / mineCities.length));
    }

    // Forest
    const forestCities = allCities.filter(c => ['rivertown','highwall'].includes(c.id));
    for (const city of forestCities) {
      this.placeNearCity(ctx, city, OverlayKind.Forest, ['forest','jungle'], 4, 8,
        Math.ceil((desired[OverlayKind.Forest] ?? 0) / forestCities.length));
    }

    console.groupEnd();
  }

  private placeNearCity(
    ctx: WorldGenContext,
    city: { id: string; q: number; r: number },
    kind: OverlayKind,
    allowedTerrains: Terrain[],
    minDist: number,
    maxDist: number,
    count: number
  ) {
    let placed = 0;

    const shuffled = Object.keys(ctx.tiles).sort(() => Math.random() - 0.5);

    for (const key of shuffled) {
      if (placed >= count) break;

      const [q, r] = key.split(',').map(Number);
      const tile = ctx.tiles[key];
      if (!tile || !allowedTerrains.includes(tile.terrain)) continue;

      const dist = hexDistance({ q, r }, city);
      if (dist < minDist || dist > maxDist) continue;

      if (ctx.overlayTypes[key]?.length) continue;

      // same-type spacing rules
      if (!this.isFarEnoughFromSameType(ctx, q, r, kind, 2)) continue;

      // farms need town or village nearby
      if (kind === OverlayKind.Farm) {
        const nearVillage = this.isNearKind(ctx, q, r, OverlayKind.Village, 3);
        const nearCity = this.isNearKind(ctx, q, r, OverlayKind.City, 3);
        if (!nearCity && !nearVillage) continue;
      }

      const id = ctx.registry.getRandomAvailableId(kind);
      if (!id) continue;

      ctx.registry.register(id, kind, { q, r });
      ctx.addOverlay(q, r, kind);
      placed++;
    }

    console.log(`✔ ${placed}/${count} ${kind} near ${city.id}`);
  }

  private getAllCities(ctx: WorldGenContext) {
    const cities: Array<{ id: string; q: number; r: number }> = [];

    for (const [id, data] of (ctx.registry as any).assigned.entries()) {
      if (data.kind === OverlayKind.City) cities.push({ id, ...data.coords });
    }

    return cities;
  }

  private isNearKind(
    ctx: WorldGenContext,
    q: number,
    r: number,
    kind: OverlayKind,
    maxDist: number
  ): boolean {
    for (const [key, arr] of Object.entries(ctx.overlayTypes)) {
      if (!arr.includes(kind)) continue;
      const [oq, orr] = key.split(',').map(Number);
      if (hexDistance({ q, r }, { q: oq, r: orr }) <= maxDist) return true;
    }
    return false;
  }

  private isFarEnoughFromSameType(
    ctx: WorldGenContext,
    q: number,
    r: number,
    kind: OverlayKind,
    minDist: number
  ): boolean {
    for (const [key, arr] of Object.entries(ctx.overlayTypes)) {
      if (!arr.includes(kind)) continue;

      const [oq, orr] = key.split(',').map(Number);
      if (hexDistance({ q, r }, { q: oq, r: orr }) < minDist) return false;
    }

    return true;
  }

  // ------------------------------------------------------------
  // 3. NARRATIVE
  // ------------------------------------------------------------
  private placeNarrativeOverlays(ctx: WorldGenContext): void {
    console.group('📖 Narrative overlays');

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

    for (const [kind, count] of Object.entries(desired)) {
      const typed = kind as OverlayKind;
      const table = OverlayFactory.getTable(typed);
      if (!table) continue;

      for (let i = 0; i < (count ?? 0); i++) {
        const id = ctx.registry.getRandomAvailableId(typed);
        if (!id) continue;

        const template = table.find(t => t.id === id);
        const terrains = template?.allowedTerrains ?? OVERLAY_COMPATIBILITY[typed] ?? [];
        const minDist = template?.minDistance ?? 0;

        const pos = this.findValidTileForNarrative(ctx, terrains, typed, minDist);
        if (!pos) continue;

        ctx.registry.register(id, typed, pos);
        ctx.addOverlay(pos.q, pos.r, typed);
      }
    }

    console.groupEnd();
  }

  private findValidTileForNarrative(
    ctx: WorldGenContext,
    allowed: Terrain[],
    kind: OverlayKind,
    minDist: number
  ): { q: number; r: number } | null {

    const shuffled = Object.keys(ctx.tiles).sort(() => Math.random() - 0.5);

    for (const key of shuffled) {
      const [q, r] = key.split(',').map(Number);
      const tile = ctx.tiles[key];
      if (!tile) continue;

      if (!allowed.includes(tile.terrain)) continue;
      if (ctx.overlayTypes[key]?.length) continue;

      // DENSITY CHECK
      const densityCfg = this.getNarrativeDensityConfig(kind);
      if (densityCfg) {
        const density = this.getOverlayDensityAround(ctx, q, r, densityCfg.radius);
        if (density >= densityCfg.max) continue;
      }

      // SAME TYPE SPACING
      if (!this.isFarEnoughFromSameType(ctx, q, r, kind, minDist)) continue;

      return { q, r };
    }

    return null;
  }

  private getOverlayDensityAround(
    ctx: WorldGenContext,
    q: number,
    r: number,
    radius: number
  ): number {
    let count = 0;

    for (const [key, arr] of Object.entries(ctx.overlayTypes)) {
      if (!arr.length) continue;

      const [oq, orr] = key.split(',').map(Number);
      if (hexDistance({ q, r }, { q: oq, r: orr }) <= radius) count++;
    }

    return count;
  }

  private getNarrativeDensityConfig(kind: OverlayKind): { radius: number; max: number } | null {
    switch (kind) {
      case OverlayKind.Ruins: return { radius: 3, max: 2 };
      case OverlayKind.Tower: return { radius: 3, max: 2 };
      case OverlayKind.Shrine: return { radius: 2, max: 3 };
      case OverlayKind.Spirit: return { radius: 2, max: 3 };
      case OverlayKind.Anomaly: return { radius: 3, max: 2 };
      case OverlayKind.Caravan: return { radius: 2, max: 4 };
      case OverlayKind.Wanderer: return { radius: 2, max: 4 };
      case OverlayKind.Treasure: return { radius: 2, max: 2 };
      case OverlayKind.Ritual: return { radius: 3, max: 2 };
      default: return null;
    }
  }

  // ------------------------------------------------------------
  // 4. PORTALS
  // ------------------------------------------------------------
  private placePortals(ctx: WorldGenContext): void {
    console.group('🌀 Portals');

    const desired = 4;
    let placed = 0;

    const valid: Terrain[] = ['plain','desert','mountain','forest','jungle','swamp'];
    const allCities = this.getAllCities(ctx);

    const cityPositions = allCities.map(c => ({ q: c.q, r: c.r }));

    const keys = Object.keys(ctx.tiles).sort((a,b) => {
      const [qa, ra] = a.split(',').map(Number);
      const [qb, rb] = b.split(',').map(Number);
      const da = this.minDistanceToAny({ q: qa, r: ra }, cityPositions);
      const db = this.minDistanceToAny({ q: qb, r: rb }, cityPositions);
      return db - da;
    });

    const placedPos: Array<{ q: number; r: number }> = [];

    for (const key of keys) {
      if (placed >= desired) break;

      const [q, r] = key.split(',').map(Number);
      const tile = ctx.tiles[key];
      if (!tile || !valid.includes(tile.terrain)) continue;
      if (ctx.overlayTypes[key]?.length) continue;

      if (!this.isFarEnoughFromAnyCity(ctx, q, r, 10)) continue;

      if (!placedPos.every(pos => hexDistance(pos, { q, r }) >= 6)) continue;

      const id = ctx.registry.getRandomAvailableId(OverlayKind.Portal);
      if (!id) continue;

      ctx.registry.register(id, OverlayKind.Portal, { q, r });
      ctx.addOverlay(q, r, OverlayKind.Portal);
      placedPos.push({ q, r });
      placed++;
    }

    console.groupEnd();
  }

  private minDistanceToAny(p: { q: number; r: number }, targets: Array<{ q: number; r: number }>) {
    let best = Infinity;
    for (const t of targets) best = Math.min(best, hexDistance(p, t));
    return best;
  }

  private isFarEnoughFromAnyCity(
    ctx: WorldGenContext,
    q: number,
    r: number,
    dist: number
  ): boolean {
    for (const [key, arr] of Object.entries(ctx.overlayTypes)) {
      if (!arr.includes(OverlayKind.City)) continue;

      const [cq, cr] = key.split(',').map(Number);
      if (hexDistance({ q, r }, { q: cq, r: cr }) < dist) return false;
    }
    return true;
  }
}
