import {ActionType} from '../../models/actions';
import {OverlayTemplate} from '../../models/overlays.model';

export const SHRINE_TABLE: OverlayTemplate[] = [
  {
    name: 'Ancient Shrine',
    description: 'A weathered shrine dedicated to forgotten deities, still revered by locals.',
    icon: 'assets/overlays/shrine.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Whispering Stones',
        description: 'The air vibrates softly as you step between cracked pillars. Faint symbols shimmer beneath the moss.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You study the moss-covered runes, trying to grasp their meaning.',
            check: { orb: 'natural', difficulty: 9 },
            onSuccess: {
              description: 'You sense harmony, the stones seem to breathe in unison with you.',
              effects: [{ stat: 'xp', value: 5 }],
            },
            onFailure: {
              description: 'The symbols twist in your mind, giving you a dull headache.',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You push aside the moss and find a small hole between two stones. Something glints inside.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'You extract a small bronze amulet, still warm to the touch.',
              effects: [{ stat: 'gold', value: +10 }],
            },
            onFailure: {
              description: 'A puff of dust blinds you for a moment, the mechanism collapses.',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Chamber of Echoes',
        description: 'Beyond a narrow arch lies a chamber where sound carries unnaturally. Each breath feels heard.',
        actions: [ActionType.Pray, ActionType.Inspect],
        encounter: {
          chance: 0.25,
          enemies: ['golem-mechanic'],
          random: false,
        },
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You kneel between the echoes, offering a moment of silence.',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'A deep hum responds, calm energy seeps into your chest.',
              effects: [{ stat: 'hp', value: +4 }, { stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'Only your heartbeat answers you.',
            },
          },
          [ActionType.Inspect]: {
            description: 'You notice faint traces of offerings, small tokens left by past travelers.',
            effects: [{ stat: 'gold', value: +5 }],
          },
        },
      },
    },
  },
  {
    name: 'Moon Shrine',
    description: 'A shrine illuminated by moonlight, known for its mystical properties.',
    icon: 'assets/overlays/shrine.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Silver Descent',
        description: 'Moonlight cuts through the canopy, bathing the shrine in an ethereal glow. The air feels almost liquid.',
        actions: [ActionType.Observe, ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You raise your hands to the sky, invoking the moon’s blessing.',
            check: { orb: 'natural', difficulty: 8 },
            onSuccess: {
              description: 'A cool breeze wraps around you, refreshing your spirit.',
              effects: [{ stat: 'mp', value: +5 }],
            },
            onFailure: {
              description: 'The wind dies down, leaving a heavy stillness.',
              effects: [{ stat: 'mp', value: -2 }],
            },
          },
          [ActionType.Observe]: {
            description: 'You tilt your head, the moonlight seems to bend around your body.',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'You glimpse your reflection standing still even as you move. A blessing or a warning?',
              effects: [{ stat: 'xp', value: 6 }],
            },
            onFailure: {
              description: 'The sight makes you dizzy. The world spins briefly.',
              effects: [{ stat: 'mp', value: -4 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You run your hand across the marble. A soft hum vibrates through your palm.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Mirror Pool',
        description: 'A round basin mirrors the moon perfectly, even though clouds now hide the sky.',
        actions: [ActionType.Interact, ActionType.Pray],
        encounter: {
          chance: 0.4,
          enemies: ['lost-soul'],
          random: true,
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You reach for the surface of the water.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'Your hand passes through illusion, revealing a hidden compartment beneath.',
              effects: [{ stat: 'gold', value: +12 }],
            },
            onFailure: {
              description: 'The reflection smiles back, but it is not your face.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You whisper a lunar invocation.',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'A faint glow envelops you, soothing your mind.',
              effects: [{ stat: 'mp', value: +6 }],
            },
            onFailure: {
              description: 'The light fades. A cold unease lingers.',
            },
          },
        },
      },
    },
  },
  {
    name: 'Crystal Shrine',
    description: 'A shrine adorned with crystals, believed to enhance magical abilities.',
    icon: 'assets/overlays/shrine.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Prismatic Descent',
        description: 'Rays scatter into rainbows as you step into the crystalline cavern. A low hum fills your ears.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You analyze the broken shards, each hums at a slightly different pitch.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'You identify a resonant pattern and align two shards. The sound clears your thoughts.',
              effects: [{ stat: 'xp', value: 6 }],
            },
            onFailure: {
              description: 'The vibrations clash violently, your vision blurs momentarily.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You tap a crystal. The tone it emits is pure and unsettlingly alive.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Resonance Heart',
        description: 'At the chamber’s center, a massive prism hums like a heartbeat. Faint runes swirl within.',
        actions: [ActionType.Pray, ActionType.Interact],
        encounter: {
          chance: 0.35,
          enemies: ['orb-mechanic'],
        },
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You align your elemental essence with the shrine’s pulse.',
            check: { orb: 'elemental', difficulty: 13 },
            onSuccess: {
              description: 'The rhythm syncs perfectly, energy floods your veins.',
              effects: [{ stat: 'mp', value: +10 }, { stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'The hum intensifies, disorienting you completely.',
              effects: [{ stat: 'mp', value: -5 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You brush your hand against the prism surface, it feels like touching lightning.',
          },
        },
      },
    },
  },
  {
    name: 'Gobelin Shrine',
    description: 'A small shrine built by goblins, dedicated to their trickster god.',
    icon: 'assets/overlays/shrine.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Totems of Mischief',
        description: 'Totems made from bones and rusted spoons spin in the wind, cackling faintly.',
        actions: [ActionType.Interact, ActionType.Observe],
        encounter: {
          chance: 0.5,
          enemies: ['goblin-warrior', 'goblin-archer', 'goblin-shaman'],
          random: true,
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You poke one of the totems to stop its spinning.',
            check: { orb: 'mechanic', difficulty: 8 },
            onSuccess: {
              description: 'The totem stops... then sneezes glitter in your face.',
              effects: [{ stat: 'xp', value: 4 }],
            },
            onFailure: {
              description: 'It bursts into foul smoke, and your eyes sting.',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
          [ActionType.Observe]: {
            description: 'You realize every totem is positioned like eyes, watching the central altar.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Trickster’s Jest',
        description: 'A goblin effigy grins wide, a bowl of coins before it. You sense a trap and a challenge.',
        actions: [ActionType.Pray, ActionType.Interact],
        encounter: {
          chance: 0.7,
          enemies: ['goblin-warrior', 'goblin-archer', 'goblin-shaman'],
          random: true,
        },
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You recite the goblins’ blessing, half chant, half insult.',
            check: { orb: 'bestial', difficulty: 9 },
            onSuccess: {
              description: 'The effigy snickers. A strange warmth fills your chest, confidence, or foolishness.',
              effects: [{ stat: 'attack', value: +1 }, { stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The laughter turns mocking. You feel oddly clumsy.',
              effects: [{ stat: 'defense', value: -1 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You drop a coin into the bowl. The shrine rattles approvingly, or hungrily.',
            effects: [{ stat: 'gold', value: -1 }],
          },
        },
      },
    },
  },
  {
    name: 'Necromantic Shrine',
    description: 'A dark shrine used for necromantic rituals, emanating an eerie aura.',
    icon: 'assets/overlays/shrine.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Veins of Bone',
        description: 'Bones form the foundation of the altar. The earth pulses faintly beneath your boots.',
        actions: [ActionType.Observe, ActionType.Interact],
        encounter: {
          chance: 0.5,
          enemies: ['skeleton-archer', 'skeleton-warrior', 'skeleton-mage'],
          random: true,
        },
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You study the runes carved into femurs. They twitch under your gaze.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'The bones whisper an oath of endurance, your body feels heavier, yet stronger.',
              effects: [{ stat: 'maxHp', value: +2 }],
            },
            onFailure: {
              description: 'A wave of nausea grips you. The dead disapprove.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You nudge a skull aside; a faint rattling answers from the darkness below.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Hollow Core',
        description: 'A cracked sarcophagus stands upright, sealed by a bone key that glows faintly.',
        actions: [ActionType.Interact, ActionType.Pray],
        encounter: {
          chance: 0.8,
          enemies: ['skeleton-archer', 'skeleton-warrior', 'skeleton-mage'],
          random: true,
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You attempt to turn the bone key.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'The lock yields. Inside lies a scroll wrapped in black silk.',
              effects: [{ stat: 'xp', value: 10 }],
            },
            onFailure: {
              description: 'A shriek bursts from the coffin, the air turns freezing cold.',
              effects: [{ stat: 'hp', value: -6 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You murmur a blessing for the souls trapped here.',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'A gentle light flickers within the cracks, something finds peace.',
              effects: [{ stat: 'defense', value: +1 }],
            },
            onFailure: {
              description: 'Your words echo hollow. The darkness grows thicker.',
            },
          },
        },
      },
    },
  },
];
