import { Injectable } from '@angular/core';
import { Terrain } from '../factories/tile.factory';
import { OverlayRegistryService } from '../../overlays/services/overlay-registry.service';
import { OverlayKind, OverlayTemplate, OVERLAY_COMPATIBILITY } from '../../overlays/models/overlays.model';
import { OverlayFactory } from '../../overlays/factories/overlay.factory';
import { hexDistance } from '../utils/hex.utils';

import { RITUAL_TABLE } from '../../overlays/tables/ritual-table';
import { RUINS_TABLE } from '../../overlays/tables/ruins-table';
import { TOWER_TABLE } from '../../overlays/tables/tower-table';
import { SPIRIT_TABLE } from '../../overlays/tables/spirit-table';
import { SHRINE_TABLE } from '../../overlays/tables/shrine-table';
import { ANOMALY_TABLE } from '../../overlays/tables/anomaly-table';
import { CARAVAN_TABLE } from '../../overlays/tables/caravan-table';
import { WANDERER_TABLE } from '../../overlays/tables/wanderer-table';
import { TREASURE_TABLE } from '../../overlays/tables/treasure-table';

import { VILLAGE_TABLE } from '../../overlays/tables/village-table';
import { FARM_TABLE } from '../../overlays/tables/farm-table';
import { MINE_TABLE } from '../../overlays/tables/mine-table';
import { FOREST_TABLE } from '../../overlays/tables/forest-table';


export interface WorldGenContext {
  tiles: Record<string, { terrain: Terrain }>;
  overlayTypes: Record<string, OverlayKind[]>;
  registry: OverlayRegistryService;
  addOverlay(q: number, r: number, kind: OverlayKind): void;
  mapRadius: number;

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

    type CityCfg = {
      id: string;
      allowedTerrains: Terrain[];
      requireAdjSea: boolean;
      minCityDistance: number;
    };

    const cityDefs: CityCfg[] = cityTemplates.map(t => ({
      id: t.id,
      allowedTerrains: t.allowedTerrains ?? ['plain'],
      requireAdjSea: t.requireAdjSea ?? false,
      minCityDistance: t.minCityDistance ?? 8,
    }));

    const placed: { id: string; q: number; r: number }[] = [];

    const findCityPosition = (
      def: CityCfg,
      placedSoFar: { id: string; q: number; r: number }[]
    ): { q: number; r: number } | null => {

      type Pass = {
        label: string;
        relaxDistance: boolean;
        relaxSea: boolean;
      };

      const passes: Pass[] = [
        { label: 'strict (terrain + sea + distance)', relaxDistance: false, relaxSea: false },
        { label: 'relaxed distance (terrain + sea)',  relaxDistance: true,  relaxSea: false },
        { label: 'relaxed sea (terrain + distance)',  relaxDistance: false, relaxSea: true },
        { label: 'fallback (only terrain)',           relaxDistance: true,  relaxSea: true },
      ];

      for (const pass of passes) {
        const candidates: Array<{ q: number; r: number }> = [];

        for (const key of Object.keys(ctx.tiles)) {
          const [q, r] = key.split(',').map(Number);
          const tile = ctx.tiles[key];
          if (!tile) continue;

          if (!def.allowedTerrains.includes(tile.terrain)) continue;

          if (def.requireAdjSea && !pass.relaxSea) {
            const hasSea = ctx.neighbors(q, r).some(n => ctx.getTile(n.q, n.r)?.terrain === 'sea');
            if (!hasSea) continue;
          }

          if (!pass.relaxDistance) {
            const tooClose = placedSoFar.some(c => hexDistance(c, { q, r }) < def.minCityDistance);
            if (tooClose) continue;
          }

          candidates.push({ q, r });
        }

        if (!candidates.length) {
          console.warn(`⚠️ City ${def.id}: no candidates for pass "${pass.label}".`);
          continue;
        }

        const pos = candidates[Math.floor(Math.random() * candidates.length)];
        console.log(`✔ City ${def.id} placed at (${pos.q},${pos.r}) using pass "${pass.label}".`);
        return pos;
      }

      return null;
    };

    for (const def of cityDefs) {
      const existing = ctx.registry.getById(def.id);
      if (existing) {
        placed.push({ id: def.id, q: existing.coords.q, r: existing.coords.r });
        console.log(`↺ City ${def.id} already registered at (${existing.coords.q},${existing.coords.r})`);
        continue;
      }

      const pos = findCityPosition(def, placed);
      if (!pos) {
        console.error(`❌ City ${def.id} could not be placed EVEN WITH FALLBACK.`);
        continue;
      }

      ctx.registry.register(def.id, OverlayKind.City, pos);
      ctx.addOverlay(pos.q, pos.r, OverlayKind.City);
      placed.push({ id: def.id, ...pos });
    }

