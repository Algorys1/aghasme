import {ActionType} from '../../models/actions';
import {OverlayTemplate} from '../../models/overlays.model';

export const SHRINE_TABLE: OverlayTemplate[] = [
  {
    name: 'Ancient Shrine',
    description: 'A weathered shrine dedicated to forgotten deities, still revered by locals.',
    icon: 'assets/overlays/shrine.png',
    id: 'ancient-shrine',
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
    id: 'moon-shrine',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Silver Descent',
        description: 'Moonlight cuts through the canopy, bathing the shrine in an ethereal glow. The air feels almost liquid.',
        actions: [ActionType.Observe, ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You raise your hands to the sky, invoking the moon\'s blessing.',
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
    id: 'crystal-shrine',
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
        description: 'At the chamber\'s center, a massive prism hums like a heartbeat. Faint runes swirl within.',
        actions: [ActionType.Pray, ActionType.Interact],
        encounter: {
          chance: 0.35,
          enemies: ['orb-mechanic'],
        },
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You align your elemental essence with the shrine\'s pulse.',
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
    id: 'gobelin-shrine',
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
        title: 'The Trickster\'s Jest',
        description: 'A goblin effigy grins wide, a bowl of coins before it. You sense a trap and a challenge.',
        actions: [ActionType.Pray, ActionType.Interact],
        encounter: {
          chance: 0.7,
          enemies: ['goblin-warrior', 'goblin-archer', 'goblin-shaman'],
          random: true,
        },
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You recite the goblins\' blessing, half chant, half insult.',
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
    id: 'necromantic-shrine',
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
  {
    name: 'The Moonlit Sanctuary',
    description: 'A marble terrace appears where there was nothing moments before, bathed in pale lunar light.',
    icon: 'assets/overlays/shrine.png',
    id: 'moonlit-sanctuary',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Silver Path',
        description: 'The moonlight seems solid here, forming a glowing trail toward a gate of silver leaves.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You feel a strange calm, as if your footsteps made no sound.',
          },
          [ActionType.Interact]: {
            description: 'You touch the gate; it hums like a heartbeat.',
            effects: [{ stat: 'xp', value: +3 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Guardian of Reflection',
        description: 'A spectral figure stands before a mirror pool. "This place shows not who you are, but who you hide."',
        actions: [ActionType.Observe, ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The pool reflects you perfectly, except your reflection is smiling.',
          },
          [ActionType.Interact]: {
            description: 'You kneel before the guardian, who extends a hand of light.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'Your reflection bows in turn. The guardian fades, whispering: "Go deeper."',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The pool ripples, your reflection frowns, disappointed.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You close your eyes. The moonlight dims slightly, then returns stronger.',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Echo Hall',
        description: 'Dozens of arches shimmer into being, each echoing your voice a fraction of a second late.',
        actions: [ActionType.Inspect, ActionType.Observe],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'Your echoes form sentences you never said.',
            effects: [{ stat: 'xp', value: +4 }],
          },
          [ActionType.Observe]: {
            description: 'In the last archway, you glimpse a figure identical to yourself, waiting.',
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'Trial of the Twin',
        description: 'Your mirror-self steps forward, eyes glowing silver. "One of us must fade."',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['temple-guardian'],
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Moon\'s Blessing',
        description: 'The air clears. The sanctuary dissolves back into starlight, only a faint crescent mark glows on your hand.',
        actions: [ActionType.Observe, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The mark hums faintly when you close your eyes.',
            effects: [{ stat: 'xp', value: +20 }, { stat: 'mp', value: +10 }],
          },
          [ActionType.Rest]: {
            description: 'You rest under invisible stars. Your heartbeat aligns with the rhythm of the night.',
            effects: [{ stat: 'hp', value: +6 }],
          },
        },
      },
    },
  },
  {
    name: 'The Grove of Remembrance',
    description: 'Ancient trees form a circle so perfect it feels deliberate. The air hums with the scent of forgotten rain.',
    icon: 'assets/overlays/shrine.png',
    id: 'grove-of-remembrance',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Singing Trees',
        description: 'Leaves rustle though no wind blows. Each movement creates a faint musical tone.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The grove hums like a choir, every branch tuned to the same rhythm.',
          },
          [ActionType.Interact]: {
            description: 'You touch one of the trunks; its bark is warm, almost pulsing.',
            effects: [{ stat: 'xp', value: +3 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Roots Beneath',
        description: 'The earth shifts beneath your feet. Something vast stirs below.',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You see faint light between the roots, veins of living magic.',
          },
          [ActionType.Pray]: {
            description: 'You whisper thanks to the earth.',
            check: { orb: 'natural', difficulty: 10 },
            onSuccess: {
              description: 'The ground sighs softly. You feel your heartbeat sync with the soil.',
              effects: [{ stat: 'hp', value: +6 }],
            },
            onFailure: {
              description: 'Roots tighten around your legs, the forest tests your sincerity.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Wooden Heart',
        description: 'A hollow tree stands before you, its trunk carved with runes of memory and grief.',
        actions: [ActionType.Interact, ActionType.Observe],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You reach into the hollow, something warm beats faintly inside.',
            check: { orb: 'natural', difficulty: 12 },
            onSuccess: {
              description: 'You pull out a glowing seed, pulsing with gentle rhythm.',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'The bark snaps shut on your hand, the forest groans.',
              next: 'floor_4',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Observe]: {
            description: 'Names are carved into the bark, some glowing faintly, others fading.',
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Forest\'s Guardian',
        description: 'A figure of bark and moss rises, holding a spear of roots. "You disturb sacred memory."',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['bear', 'elemental-earth'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Gift of Growth',
        description: 'When peace returns, the trees bloom in pale green light. The seed in your hand hardens into crystal.',
        actions: [ActionType.Observe, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You feel the forest\'s gratitude, and its warning.',
            effects: [{ stat: 'xp', value: +15 }, { stat: 'mp', value: +6 }],
          },
          [ActionType.Rest]: {
            description: 'You rest among roots that hum softly beneath your body.',
            effects: [{ stat: 'hp', value: +10 }],
          },
        },
      },
    },
  },
];
