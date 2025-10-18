import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const SHRINE_TABLE: OverlayTemplate[] = [
  {
    name: 'Ancient Shrine',
    description: 'A weathered shrine dedicated to forgotten deities, still revered by locals.',
    icon: 'assets/overlays/shrine.png',
    actions: [ActionType.Pray, ActionType.Avoid],
  },
  {
    name: 'Moon Shrine',
    description: 'A shrine illuminated by moonlight, known for its mystical properties.',
    icon: 'assets/overlays/shrine.png',
    actions: [ActionType.Pray, ActionType.Avoid],
  },
  {
    name: 'Crystal Shrine',
    description: 'A shrine adorned with crystals, believed to enhance magical abilities.',
    icon: 'assets/overlays/shrine.png',
    actions: [ActionType.Pray, ActionType.Avoid],
  },
  {
    name: 'Gobelin Shrine',
    description: 'A small shrine built by goblins, dedicated to their trickster god.',
    icon: 'assets/overlays/shrine.png',
    actions: [ActionType.Pray, ActionType.Avoid],
  },
  {
    name: 'Necromantic Shrine',
    description: 'A dark shrine used for necromantic rituals, emanating an eerie aura.',
    icon: 'assets/overlays/shrine.png',
    actions: [ActionType.Pray, ActionType.Avoid],
  },
]