import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export interface ForestTemplate extends OverlayTemplate {
  resources: string
}

export const FOREST_TABLE: ForestTemplate[] = [
  {
    name: 'Enchanted Forest',
    id: 'enchanted-forest',
    description: 'A mystical forest filled with magical creatures and glowing plants.',
    resources: 'wood:magic-wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Dark Woods',
    id: 'dark-wood',
    description: 'A dense and shadowy forest, home to many dangers.',
    resources: 'wood:dark-wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Ancient Grove',
    id: 'ancient-grove',
    description: 'A serene grove with towering ancient trees and a peaceful atmosphere.',
    resources: 'wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Whispering Forest',
    id: 'whispering-forest',
    description: 'A forest where the trees seem to whisper secrets to those who listen.',
    resources: 'wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Sacred Forest',
    id: 'sacred-forest',
    description: 'A holy forest protected by nature spirits and ancient magic.',
    resources: 'wood:sacred-wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Singing Wood',
    id: 'singing-wood',
    description: 'This forest is renowned for the melodies it produces. It is said that if you listen carefully, you can almost hear nature singing.',
    resources: 'wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Whispering Forest',
    id: 'whispering-forest',
    description: 'Strangely, this forest is very quiet. You can occasionally hear an animal creeping around, but the leaves don\'t rustle.',
    resources: 'wood:sacred-wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Twilight Grove',
    id: 'twilight-grove',
    description: 'This forest is perpetually bathed in twilight, with a soft, ethereal glow illuminating the trees and underbrush.',
    resources: 'wood:herbs',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Misty Woods',
    id: 'misty-woods',
    description: 'A forest shrouded in mist, where visibility is low and sounds are muffled.',
    resources: 'wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Faerie Forest',
    id: 'faerie-forest',
    description: 'A whimsical forest inhabited by faeries and other magical beings.',
    resources: 'wood:magic-dust',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Cursed Woods',
    id: 'cursed-woods',
    description: 'A dark forest said to be cursed, where travelers often lose their way.',
    resources: 'wood:dark-wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  }
]
