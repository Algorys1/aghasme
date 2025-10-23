import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const CITY_TABLE: OverlayTemplate[] = [
  {
    name: 'Aghasme',
    id: 'aghasme',
    description: 'Aghasme, the bustling capital, is a melting pot of cultures, where merchants from distant lands converge to trade exotic goods.',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Rivertown',
    id: 'rivertown',
    description: 'Rivertown stretches peacefully along the silvery banks, its harbor echoing with sea shanties and the lapping of the waters.',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Eldergate',
    id: 'eldergate',
    description: 'Eldergate stands as an ancient stronghold, where worn stones whisper tales of forgotten kings.',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Stormhold',
    id: 'stormhold',
    description: 'Stormhold rises against the raging winds, its towers defying thunder and time alike.',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Ironvale',
    id: 'ironvale',
    description: 'Ironvale thrives in the shadow of the mountains, its forges burning day and night with unyielding purpose.',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Highwall',
    id: 'highwall',
    description: 'Highwall crowns the cliffs above the valley, its great ramparts watching over the lands below.',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
]
