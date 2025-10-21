import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const TREASURE_TABLE: OverlayTemplate[] = [
  {
    name: 'Buried Cache',
    description: 'A pile of disturbed earth hints at a recently hidden stash. The marks are fresh, maybe too fresh.',
    icon: 'assets/overlays/treasure.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Dig Site',
        description: 'Broken shovels and empty sacks litter the ground. A small wooden chest sticks halfway out of the soil.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You scan the area, recent footprints lead away toward the hills.',
          },
          [ActionType.Interact]: {
            description: 'You start clearing the dirt around the chest.',
            check: { orb: 'mechanic', difficulty: 9 },
            onSuccess: {
              description: 'You pry the chest free with care, it’s intact!',
              effects: [{ stat: 'gold', value: +20 }],
            },
            onFailure: {
              description: 'A hidden wire snaps, you hear whistling arrows cutting the air!',
              next: 'floor_2',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Ambush in the Dust',
        description: 'Figures emerge from the bushes, the real owners of the treasure.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['bandit', 'thief'],
          random: true,
        },
      },
      floor_3: {
        title: 'Spoils of Victory',
        description: 'You open the chest at last. Gold glitters inside, mixed with a few trinkets of lesser value.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You count the coins, enough for a few good nights at the inn.',
            effects: [{ stat: 'gold', value: +40 }, { stat: 'xp', value: +5 }],
          },
        },
      },
    },
  },
  {
    name: 'Tomb of the Lost King',
    description: 'An ancient stone doorway sealed with heavy runes. Legends say the king’s fortune lies within… and his curse too.',
    icon: 'assets/overlays/treasure.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Sealed Door',
        description: 'The stone slab bears a royal crest half-buried in dust. A faint aura hums behind it.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You decipher the crest, a forgotten dynasty, extinct for centuries.',
            effects: [{ stat: 'xp', value: +4 }],
          },
          [ActionType.Interact]: {
            description: 'You press your palm to the door.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'The door grinds open with a long sigh, stale air rushes out.',
            },
            onFailure: {
              description: 'The runes flash violently. You feel the air grow cold.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Hall of Offerings',
        description: 'Gilded urns line the corridor. Some are broken, others still sealed. A faint melody echoes deeper inside.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You notice the dust stirs, the room is not entirely still.',
          },
          [ActionType.Interact]: {
            description: 'You open one of the sealed urns.',
            check: { orb: 'natural', difficulty: 10 },
            onSuccess: {
              description: 'Inside are ancient coins and a small gemstone.',
              effects: [{ stat: 'gold', value: +25 }],
            },
            onFailure: {
              description: 'The urn collapses into powder, releasing a ghostly wail.',
              next: 'floor_3',
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Cursed King',
        description: 'A spectral figure rises from a cracked sarcophagus, draped in decayed regalia.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['royal-mummy', 'lost-soul'],
          random: true,
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'Crown and Dust',
        description: 'The crypt falls silent once more. The jewels on the crown still shimmer faintly.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You take a gem from the crown, its glow dims instantly.',
            effects: [{ stat: 'gold', value: +60 }, { stat: 'xp', value: +8 }],
          },
        },
      },
    },
  },
  {
    name: "Mechanist's Vault",
    description: 'Hidden behind a cliff face lies a metal hatch engraved with arcane machinery. Someone built this to last.',
    icon: 'assets/overlays/treasure.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Lock Array',
        description: 'A panel of rotating discs hums softly. The door seems to react to your presence.',
        actions: [ActionType.Interact, ActionType.Observe],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You try to align the discs into a coherent symbol.',
            check: { orb: 'mechanic', difficulty: 12 },
            onSuccess: {
              description: 'The mechanism clicks open, you’ve cracked the code.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The discs spin uncontrollably, a spark flies into your hand.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Observe]: {
            description: 'You detect faint residual magic pulsing beneath the metal.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Vault Interior',
        description: 'Rows of dormant machines line the chamber. In the center, a crystalline core hums faintly.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You analyze the devices, some still functional, others long dead.',
          },
          [ActionType.Interact]: {
            description: 'You touch the core carefully.',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'The core stabilizes, a surge of stored energy flows into your body.',
              effects: [{ stat: 'mp', value: +6 }],
            },
            onFailure: {
              description: 'The core bursts with violent energy!',
              next: 'floor_3',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Vault Guardian',
        description: 'A massive automaton stirs, eyes blazing with renewed light.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['golem-mechanic'],
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'Spoils of Invention',
        description: 'Among the shattered gears, you find strange metal shards and shimmering dust.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You collect what remains, a valuable trove of ancient alloys.',
            effects: [{ stat: 'gold', value: +75 }, { stat: 'xp', value: +10 }],
          },
        },
      },
    },
  },
  {
    name: "Dragon's Hoard",
    description: 'A cavern glittering with gold and bones. The air smells of sulfur and age.',
    icon: 'assets/overlays/treasure.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Glittering Path',
        description: 'Coins crunch underfoot. The cave is eerily quiet, except for a deep, rhythmic breathing.',
        actions: [ActionType.Observe, ActionType.Inspect],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You glance around, piles of treasure stretch as far as the eye can see.',
          },
          [ActionType.Inspect]: {
            description: 'You study the bones, humanoid, charred.',
            effects: [{ stat: 'xp', value: +4 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Golden Hill',
        description: 'You climb the largest mound, something massive lies buried beneath the gold.',
        actions: [ActionType.Interact],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You brush away a few coins. A scaled snout exhales, hot wind floods the cavern.',
            effects: [{ stat: 'hp', value: -3 }],
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Awakening',
        description: 'A thunderous roar shakes the cave. The dragon opens one blazing eye.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['dragon-red-adult', 'dragon-blue-adult', 'dragon-green-adult'],
          random: true,
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'Ashes and Gold',
        description: 'The cavern lies in ruins. The treasure has lost its luster, but what remains still gleams faintly.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You collect a few surviving gems, heavy, warm to the touch.',
            effects: [{ stat: 'gold', value: +150 }, { stat: 'xp', value: +20 }],
          },
        },
      },
    },
  },
  {
    name: "Mimic's Treasury",
    description: 'A pile of glittering gold lies abandoned in a hollow chamber. A dozen open chests seem to invite you closer.',
    icon: 'assets/overlays/treasure.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Invitation',
        description: 'The room is eerily silent. Coins and gems are scattered like breadcrumbs leading toward a single ornate chest.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You notice faint trails in the dust, as if the chest had moved recently.',
            check: { orb: 'natural', difficulty: 9 },
            onSuccess: {
              description: 'A shiver runs down your spine. Something is wrong with this scene.',
              effects: [{ stat: 'xp', value: +4 }],
            },
            onFailure: {
              description: 'You blink, for a second, the chest’s lid seems to twitch.',
            },
          },
          [ActionType.Interact]: {
            description: 'You pick up a handful of coins. They’re oddly warm, almost pulsing.',
            effects: [{ stat: 'gold', value: +10 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The False Bounty',
        description: 'Several other chests surround you now. You don’t recall seeing that many before.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You lean closer to one of the smaller chests, the reflection in its metal doesn’t match your movement.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'You realize they’re illusions projected by some magic.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'Your vision flickers, the coins melt into thick saliva.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You cautiously touch a second chest, the lid opens by itself.',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Trap',
        description: 'Teeth. There are teeth where gold should be. The nearest chest lunges toward your leg with a wet snap.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['snake-crystal', 'thief'],
          random: true,
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Imitation’s Core',
        description: 'The largest chest shudders violently. Inside, a crimson light pulses like a heartbeat.',
        actions: [ActionType.Interact, ActionType.Observe],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You strike the chest open, inside lies a twisting crystal drenched in saliva.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'The crystal cracks, releasing a hiss. The magic dissipates instantly.',
              effects: [{ stat: 'xp', value: +10 }],
            },
            onFailure: {
              description: 'The crystal flashes bright, for a moment, you see your reflection blink independently.',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
          [ActionType.Observe]: {
            description: 'The coins have stopped moving, yet you still hear faint breathing.',
          },
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Greed’s Lesson',
        description: 'Only silence remains. The gold is gone, leaving behind a single tongue-shaped gem.',
        actions: [ActionType.Observe, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You pocket the gem. It hums softly when you breathe near it.',
            effects: [{ stat: 'gold', value: +50 }],
          },
          [ActionType.Rest]: {
            description: 'You sit among the empty floorboards, oddly relieved to have survived your own greed.',
            effects: [{ stat: 'hp', value: +4 }, { stat: 'xp', value: +6 }],
          },
        },
      },
    },
  },
];
