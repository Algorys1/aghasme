import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const SPIRIT_TABLE: OverlayTemplate[] = [
  {
    name: 'Nature Spirit',
    description: 'A gentle spirit of the forest, radiating calm and wisdom.',
    icon: 'assets/overlays/spirit.png',
    actions: [ActionType.Talk, ActionType.Fight, ActionType.Avoid],
  },
  {
    name: 'Water Spirit',
    description: 'A playful spirit of the water, shimmering with fluid grace.',
    icon: 'assets/overlays/spirit.png',
    actions: [ActionType.Talk, ActionType.Fight, ActionType.Avoid],
  },
  {
    name: 'Fire Spirit',
    description: 'A fierce spirit of fire, crackling with intense energy.',
    icon: 'assets/overlays/spirit.png',
    actions: [ActionType.Talk, ActionType.Fight, ActionType.Avoid],
  },
  {
    name: 'Earth Spirit',
    description: 'A steadfast spirit of the earth, embodying strength and resilience.',
    icon: 'assets/overlays/spirit.png',
    actions: [ActionType.Talk, ActionType.Fight, ActionType.Avoid],
  },
  {
    name: 'Air Spirit',
    description: 'A swift spirit of the air, moving with ethereal lightness.',
    icon: 'assets/overlays/spirit.png',
    actions: [ActionType.Talk, ActionType.Fight, ActionType.Avoid],
  },
]