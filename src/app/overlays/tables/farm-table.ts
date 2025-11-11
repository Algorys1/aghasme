import {ActionType} from '../models/actions';
import {OverlayTemplate} from '../models/overlays.model';

export const FARM_TABLE: OverlayTemplate[] = [
  {
    name: 'FARM.HOOKWOOD_FARM.NAME',
    description: 'FARM.HOOKWOOD_FARM.DESCRIPTION',
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
    name: 'FARM.DAIRY_FARM.NAME',
    id: 'dairy-farm',
    description: 'FARM.DAIRY_FARM.DESCRIPTION',
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
    name: 'FARM.POULTRY_FARM.NAME',
    id: 'poultry-farm',
    description: 'FARM.POULTRY_FARM.DESCRIPTION',
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
    name: 'FARM.GOLDEN_GLANS.NAME',
    id: 'glans-house',
    description: 'FARM.GOLDEN_GLANS.DESCRIPTION',
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
    name: 'FARM.IMON_ORCHARD.NAME',
    id: 'imon-orchard',
    description: 'FARM.IMON_ORCHARD.DESCRIPTION',
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
    name: 'FARM.MEUH_FARM.NAME',
    id: 'meuh-farm',
    description: 'FARM.MEUH_FARM.NAME',
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
    name: 'FARM.FLOWERS_YLISS.NAME',
    id: 'flowers-yliss',
    description: 'FARM.FLOWERS_YLISS.DESCRIPTION',
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
    name: 'FARM.BLUE_JAYS.NAME',
    id: 'blue-jays',
    description: 'FARM.BLUE_JAYS.DESCRIPTION',
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
    name: 'FARM.GOLD_FIELDS.NAME',
    id: 'gold-fields',
    description: 'FARM.GOLD_FIELDS.DESCRIPTION',
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
    name: 'FARM.BEYOND_HILL.NAME',
    id: 'beyond-hill',
    description: 'FARM.BEYOND_HILL.DESCRIPTION',
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
    name: 'FARM.SUNNY_ACRES.NAME',
    id: 'sunny-acres',
    description: 'FARM.SUNNY_ACRES.DESCRIPTION',
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
    name: 'FARM.RIVERBEND_FARM.NAME',
    id: 'riverbend-farm',
    description: 'FARM.RIVERBEND_FARM.DESCRIPTION',
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
    name: 'FARM.MEADOWVIEW_FARM.NAME',
    id: 'meadowview-farm',
    description: 'FARM.MEADOWVIEW_FARM.DESCRIPTION',
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
