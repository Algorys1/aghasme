import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const TOWER_TABLE: OverlayTemplate[] = [

  {
    name: "Mage's Spire",
    description: 'The Mage\'s Spire pierces the clouds, its summit crackling with arcane energy and whispered secrets.',
    icon: 'assets/overlays/tower.png',
    id: 'mage-spire',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Spiral Ascent',
        description: 'The stairs twist endlessly upward. Wind whistles through cracks in the stone, carrying voices that sound almost human.',
        actions: [ActionType.Observe, ActionType.Interact, ActionType.Rest],
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
          enemies: ['3-eyed-crow'],
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
    description: 'Wizard\'s Keep looms in eerie silence, its halls echoing with the remnants of long-forgotten spells.',
    icon: 'assets/overlays/tower.png',
    id: 'wizard-keep',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Sealed Hall',
        description: 'You enter a wide hall lined with petrified figures, their faces frozen in fear.',
        actions: [ActionType.Observe, ActionType.Interact],
        encounter: {
          chance: 0.25,
          enemies: ['disciple'],
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
              description: 'The statue\'s eye cracks and leaks a faint red mist.',
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
          enemies: ['priest'],
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
    id: 'arcane-tower',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Lower Engine',
        description: 'Pillars crackle with static discharge. The air smells of ozone and scorched parchment.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You notice a conduit running up the wall, it\'s pulsating faintly.',
          },
          [ActionType.Interact]: {
            description: 'You attempt to stabilize a nearby runic focus.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'The hum steadies. A faint calm overtakes the tower\'s chaos.',
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
          enemies: ['disciple'],
        },
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You align your breathing to the crystal\'s oscillation.',
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
          enemies: ['corrupt-sorcerer', 'disciple'],
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
    description: 'Sorcerer\'s Pinnacle rises like a shard of crystal, pulsing with the lifeblood of ancient magic.',
    icon: 'assets/overlays/tower.png',
    id: 'sorcerer-pinnacle',
    actions: [],
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
              description: 'The reflection\'s hand grabs yours briefly, cold as ice.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Core Chamber',
        description: 'The tower\'s pulse emanates from here. The walls breathe, alive with flickering veins of light.',
        actions: [ActionType.Interact],
        encounter: {
          chance: 0.5,
          enemies: ['snake-crystal'],
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
    id: 'enchantress-clock',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Entrance Hall',
        description: 'Dust hangs motionless in the air. Gears taller than houses rotate in impossible silence.',
        actions: [ActionType.Observe, ActionType.Interact, ActionType.Inspect],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You notice the gears do not mesh correctly, yet they still turn.',
          },
          [ActionType.Interact]: {
            description: 'You touch one of the giant teeth, it\'s warm, as if alive.',
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
          [ActionType.Inspect]: {
            description: 'You find a small, intricately carved gear on the floor, still turning slowly.',
            effects: [{ stat: 'gold', value: 20 }],
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
          enemies: ['lost-soul', 'ghost'],
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
            description: 'You spot a broken watch on the ground, it\'s ticking backward.',
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
          enemies: ['wolf-mechanic'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You place a hand on the pendulum, the world blurs.',
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Enchantress\'s Chamber',
        description: 'A vast circular room where the walls are mirrors of shifting timelines. The Enchantress stands still… or in several places at once.',
        actions: [ActionType.Fight, ActionType.Flee],
        encounter: {
          chance: 1.0,
          enemies: ['temple-guardian'],
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
        title: 'Clock\'s Stillness',
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
  {
    name: 'The Obsidian Spire',
    description: 'A black spire pierces the sky, absorbing light instead of casting shadow. The air around it hums like a living thing.',
    icon: 'assets/overlays/tower.png',
    id: 'obsidian-spire',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Ashen Gate',
        description: 'You stand before a doorway etched with runes that shift when you blink.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'Each rune seems to whisper your name backwards.',
          },
          [ActionType.Interact]: {
            description: 'You press your hand to the stone. It feels warm, almost alive.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'The runes flare, the door opens, sighing like a beast.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'A rune burns your palm, you smell scorched air.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Hall of Whispers',
        description: 'Shelves filled with blackened books tower above you. The pages flutter, though there\'s no wind.',
        actions: [ActionType.Observe, ActionType.Talk],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'A dozen voices argue softly inside your head, each claiming to be you.',
          },
          [ActionType.Talk]: {
            description: 'You whisper a question, one book answers in your voice.',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Chamber of Mirrors',
        description: 'You find a spiral stair surrounded by mirrors, each reflection older than you remember.',
        actions: [ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You touch the mirror, your reflection grabs your wrist.',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'You pull free, the reflection nods and fades.',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'You feel your strength drain, the reflection smiles as you stumble.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You focus your breath, stabilizing your thoughts.',
            effects: [{ stat: 'mp', value: +4 }],
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Silent Library',
        description: 'Floating tomes encircle a broken lectern. A pale figure writes endlessly with invisible ink.',
        actions: [ActionType.Talk, ActionType.Observe],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You ask what it writes. The figure pauses: "Names of those who climb."',
          },
          [ActionType.Observe]: {
            description: 'You find your own name, half-written.',
          },
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'The Upper Hall',
        description: 'Starlight leaks through cracks in the ceiling. The air tastes like lightning.',
        actions: [ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You raise your hand, lightning curls around your fingers.',
            check: { orb: 'elemental', difficulty: 13 },
            onSuccess: {
              description: 'The tower hums louder, you feel in tune with its pulse.',
              effects: [{ stat: 'xp', value: +10 }, { stat: 'mp', value: +6 }],
            },
            onFailure: {
              description: 'Your nerves ignite in pain, the hum becomes laughter.',
              effects: [{ stat: 'hp', value: -6 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You whisper for balance. The laughter quiets momentarily.',
          },
        },
        next: 'floor_6',
      },
      floor_6: {
        title: 'The Master of the Spire',
        description: 'At the summit stands a tall figure cloaked in shadow and light. "Welcome, reflection."',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['corrupt-sorcerer', 'dark-knight'],
          random: true,
        },
        next: 'floor_7',
      },
      floor_7: {
        title: 'The Breath of the Tower',
        description: 'When the figure falls, the walls sigh. The entire spire exhales one final gust of starlight.',
        actions: [ActionType.Observe, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The air sparkles, and for a moment, you hear your own heartbeat echo from above.',
            effects: [{ stat: 'xp', value: +25 }, { stat: 'mp', value: +10 }],
          },
          [ActionType.Rest]: {
            description: 'You rest against the warm stone, feeling it pulse like a heart.',
            effects: [{ stat: 'hp', value: +10 }],
          },
        },
      },
    },
  },
  {
    name: 'The Astral Tower',
    description: 'You see it before you sleep, and awaken inside it. The walls shimmer like glass filled with galaxies.',
    icon: 'assets/overlays/tower.png',
    id: 'astral-tower',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Dreaming Ascent',
        description: 'You stand at the base of a staircase that winds upward endlessly. The steps hum under your feet.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'Every step glows faintly, constellations rearranging as you move.',
          },
          [ActionType.Interact]: {
            description: 'You take the first step. The stars shift around you like eyes.',
            effects: [{ stat: 'xp', value: +3 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Chamber of Time',
        description: 'Clocks hang suspended midair, their hands spinning backward. A faint melody keeps perfect tempo.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'Each clock\'s glass reflects a different version of you.',
          },
          [ActionType.Interact]: {
            description: 'You touch one clock, time slows, but only for you.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'You move through the slowed moment effortlessly.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The clock cracks, your vision skips a beat.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Observatory',
        description: 'A vast room opens, filled with telescopes pointed inward, not outward.',
        actions: [ActionType.Observe, ActionType.Inspect],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'Through the glass, you see yourself walking toward you from another angle.',
          },
          [ActionType.Inspect]: {
            description: 'Each lens shows a star, but one shows your own heartbeat.',
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Starwell',
        description: 'A pit filled with liquid light glows at the center. Voices whisper from below.',
        actions: [ActionType.Pray, ActionType.Interact],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You whisper a wish into the light.',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'The light pulses, the whisper answers, granting understanding.',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'The voices argue, mocking your plea.',
            },
          },
          [ActionType.Interact]: {
            description: 'You dip your hand into the light, it feels cold and infinite.',
            effects: [{ stat: 'mp', value: +5 }],
          },
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Celestial Guardian',
        description: 'A figure of glass and starlight descends, wings of constellation spread wide.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['elemental-air', 'elemental-fire'],
          random: true,
        },
        next: 'floor_6',
      },
      floor_6: {
        title: 'The Final Step',
        description: 'The stairs end at a door made of light. Beyond it, stars hum like a heartbeat.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You see the reflection of every place you\'ve been.',
            effects: [{ stat: 'xp', value: +20 }, { stat: 'mp', value: +8 }],
          },
          [ActionType.Interact]: {
            description: 'You step forward. The dream dissolves as you touch the threshold.',
            effects: [{ stat: 'hp', value: +6 }],
          },
        },
      },
    },
  },
];