    console.groupEnd();
  }

  // ------------------------------------------------------------
  // 2. CIVILIZATION — uses TABLES now
  // ------------------------------------------------------------
  private placeCivilizationOverlays(ctx: WorldGenContext): void {
    console.group('🏡 Secondary civilization');

    const allCities = this.getAllCities(ctx);

    // --- Villages
    for (const city of allCities) {
      const count = Math.ceil(VILLAGE_TABLE.length / allCities.length);
      this.placeUsingTemplates(ctx, city, OverlayKind.Village, VILLAGE_TABLE, count);
    }

    // --- Farms
    for (const city of allCities) {
      const count = Math.ceil(FARM_TABLE.length / allCities.length);
      this.placeUsingTemplates(ctx, city, OverlayKind.Farm, FARM_TABLE, count);
    }

    // --- Mines
    const mineCities = allCities.filter(c => ['ironvale','aghasme','mechanica'].includes(c.id));
    for (const city of mineCities) {
      const count = Math.ceil(MINE_TABLE.length / mineCities.length);
      this.placeUsingTemplates(ctx, city, OverlayKind.Mine, MINE_TABLE, count);
    }

    // --- Forests
    const forestCities = allCities.filter(c => ['rivertown','highwall'].includes(c.id));
    for (const city of forestCities) {
      const count = Math.ceil(FOREST_TABLE.length / forestCities.length);
      this.placeUsingTemplates(ctx, city, OverlayKind.Forest, FOREST_TABLE, count);
    }

    console.groupEnd();
  }


  // ------------------------------------------------------------
  // Generic placement based on templates (NO rename, NO change)
  // ------------------------------------------------------------
  private placeUsingTemplates(
    ctx: WorldGenContext,
    city: { id: string; q: number; r: number },
    kind: OverlayKind,
    templates: OverlayTemplate[],
    count: number
  ) {
    let placed = 0;
    const shuffledTiles = Object.keys(ctx.tiles).sort(() => Math.random() - 0.5);

    for (const tpl of templates) {
      if (placed >= count) break;

      const allowedTerrains = tpl.allowedTerrains ?? OVERLAY_COMPATIBILITY[kind] ?? [];
      const minDist = tpl.minDistance ?? 2;
      const maxDist = tpl.maxDistanceFromCity ?? 8;
      const requireAdjSea = tpl.requireAdjSea ?? false;

      for (const key of shuffledTiles) {
        const [q, r] = key.split(',').map(Number);
        const tile = ctx.tiles[key];
        if (!tile) continue;

        if (!allowedTerrains.includes(tile.terrain)) continue;

        const dist = hexDistance({ q, r }, city);
        if (dist < minDist || dist > maxDist) continue;

        if (requireAdjSea) {
          const hasSea = ctx.neighbors(q, r).some(n => ctx.getTile(n.q, n.r)?.terrain === 'sea');
          if (!hasSea) continue;
        }

        if (ctx.overlayTypes[key]?.length) continue;

        if (!this.isFarEnoughFromSameType(ctx, q, r, kind, minDist)) continue;

        const id = ctx.registry.getRandomAvailableId(kind);
        if (!id) continue;

        ctx.registry.register(id, kind, { q, r });
        ctx.addOverlay(q, r, kind);
        placed++;
        break;
      }
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

    const narrativeTables: Partial<Record<OverlayKind, OverlayTemplate[]>> = {
      [OverlayKind.Ritual]: RITUAL_TABLE,
      [OverlayKind.Ruins]: RUINS_TABLE,
      [OverlayKind.Tower]: TOWER_TABLE,
      [OverlayKind.Spirit]: SPIRIT_TABLE,
      [OverlayKind.Shrine]: SHRINE_TABLE,
      [OverlayKind.Anomaly]: ANOMALY_TABLE,
      [OverlayKind.Caravan]: CARAVAN_TABLE,
      [OverlayKind.Wanderer]: WANDERER_TABLE,
      [OverlayKind.Treasure]: TREASURE_TABLE,
    };

    for (const [kind, table] of Object.entries(narrativeTables) as [OverlayKind, OverlayTemplate[]][]) {

      for (const tpl of table) {
        const terrains = tpl.allowedTerrains;
        const minDist = tpl.minDistance ?? 2;
        const requireAdjSea = tpl.requireAdjSea ?? false;

        const pos = this.findValidTileForNarrative(ctx, terrains, kind, minDist, requireAdjSea);
        if (!pos) {
          console.warn(`⚠ No valid placement for narrative ${kind}:${tpl.id}`);
          continue;
        }

        ctx.registry.register(tpl.id, kind, pos);
        ctx.addOverlay(pos.q, pos.r, kind);
        console.log(`✔ Placed ${kind}:${tpl.id} at (${pos.q},${pos.r})`);
      }
    }
    console.groupEnd();
  }

  private findValidTileForNarrative(
    ctx: WorldGenContext,
    allowed: Terrain[],
    kind: OverlayKind,
    minDist: number,
    requireAdjSea: boolean
  ): { q: number; r: number } | null {

    const shuffled = Object.keys(ctx.tiles).sort(() => Math.random() - 0.5);

    for (const key of shuffled) {
      const [q, r] = key.split(',').map(Number);
      const tile = ctx.tiles[key];
      if (!tile) continue;

      if (!allowed.includes(tile.terrain)) continue;

      if (ctx.overlayTypes[key]?.length) continue;

      if (requireAdjSea) {
        const hasSea = ctx.neighbors(q, r).some(n => ctx.getTile(n.q, n.r)?.terrain === 'sea');
        if (!hasSea) continue;
      }

      const densityCfg = this.getNarrativeDensityConfig(kind);
      if (densityCfg) {
        const density = this.getOverlayDensityAround(ctx, q, r, densityCfg.radius);
        if (density >= densityCfg.max) continue;
      }

      if (!this.isFarEnoughFromSameType(ctx, q, r, kind, minDist)) continue;

      return { q, r };
    }

    return null;
  }


  // ------------------------------------------------------------
  // Density rules (same as before)
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // 4. PORTALS (unchanged)
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
