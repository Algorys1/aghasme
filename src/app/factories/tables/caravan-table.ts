import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const CARAVAN_TABLE: OverlayTemplate[] = [
  {
    name: 'Merchant Caravan',
    description: 'A bustling caravan of traders and merchants.',
    icon: 'assets/overlays/caravan.png',
    actions: [ActionType.Trade, ActionType.Observe, ActionType.Avoid],
  },
  {
    name: 'Nomadic Tribe',
    description: 'A group of nomads traveling with their livestock.',
    icon: 'assets/overlays/caravan.png',
    actions: [ActionType.Trade, ActionType.Observe, ActionType.Avoid],
  },
  {
    name: 'Military Convoy',
    description: 'A convoy of soldiers on patrol.',
    icon: 'assets/overlays/caravan.png',
    actions: [ActionType.Trade, ActionType.Observe, ActionType.Avoid],
  },
  {
    name: 'Pilgrim Group',
    description: 'A group of pilgrims journeying to a sacred site.',
    icon: 'assets/overlays/caravan.png',
    actions: [ActionType.Trade, ActionType.Observe, ActionType.Avoid],
  },
  {
    name: 'Exploration Party',
    description: 'Adventurers seeking new lands and treasures.',
    icon: 'assets/overlays/caravan.png',
    actions: [ActionType.Trade, ActionType.Observe, ActionType.Avoid],
  }
]