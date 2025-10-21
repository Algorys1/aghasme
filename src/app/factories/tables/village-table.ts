import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const VILLAGE_TABLE: OverlayTemplate[] = [
  {
    name: 'Oakwood',
    description: 'Oakwood rests beneath towering oaks, its cottages woven into the forest\'s quiet embrace.',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Continue, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Pinehill',
    description: 'Pinehill overlooks the rolling woods, where the scent of pine drifts through every narrow path.',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Continue, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Cedarbrook',
    description: 'Cedarbrook nestles by a gentle stream, its wooden bridges creaking softly beneath passing travelers.',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Continue, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Maplecross',
    description: 'Maplecross lies where two paths meet, its red-leaved trees welcoming wanderers with quiet warmth.',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Continue, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Birchfield',
    description: 'Birchfield stretches across golden meadows, its pale trees shimmering in the morning light.',
    icon: 'assets/overlays/village.png',
    actions: [ActionType.Continue, ActionType.Trade, ActionType.Rest],
  },
]
