import { ActionType } from '../models/actions';
import { OverlayTemplate } from '../models/overlays.model';

export const VILLAGE_TABLE: OverlayTemplate[] = [
  {
    name: 'Oakwood',
    description: 'Oakwood rests beneath towering oaks, its cottages woven into the forest\'s quiet embrace.',
    icon: 'assets/overlays/backgrounds/oakwood.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'oakwood',
  },
  {
    name: 'Pinehill',
    description: 'Pinehill overlooks the rolling woods, where the scent of pine drifts through every narrow path.',
    icon: 'assets/overlays/backgrounds/pinehill.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'pinehill',
  },
  {
    name: 'Cedarbrook',
    description: 'Cedarbrook nestles by a gentle stream, its wooden bridges creaking softly beneath passing travelers.',
    icon: 'assets/overlays/backgrounds/cedarbrook.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'cedarbrook',
  },
  {
    name: 'Maplecross',
    description: 'Maplecross lies where two paths meet, its red-leaved trees welcoming wanderers with quiet warmth.',
    icon: 'assets/overlays/backgrounds/maplecross.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'maple-cross',
  },
  {
    name: 'Birchfield',
    description: 'Birchfield stretches across golden meadows, its pale trees shimmering in the morning light.',
    icon: 'assets/overlays/backgrounds/birchfield.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'brichfield',
  },
  {
    name: 'Darkroad',
    description: 'Darkroad sits at the edge of shadowed woods, where travelers find refuge from the encroaching night.',
    icon: 'assets/overlays/backgrounds/darkroad.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'darkroad',
  },
  {
    name: 'Woodenpale',
    description: 'Woodenpale is a quiet village of timber homes, its streets lined with lanterns that glow softly at dusk.',
    icon: 'assets/overlays/backgrounds/woodenpale.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'woodenpale',
  },
]
