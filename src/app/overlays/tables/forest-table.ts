import { ActionType } from '../models/actions';
import { OverlayTemplate } from '../models/overlays.model';

export const FOREST_TABLE: OverlayTemplate[] = [
  {
    name: 'Enchanted Forest',
    id: 'enchanted-forest',
    description: 'A mystical forest filled with magical creatures and glowing plants.',
    resources: [
      {
        id: 'wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 4,
        xpReward: 4,
      },
      {
        id: 'sacred-wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 6,
        xpReward: 8,
      },
      {
        id: 'dark-wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 5,
        xpReward: 7,
      },
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Dark Woods',
    id: 'dark-wood',
    description: 'A dense and shadowy forest, home to many dangers.',
    resources: [
      {
        id: 'wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 4,
        xpReward: 4,
      },
      {
        id: 'dark-wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 5,
        xpReward: 7,
      },
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Ancient Grove',
    id: 'ancient-grove',
    description: 'A serene grove with towering ancient trees and a peaceful atmosphere.',
    resources: [
      {
        id: 'wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 4,
        xpReward: 4,
      },
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Whispering Forest',
    id: 'whispering-forest',
    description: 'A forest where the trees seem to whisper secrets to those who listen.',
    resources: [
      {
        id: 'wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 4,
        xpReward: 4,
      },
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Sacred Forest',
    id: 'sacred-forest',
    description: 'A holy forest protected by nature spirits and ancient magic.',
    resources: [
      {
        id: 'wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 4,
        xpReward: 4,
      },
      {
        id: 'sacred-wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 6,
        xpReward: 8,
      },
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Singing Wood',
    id: 'singing-wood',
    description: 'This forest is renowned for the melodies it produces. It is said that if you listen carefully, you can almost hear nature singing.',
    resources: [
      {
        id: 'wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 4,
        xpReward: 4,
      },
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Whispering Forest',
    id: 'whispering-forest',
    description: 'Strangely, this forest is very quiet. You can occasionally hear an animal creeping around, but the leaves don\'t rustle.',
    resources: [
      {
        id: 'wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 4,
        xpReward: 4,
      },
      {
        id: 'sacred-wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 6,
        xpReward: 8,
      },
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Twilight Grove',
    id: 'twilight-grove',
    description: 'This forest is perpetually bathed in twilight, with a soft, ethereal glow illuminating the trees and underbrush.',
    resources: [
      {
        id: 'wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 4,
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
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Misty Woods',
    id: 'misty-woods',
    description: 'A forest shrouded in mist, where visibility is low and sounds are muffled.',
    resources: [
      {
        id: 'wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 4,
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
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Faerie Forest',
    id: 'faerie-forest',
    description: 'A whimsical forest inhabited by faeries and other magical beings.',
    resources: [
      {
        id: 'wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 4,
        xpReward: 4,
      },
      {
        id: 'magic-dust',
        type: 'dust',
        orb: 'elemental',
        difficulty: 9,
        xpReward: 7,
      },
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Cursed Woods',
    id: 'cursed-woods',
    description: 'A dark forest said to be cursed, where travelers often lose their way.',
    resources: [
      {
        id: 'wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 4,
        xpReward: 4,
      },
      {
        id: 'dark-wood',
        type: 'wood',
        orb: 'natural',
        difficulty: 5,
        xpReward: 7,
      },
    ],
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  }
]
