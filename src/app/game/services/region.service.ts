// game/services/region.service.ts
import { Injectable } from '@angular/core';
import { Terrain } from '../factories/tile.factory';

export type Clan = 'anims' | 'sylvaris' | 'frostfire' | 'engineers' | 'all';

export interface RegionTile {
  key: string; // key = `${q},${r}`
  q: number;
  r: number;
  terrain: Terrain;
}

export interface RegionDisplayInfo {
  name: string;
  banner: string;     // path vers l’image
  type: 'city' | 'cluster' | 'none';
  clan?: string | null;
}


/**
 * Seed send by MapService for each city :
 * - cityId = id from CITY_TABLE (aghasme, rivertown, ...)
 * - centerKey = tile key `${q},${r}` where city overlay is
 */
export interface CityRegionSeed {
  cityId: string;
  centerKey: string;
}

/**
 * Region in game (runtime model ).
 */
export interface Region {
  id: string;
  name: string;
  type: 'city' | 'biome' | 'special';
  biomeType?: Terrain;
  tiles: string[]; // tileKeys `${q},${r}`
  clanAffinity?: Clan;
}

export interface RegionsSaveData {
  regions: Region[];
  tileMapping: { [tileKey: string]: string };
}

const CITY_REGION_MAX_TILES_RADIUS_6 = 170;
const CITY_REGION_MAX_TILES_RADIUS_8 = 250;

/**
 * Fixed definitions of city regions: name + radius + clan.
 */
const CITY_REGION_DEFS: Record<
  string,
  { name: string; radius: number; clanAffinity?: Clan }
> = {
  aghasme: {
    name: "Vallée d'Aghasme",
    radius: 8,
    clanAffinity: 'all',
  },
  rivertown: {
    name: 'Bassin des Rives',
    radius: 6,
    clanAffinity: 'all',
  },
  eldergate: {
    name: 'Contrée des Anciens',
    radius: 6,
    clanAffinity: 'frostfire',
  },
  stormhold: {
    name: 'La Bordure Bleue',
    radius: 6,
    clanAffinity: 'all',
  },
  ironvale: {
    name: 'Vaux Argentés',
    radius: 6,
    clanAffinity: 'anims',
  },
  highwall: {
    name: 'Plateau des Plaisirs',
    radius: 6,
    clanAffinity: 'all',
  },
  mechanica: {
    name: 'Terres Brûlées',
    radius: 6,
    clanAffinity: 'engineers',
  },
  leafhaven: {
    name: "Sylve d'Havrefeuille",
    radius: 6,
    clanAffinity: 'sylvaris',
  },
};

@Injectable({ providedIn: 'root' })
export class RegionService {

  private regions = new Map<string, Region>();
  private tileRegionMap = new Map<string, string>();

  generateCityRegions(tiles: RegionTile[], seeds: CityRegionSeed[]): void {
    this.resetRegions();

    if (!tiles.length || !seeds.length) return;

    const enrichedSeeds = seeds
      .map(seed => {
        const meta = CITY_REGION_DEFS[seed.cityId];
        if (!meta) return null;
        return { ...seed, ...meta };
      })
      .filter((e): e is CityRegionSeed & { name: string; radius: number; clanAffinity?: Clan } => !!e)
      .sort((a, b) => b.radius - a.radius);

    const tileByKey = new Map<string, RegionTile>();
    for (const t of tiles) {
      tileByKey.set(t.key, t);
    }

    for (const def of enrichedSeeds) {
      const centerTile = tileByKey.get(def.centerKey);
      if (!centerTile) continue;

      const { region, occupiedTiles } = this.generateRegionForCity(def, centerTile, tiles);

      if (!region.tiles.length) continue;

      this.regions.set(region.id, region);
      for (const key of occupiedTiles) {
        this.tileRegionMap.set(key, region.id);
      }
    }
  }

