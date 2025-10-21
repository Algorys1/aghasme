import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const ANOMALY_TABLE: OverlayTemplate[] = [
  {
    name: 'Temporal Rift',
    description: 'A distortion in the air flickers like a wound in reality. The landscape bends and folds upon itself.',
    icon: 'assets/overlays/anomaly.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Frozen Moment',
        description: 'Birds hang motionless midair. Even your heartbeat seems delayed. The world moves a half-second too slow.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You watch a raindrop suspended before your eyes.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'Time resumes for a heartbeat, you see glimpses of yourself standing elsewhere.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The distortion flares, your mind reels from the paradox.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You reach toward the ripple, the air resists your hand like thick glass.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Echo of the Past',
        description: 'A familiar figure stands before you, it’s you, or rather, a version that shouldn’t exist.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['disciple'],
        },
      },
    },
  },
  {
    name: 'Infernal Surge',
    description: 'The air burns red; cracks in the ground emit faint screams. Something beneath the crust struggles to escape.',
    icon: 'assets/overlays/anomaly.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Blistered Ground',
        description: 'The earth pulses with molten veins. You can almost hear a heartbeat under the soil.',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You study the fissures closely, the glow responds to your movement.',
          },
          [ActionType.Pray]: {
            description: 'You whisper a warding chant.',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'The air cools momentarily, the anomaly weakens.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'A burst of heat sears your arm. Something stirs below.',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Infernal Gate',
        description: 'A tear opens, revealing shifting shadows and a smile of fire.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['demon-of-ashes'],
        },
      },
    },
  },
  {
    name: 'Mechanical Distortion',
    description: 'Ruins of ancient machines twist around a humming sphere. Sparks jump through the air with rhythmic precision.',
    icon: 'assets/overlays/anomaly.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Echoing Halls',
        description: 'Broken gears and bronze pillars hum with a life of their own. The air smells of ozone and oil.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You notice patterns in the hum, it’s almost musical.',
          },
          [ActionType.Interact]: {
            description: 'You approach the core fragment cautiously.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'You stabilize a fragment of power, energy flows in reverse, harmlessly dissipating.',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'Sparks leap to your fingers, leaving a painful burn.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Core Awakening',
        description: 'The machine’s heart flickers, the orb reactivates, scanning for threats.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['orb-mechanic'],
        },
      },
    },
  },
  {
    name: 'Corrupted Grove',
    description: 'Once serene, the forest here trembles under a dark influence. Trees twist unnaturally, sap runs black.',
    icon: 'assets/overlays/anomaly.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Black Roots',
        description: 'You step over roots that pulse faintly like veins. The air smells of rot and incense.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You see runes carved into tree bark, oozing sap like blood.',
            effects: [{ stat: 'xp', value: +4 }],
          },
          [ActionType.Interact]: {
            description: 'You touch the nearest root, it twitches violently!',
            effects: [{ stat: 'hp', value: -2 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Heart of Corruption',
        description: 'At the grove’s center, a pulsating cocoon of vines throbs with malign light.',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You study the cocoon’s rhythm, it beats like a heart.',
          },
          [ActionType.Pray]: {
            description: 'You call on the forest’s true spirit to resist the corruption.',
            check: { orb: 'natural', difficulty: 10 },
            onSuccess: {
              description: 'A burst of green light pierces the cocoon, the forest gasps in relief.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The vines tighten around your feet, the corruption answers instead.',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Twisted Spirit',
        description: 'From the cocoon bursts a massive, moss-covered spider screeching with hatred.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['mossy-spider'],
        },
      },
    },
  },
  {
    name: 'Ancestral Echo',
    description: 'You stumble upon a stone circle half-buried in ash. Whispers rise with the wind, names of the forgotten.',
    icon: 'assets/overlays/anomaly.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Circle of Names',
        description: 'The stones hum softly. Every step you take echoes twice, once in sound, once in memory.',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You study the symbols. They belong to no known language.',
          },
          [ActionType.Pray]: {
            description: 'You repeat one of the whispered names.',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'A warmth fills your chest, the spirit acknowledges you briefly.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'The air freezes, a shadow stirs behind the stones.',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Spirit Manifestation',
        description: 'A translucent form coalesces, eyes empty but full of intent.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['lost-soul', 'ghost'],
          random: true,
        },
      },
    },
  },
  {
    name: 'Ash Breach',
    description: 'The sky above splits open, bleeding fire and smoke. The air trembles with the echo of ancient fury.',
    icon: 'assets/overlays/anomaly.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Field of Cinders',
        description: 'Black ash covers the ground. Each step releases a puff of smoke that smells of burnt iron.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You kneel, scooping a handful of ash, it glows faintly between your fingers.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'The ash reacts to your essence, forming glowing sigils before fading.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The ash seeps into your skin, it burns with a whisper of pain.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You press your hand to the warm ground; it beats faintly, like a living heart.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Crumbling Sanctum',
        description: 'You find remnants of an old temple, its runes glowing faintly red beneath the soot. Heat distorts your vision.',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You examine the runes, tracing their shapes through the dust.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'You decipher the pattern, it’s a seal, restraining something below.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'The rune flashes and cracks violently, your vision blurs.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You attempt a purification prayer to reinforce the seal.',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'The hum stabilizes, the heat lessens for a brief moment.',
            },
            onFailure: {
              description: 'Your words twist into smoke, the seal begins to fracture.',
              next: 'floor_3',
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Breach Opens',
        description: 'A violent tremor splits the floor. Lava spills from the cracks, and screams echo from below.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You glimpse forms writhing within the molten flow, shapes of things that shouldn’t live.',
          },
          [ActionType.Interact]: {
            description: 'You try to stabilize the seal by pouring your energy into the breach.',
            check: { orb: 'elemental', difficulty: 13 },
            onSuccess: {
              description: 'The crack seals partially, but the power backlash throws you backward.',
              effects: [{ stat: 'hp', value: -2 }, { stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'Your body convulses as the infernal surge overwhelms you.',
              effects: [{ stat: 'hp', value: -6 }],
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'Infernal Descent',
        description: 'From the molten breach rises a creature of flame and shadow, scales dripping molten tears.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['drake-of-ashes', 'elemental-fire'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Ashes and Silence',
        description: 'The breach cools to stone. The air still hums faintly, as if the world itself remembers.',
        actions: [ActionType.Rest, ActionType.Observe],
        actionPassive: {
          [ActionType.Rest]: {
            description: 'You sit among the blackened stones, the heat slowly leaving your skin.',
            effects: [{ stat: 'hp', value: +5 }, { stat: 'xp', value: +6 }],
          },
          [ActionType.Observe]: {
            description: 'You stare into the still-red cracks, for a moment, they pulse again.',
          },
        },
      },
    },
  },
  {
    name: 'Rift of Echoes',
    description: 'A trembling fissure hums in the air, like the resonance of an invisible bell. Sound seems twisted here.',
    icon: 'assets/overlays/anomaly.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Shattered Silence',
        description: 'The ground vibrates faintly. Every step echoes a second later, not in space, but in time.',
        actions: [ActionType.Observe, ActionType.Inspect],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You hold your breath, even silence has weight here.',
          },
          [ActionType.Inspect]: {
            description: 'The fissure responds to your movement, widening slightly.',
            effects: [{ stat: 'xp', value: +4 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Voice of the Rift',
        description: 'A whisper echoes from within, your own voice, answering questions you never asked.',
        actions: [ActionType.Talk, ActionType.Pray],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You speak aloud. The rift repeats your words, then adds: “Come closer.”',
            effects: [{ stat: 'mp', value: -2 }],
          },
          [ActionType.Pray]: {
            description: 'You close your eyes, focusing your mind to resist the pull.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'The vibration calms, the echo fades slightly.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'Your head rings painfully, you stumble forward.',
              next: 'floor_3',
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Resonant Field',
        description: 'You find a circular platform of floating stones, humming in perfect harmony. A crystal pulsates at its center.',
        actions: [ActionType.Interact, ActionType.Inspect],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You reach for the crystal, your reflection vibrates before touching it.',
            check: { orb: 'mechanic', difficulty: 12 },
            onSuccess: {
              description: 'You stabilize the resonance, the platform stops spinning.',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'The platform collapses, you fall through light.',
              effects: [{ stat: 'hp', value: -5 }],
              next: 'floor_4',
            },
          },
          [ActionType.Inspect]: {
            description: 'You note that the runes around the crystal represent “balance” and “memory.”',
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'Manifestation of the Rift',
        description: 'A luminous being forms from vibrating shards of sound, it looks both alive and unfinished.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['elemental-air', 'elemental-water'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Harmony Restored',
        description: 'The echoes fade. The fissure closes with a deep, final note that resonates through your bones.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'A faint tone lingers in your ears, the sound of the world, healed.',
            effects: [{ stat: 'xp', value: +15 }, { stat: 'mp', value: +8 }],
          },
        },
      },
    },
  },
  {
    name: 'The Ashen Convergence',
    description: 'The horizon folds in on itself, ash floats upward like reversed rain. You feel two worlds overlapping.',
    icon: 'assets/overlays/anomaly.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Burning Sky',
        description: 'The light is wrong. Shadows burn brighter than the fire itself.',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You look around, even your own outline flickers like smoke.',
          },
          [ActionType.Pray]: {
            description: 'You kneel and whisper a plea to whatever still listens here.',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'The air responds, the heat momentarily lessens.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'A gust of fire swirls, the dust scorches your face.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Twin Suns',
        description: 'Two glowing orbs float overhead, their light bending and merging into a spiral.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You realize one sun casts warmth, the other cold. They’re fighting for dominance.',
          },
          [ActionType.Interact]: {
            description: 'You raise your hand, caught between heat and frost.',
            check: { orb: 'mechanic', difficulty: 12 },
            onSuccess: {
              description: 'You balance their pull, the spiral stabilizes.',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'The suns flare violently, you’re thrown backward.',
              next: 'floor_3',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Rift Guardian',
        description: 'A colossal silhouette emerges from the spiral, a being of fire and cinder with ember eyes.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['demon-of-ashes', 'drake-of-ashes'],
          random: true,
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'Collapse of the Convergence',
        description: 'The suns collide, shattering into showers of burning glass. The world goes white.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You awaken among cooling embers. The ground glows faintly beneath your feet.',
            effects: [{ stat: 'xp', value: +20 }, { stat: 'hp', value: +10 }],
          },
        },
      },
    },
  },
];
