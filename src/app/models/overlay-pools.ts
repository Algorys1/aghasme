import { OverlayKind } from './overlay-types';
import { Terrain } from '../factories/tile.factory';

export const overlayPools: Record<Terrain, { kind: OverlayKind; weight: number }[]> = {
  plain: [
    { kind: OverlayKind.None, weight: 30 },
    { kind: OverlayKind.Village, weight: 10 },
    { kind: OverlayKind.Farm, weight: 30 },
    { kind: OverlayKind.Encounter, weight: 15 },
    { kind: OverlayKind.Beast, weight: 20 },
  ],
  forest: [
    { kind: OverlayKind.None, weight: 10 },
    { kind: OverlayKind.Forest, weight: 40 },
    { kind: OverlayKind.Beast, weight: 20 },
    { kind: OverlayKind.Spirit, weight: 25 },
    { kind: OverlayKind.Ritual, weight: 10 }
  ],
  desert: [
    { kind: OverlayKind.None, weight: 60 },
    { kind: OverlayKind.Anomaly, weight: 5 },
    { kind: OverlayKind.Caravan, weight: 15 },
    { kind: OverlayKind.Oasis, weight: 15 },
    { kind: OverlayKind.Encounter, weight: 35 },
    { kind: OverlayKind.Ruins, weight: 20 }
  ],
  mountain: [
    { kind: OverlayKind.None, weight: 40 },
    { kind: OverlayKind.Mine, weight: 20 },
    { kind: OverlayKind.Tower, weight: 10 },
    { kind: OverlayKind.Ruins, weight: 10 },
    { kind: OverlayKind.Monster, weight: 20 }
  ],
  volcano: [
    { kind: OverlayKind.None, weight: 60 },
    { kind: OverlayKind.Mine, weight: 20 },
    { kind: OverlayKind.Anomaly, weight: 5 },
    { kind: OverlayKind.Ruins, weight: 25 },
    { kind: OverlayKind.Monster, weight: 5 }
  ],
  water: [
    { kind: OverlayKind.None, weight: 80 },
    { kind: OverlayKind.Merchant, weight: 15 },
    { kind: OverlayKind.Treasure, weight: 20 }
  ],
  jungle: [
    { kind: OverlayKind.None, weight: 50 },
    { kind: OverlayKind.Treasure, weight: 15 },
    { kind: OverlayKind.Monster, weight: 40 },
    { kind: OverlayKind.Ruins, weight: 20 }
  ],
  swamp: [
    { kind: OverlayKind.None, weight: 50 },
    { kind: OverlayKind.Treasure, weight: 15 },
    { kind: OverlayKind.Monster, weight: 40 },
    { kind: OverlayKind.Ruins, weight: 20 }
  ]
};
