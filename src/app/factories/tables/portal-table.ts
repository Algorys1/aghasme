import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const PORTAL_TABLE: OverlayTemplate[] = [
  {
    name: 'Mystic Portal',
    description: 'A swirling portal of arcane energy, pulsing with magical power.',
    icon: 'assets/overlays/portal.png',
    actions: [ActionType.Interact, ActionType.Inspect, ActionType.Quit],
  },
  {
    name: 'Ancient Gateway',
    description: 'A stone archway inscribed with runes, leading to unknown realms.',
    icon: 'assets/overlays/portal.png',
    actions: [ActionType.Interact, ActionType.Inspect, ActionType.Quit],
  },
  {
    name: 'Dimensional Rift',
    description: 'A tear in the fabric of reality, revealing glimpses of other worlds.',
    icon: 'assets/overlays/portal.png',
    actions: [ActionType.Interact, ActionType.Inspect, ActionType.Quit],
  },
  {
    name: 'Celestial Gate',
    description: 'A radiant portal bathed in light, promising passage to heavenly places.',
    icon: 'assets/overlays/portal.png',
    actions: [ActionType.Interact, ActionType.Inspect, ActionType.Quit],
  },
  {
    name: 'Shadow Veil',
    description: 'A dark and foreboding portal, shrouded in shadows and mystery.',
    icon: 'assets/overlays/portal.png',
    actions: [ActionType.Interact, ActionType.Inspect, ActionType.Quit],
  },
]