  private generateRegionForCity(
    def: CityRegionSeed & { name: string; radius: number; clanAffinity?: Clan },
    centerTile: RegionTile,
    allTiles: RegionTile[],
  ): { region: Region; occupiedTiles: string[] } {
    const radius = def.radius;
    const maxTiles =
      radius >= 8 ? CITY_REGION_MAX_TILES_RADIUS_8 : CITY_REGION_MAX_TILES_RADIUS_6;

    const candidateTiles = allTiles.filter(
      t => this.hexDistance(centerTile.q, centerTile.r, t.q, t.r) <= radius,
    );

    const freeCandidateTiles = candidateTiles.filter(
      t => !this.tileRegionMap.has(t.key),
    );

    if (!freeCandidateTiles.length) {
      const emptyRegion: Region = {
        id: this.buildRegionId(def.cityId),
        name: def.name,
        type: 'city',
        tiles: [],
        clanAffinity: def.clanAffinity,
      };
      return { region: emptyRegion, occupiedTiles: [] };
    }

    const terrainWeights = this.computeTerrainWeights(centerTile, allTiles, radius);

    const visited = new Set<string>();
    const regionTileKeys: string[] = [];

    const highPriorityQueue: RegionTile[] = [];
    const lowPriorityQueue: RegionTile[] = [];

    visited.add(centerTile.key);
    regionTileKeys.push(centerTile.key);
    highPriorityQueue.push(centerTile);

    while (
      (highPriorityQueue.length || lowPriorityQueue.length) &&
      regionTileKeys.length < maxTiles
    ) {
      const current =
        highPriorityQueue.length > 0
          ? highPriorityQueue.shift()!
          : lowPriorityQueue.shift()!;

      const neighbors = this.getNeighbors(current, freeCandidateTiles);

      for (const n of neighbors) {
        if (visited.has(n.key)) continue;
        if (this.tileRegionMap.has(n.key)) continue;
        if (this.hexDistance(centerTile.q, centerTile.r, n.q, n.r) > radius) continue;

        visited.add(n.key);
        regionTileKeys.push(n.key);

        const weight = terrainWeights.get(n.terrain) ?? 0.5;
        if (weight >= 0.3) {
          highPriorityQueue.push(n);
        } else {
          lowPriorityQueue.push(n);
        }

        if (regionTileKeys.length >= maxTiles) break;
      }
    }

    const filledKeys = this.autoFillInternalGaps(regionTileKeys, freeCandidateTiles);
    const uniqueKeys = Array.from(new Set(filledKeys));

    const region: Region = {
      id: this.buildRegionId(def.cityId),
      name: def.name,
      type: 'city',
      tiles: uniqueKeys,
      clanAffinity: def.clanAffinity,
    };

    return {
      region,
      occupiedTiles: uniqueKeys,
    };
  }

  private computeTerrainWeights(
    centerTile: RegionTile,
    allTiles: RegionTile[],
    radius: number,
  ): Map<Terrain, number> {
    const maxRing = Math.min(radius, 2);
    const counts = new Map<Terrain, number>();

    for (const t of allTiles) {
      const d = this.hexDistance(centerTile.q, centerTile.r, t.q, t.r);
      if (d === 0 || d > maxRing) continue;
      const old = counts.get(t.terrain) ?? 0;
      counts.set(t.terrain, old + 1);
    }

    let maxCount = 0;
    for (const v of counts.values()) {
      if (v > maxCount) maxCount = v;
    }

    const weights = new Map<Terrain, number>();
    if (!maxCount) return weights;

    for (const [terrain, count] of counts.entries()) {
      const ratio = count / maxCount;
      const weight = Math.pow(ratio, 0.8);
      weights.set(terrain, weight);
    }

    return weights;
  }

  /**
   * Remplissage simple des "trous internes" :
   * Si une tuile candidate est entourée par ≥ 4 tuiles déjà dans la région,
   * on l'ajoute pour éviter un trou visuel.
   */
  private autoFillInternalGaps(
    regionKeys: string[],
    candidateTiles: RegionTile[],
  ): string[] {
    const regionSet = new Set(regionKeys);
    const result = [...regionKeys];

    const tileByKey = new Map<string, RegionTile>();
    for (const t of candidateTiles) tileByKey.set(t.key, t);

    for (const t of candidateTiles) {
      if (regionSet.has(t.key)) continue;

      const neighbors = this.getNeighbors(t, candidateTiles);
      let countInRegion = 0;
      for (const n of neighbors) {
        if (regionSet.has(n.key)) countInRegion++;
      }

      if (countInRegion >= 4) {
        regionSet.add(t.key);
        result.push(t.key);
      }
    }

    return result;
  }

