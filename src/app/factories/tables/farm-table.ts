import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export interface FarmTemplate extends OverlayTemplate {
  resources: string
}

export const FARM_TABLE: FarmTemplate[] = [
  {
    name: 'Hookwood Farm',
    description: 'A sprawling farm with golden wheat fields swaying in the breeze.',
    resources: 'food',
    icon: 'assets/overlays/farm.png',
    id: 'wheat-farm',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Dairy Farm',
    id: 'dairy-farm',
    description: 'A bustling dairy farm with cows grazing peacefully.',
    resources: 'food',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Poultry Farm',
    id: 'poultry-farm',
    description: 'A lively farm filled with chickens, ducks, and other fowl.',
    resources: 'food',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Glans House',
    id: 'glans-house',
    description: 'A vibrant farm growing a variety of fresh vegetables.',
    resources: 'food:potion',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Imon Orchard',
    id: 'imon-orchad',
    description: 'A lush orchard filled with fruit-bearing trees.',
    resources: 'food',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Meuh\'s Farm',
    id: 'meuh-farm',
    description: 'A farm raising cattle, sheep, and other livestock.',
    resources: 'food:wood',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Flowers of Yliss',
    id: 'flowers-yliss',
    description: 'A colorful farm cultivating beautiful flowers and herbs.',
    resources: 'food:milk',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
]