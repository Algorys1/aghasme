import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const CITY_TABLE: OverlayTemplate[] = [
  {
    name: 'Rivertown',
    description: 'Rivertown stretches peacefully along the silvery banks, its harbor echoing with sea shanties and the lapping of the waters.',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Explore, ActionType.Trade, ActionType.Rest, ActionType.Avoid],
  },
  {
    name: 'Eldergate',
    description: 'Eldergate stands as an ancient stronghold, where worn stones whisper tales of forgotten kings.',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Explore, ActionType.Trade, ActionType.Rest, ActionType.Avoid],
  },
  {
    name: 'Stormhold',
    description: 'Stormhold rises against the raging winds, its towers defying thunder and time alike.',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Explore, ActionType.Trade, ActionType.Rest, ActionType.Avoid],
  },
  {
    name: 'Ironvale',
    description: 'Ironvale thrives in the shadow of the mountains, its forges burning day and night with unyielding purpose.',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Explore, ActionType.Trade, ActionType.Rest, ActionType.Avoid],
  },
  {
    name: 'Highwall',
    description: 'Highwall crowns the cliffs above the valley, its great ramparts watching over the lands below.',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Explore, ActionType.Trade, ActionType.Rest, ActionType.Avoid],
  },
]