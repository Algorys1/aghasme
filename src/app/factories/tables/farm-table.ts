import {ActionType} from '../../models/actions';
import {OverlayTemplate} from '../../models/overlays.model';

export const FARM_TABLE: OverlayTemplate[] = [
  {
    name: 'Hookwood Farm',
    description: 'A sprawling farm with golden wheat fields swaying in the breeze.',
    resources: [
      {
        id: 'herbs',
        type: 'herbs',
        orb: 'natural',
        difficulty: 5,
        xpReward: 3,
      },
      {
        id: 'sand',
        type: 'sand',
        orb: 'elemental',
        difficulty: 4,
        xpReward: 2,
      },
      {
        id: 'oil',
        type: 'oil',
        orb: 'bestial',
        difficulty: 6,
        xpReward: 4,
      }
    ],
    icon: 'assets/overlays/farm.png',
    id: 'wheat-farm',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Dairy Farm',
    id: 'dairy-farm',
    description: 'A bustling dairy farm with cows grazing peacefully.',
    resources: [
      {
        id: 'wheat',
        type: 'wheat',
        difficulty: 2,
        orb: 'natural',
        xpReward: 4,
      },
      {
        id: 'herbs',
        type: 'herbs',
        orb: 'natural',
        difficulty: 5,
        xpReward: 3,
      },
      {
        id: 'leather',
        type: 'fibers',
        orb: 'mechanic',
        difficulty: 8,
        xpReward: 12,
      }
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Poultry Farm',
    id: 'poultry-farm',
    description: 'A lively farm filled with chickens, ducks, and other fowl.',
    resources: [
      {
        id: 'wheat',
        type: 'wheat',
        difficulty: 2,
        orb: 'natural',
        xpReward: 4,
      },
      {
        id: 'herbs',
        type: 'herbs',
        orb: 'natural',
        difficulty: 5,
        xpReward: 3,
      },
      {
        id: 'berries',
        type: 'berries',
        orb: 'natural',
        difficulty: 2,
        xpReward: 4,
      },
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Glans House',
    id: 'glans-house',
    description: 'A vibrant farm growing a variety of fresh vegetables.',
    resources: [
      {
        id: 'wheat',
        type: 'wheat',
        difficulty: 2,
        orb: 'natural',
        xpReward: 4,
      },
      {
        id: 'herbs',
        type: 'herbs',
        orb: 'natural',
        difficulty: 5,
        xpReward: 3,
      },
      {
        id: 'oil',
        type: 'oil',
        orb: 'bestial',
        difficulty: 6,
        xpReward: 4,
      }
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Imon Orchard',
    id: 'imon-orchad',
    description: 'A lush orchard filled with fruit-bearing trees.',
    resources: [
      {
        id: 'herbs',
        type: 'herbs',
        orb: 'natural',
        difficulty: 5,
        xpReward: 3,
      },
      {
        id: 'berries',
        type: 'berries',
        orb: 'natural',
        difficulty: 2,
        xpReward: 4,
      },
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Meuh\'s Farm',
    id: 'meuh-farm',
    description: 'A farm raising cattle, sheep, and other livestock.',
    resources: [
      {
        id: 'fibers',
        type: 'fibers',
        orb: 'mechanic',
        difficulty: 6,
        xpReward: 7,
      },
      {
        id: 'leather',
        type: 'fibers',
        orb: 'mechanic',
        difficulty: 8,
        xpReward: 12,
      },
      {
        id: 'oil',
        type: 'oil',
        orb: 'bestial',
        difficulty: 6,
        xpReward: 4,
      }
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Flowers of Yliss',
    id: 'flowers-yliss',
    description: 'A colorful farm cultivating beautiful flowers and herbs.',
    resources: [
      {
        id: 'herbs',
        type: 'herbs',
        orb: 'natural',
        difficulty: 5,
        xpReward: 3,
      },
      {
        id: 'fibers',
        type: 'fibers',
        orb: 'mechanic',
        difficulty: 6,
        xpReward: 7,
      },
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'The Blue Jays',
    id: 'blue-jays',
    description: 'A quaint farm known for its vibrant blue crops and peaceful ambiance.',
    resources: [
      {
        id: 'berries',
        type: 'berries',
        orb: 'natural',
        difficulty: 2,
        xpReward: 4,
      },
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Gold Fields',
    id: 'gold-fields',
    description: 'A fertile farm known for its abundant grain production and its golden hues.',
    resources: [
      {
        id: 'wheat',
        type: 'wheat',
        difficulty: 2,
        orb: 'natural',
        xpReward: 4,
      },
      {
        id: 'herbs',
        type: 'herbs',
        orb: 'natural',
        difficulty: 5,
        xpReward: 3,
      },
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Beyond Hill',
    id: 'beyond-hill',
    description: 'The farm is located just past a gentle hill, offering stunning views of the surrounding countryside.',
    resources: [
      {
        id: 'wheat',
        type: 'wheat',
        difficulty: 2,
        orb: 'natural',
        xpReward: 4,
      },
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Sunny Acres',
    id: 'sunny-acres',
    description: 'This farm is bathed in sunlight throughout the day, making it an ideal location for growing a variety of crops.',
    resources: [
      {
        id: 'wheat',
        type: 'wheat',
        difficulty: 2,
        orb: 'natural',
        xpReward: 4,
      },
      {
        id: 'berries',
        type: 'berries',
        orb: 'natural',
        difficulty: 2,
        xpReward: 4,
      },
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Riverbend Farm',
    id: 'riverbend-farm',
    description: 'Situated along a gentle river bend, this farm benefits from rich soil and ample water supply.',
    resources: [
      {
        id: 'fibers',
        type: 'fibers',
        orb: 'mechanic',
        difficulty: 6,
        xpReward: 7,
      },
      {
        id: 'sand',
        type: 'sand',
        orb: 'elemental',
        difficulty: 4,
        xpReward: 2,
      }
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'Meadowview Farm',
    id: 'meadowview-farm',
    description: 'Overlooking a picturesque meadow, this farm is known for its scenic beauty and bountiful harvests.',
    resources: [
      {
        id: 'herbs',
        type: 'herbs',
        orb: 'natural',
        difficulty: 5,
        xpReward: 3,
      },
      {
        id: 'berries',
        type: 'berries',
        orb: 'natural',
        difficulty: 2,
        xpReward: 4,
      },
    ],
    icon: 'assets/overlays/farm.png',
    actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
  }
]
