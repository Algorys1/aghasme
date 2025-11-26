// game/services/cluster.service.ts
import { Injectable } from '@angular/core';
import { Terrain } from '../factories/tile.factory';
import { RegionService, RegionTile, Region } from './region.service';
import { PREFIX_TABLE } from '../tables/cluster-prefixes';
import { SUFFIX_TABLE } from '../tables/cluster-suffixes';

export interface ClusterDetectionOptions {
  minSize?: number; // default = 3
}

@Injectable({ providedIn: 'root' })
export class ClusterService {
  private minSize = 3;

  constructor(private regionService: RegionService) {}

  /**
   * Détecte et génère toutes les régions naturelles (clusters).
   * Appelé APRÈS generateCityRegions(), et AVANT la sauvegarde.
   */
  generateNaturalRegions(allTiles: RegionTile[]): void {
    const visited = new Set<string>();

    // On récupère seulement les tuiles libres (pas déjà dans une région urbaine)
    const freeTiles = allTiles.filter(
      t => !this.regionService.getRegionByTileKey(t.key)
    );

    const tileByKey = new Map<string, RegionTile>();
    for (const t of freeTiles) tileByKey.set(t.key, t);

    for (const tile of freeTiles) {
      if (visited.has(tile.key)) continue;

      // → Detect flood cluster on same biome
      const cluster = this.floodCluster(tile, tileByKey, visited);

      if (cluster.length >= this.minSize) {
        this.createRegionFromCluster(cluster);
      }
    }
  }

  /**
   * Flood-fill sur un terrain donné.
   */
  private floodCluster(
    start: RegionTile,
    tileMap: Map<string, RegionTile>,
    visited: Set<string>
  ): RegionTile[] {
    const stack = [start];
    const out: RegionTile[] = [];
    visited.add(start.key);

    while (stack.length) {
      const cur = stack.pop()!;
      out.push(cur);

      // Cherche les voisins (hexDistance == 1)
      for (const other of tileMap.values()) {
        if (visited.has(other.key)) continue;
        if (other.terrain !== start.terrain) continue;
        if (this.hexDistance(cur, other) !== 1) continue;

        visited.add(other.key);
        stack.push(other);
      }
    }

    return out;
  }

  /**
   * Génère un Region (type = 'biome') à partir d'un cluster.
   */
  private createRegionFromCluster(cluster: RegionTile[]): void {
    const biome = cluster[0].terrain;
    const size = cluster.length;

    const prefix = this.pickPrefix(biome, size);
    const suffix = this.pickSuffix(biome, size);

    const name = `${prefix} ${suffix}`.trim();

    const region: Region = {
      id: `cluster-${biome}-${crypto.randomUUID()}`,
      name,
      type: 'biome',
      biomeType: biome,
      tiles: cluster.map(t => t.key)
    };

    this.regionService.registerRegion(region);
  }

  private pickPrefix(biome: Terrain, size: number): string {
    const table = PREFIX_TABLE[biome];

    let tier: 'small' | 'medium' | 'large' | 'huge' =
      size < 6 ? 'small' :
      size < 11 ? 'medium' :
      size < 21 ? 'large' : 'huge';

    const list = table[tier];
    return list[Math.floor(Math.random() * list.length)];
  }

  private pickSuffix(biome: Terrain, size: number): string {
    // Suffixes "lore" seulement si cluster moyen+large
    const allowLore = size >= 10;

    const biomeGroup =
      biome === 'forest' ? ['forest','natural','mystic'] :
      biome === 'mountain' ? ['natural','dark'] :
      biome === 'desert' ? ['warm','natural'] :
      biome === 'volcano' ? ['warm','dark','mechanical'] :
      biome === 'sea' ? ['water','natural'] :
      biome === 'jungle' ? ['forest','water'] :
      biome === 'swamp' ? ['water','dark'] :
      ['natural'];

    const pool: string[] = [];

    for (const group of biomeGroup) {
      pool.push(...SUFFIX_TABLE[group]);
    }

    if (allowLore) {
      pool.push(...SUFFIX_TABLE['lore']);
    }

    return pool[Math.floor(Math.random() * pool.length)];
  }

  private hexDistance(a: RegionTile, b: RegionTile): number {
    const s1 = -a.q - a.r;
    const s2 = -b.q - b.r;
    return (Math.abs(a.q - b.q) + Math.abs(a.r - b.r) + Math.abs(s1 - s2)) / 2;
  }
}
