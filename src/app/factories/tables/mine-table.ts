import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export interface MineTemplate extends OverlayTemplate {
  resources: string
}

export const MINE_TABLE: MineTemplate[] = [
  {
    name: 'Abandoned Mine',
    id: 'abandoned-mine',
    description: 'An old mine, long forgotten and filled with danger.',
    resources: 'stone',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Continue, ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Active Mine',
    id: 'active-mine',
    description: 'A bustling mine with workers extracting valuable resources.',
    resources: 'stone:iron',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Continue, ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Crystal Cavern',
    id: 'crystal-cavern',
    description: 'A mine filled with glowing crystals and hidden treasures.',
    resources: 'stone:crystal',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Continue, ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Goblin Mine',
    id: 'goblin-mine',
    description: 'A mine overrun by goblins, beware of ambushes!',
    resources: 'stone:coal',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Continue, ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Dwarven Mine',
    id: 'dwarven-mine',
    description: 'A sturdy mine built by dwarves, known for its rich veins of ore.',
    resources: 'stone:coal',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Continue, ActionType.Harvest, ActionType.Rest],
  },
]
