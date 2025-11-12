import { ActionType } from '../models/actions';
import { OverlayTemplate } from '../models/overlays.model';

export const VILLAGE_TABLE: OverlayTemplate[] = [
  {
    name: 'VILLAGE.OAKWOOD.NAME',
    description: 'VILLAGE.OAKWOOD.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-oakwood.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'oakwood',
  },
  {
    name: 'VILLAGE.PINEHILL.NAME',
    description: 'VILLAGE.PINEHILL.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-pinehill.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'pinehill',
  },
  {
    name: 'VILLAGE.CEDARBROOK.NAME',
    description: 'VILLAGE.CEDARBBROOK.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-cedarbrook.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'cedarbrook',
  },
  {
    name: 'VILLAGE.MAPLECROSS.NAME',
    description: 'VILLAGE.MAPLECROSS.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-maplecross.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'maple-cross',
  },
  {
    name: 'VILLAGE.BIRCHFIELD.NAME',
    description: 'VILLAGE.BIRCHFIELD.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-birchfield.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'brichfield',
  },
  {
    name: 'VILLAGE.DARKROAD.NAME',
    description: 'VILLAGE.DARKROAD.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-darkroad.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'darkroad',
  },
  {
    name: 'VILLAGE.WOODENPALE.NAME',
    description: 'VILLAGE.WOODENPALE.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-woodenpale.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'woodenpale',
  },
]
