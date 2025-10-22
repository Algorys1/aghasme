import {OverlayKind, OverlayTemplate, OverlayInstance, END_MARKER} from '../models/overlays.model';
import { ActionType } from '../models/actions';
import { EnemyFactory } from './enemy.factory';
import { Terrain } from './tile.factory';

// Tables
import { RUINS_TABLE } from './tables/ruins-table';
import { ANOMALY_TABLE } from './tables/anomaly-table';
import { CARAVAN_TABLE } from './tables/caravan-table';
import { FARM_TABLE } from './tables/farm-table';
import { FOREST_TABLE } from './tables/forest-table';
import { MINE_TABLE } from './tables/mine-table';
import { CITY_TABLE } from './tables/city-table';
import { VILLAGE_TABLE } from './tables/village-table';
import { TOWER_TABLE } from './tables/tower-table';
import { RITUAL_TABLE } from './tables/ritual-table';
import { PORTAL_TABLE } from './tables/portal-table';
import { SHRINE_TABLE } from './tables/shrine-table';
import { SPIRIT_TABLE } from './tables/spirit-table';
import { TREASURE_TABLE } from './tables/treasure-table';
import { WANDERER_TABLE } from './tables/wanderer-table';
import { OverlayContext } from '../models/overlay-phase.model';

export class OverlayFactory {
  // 🧭 Registre des tables existantes
  private static readonly TABLES: Partial<Record<OverlayKind, OverlayTemplate[]>> = {
    [OverlayKind.Anomaly]: ANOMALY_TABLE,
    [OverlayKind.Caravan]: CARAVAN_TABLE,
    [OverlayKind.Farm]: FARM_TABLE,
    [OverlayKind.Forest]: FOREST_TABLE,
    [OverlayKind.Mine]: MINE_TABLE,
    [OverlayKind.City]: CITY_TABLE,
    [OverlayKind.Village]: VILLAGE_TABLE,
    [OverlayKind.Tower]: TOWER_TABLE,
    [OverlayKind.Ruins]: RUINS_TABLE,
    [OverlayKind.Portal]: PORTAL_TABLE,
    [OverlayKind.Ritual]: RITUAL_TABLE,
    [OverlayKind.Shrine]: SHRINE_TABLE,
    [OverlayKind.Spirit]: SPIRIT_TABLE,
    [OverlayKind.Treasure]: TREASURE_TABLE,
    [OverlayKind.Wanderer]: WANDERER_TABLE,
  };

  // Create an overlay
  static create(kind: OverlayKind, context?: OverlayContext): OverlayInstance {
    const id = `${kind}-${crypto.randomUUID().slice(0, 8)}`;
    const playerLevel = context?.playerLevel ?? 1;
    const terrain = context?.terrain ?? 'plain';

    switch (kind) {
      case OverlayKind.Beast:
        return this.createBeast(id, kind, playerLevel, terrain);
      case OverlayKind.Monster:
        return this.createMonster(id, kind, playerLevel, terrain);
      case OverlayKind.Encounter:
        return this.createEncounter(id, playerLevel, terrain);
      default:
        const table = this.TABLES[kind];
        if (table) return this.createFromTable(id, kind, table);
        return this.createFallback(id);
    }
  }

  // Fallback if no template found
  private static createFallback(id: string): OverlayInstance {
    return {
      id,
      kind: OverlayKind.None,
      name: 'Nothing here',
      description: 'This area seems quiet. Nothing of note catches your attention.',
      icon: 'assets/overlays/none.png',
      actions: [ActionType.Quit],
    };
  }

  private static createFromTable(id: string, kind: OverlayKind, table: OverlayTemplate[]): OverlayInstance {
    const choice = table[Math.floor(Math.random() * table.length)];
    return {
      id,
      kind,
      name: choice.name,
      description: choice.description,
      icon: choice.icon,
      actions: choice.actions,
      eventChain: choice.eventChain,
    };
  }

  private static createBeast(id: string, kind: OverlayKind, playerLevel: number, terrain: Terrain): OverlayInstance {
    const beast = EnemyFactory.generateBeast(playerLevel, terrain);
    id = `${id}${END_MARKER}`;
    return {
      id,
      kind,
      name: beast.name,
      description: beast.desc,
      icon: beast.icon,
      actions: [ActionType.Fight, ActionType.Flee],
      ennemy: beast,
      isCompleted: true,
    };
  }

  private static createMonster(id: string, kind: OverlayKind, playerLevel: number, terrain: Terrain): OverlayInstance {
    const monster = EnemyFactory.generateMonster(playerLevel, terrain);
    id = `${id}${END_MARKER}`;
    return {
      id,
      kind,
      name: monster.name,
      description: monster.desc,
      icon: monster.icon,
      actions: [ActionType.Fight, ActionType.Flee],
      ennemy: monster,
      isCompleted: true,
    };
  }

  private static createEncounter(id: string, playerLevel: number, terrain: Terrain): OverlayInstance {
    const encounterKinds: OverlayKind[] = [
      OverlayKind.Beast,
      OverlayKind.Monster,
      OverlayKind.Caravan,
      OverlayKind.Spirit,
      OverlayKind.Wanderer,
    ];
    const randomKind = encounterKinds[Math.floor(Math.random() * encounterKinds.length)];

    if (randomKind === OverlayKind.Beast) return this.createBeast(id, randomKind, playerLevel, terrain);
    if (randomKind === OverlayKind.Monster) return this.createMonster(id, randomKind, playerLevel, terrain);

    const table = this.TABLES[randomKind];
    return table ? this.createFromTable(id, randomKind, table) : this.createFallback(id);
  }

  static getTable(kind: OverlayKind): OverlayTemplate[] | undefined {
    return this.TABLES[kind];
  }

  static createFromId(id: string, kind: OverlayKind): OverlayInstance | null {
    const table = this.TABLES[kind];
    if (!table) return null;
    const template = table.find(t => t.id === id);
    if (!template) return null;
    return {
      id,
      kind,
      name: template.name,
      description: template.description,
      icon: template.icon,
      actions: template.actions,
      eventChain: template.eventChain
    };
  }

}
