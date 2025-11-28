// enemy.factory.ts
import {Enemy, EnnemySubCategory} from '../models/enemy.model';
import { Terrain } from '../../game/factories/tile.factory';
import { ENEMIES } from '../tables/enemy-tables';
import { Effect } from '../../character/models/effect.model';
import { applyEffectsToEntity } from '../../items/tools/effect-utils';

export interface EnemyDefinition {
  id: string;
  name: string;
  desc: string;
  icon: string;
  subCategories: EnnemySubCategory[];
  terrains: Terrain[];
  minLevel: number;
  maxLevel: number;
  effects?: Effect[];
}

export class EnemyFactory {
  /**
   * Spawns an enemy adapted to the terrain, the player's level and possibly a category
   */
  static generate(params: {
    playerLevel: number;
    terrain: Terrain;
    subCategories?: string[];
  }): Enemy {
    const { playerLevel, terrain, subCategories } = params;

    let pool = ENEMIES.filter(e => e.terrains.includes(terrain));

    if (subCategories?.length) {
      pool = pool.filter(e => e.subCategories.some(sub => subCategories.includes(sub)));
    }

    const levelFiltered = pool.filter(
      e => playerLevel >= e.minLevel - 2 && playerLevel <= e.maxLevel + 2
    );

    const candidates = levelFiltered.length ? levelFiltered : pool;
    if (!candidates.length) throw new Error(`[EnemyFactory] No enemies found for terrain: ${terrain}`);

    const pick = candidates[Math.floor(Math.random() * candidates.length)];

    const variance = Math.floor(Math.random() * 3) - 1; // [-1, 0, +1]
    const level = Math.max(pick.minLevel, Math.min(pick.maxLevel, playerLevel + variance));

    // --- Core stats ---
    const hp = 8 + level * 5;
    const mp = 4 + level * 3;

    // --- Combat bonuses (used by the combat engine)
    const baseAttackBonus = Math.floor(level / 4);
    const baseDefenseBonus = Math.floor(level / 4);

    const attackVariance = Math.floor(Math.random() * 3) - 1; // [-1, 0, +1]
    const defenseVariance = Math.floor(Math.random() * 3) - 1;

    const finalAttackBonus = Math.max(0, baseAttackBonus + attackVariance);
    const finalDefenseBonus = Math.max(0, baseDefenseBonus + defenseVariance);

    const baseEnemy = new Enemy({
      name: pick.name,
      desc: pick.desc,
      icon: pick.icon,
      level,
      hp,
      mp,
      attack: finalAttackBonus,
      defense: finalDefenseBonus,
      effects: pick.effects,
    });

    return pick.effects?.length
      ? applyEffectsToEntity(baseEnemy, pick.effects)
      : baseEnemy;
  }

  static createById(id: string, level: number): Enemy {
    const tpl = ENEMIES.find(e => e.id === id);
    if (!tpl) throw new Error(`[EnemyFactory] Unknown enemy ID: ${id}`);

    const finalLevel = Math.max(tpl.minLevel, Math.min(tpl.maxLevel, level));

    // Stats aligned with generate()
    const hp = 8 + finalLevel * 5;
    const mp = 4 + finalLevel * 3;

    const attackBonus = Math.floor(finalLevel / 4);
    const defenseBonus = Math.floor(finalLevel / 4);

    const baseEnemy = new Enemy({
      name: tpl.name,
      desc: tpl.desc,
      icon: tpl.icon,
      level: finalLevel,
      hp,
      mp,
      attack: attackBonus,
      defense: defenseBonus,
      effects: tpl.effects,
    });

    return tpl.effects?.length
      ? applyEffectsToEntity(baseEnemy, tpl.effects)
      : baseEnemy;
  }
}
