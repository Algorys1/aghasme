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
    resources: 'wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Continue, ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Dark Woods',
    id: 'dark-wood',
    description: 'A dense and shadowy forest, home to many dangers.',
    resources: 'wood:beast',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Continue, ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Ancient Grove',
    id: 'ancient-grove',
    description: 'A serene grove with towering ancient trees and a peaceful atmosphere.',
    resources: 'wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Continue, ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Whispering Forest',
    id: 'whispering-forest',
    description: 'A forest where the trees seem to whisper secrets to those who listen.',
    resources: 'wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Continue, ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Sacred Forest',
    id: 'sacred-forest',
    description: 'A holy forest protected by nature spirits and ancient magic.',
    resources: 'wood:sacred_wood',
    icon: 'assets/overlays/forest.png',
    actions: [ActionType.Continue, ActionType.Harvest, ActionType.Rest],
  },
]
