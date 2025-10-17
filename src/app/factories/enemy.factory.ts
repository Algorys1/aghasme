import { Enemy } from '../models/enemy.model';
import { Terrain } from './tile.factory';
import { EnemyTables } from './enemy-tables';
import { Effect } from '../models/effect.model';
import { applyEffectsToEntity } from '../tools/effect-utils';

export interface EnemyTemplate {
  name: string;
  desc: string;
  icon: string;
  category: 'beast' | 'monster';
  terrains: Terrain[];
  minLevel: number;
  maxLevel: number;
  effects?: Effect[];
}

export class EnemyFactory {
  /**
   * Génère un ennemi générique (catégorie optionnelle)
   */
  static generate(params: { playerLevel: number; terrain: Terrain; category?: 'beast' | 'monster' }): Enemy {
    const { playerLevel, terrain, category } = params;
    const biomeEnemies = EnemyTables[terrain] ?? [];

    // 1️⃣ Filtrage selon la catégorie et le niveau du joueur
    const filtered = biomeEnemies.filter(e =>
      (!category || e.category === category) &&
      playerLevel >= e.minLevel - 2 &&
      playerLevel <= e.maxLevel + 2
    );

    // 2️⃣ Si aucun résultat strict, on élargit la recherche
    const pool = filtered.length ? filtered : biomeEnemies;
    const pick = pool[Math.floor(Math.random() * pool.length)];

    // 3️⃣ Calcul du niveau final avec petite variance
    const variance = Math.floor(Math.random() * 3) - 1; // [-1, 0, +1]
    const level = Math.max(pick.minLevel, Math.min(pick.maxLevel, playerLevel + variance));

    // 4️⃣ Calcul des stats de base selon le niveau
    let baseAttack = Math.min(20, 4 + Math.floor(level * 1.1));
    let baseDefense = Math.floor(level / 3);
    const hp = 8 + level * 5;
    const mp = 4 + level * 3;

    // 5️⃣ Modificateurs selon la catégorie
    let attackMod = 0;
    let defenseMod = 0;
    if (pick.category === 'beast') {
      attackMod = +2;
    } else if (pick.category === 'monster') {
      defenseMod = +1;
    }

    // 6️⃣ Variance légère pour individualité
    const attackVariance = Math.floor(Math.random() * 3) - 1; // [-1, 0, +1]
    const defenseVariance = Math.floor(Math.random() * 3) - 1; // [-1, 0, +1]

    const finalAttack = Math.min(20, Math.max(5, baseAttack + attackMod + attackVariance));
    const finalDefense = Math.max(0, baseDefense + defenseMod + defenseVariance);

    const baseEnemy = new Enemy({
      name: pick.name,
      desc: pick.desc,
      icon: pick.icon,
      category: pick.category,
      level,
      hp,
      mp,
      attack: finalAttack,
      defense: finalDefense,
      effects: pick.effects, // 👈 stockés sur le modèle
    });
    
    return pick.effects?.length
      ? applyEffectsToEntity(baseEnemy, pick.effects)
      : baseEnemy;
  }

  /** 🐾 Génère une bête adaptée au biome et au niveau du joueur */
  static generateBeast(playerLevel: number, terrain: Terrain): Enemy {
    return this.generate({ playerLevel, terrain, category: 'beast' });
  }

  /** 👹 Génère un monstre adapté au biome et au niveau du joueur */
  static generateMonster(playerLevel: number, terrain: Terrain): Enemy {
    return this.generate({ playerLevel, terrain, category: 'monster' });
  }

  /** 🔍 Génère un ennemi précis par nom */
  static createByName(name: string, level: number): Enemy {
    const all = Object.values(EnemyTables).flat();
    const tpl = all.find(e => e.name.toLowerCase() === name.toLowerCase());
    if (!tpl) throw new Error(`[EnemyFactory] Unknown enemy: ${name}`);

    const finalLevel = Math.max(tpl.minLevel, Math.min(tpl.maxLevel, level));

    // mêmes formules que ci-dessus
    let baseAttack = Math.min(20, 4 + Math.floor(finalLevel * 1.1));
    let baseDefense = Math.floor(finalLevel / 3);
    const hp = 8 + finalLevel * 5;
    const mp = 4 + finalLevel * 3;

    let attackMod = 0;
    let defenseMod = 0;
    if (tpl.category === 'beast') {
      attackMod = +2;
    } else if (tpl.category === 'monster') {
      defenseMod = +1;
    }

    const finalAttack = Math.min(20, baseAttack + attackMod);
    const finalDefense = Math.max(0, baseDefense + defenseMod);

    const baseEnemy = new Enemy({
      name: tpl.name,
      desc: tpl.desc,
      icon: tpl.icon,
      category: tpl.category,
      level,
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