  /**
   * Voisins immédiats avec distanceHex == 1 (implémentation naïve, OK sur ~200 tuiles).
   */
  private getNeighbors(tile: RegionTile, all: RegionTile[]): RegionTile[] {
    const neighbors: RegionTile[] = [];
    for (const other of all) {
      if (other.key === tile.key) continue;
      if (this.hexDistance(tile.q, tile.r, other.q, other.r) === 1) {
        neighbors.push(other);
      }
    }
    return neighbors;
  }

  /**
   * Distance hexagonale sur coordonnées axiales (q, r).
   * Même logique que dans MapService.hexDistance.
   */
  private hexDistance(q1: number, r1: number, q2: number, r2: number): number {
    const s1 = -q1 - r1;
    const s2 = -q2 - r2;
    return (Math.abs(q1 - q2) + Math.abs(r1 - r2) + Math.abs(s1 - s2)) / 2;
  }

  private buildRegionId(cityId: string): string {
    return `city-${cityId}-region`;
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  registerRegion(region: Region): void {
    this.regions.set(region.id, region);
    for (const key of region.tiles) {
      this.tileRegionMap.set(key, region.id);
    }
  }

  getRegionByTileKey(tileKey: string): Region | null {
    const regionId = this.tileRegionMap.get(tileKey);
    if (!regionId) return null;
    return this.regions.get(regionId) ?? null;
  }

  getRegion(regionId: string): Region | null {
    return this.regions.get(regionId) ?? null;
  }

  getRegionAt(q: number, r: number): Region | null {
    const key = `${q},${r}`;
    return this.getRegionByTileKey(key);
  }

  getAllRegions(): Region[] {
    return Array.from(this.regions.values());
  }

  resetRegions(): void {
    this.regions.clear();
    this.tileRegionMap.clear();
  }

  getDisplayInfoAt(q: number, r: number): RegionDisplayInfo {
    const region = this.getRegionAt(q, r);

    // Unknown Land
    if (!region) {
      return {
        name: "Unknown Land",
        banner: "assets/characters/banners/banner-neutral.png",
        type: "none"
      };
    }

    // City region
    if (region.type === 'city') {
      const clan = region.clanAffinity ?? 'all';

      const bannerMap: Record<string, string> = {
        anims:      'assets/characters/banners/banner-anims.png',
        sylvaris:   'assets/characters/banners/banner-sylvaris.png',
        frostfire:  'assets/characters/banners/banner-frostfire.png',
        engineers:  'assets/characters/banners/banner-engineer.png',
        all:        'assets/characters/banners/banner-all.png'
      };

      return {
        name: region.name,
        banner: bannerMap[clan] ?? bannerMap['all'],
        type: 'city',
        clan
      };
    }

    // Biome region
    if (region.type === 'biome') {
      return {
        name: region.name,
        banner: "assets/characters/banners/banner-neutral.png",
        type: "cluster"
      };
    }

    // fallback
    return {
      name: "Unknown Land",
      banner: "assets/character/banners/banner-neutral.png",
      type: "none"
    };
  }

  // ---------------------------------------------------------------------------
  // Sauvegarde / chargement
  // ---------------------------------------------------------------------------

  exportForSave(): RegionsSaveData {
    const regions = this.getAllRegions();
    const tileMapping: { [tileKey: string]: string } = {};
    for (const [tileKey, regionId] of this.tileRegionMap.entries()) {
      tileMapping[tileKey] = regionId;
    }
    return { regions, tileMapping };
  }

  importFromSave(data: RegionsSaveData | undefined | null): void {
    this.resetRegions();
    if (!data) return;

    for (const r of data.regions) {
      this.regions.set(r.id, r);
    }
    for (const tileKey of Object.keys(data.tileMapping)) {
      this.tileRegionMap.set(tileKey, data.tileMapping[tileKey]);
    }
  }
}
