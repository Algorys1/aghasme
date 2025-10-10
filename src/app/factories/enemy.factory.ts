import { Enemy } from '../models/enemy.model';
import { Terrain } from './tile.factory';
import { EnemyTables } from './enemy-tables';

export interface EnemyTemplate {
  name: string;
  desc: string;
  icon: string;
  category: 'beast' | 'monster';
  terrains: Terrain[];
  minLevel: number;
  maxLevel: number;
}

export class EnemyFactory {
  /**
   * Génère un ennemi générique (catégorie optionnelle)
   */
  static generate(params: { playerLevel: number; terrain: Terrain; category?: 'beast' | 'monster' }): Enemy {
    const { playerLevel, terrain, category } = params;

    const biomeEnemies = EnemyTables[terrain] ?? [];

    // 1️⃣ Filtrage selon la catégorie et le niveau
    const filtered = biomeEnemies.filter(e =>
      (!category || e.category === category) &&
      playerLevel >= e.minLevel - 2 &&
      playerLevel <= e.maxLevel + 2
    );

    // 2️⃣ Si aucun résultat strict, on élargit
    const pool = filtered.length ? filtered : biomeEnemies;
    const pick = pool[Math.floor(Math.random() * pool.length)];

    // 3️⃣ Calcul du niveau final avec petite variance
    const variance = Math.floor(Math.random() * 3) - 1;
    const level = Math.max(pick.minLevel, Math.min(pick.maxLevel, playerLevel + variance));

    // 4️⃣ Création de l'ennemi
    return new Enemy({
      name: pick.name,
      desc: pick.desc,
      icon: pick.icon,
      category: pick.category,
      level,
      hp: 20 + level * 6,
      attack: 4 + level * 2,
      defense: 2 + level,
    });
  }

  /**
   * 🐾 Génère une bête adaptée au biome et au niveau du joueur
   */
  static generateBeast(playerLevel: number, terrain: Terrain): Enemy {
    return this.generate({ playerLevel, terrain, category: 'beast' });
  }

  /**
   * 👹 Génère un monstre adapté au biome et au niveau du joueur
   */
  static generateMonster(playerLevel: number, terrain: Terrain): Enemy {
    return this.generate({ playerLevel, terrain, category: 'monster' });
  }
}
