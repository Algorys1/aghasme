import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const WANDERER_TABLE: OverlayTemplate[] = [
  {
    name: 'Lone Traveler',
    description: 'A solitary figure wandering the lands, seeking adventure.',
    icon: 'assets/overlays/wanderer.png',
    actions: [ActionType.Talk, ActionType.Trade, ActionType.Avoid],
  },
  {
    name: 'Mystic Seeker',
    description: 'A wanderer in search of ancient knowledge and spiritual enlightenment.',
    icon: 'assets/overlays/wanderer.png',
    actions: [ActionType.Talk, ActionType.Trade, ActionType.Avoid],
  },
  {
    name: 'Wandering Merchant',
    description: 'A merchant traveling from place to place, offering rare goods.',
    icon: 'assets/overlays/wanderer.png',
    actions: [ActionType.Talk, ActionType.Trade, ActionType.Avoid],
  },
  {
    name: 'Lost Soul',
    description: 'A confused wanderer, unsure of their path and purpose.',
    icon: 'assets/overlays/wanderer.png',
    actions: [ActionType.Talk, ActionType.Trade, ActionType.Avoid],
  },
  {
    name: 'Adventurous Nomad',
    description: 'A nomad embracing the freedom of the open road, always on the move.',
    icon: 'assets/overlays/wanderer.png',
    actions: [ActionType.Talk, ActionType.Trade, ActionType.Avoid],
  },
]