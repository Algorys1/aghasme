import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const VILLAGE_TABLE: OverlayTemplate[] = [
  {
    name: 'Oakwood',
    description: 'Oakwood rests beneath towering oaks, its cottages woven into the forest\'s quiet embrace.',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'oakwood',
  },
  {
    name: 'Pinehill',
    description: 'Pinehill overlooks the rolling woods, where the scent of pine drifts through every narrow path.',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'pinehill',
  },
  {
    name: 'Cedarbrook',
    description: 'Cedarbrook nestles by a gentle stream, its wooden bridges creaking softly beneath passing travelers.',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'cedarbrook',
  },
  {
    name: 'Maplecross',
    description: 'Maplecross lies where two paths meet, its red-leaved trees welcoming wanderers with quiet warmth.',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'maple-cross',
  },
  {
    name: 'Birchfield',
    description: 'Birchfield stretches across golden meadows, its pale trees shimmering in the morning light.',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'brichfield',
  },
  {
    name: 'Darkroad',
    description: 'TODO DESCRIPTION',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'darkroad',
  },
  {
    name: 'Woodenpale',
    description: 'TODO DESCRIPTION',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'woodenpale',
  },
]
