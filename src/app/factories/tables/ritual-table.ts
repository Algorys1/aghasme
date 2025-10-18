import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const RITUAL_TABLE: OverlayTemplate[] = [
  {
    name: 'Sacred Ritual Site',
    description: 'A place where ancient rituals were performed, still radiating spiritual energy.',
    icon: 'assets/overlays/ritual.png',
    actions: [ActionType.Avoid, ActionType.Talk],
  },
  {
    name: 'Dark Ritual Circle',
    description: 'A sinister site marked by dark symbols, hinting at forbidden practices. The ground itself seems to hum with lingering energy.',
    icon: 'assets/overlays/ritual.png',
    actions: [ActionType.Observe, ActionType.Avoid],
    eventChain: {
      floor_1: {
        title: 'Ritual Circle: Outer Ring',
        description: 'Candles flicker though no wind blows. The scent of burnt incense fills the air, and faint chanting echoes as if from beneath the earth.',
        actions: [ActionType.Explore, ActionType.Observe, ActionType.Avoid],
        next: 'floor_2',
      },
      floor_2: {
        title: 'Ritual Circle: Blood Altar',
        description: 'A stone altar stands at the center, stained with ancient blood. Strange runes glow faintly as you approach. You hear a whisper—soft, pleading, or perhaps tempting.',
        actions: [ActionType.Interact, ActionType.Pray, ActionType.Avoid],
        next: 'floor_3',
      },
      floor_3: {
        title: 'Ritual Circle: Awakening',
        description: 'The runes ignite in crimson light, and a spectral form begins to rise from the altar. The air shivers as the circle’s true master stirs from slumber.',
        actions: [ActionType.Fight, ActionType.Flee, ActionType.Avoid],
      },
    },
  },
  {
    name: 'Nature\'s Altar',
    description: 'An altar dedicated to nature spirits, surrounded by offerings and carvings.',
    icon: 'assets/overlays/ritual.png',
    actions: [ActionType.Avoid, ActionType.Talk],
  },
  {
    name: 'Celestial Observatory',
    description: 'A site aligned with the stars, used for celestial rituals and ceremonies.',
    icon: 'assets/overlays/ritual.png',
    actions: [ActionType.Avoid, ActionType.Talk],
  },
  {
    name: 'Elemental Shrine',
    description: 'A shrine dedicated to the elemental forces, with signs of recent activity.',
    icon: 'assets/overlays/ritual.png',
    actions: [ActionType.Avoid, ActionType.Talk],
  },
]