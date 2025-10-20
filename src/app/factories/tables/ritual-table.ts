import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const RITUAL_TABLE: OverlayTemplate[] = [
  // {
  //   name: 'Sacred Ritual Site',
  //   description: 'A place where ancient rituals were performed, still radiating spiritual energy.',
  //   icon: 'assets/overlays/ritual.png',
  //   actions: [ActionType.Avoid, ActionType.Talk],
  // },
  {
    name: 'Dark Ritual Circle',
    description: 'A sinister site marked by dark symbols, hinting at forbidden practices. The ground itself seems to hum with lingering energy.',
    icon: 'assets/overlays/ritual.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Outer Ring',
        description: 'Candles flicker though no wind blows. The scent of burnt incense fills the air, and faint chanting echoes as if from beneath the earth.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You kneel by the runes. They pulse faintly, resonating with your heartbeat...',
            effects: [{ stat: 'hp', value: -2 }],
            onSuccess: {
              description: 'The whisper grows clearer, not hostile, merely... curious. You sense awareness within the stones.',
            }
          }
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Blood Altar',
        description: 'A stone altar stands at the center, stained with ancient blood. Strange runes glow faintly as you approach. You hear a whisper-soft, pleading, or perhaps tempting.',
        actions: [ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You place your hand upon the altar. It feels warm alive.',
            check: {
              orb: 'mechanic',
              difficulty: 11,
              modifier: 1,
            },
            onSuccess: {
              description: 'The blood sigils flare, then fade. The whisper thanks you before vanishing.',
              effects: [{ stat: 'xp', value: 10 }]
            },
            onFailure: {
              description: 'A searing pain shoots up your arm! The altar rejects your presence.',
              effects: [{ stat: 'hp', value: -5 }]
            }
          },
          [ActionType.Pray]: {
            description: 'You close your eyes and pray. The air hums with strange energy...',
            check: {
              orb: 'elemental',
              difficulty: 9
            },
            onSuccess: {
              description: 'You feel harmony with the forces here. Something within you strengthens.',
              effects: [{ stat: 'xp', value: 5 }]
            },
            onFailure: {
              description: 'Your prayer is swallowed by silence. The circle grows cold and still.',
            }
          }
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'Awakening',
        description: 'The runes ignite in crimson light, and a spectral form begins to rise from the altar. The air shivers as the circle\'s true master stirs from slumber.',
        actions: [ActionType.Fight, ActionType.Flee],
        disableQuit: true,
        encounter: {
          chance: 1,
          enemies: ['Skeleton', 'Disciple'],
          random: true
        }
      },
    },
  },
  // {
  //   name: 'Nature\'s Altar',
  //   description: 'An altar dedicated to nature spirits, surrounded by offerings and carvings.',
  //   icon: 'assets/overlays/ritual.png',
  //   actions: [ActionType.Avoid, ActionType.Talk],
  // },
  // {
  //   name: 'Celestial Observatory',
  //   description: 'A site aligned with the stars, used for celestial rituals and ceremonies.',
  //   icon: 'assets/overlays/ritual.png',
  //   actions: [ActionType.Avoid, ActionType.Talk],
  // },
  // {
  //   name: 'Elemental Shrine',
  //   description: 'A shrine dedicated to the elemental forces, with signs of recent activity.',
  //   icon: 'assets/overlays/ritual.png',
  //   actions: [ActionType.Avoid, ActionType.Talk],
  // },
]