import {ActionType} from '../../models/actions';
import {OverlayTemplate} from '../../models/overlays.model';

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
  {
    name: 'The Blue Jays',
    id: 'blue-jays',
    description: 'A quaint farm known for its vibrant blue crops and peaceful ambiance.',
    resources: 'food',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Gold Fields',
    id: 'gold-fields',
    description: 'A fertile farm known for its abundant grain production and its golden hues.',
    resources: 'food:wood',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Beyond Hill',
    id: 'beyond-hill',
    description: 'The farm is located just past a gentle hill, offering stunning views of the surrounding countryside.',
    resources: 'food:milk',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Sunny Acres',
    id: 'sunny-acres',
    description: 'This farm is bathed in sunlight throughout the day, making it an ideal location for growing a variety of crops.',
    resources: 'food:potion',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Riverbend Farm',
    id: 'riverbend-farm',
    description: 'Situated along a gentle river bend, this farm benefits from rich soil and ample water supply.',
    resources: 'food',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Meadowview Farm',
    id: 'meadowview-farm',
    description: 'Overlooking a picturesque meadow, this farm is known for its scenic beauty and bountiful harvests.',
    resources: 'food:wood',
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  }
]
