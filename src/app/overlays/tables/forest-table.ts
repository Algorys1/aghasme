import { ActionType } from '../models/actions';
import { OverlayTemplate } from '../models/overlays.model';

export const FOREST_TABLE: OverlayTemplate[] = [
  {
    name: 'Enchanted Forest',
    id: 'enchanted-forest',
    description: 'A mystical forest filled with magical creatures and glowing plants.',
    resources: [
      { id: 'wood', type: 'wood', orb: 'natural', difficulty: 4, xpReward: 4 },
      { id: 'sacred-wood', type: 'wood', orb: 'natural', difficulty: 6, xpReward: 8 },
      { id: 'dark-wood', type: 'wood', orb: 'natural', difficulty: 5, xpReward: 7 },
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['forest', 'jungle', 'swamp', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 8,
    autoTrigger: false
  },

  {
    name: 'Dark Woods',
    id: 'dark-wood',
    description: 'A dense and shadowy forest, home to many dangers.',
    resources: [
      { id: 'wood', type: 'wood', orb: 'natural', difficulty: 4, xpReward: 4 },
      { id: 'dark-wood', type: 'wood', orb: 'natural', difficulty: 5, xpReward: 7 },
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['forest', 'jungle', 'swamp', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 8,
    autoTrigger: false
  },

  {
    name: 'Ancient Grove',
    id: 'ancient-grove',
    description: 'A serene grove with towering ancient trees and a peaceful atmosphere.',
    resources: [
      { id: 'wood', type: 'wood', orb: 'natural', difficulty: 4, xpReward: 4 }
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['forest', 'jungle', 'swamp', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 8,
    autoTrigger: false
  },

  {
    name: 'Whispering Forest',
    id: 'whispering-forest',
    description: 'A forest where the trees seem to whisper secrets to those who listen.',
    resources: [
      { id: 'wood', type: 'wood', orb: 'natural', difficulty: 4, xpReward: 4 }
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['forest', 'jungle', 'swamp', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 8,
    autoTrigger: false
  },

  {
    name: 'Sacred Forest',
    id: 'sacred-forest',
    description: 'A holy forest protected by nature spirits and ancient magic.',
    resources: [
      { id: 'wood', type: 'wood', orb: 'natural', difficulty: 4, xpReward: 4 },
      { id: 'sacred-wood', type: 'wood', orb: 'natural', difficulty: 6, xpReward: 8 }
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['forest', 'jungle', 'swamp', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 8,
    autoTrigger: false
  },

  {
    name: 'Singing Wood',
    id: 'singing-wood',
    description: 'This forest is renowned for the melodies it produces.',
    resources: [
      { id: 'wood', type: 'wood', orb: 'natural', difficulty: 4, xpReward: 4 }
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['forest', 'jungle', 'swamp', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 8,
    autoTrigger: false
  },

  {
    name: 'Forest of Spirits',
    id: 'spirits-forest',
    description: 'It is said that in the Forest of Spirits one can speak with deceased friends... or enemies.',
    resources: [
      { id: 'wood', type: 'wood', orb: 'natural', difficulty: 4, xpReward: 4 },
      { id: 'dark-wood', type: 'wood', orb: 'natural', difficulty: 5, xpReward: 7 }
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['forest', 'jungle', 'swamp', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 8,
    autoTrigger: false
  },

  {
    name: 'Twilight Grove',
    id: 'twilight-grove',
    description: 'Perpetually bathed in twilight, with a soft glow.',
    resources: [
      { id: 'wood', type: 'wood', orb: 'natural', difficulty: 4, xpReward: 4 },
      { id: 'herbs', type: 'herbs', orb: 'natural', difficulty: 5, xpReward: 3 }
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['forest', 'jungle', 'swamp', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 8,
    autoTrigger: false
  },

  {
    name: 'Misty Woods',
    id: 'misty-woods',
    description: 'A forest shrouded in mist, where visibility is low.',
    resources: [
      { id: 'wood', type: 'wood', orb: 'natural', difficulty: 4, xpReward: 4 },
      { id: 'herbs', type: 'herbs', orb: 'natural', difficulty: 5, xpReward: 3 }
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['forest', 'jungle', 'swamp', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 8,
    autoTrigger: false
  },

  {
    name: 'Faerie Forest',
    id: 'faerie-forest',
    description: 'A whimsical forest inhabited by faeries.',
    resources: [
      { id: 'wood', type: 'wood', orb: 'natural', difficulty: 4, xpReward: 4 },
      { id: 'magic-dust', type: 'dust', orb: 'elemental', difficulty: 9, xpReward: 7 }
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['forest', 'jungle', 'swamp', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 8,
    autoTrigger: false
  },

  {
    name: 'Cursed Woods',
    id: 'cursed-woods',
    description: 'A dark forest said to be cursed.',
    resources: [
      { id: 'wood', type: 'wood', orb: 'natural', difficulty: 4, xpReward: 4 },
      { id: 'dark-wood', type: 'wood', orb: 'natural', difficulty: 5, xpReward: 7 }
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
    allowedTerrains: ['forest', 'jungle', 'swamp', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 8,
    autoTrigger: false
  }
];
