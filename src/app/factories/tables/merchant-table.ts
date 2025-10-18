import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const MERCHANT_TABLE: OverlayTemplate[] = [
  {
    name: 'Traveling Merchant',
    description: 'A merchant with a variety of goods for sale.',
    icon: 'assets/overlays/merchant.png',
    actions: [ActionType.Trade, ActionType.Talk],
  },
  {
    name: 'Blacksmith',
    description: 'A skilled blacksmith offering weapons and armor.',
    icon: 'assets/overlays/merchant.png',
    actions: [ActionType.Trade, ActionType.Talk],
  },
  {
    name: 'Herbalist',
    description: 'A vendor specializing in potions and herbs.',
    icon: 'assets/overlays/merchant.png',
    actions: [ActionType.Trade, ActionType.Talk],
  },
  {
    name: 'Artisan',
    description: 'An artisan selling crafted items and trinkets.',
    icon: 'assets/overlays/merchant.png',
    actions: [ActionType.Trade, ActionType.Talk],
  },
  {
    name: 'Food Vendor',
    description: 'A vendor offering food and drink for travelers.',
    icon: 'assets/overlays/merchant.png',
    actions: [ActionType.Trade, ActionType.Talk],
  },
]