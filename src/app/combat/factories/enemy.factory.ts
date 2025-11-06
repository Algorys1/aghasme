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

    // TODO refactor to define real formulas somewhere central
    let baseAttack = Math.min(20, 4 + Math.floor(level * 1.1));
    let baseDefense = Math.floor(level / 3);
    const hp = 8 + level * 5;
    const mp = 4 + level * 3;

    const attackVariance = Math.floor(Math.random() * 3) - 1; // [-1, 0, +1]
    const defenseVariance = Math.floor(Math.random() * 3) - 1;

    const finalAttack = Math.min(20, Math.max(5, baseAttack + attackVariance));
    const finalDefense = Math.max(0, baseDefense + defenseVariance);

    const baseEnemy = new Enemy({
      name: pick.name,
      desc: pick.desc,
      icon: pick.icon,
      level,
      hp,
      mp,
      attack: finalAttack,
      defense: finalDefense,
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

    // TODO see above about formulas
    let baseAttack = Math.min(20, 4 + Math.floor(finalLevel * 1.1));
    let baseDefense = Math.floor(finalLevel / 3);
    const hp = 8 + finalLevel * 5;
    const mp = 4 + finalLevel * 3;

    const finalAttack = Math.min(20, baseAttack);
    const finalDefense = Math.max(0, baseDefense);

    const baseEnemy = new Enemy({
      name: tpl.name,
      desc: tpl.desc,
      icon: tpl.icon,
      level: finalLevel,
      hp,
      mp,
      attack: finalAttack,
      defense: finalDefense,
      effects: tpl.effects,
    });

    return tpl.effects?.length
      ? applyEffectsToEntity(baseEnemy, tpl.effects)
      : baseEnemy;
  }
}
