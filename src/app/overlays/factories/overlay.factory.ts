import { OverlayKind, OverlayTemplate, OverlayInstance } from '../models/overlays.model';

// Tables
import { RUINS_TABLE } from '../tables/ruins-table';
import { ANOMALY_TABLE } from '../tables/anomaly-table';
import { CARAVAN_TABLE } from '../tables/caravan-table';
import { FARM_TABLE } from '../tables/farm-table';
import { FOREST_TABLE } from '../tables/forest-table';
import { MINE_TABLE } from '../tables/mine-table';
import { CITY_TABLE } from '../tables/city-table';
import { VILLAGE_TABLE } from '../tables/village-table';
import { TOWER_TABLE } from '../tables/tower-table';
import { RITUAL_TABLE } from '../tables/ritual-table';
import { PORTAL_TABLE } from '../tables/portal-table';
import { SHRINE_TABLE } from '../tables/shrine-table';
import { SPIRIT_TABLE } from '../tables/spirit-table';
import { TREASURE_TABLE } from '../tables/treasure-table';
import { WANDERER_TABLE } from '../tables/wanderer-table';

export class OverlayFactory {
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
      eventChain: template.eventChain,
      resources: template.resources,
      allowedTerrains: template.allowedTerrains
    };
  }

}
