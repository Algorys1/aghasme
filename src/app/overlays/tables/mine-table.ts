import { ActionType } from '../models/actions';
import { OverlayTemplate } from '../models/overlays.model';

export const MINE_TABLE: OverlayTemplate[] = [
  {
    name: 'Abandoned Mine',
    id: 'abandoned-mine',
    description: 'An old mine, long forgotten and filled with danger.',
    resources: [
      { id: 'stone', type: 'stone', orb: 'natural', difficulty: 7, xpReward: 4 },
      { id: 'bones', type: 'bones', orb: 'bestial', difficulty: 4, xpReward: 1 }
    ],
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['mountain', 'plain'],
    minDistance: 4,
    maxDistanceFromCity: 9
  },

  {
    name: 'Active Mine',
    id: 'active-mine',
    description: 'A bustling mine with workers extracting valuable resources.',
    resources: [
      { id: 'stone', type: 'stone', orb: 'natural', difficulty: 7, xpReward: 4 },
      { id: 'iron', type: 'iron', orb: 'natural', difficulty: 9, xpReward: 8 }
    ],
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['mountain', 'plain'],
    minDistance: 4,
    maxDistanceFromCity: 9
  },

  {
    name: 'Crystal Cavern',
    id: 'crystal-cavern',
    description: 'A mine filled with glowing crystals and hidden treasures.',
    resources: [
      { id: 'stone', type: 'stone', orb: 'natural', difficulty: 7, xpReward: 4 },
      { id: 'crystal', type: 'crystal', orb: 'elemental', difficulty: 11, xpReward: 8 }
    ],
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['mountain'],
    minDistance: 4,
    maxDistanceFromCity: 9
  },

  {
    name: 'Goblin Mine',
    id: 'goblin-mine',
    description: 'A mine overrun by goblins, beware of ambushes!',
    resources: [
      { id: 'stone', type: 'stone', orb: 'natural', difficulty: 7, xpReward: 4 },
      { id: 'coal', type: 'coal', orb: 'mechanic', difficulty: 7, xpReward: 5 }
    ],
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['mountain', 'plain', 'desert'],
    minDistance: 4,
    maxDistanceFromCity: 9
  },

  {
    name: 'Dwarven Mine',
    id: 'dwarven-mine',
    description: 'A sturdy mine built by dwarves, known for its rich veins of ore.',
    resources: [
      { id: 'stone', type: 'stone', orb: 'natural', difficulty: 7, xpReward: 4 },
      { id: 'coal', type: 'coal', orb: 'mechanic', difficulty: 6, xpReward: 5 }
    ],
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['mountain'],
    minDistance: 4,
    maxDistanceFromCity: 9
  },

  {
    name: 'Deep Shaft',
    id: 'deep-shaft',
    description: 'A deep mine shaft that descends far into the earth, filled with rare minerals.',
    resources: [
      { id: 'stone', type: 'stone', orb: 'natural', difficulty: 7, xpReward: 4 },
      { id: 'iron', type: 'iron', orb: 'natural', difficulty: 9, xpReward: 7 },
      { id: 'gem', type: 'gem', orb: 'elemental', difficulty: 14, xpReward: 12 }
    ],
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['mountain'],
    minDistance: 4,
    maxDistanceFromCity: 9
  },

  {
    name: 'Haunted Mine',
    id: 'haunted-mine',
    description: 'A mine rumored to be haunted by the spirits of former miners.',
    resources: [
      { id: 'stone', type: 'stone', orb: 'natural', difficulty: 7, xpReward: 4 },
      { id: 'soul-stone', type: 'soul-stone', orb: 'natural', difficulty: 11, xpReward: 8 }
    ],
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['mountain'],
    minDistance: 4,
    maxDistanceFromCity: 9
  },

  {
    name: 'Sunken Mine',
    id: 'sunken-mine',
    description: 'A mine partially flooded with water, making extraction difficult but rewarding.',
    resources: [
      { id: 'bones', type: 'bones', orb: 'bestial', difficulty: 4, xpReward: 1 },
      { id: 'soul-stone', type: 'soul-stone', orb: 'natural', difficulty: 11, xpReward: 8 },
      { id: 'gem', type: 'gem', orb: 'natural', difficulty: 14, xpReward: 12 },
    ],
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['mountain', 'plain'],
    minDistance: 4,
    maxDistanceFromCity: 9
  }
];
