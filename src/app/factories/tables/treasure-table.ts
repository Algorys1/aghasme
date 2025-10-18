import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const TREASURE_TABLE: OverlayTemplate[] = [
  {
    name: 'Hidden Cache',
    description: 'A concealed stash of valuables, waiting to be discovered.',
    icon: 'assets/overlays/treasure.png',
    actions: [ActionType.Interact, ActionType.Inspect, ActionType.Avoid],
  },
  {
    name: 'Buried Chest',
    description: 'An old chest buried underground, filled with gold and jewels.',
    icon: 'assets/overlays/treasure.png',
    actions: [ActionType.Interact, ActionType.Inspect, ActionType.Avoid],
  },
  {
    name: 'Forgotten Hoard',
    description: 'A hoard of treasures left behind by ancient adventurers.',
    icon: 'assets/overlays/treasure.png',
    actions: [ActionType.Interact, ActionType.Inspect, ActionType.Avoid],
  },
  {
    name: 'Mystic Relic',
    description: 'A relic imbued with magical properties, highly sought after.',
    icon: 'assets/overlays/treasure.png',
    actions: [ActionType.Interact, ActionType.Inspect, ActionType.Avoid],
  },
  {
    name: 'Cursed Treasure',
    description: 'A treasure rumored to be cursed, bringing misfortune to its finder.',
    icon: 'assets/overlays/treasure.png',
    actions: [ActionType.Interact, ActionType.Inspect, ActionType.Avoid],
  },
]