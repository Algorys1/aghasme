import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const RITUAL_TABLE: OverlayTemplate[] = [
  {
    name: 'Sacred Ritual Site',
    description: 'A place where ancient rituals were performed, still radiating spiritual energy.',
    icon: 'assets/overlays/ritual.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Circle of Stones',
        description: 'A ring of carved stones forms a perfect circle. Flowers grow between the cracks, untouched by time.',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You walk the perimeter, noticing faint inscriptions.',
            check: { orb: 'natural', difficulty: 8 },
            onSuccess: {
              description: 'The markings glow softly, revealing a blessing of vitality.',
              effects: [{ stat: 'hp', value: +4 }],
            },
            onFailure: {
              description: 'You trip over a root, snapping a flower stem. The air cools disapprovingly.',
            },
          },
          [ActionType.Pray]: {
            description: 'You kneel among the stones and whisper a simple prayer.',
            effects: [{ stat: 'mp', value: +3 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Heart of the Grove',
        description: 'A soft hum fills the air. In the center lies an ancient bowl filled with clear water.',
        actions: [ActionType.Interact],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You drink a handful of the sacred water.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'Warmth spreads through you, your spirit feels renewed.',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'The water tastes bitter, something inside you trembles briefly.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
      },
    },
  },
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
        encounter: {
          chance: 1,
          enemies: ['skeleton-warrior', 'disciple'],
          random: true,
        },
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You kneel by the runes. They pulse faintly, resonating with your heartbeat...',
            effects: [{ stat: 'hp', value: -2 }],
            onSuccess: {
              description: 'The whisper grows clearer, not hostile, merely curious. You sense awareness within the stones.',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Blood Altar',
        description: 'A stone altar stands at the center, stained with ancient blood. Strange runes glow faintly as you approach. You hear a whisper-soft, pleading, or perhaps tempting.',
        actions: [ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You place your hand upon the altar. It feels warm, alive.',
            check: { orb: 'mechanic', difficulty: 11, modifier: 1 },
            onSuccess: {
              description: 'The blood sigils flare, then fade. A whisper thanks you before vanishing.',
              effects: [{ stat: 'xp', value: 10 }],
            },
            onFailure: {
              description: 'A searing pain shoots up your arm! The altar rejects you.',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You close your eyes and pray. The air hums with strange energy...',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'You feel harmony with the forces here. Something within you strengthens.',
              effects: [{ stat: 'xp', value: 5 }],
            },
            onFailure: {
              description: 'Your prayer is swallowed by silence. The circle grows cold and still.',
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'Awakening',
        description: 'The runes ignite in crimson light, and a spectral form begins to rise from the altar.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['skeleton-warrior', 'disciple'],
          random: true,
        },
      },
    },
  },
  {
    name: "Nature's Altar",
    description: 'An altar dedicated to nature spirits, surrounded by lush moss and flickering fireflies.',
    icon: 'assets/overlays/ritual.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Whispering Grove',
        description: 'A wind stirs the leaves though the air is still. The scent of earth and sap overwhelms your senses.',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You notice claw marks on the altar, something wild has been here recently.',
            effects: [{ stat: 'xp', value: 3 }],
          },
          [ActionType.Pray]: {
            description: 'You place your hands on the bark-carved runes and speak softly.',
            check: { orb: 'natural', difficulty: 9 },
            onSuccess: {
              description: 'The ground trembles slightly, vines curl protectively around you.',
              effects: [{ stat: 'hp', value: +5 }],
            },
            onFailure: {
              description: 'Thorns prick your palms, nature rejects your touch.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Guardian’s Challenge',
        description: 'From the shadows emerges a massive boar spirit, eyes burning with primal defiance.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['wild-boar'],
        },
      },
    },
  },
  {
    name: 'Celestial Observatory',
    description: 'A site aligned with the stars, used for celestial rituals and ceremonies.',
    icon: 'assets/overlays/ritual.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Starlit Terrace',
        description: 'Massive mirrors and lenses point toward the heavens. A faint hum echoes as the stars align.',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You look through one of the cracked lenses.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'You glimpse constellations shifting, revealing a hidden sigil in the stars.',
              effects: [{ stat: 'xp', value: 8 }],
            },
            onFailure: {
              description: 'The lens flares blinding light, your eyes sting painfully.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You whisper a vow to the sky.',
            effects: [{ stat: 'mp', value: +4 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Astral Rift',
        description: 'The ground cracks, and light pours upward, something descends instead of rising.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['disciple', 'corrupt-sorcerer'],
          random: true,
        },
      },
    },
  },
  {
    name: 'Elemental Shrine',
    description: 'A shrine dedicated to the elemental forces, with signs of recent activity.',
    icon: 'assets/overlays/ritual.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Ritual of Balance',
        description: 'Four braziers burn in different colors, red, blue, green, and gold. One flickers weakly.',
        actions: [ActionType.Interact, ActionType.Observe],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You adjust the golden brazier.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'The flames synchronize, forming a perfect circle of light.',
              effects: [{ stat: 'xp', value: 6 }],
            },
            onFailure: {
              description: 'The flames roar up suddenly, singing your hair!',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Observe]: {
            description: 'The colors twist like serpents, beautiful and threatening.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Unstable Core',
        description: 'The air grows hot. Cracks of lightning flash across the stones. The shrine trembles violently.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['orb-mechanic', 'beetle-lava'],
          random: true,
        },
      },
    },
  },
  {
    name: 'The Eclipse Rite',
    description: 'A vast stone circle bathed in twilight, where the sun and moon share the same sky. Ancient chants echo from unseen throats.',
    icon: 'assets/overlays/ritual.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Twilight Gathering',
        description: 'Dozens of hooded silhouettes sway in rhythm. The horizon glows faintly purple, neither dawn nor dusk.',
        actions: [ActionType.Observe, ActionType.Talk],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You feel pulled by two forces, warmth from one side, chill from the other.',
          },
          [ActionType.Talk]: {
            description: 'You whisper to one of the figures, but they chant in unison, ignoring you.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Altar of Duality',
        description: 'At the center lies an obsidian altar split in two halves, one scorched black, one pale as bone.',
        actions: [ActionType.Interact, ActionType.Inspect],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You place your hand between light and shadow.',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'Both sides pulse, your body vibrates with opposing energy.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'A jolt surges through you, your vision blurs in white and black.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Inspect]: {
            description: 'Runes spiral around the altar: "Unity through division. Harmony through pain."',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Eclipse Approaches',
        description: 'The air darkens unnaturally fast. The hooded figures raise their arms, the sun trembles.',
        actions: [ActionType.Pray, ActionType.Interact],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You whisper a plea to the heavens, the sky does not answer.',
          },
          [ActionType.Interact]: {
            description: 'You mirror their gesture, something stirs inside you.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'A perfect eclipse forms overhead, a halo of fire around darkness.',
              effects: [{ stat: 'xp', value: +10 }],
            },
            onFailure: {
              description: 'You feel faint, reality seems to stretch like fabric.',
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Avatar of Balance',
        description: 'The figures collapse. From the altar rises a being of pure twilight, half light, half shadow.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['elemental-air', 'elemental-fire'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Afterglow of the Eclipse',
        description: 'The sky clears. A faint, shimmering ring lingers in the heavens, marking the spot where day and night once kissed.',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The ring hums softly, you feel calm and sharp all at once.',
            effects: [{ stat: 'xp', value: +20 }, { stat: 'mp', value: +8 }],
          },
          [ActionType.Pray]: {
            description: 'You thank the silent heavens, and feel them briefly answer.',
            effects: [{ stat: 'hp', value: +6 }],
          },
        },
      },
    },
  },
  {
    name: 'The Thousand Hands Ceremony',
    description: 'An underground hall lined with statues of monks, each holding a candle. Their eyes gleam faintly in the dark.',
    icon: 'assets/overlays/ritual.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Hall of Quiet Flame',
        description: 'A low chant fills the chamber, but there’s no one here. The candles flicker in unison.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You realize every statue has a unique expression, sorrow, rage, fear.',
          },
          [ActionType.Interact]: {
            description: 'You light a candle that has gone out.',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'The nearest statue’s eyes brighten, it almost smiles.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'Wax melts across your hand, the flame hisses angrily.',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Whisper of Stone',
        description: 'A murmur runs through the hall, hundreds of lips carved in marble whisper your name.',
        actions: [ActionType.Pray, ActionType.Observe],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You bow instinctively, the whisper stops for a moment.',
          },
          [ActionType.Observe]: {
            description: 'The statues’ hands have shifted slightly, all pointing toward the central dais.',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Central Idol',
        description: 'A towering figure with a thousand arms rises before you, each hand holding a tool, a flame, or a weapon.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You count the hands. When you look back, the number has changed.',
          },
          [ActionType.Interact]: {
            description: 'You touch the base of the statue, the entire hall trembles.',
            check: { orb: 'mechanic', difficulty: 12 },
            onSuccess: {
              description: 'The idol lowers one hand and offers a glowing pearl.',
              effects: [{ stat: 'xp', value: +10 }],
            },
            onFailure: {
              description: 'A crack splits the idol’s chest, dust pours out like blood.',
              next: 'floor_4',
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Hand of Judgement',
        description: 'The statues rise from their pedestals, moving with creaking grace, silent, purposeful.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['golem-mechanic', 'elemental-earth'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'The Last Candle',
        description: 'Only one flame remains, burning atop the shattered idol. The air smells of stone and incense.',
        actions: [ActionType.Observe, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The flame folds inward, forming a pearl of wax. You pocket it.',
            effects: [{ stat: 'xp', value: +18 }, { stat: 'mp', value: +6 }],
          },
          [ActionType.Rest]: {
            description: 'You breathe calmly, feeling watched, but at peace.',
            effects: [{ stat: 'hp', value: +8 }],
          },
        },
      },
    },
  },
];
