import { OverlayKind } from './overlay-types';
import { Terrain } from '../factories/tile.factory';

export const overlayPools: Record<Terrain, { kind: OverlayKind; weight: number }[]> = {
  plain: [
    { kind: OverlayKind.None, weight: 60 },
    { kind: OverlayKind.Village, weight: 10 },
    { kind: OverlayKind.Farm, weight: 10 },
    { kind: OverlayKind.Forest, weight: 5 },
    { kind: OverlayKind.Bandits, weight: 5 }
  ],
  forest: [
    { kind: OverlayKind.None, weight: 50 },
    { kind: OverlayKind.Forest, weight: 10 },
    { kind: OverlayKind.Beast, weight: 10 },
    { kind: OverlayKind.Spirit, weight: 5 },
    { kind: OverlayKind.Ritual, weight: 2 }
  ],
  desert: [
    { kind: OverlayKind.None, weight: 50 },
    { kind: OverlayKind.Caravan, weight: 10 },
    { kind: OverlayKind.Oasis, weight: 5 },
    { kind: OverlayKind.Bandits, weight: 5 },
    { kind: OverlayKind.Ruins, weight: 3 }
  ],
  mountain: [
    { kind: OverlayKind.None, weight: 50 },
    { kind: OverlayKind.Mine, weight: 10 },
    { kind: OverlayKind.Fortress, weight: 5 },
    { kind: OverlayKind.Ruins, weight: 5 },
    { kind: OverlayKind.Monster, weight: 5 }
  ],
  water: [
    { kind: OverlayKind.None, weight: 80 },
    { kind: OverlayKind.Merchant, weight: 5 },
    { kind: OverlayKind.Treasure, weight: 2 }
  ]
};
