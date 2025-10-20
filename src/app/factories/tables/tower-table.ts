import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const TOWER_TABLE: OverlayTemplate[] = [

  {
    name: "Mage's Spire",
    description: 'The Mage’s Spire pierces the clouds, its summit crackling with arcane energy and whispered secrets.',
    icon: 'assets/overlays/tower.png',
    actions: [ActionType.Rest],
    eventChain: {
      floor_1: {
        title: 'Spiral Ascent',
        description: 'The stairs twist endlessly upward. Wind whistles through cracks in the stone, carrying voices that sound almost human.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You look out through a broken window, clouds roll beneath you.',
          },
          [ActionType.Interact]: {
            description: 'You touch an engraved sigil on the wall. The air around you vibrates faintly.',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'The rune flares with light, restoring your strength.',
              effects: [{ stat: 'mp', value: +5 }],
            },
            onFailure: {
              description: 'The sigil emits a sharp hum, your hand goes numb.',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Library of Winds',
        description: 'Shelves float midair, anchored by invisible magic. Torn pages drift like leaves.',
        actions: [ActionType.Inspect, ActionType.Interact],
        encounter: {
          chance: 0.3,
          enemies: ['air_elemental'],
        },
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You read fragments of a spellbook.',
            effects: [{ stat: 'xp', value: +5 }],
          },
          [ActionType.Interact]: {
            description: 'You catch a drifting page glowing faintly.',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'It fuses with your aura, a minor wind blessing takes hold.',
              effects: [{ stat: 'defense', value: +1 }],
            },
            onFailure: {
              description: 'The page bursts into harmless sparks.',
            },
          },
        },
      },
    },
  },
  {
    name: "Wizard's Keep",
    description: 'Wizard’s Keep looms in eerie silence, its halls echoing with the remnants of long-forgotten spells.',
    icon: 'assets/overlays/tower.png',
    actions: [ActionType.Pray],
    eventChain: {
      floor_1: {
        title: 'The Sealed Hall',
        description: 'You enter a wide hall lined with petrified figures, their faces frozen in fear.',
        actions: [ActionType.Observe, ActionType.Interact],
        encounter: {
          chance: 0.25,
          enemies: ['arcane_warden'],
        },
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You recognize faint magical residue, a failed protection spell perhaps.',
            effects: [{ stat: 'xp', value: 3 }],
          },
          [ActionType.Interact]: {
            description: 'You brush dust off one of the statues.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'A small amulet falls from its hand, surprisingly warm.',
              effects: [{ stat: 'gold', value: +10 }],
            },
            onFailure: {
              description: 'The statue’s eye cracks and leaks a faint red mist.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Sanctum of Echoes',
        description: 'A circular chamber hums softly. The walls are inscribed with glowing glyphs that flicker as you approach.',
        actions: [ActionType.Inspect, ActionType.Pray],
        encounter: {
          chance: 0.4,
          enemies: ['living_spell'],
        },
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You trace the lines of a glyph with your finger.',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'The glyph responds to your essence, new understanding floods your mind.',
              effects: [{ stat: 'xp', value: 8 }],
            },
            onFailure: {
              description: 'A jolt of mana backlash singes your nerves.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You focus, letting the vibrations align with your breathing.',
            effects: [{ stat: 'mp', value: +5 }],
          },
        },
      },
    },
  },
  {
    name: 'Arcane Tower',
    description: 'The Arcane Tower hums with unseen power, its runes glowing faintly in the twilight.',
    icon: 'assets/overlays/tower.png',
    actions: [ActionType.Interact],
    eventChain: {
      floor_1: {
        title: 'The Lower Engine',
        description: 'Pillars crackle with static discharge. The air smells of ozone and scorched parchment.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You notice a conduit running up the wall, it’s pulsating faintly.',
          },
          [ActionType.Interact]: {
            description: 'You attempt to stabilize a nearby runic focus.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'The hum steadies. A faint calm overtakes the tower’s chaos.',
              effects: [{ stat: 'xp', value: 5 }],
            },
            onFailure: {
              description: 'The focus explodes in sparks, you barely dodge the blast.',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Resonance Core',
        description: 'A rotating crystal of immense size dominates the chamber, its rhythm irregular, unstable.',
        actions: [ActionType.Pray, ActionType.Interact],
        encounter: {
          chance: 0.45,
          enemies: ['arcane_construct'],
        },
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You align your breathing to the crystal’s oscillation.',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'You resonate with its flow, fragments of knowledge enter your mind.',
              effects: [{ stat: 'mp', value: +8 }],
            },
            onFailure: {
              description: 'The frequency becomes unbearable. You fall to your knees, dizzy.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You touch the crystal. It feels like liquid lightning.',
          },
        },
      },
      floor_3: {
        title: 'Summoning Apex',
        description: 'At the very top, sigils float midair. A faint silhouette watches from the corner of your vision.',
        actions: [ActionType.Observe],
        encounter: {
          chance: 0.6,
          enemies: ['arcane_shade'],
        },
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You turn, nothing is there. Yet the feeling of being observed remains.',
          },
        },
      },
    },
  },
  {
    name: "Sorcerer's Pinnacle",
    description: 'Sorcerer’s Pinnacle rises like a shard of crystal, pulsing with the lifeblood of ancient magic.',
    icon: 'assets/overlays/tower.png',
    actions: [ActionType.Pray],
    eventChain: {
      floor_1: {
        title: 'Hall of Mirrors',
        description: 'Walls of polished crystal reflect endless copies of yourself. Some reflections move on their own.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You stare into the reflection, one of them smiles independently.',
            effects: [{ stat: 'hp', value: -2 }],
          },
          [ActionType.Interact]: {
            description: 'You touch the glass surface. It ripples like water.',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'You pull your hand back holding a glowing shard.',
              effects: [{ stat: 'xp', value: 7 }],
            },
            onFailure: {
              description: 'The reflection’s hand grabs yours briefly, cold as ice.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Core Chamber',
        description: 'The tower’s pulse emanates from here. The walls breathe, alive with flickering veins of light.',
        actions: [ActionType.Interact],
        encounter: {
          chance: 0.5,
          enemies: ['crystal_guardian'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You reach for the source of the glow.',
          },
        },
      },
    },
  },
  {
    name: "Enchantress's Clock",
    description: 'A mysterious tower crowned by a colossal clock whose hands move in strange, uneven patterns. Time itself wavers here.',
    icon: 'assets/overlays/clock.png',
    actions: [ActionType.Inspect],
    eventChain: {
      floor_1: {
        title: 'Entrance Hall',
        description: 'Dust hangs motionless in the air. Gears taller than houses rotate in impossible silence.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You notice the gears do not mesh correctly, yet they still turn.',
          },
          [ActionType.Interact]: {
            description: 'You touch one of the giant teeth, it’s warm, as if alive.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'A pulse of light runs through the machinery. The ticking pauses… briefly.',
              effects: [{ stat: 'xp', value: 6 }],
            },
            onFailure: {
              description: 'The mechanism jolts violently, nearly crushing your arm.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Hall of Frozen Time',
        description: 'Everything is still, droplets of oil hang midair, unmoving. Your breath echoes in eternity.',
        actions: [ActionType.Pray, ActionType.Inspect],
        encounter: {
          chance: 0.35,
          enemies: ['temporal_wraith'],
        },
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You focus your thoughts to resist the temporal distortion.',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'You briefly see multiple versions of yourself in parallel time. One of them nods in approval.',
              effects: [{ stat: 'xp', value: 10 }],
            },
            onFailure: {
              description: 'You feel your heartbeat slow unnaturally. Pain pierces your chest.',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
          [ActionType.Inspect]: {
            description: 'You spot a broken watch on the ground, it’s ticking backward.',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'Mechanism Core',
        description: 'The gears converge here, surrounding a crystal pendulum that defies gravity. Whispers of past seconds fill the air.',
        actions: [ActionType.Interact],
        encounter: {
          chance: 0.5,
          enemies: ['chronos_guardian'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You place a hand on the pendulum, the world blurs.',
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Enchantress’s Chamber',
        description: 'A vast circular room where the walls are mirrors of shifting timelines. The Enchantress stands still… or in several places at once.',
        actions: [ActionType.Fight, ActionType.Flee],
        encounter: {
          chance: 1.0,
          enemies: ['time_enchantress'],
        },
        actionPassive: {
          [ActionType.Fight]: {
            description: 'You draw your weapon as the echoes of yourself do the same in perfect delay.',
          },
          [ActionType.Flee]: {
            description: 'You step backward, but the floor replays your movement twice.',
          },
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Clock’s Stillness',
        description: 'The hands of the great clock stop completely. The silence is deafening. For a moment, time itself seems to hold its breath.',
        actions: [ActionType.Rest],
        actionPassive: {
          [ActionType.Rest]: {
            description: 'You sit down, unsure if minutes or centuries pass.',
            effects: [{ stat: 'mp', value: +8 }],
          },
        },
      },
    },
  },
];
