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
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Active Mine',
    id: 'active-mine',
    description: 'A bustling mine with workers extracting valuable resources.',
    resources: 'stone:iron',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Crystal Cavern',
    id: 'crystal-cavern',
    description: 'A mine filled with glowing crystals and hidden treasures.',
    resources: 'stone:crystal',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Goblin Mine',
    id: 'goblin-mine',
    description: 'A mine overrun by goblins, beware of ambushes!',
    resources: 'stone:coal',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Dwarven Mine',
    id: 'dwarven-mine',
    description: 'A sturdy mine built by dwarves, known for its rich veins of ore.',
    resources: 'stone:coal',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Deep Shaft',
    id: 'deep-shaft',
    description: 'A deep mine shaft that descends far into the earth, filled with rare minerals.',
    resources: 'stone:iron:gem',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Haunted Mine',
    id: 'haunted-mine',
    description: 'A mine rumored to be haunted by the spirits of former miners.',
    resources: 'stone:soul-stone',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  },
  {
    name: 'Sunken Mine',
    id: 'sunken-mine',
    description: 'A mine partially flooded with water, making extraction difficult but rewarding.',
    resources: 'stone:iron:gem',
    icon: 'assets/overlays/mine.png',
    actions: [ActionType.Harvest, ActionType.Rest],
  }
]
