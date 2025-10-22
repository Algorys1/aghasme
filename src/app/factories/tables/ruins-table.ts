import {ActionType} from '../../models/actions';
import {OverlayTemplate} from '../../models/overlays.model';

export const RUINS_TABLE: OverlayTemplate[] = [
  {
    name: 'Ancient Temple',
    description: 'The remains of a once-grand temple, now overgrown and forgotten. Some treasures may still hide within its broken halls.',
    icon: 'assets/overlays/ruins.png',
    id: 'ancient-temple',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Main Hall',
        description: 'Vines creep along cracked pillars. The air is heavy with the scent of wet stone and dust.',
        actions: [ActionType.Observe, ActionType.Interact, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You examine the faint carvings along the walls.',
            check: { orb: 'natural', difficulty: 9 },
            onSuccess: {
              description: 'They depict an ancient ritual of light and rebirth. You feel a sense of calm.',
              effects: [{ stat: 'xp', value: 5 }],
            },
            onFailure: {
              description: 'The glyphs make no sense. A piece of stone breaks loose and grazes your arm.',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You touch a pillar; faint warmth lingers beneath your hand.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Hall of Offerings',
        description: 'Dusty amphorae line the walls. One lies shattered, revealing a glint within the shards.',
        actions: [ActionType.Inspect, ActionType.Rest],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You carefully reach into the broken vase.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'You find a small silver idol, untouched by time.',
              effects: [{ stat: 'gold', value: +15 }],
            },
            onFailure: {
              description: 'A hidden spring triggers, a puff of gas makes you cough violently.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Rest]: {
            description: 'You sit among the ruins, listening to the quiet hum of age.',
            effects: [{ stat: 'hp', value: +2 }],
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'Hidden Reliquary',
        description: 'Behind a fallen statue, a narrow passage leads to a sealed chamber.',
        actions: [ActionType.Interact, ActionType.Pray],
        encounter: {
          chance: 0.3,
          enemies: ['orb-mechanic'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You push the stone door open with effort.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'The seal breaks. Inside lies a small chest bound in silver wire.',
              effects: [{ stat: 'xp', value: 8 }],
            },
            onFailure: {
              description: 'A crack echoes, part of the ceiling gives way. You leap aside, barely escaping.',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You offer a moment of silence for those who built this place.',
          },
        },
      },
    },
  },
  {
    name: 'Forgotten Fortress',
    description: 'Crumbling walls and broken towers hint at a fortress long lost to time.',
    icon: 'assets/overlays/ruins.png',
    id: 'forgotten-fortress',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Outer Walls',
        description: 'The stone battlements are covered in moss. A single banner fragment still flaps weakly in the wind.',
        actions: [ActionType.Observe, ActionType.Interact, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You notice deep claw marks on the stones, something once attacked this place.',
          },
          [ActionType.Interact]: {
            description: 'You pull aside some rubble and uncover a rusted weapon.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'You salvage some useful metal fragments.',
              effects: [{ stat: 'gold', value: +10 }],
            },
            onFailure: {
              description: 'The metal disintegrates into dust.',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Guardhouse',
        description: 'The scent of rot and old oil fills the air. Armor stands, empty but upright, line the corridor.',
        actions: [ActionType.Inspect, ActionType.Rest],
        encounter: {
          chance: 0.4,
          enemies: ['golem-mechanic'],
        },
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You inspect one of the empty suits, the helm turns slowly toward you.',
            effects: [{ stat: 'hp', value: -2 }],
          },
          [ActionType.Rest]: {
            description: 'You find a dry corner and regain your breath, though the silence feels heavy.',
            effects: [{ stat: 'hp', value: +3 }],
          },
        },
      },
    },
  },
  {
    name: 'Sunken City',
    description: 'Ruins of a city partially submerged, with buildings jutting out of the water like broken teeth.',
    icon: 'assets/overlays/ruins.png',
    id: 'sunken-city',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Drowned Plaza',
        description: 'Water laps against cracked cobblestones. A toppled statue half-emerges from the depths.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You glimpse faint runes carved under the surface, glowing faintly blue.',
          },
          [ActionType.Interact]: {
            description: 'You dive briefly, feeling around the base of the statue.',
            check: { orb: 'natural', difficulty: 10 },
            onSuccess: {
              description: 'Your hand finds a sealed pouch of ancient coins.',
              effects: [{ stat: 'gold', value: +20 }],
            },
            onFailure: {
              description: 'You lose your breath and resurface quickly, gasping.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Flooded Archive',
        description: 'Rows of stone shelves lie half-submerged. Something glows deep between the walls.',
        actions: [ActionType.Inspect, ActionType.Pray],
        encounter: {
          chance: 0.3,
          enemies: ['tentacle-cursed'],
        },
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You pull out a waterlogged scroll.',
            check: { orb: 'mechanic', difficulty: 9 },
            onSuccess: {
              description: 'It still bears legible runes, a record of ancient trade routes.',
              effects: [{ stat: 'xp', value: 6 }],
            },
            onFailure: {
              description: 'The scroll disintegrates to sludge in your hand.',
            },
          },
          [ActionType.Pray]: {
            description: 'You whisper to the restless spirits below the waterline.',
            effects: [{ stat: 'mp', value: +4 }],
          },
        },
      },
      floor_3: {
        title: 'The Deep Chamber',
        description: 'A submerged crypt looms ahead, lightless and still.',
        actions: [ActionType.Interact],
        encounter: {
          chance: 1.0,
          enemies: ['orb-mechanic'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You descend into the darkness… Something moves beneath.',
          },
        },
      },
    },
  },
  {
    name: 'Deserted Village',
    description: 'Empty streets and abandoned homes tell the story of a village left behind.',
    icon: 'assets/overlays/ruins.png',
    id: 'deserted-village',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Silent Square',
        description: 'The well in the center is dry. Ash stains mark the ground, something burned recently.',
        actions: [ActionType.Observe, ActionType.Interact, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You find fresh footprints, too small for a human adult.',
            effects: [{ stat: 'xp', value: 3 }],
          },
          [ActionType.Interact]: {
            description: 'You lower a stone into the dry well. It echoes endlessly before stopping.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Collapsed Home',
        description: 'Broken furniture and scattered bones fill the room. A faint metallic glint hides under the rubble.',
        actions: [ActionType.Inspect, ActionType.Rest],
        encounter: {
          chance: 0.33,
          enemies: ['rats', 'spider'],
          random: true,
        },
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You dig through the debris carefully.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'You recover a simple but functional dagger.',
              effects: [{ stat: 'attack', value: +1 }],
            },
            onFailure: {
              description: 'The rubble shifts, dust blinds you momentarily.',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
          [ActionType.Rest]: {
            description: 'You catch your breath, though the smell of decay clings to you.',
          },
        },
      },
      floor_3: {
        title: 'The Chapel Ruin',
        description: 'A ruined chapel stands at the edge of the village. Its bell is cracked, but a faint ringing still echoes.',
        actions: [ActionType.Pray],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You offer a short prayer. The wind stills for a moment.',
            effects: [{ stat: 'hp', value: +3 }],
          },
        },
      },
    },
  },
  {
    name: 'Mystic Circle',
    description: 'A circle of standing stones, their purpose and origin shrouded in mystery.',
    icon: 'assets/overlays/ruins.png',
    id: 'mystic-circle',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Outer Ring',
        description: 'The runes carved into the stones pulse faintly as you approach. A faint whisper asks for your name.',
        actions: [ActionType.Observe, ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You close your eyes and offer a prayer to the ancient spirits.',
            effects: [{ stat: 'hp', value: +5 }],
          },
          [ActionType.Observe]: {
            description: 'You listen closely to the wind between the stones. It carries fragmented words.',
          },
          [ActionType.Interact]: {
            description: 'You place your hand on a rune, and warmth spreads through your arm.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'The rune glows brighter, feeding you energy.',
              effects: [{ stat: 'mp', value: +6 }],
            },
            onFailure: {
              description: 'The rune flickers and shocks you violently.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Inner Circle',
        description: 'A perfect ring of light now surrounds the stones. Shapes move within the glow.',
        actions: [ActionType.Pray, ActionType.Interact],
        encounter: {
          chance: 0.5,
          enemies: ['lost-soul'],
        },
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You kneel at the heart of the circle, focusing your thoughts.',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'A calm presence envelops you, a fragment of ancient wisdom awakens.',
              effects: [{ stat: 'xp', value: 10 }],
            },
            onFailure: {
              description: 'The air thickens with energy, you can barely breathe.',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You trace the glowing line on the ground, it hums under your fingers.',
          },
        },
      },
    },
  },
  {
    name: 'The Sunken Citadel',
    description: 'The remains of a once-majestic city now lie buried beneath layers of stone and moss. The wind still hums through its collapsed towers.',
    icon: 'assets/overlays/ruins.png',
    id: 'sunken-citadel',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Gates of Silence',
        description: 'Massive archways lead into the dark. The air smells of wet limestone and old prayers.',
        actions: [ActionType.Observe, ActionType.Inspect],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'Strange carvings depict the city\'s fall, swallowed by waves, yet far inland.',
          },
          [ActionType.Inspect]: {
            description: 'The pillars bear fresh cracks. Something has moved here recently.',
            effects: [{ stat: 'xp', value: +4 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Forgotten Plaza',
        description: 'You arrive in a square dominated by a broken fountain. Water still trickles, glowing faintly blue.',
        actions: [ActionType.Interact, ActionType.Observe],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You dip your hand into the water.',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'It tingles pleasantly, ancient magic lingers in the current.',
              effects: [{ stat: 'mp', value: +5 }],
            },
            onFailure: {
              description: 'Your hand goes numb briefly, the water whispers back a name.',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
          [ActionType.Observe]: {
            description: 'Statues of nobles surround the square, all missing their heads.',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'Hall of Mirrors',
        description: 'You step into a long corridor lined with shattered mirrors. Your reflection lags behind you.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You realize some mirrors still show a figure, but not yours.',
            effects: [{ stat: 'xp', value: +6 }],
          },
          [ActionType.Interact]: {
            description: 'You touch one of the unbroken panes.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'The reflection bows. A faint light emerges, forming a key.',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'Your reflection lunges, the glass shatters in your face.',
              next: 'floor_4',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Throne Below',
        description: 'A grand chamber carved into the bedrock. A rusted throne sits empty, surrounded by bones in armor.',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The bones are positioned like an army bowing before the empty seat.',
          },
          [ActionType.Pray]: {
            description: 'You bow as well. A single suit of armor stirs.',
          },
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'The Fallen King',
        description: 'The skeleton on the throne rises, dust cascading from its ribs. A crown of tarnished gold gleams faintly.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['skeleton-warrior', 'royal-mummy'],
          random: true,
        },
        next: 'floor_6',
      },
      floor_6: {
        title: 'Crown of Dust',
        description: 'Silence returns. The air feels lighter, as if the city itself had exhaled.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The crown crumbles to ash in your hands, leaving behind a single gem.',
            effects: [{ stat: 'gold', value: +70 }, { stat: 'xp', value: +15 }],
          },
        },
      },
    },
  },
  {
    name: 'The Obsidian Bastion',
    description: 'A towering black fortress stands on a cliff\'s edge, humming faintly with latent power. The walls ripple like oil under moonlight.',
    icon: 'assets/overlays/ruins.png',
    id: 'obsidian-bastion',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Gates of the Bastion',
        description: 'The gates bear scars of old battles, yet the metal feels unnaturally smooth.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'The doors are engraved with runes of loyalty and pain.',
          },
          [ActionType.Interact]: {
            description: 'You push the gates open, they part with a sound like thunder.',
            effects: [{ stat: 'xp', value: +3 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Hall of Echoing Steps',
        description: 'Every footstep repeats three times, once now, once later, once never.',
        actions: [ActionType.Observe, ActionType.Talk],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The walls hum faintly. There\'s no dust, someone still maintains this place.',
          },
          [ActionType.Talk]: {
            description: 'You call out. Your voice comes back deeper, older.',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Armory',
        description: 'Weapons line the walls, not rusted, but pristine. Each bears a different symbol.',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You recognize sigils of fallen houses and unknown empires.',
            effects: [{ stat: 'xp', value: +5 }],
          },
          [ActionType.Interact]: {
            description: 'You lift a sword, it hums faintly, almost alive.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'The blade accepts you, it glows faintly blue.',
              effects: [{ stat: 'attack', value: +1 }],
            },
            onFailure: {
              description: 'The weapon rejects your grasp violently.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Inner Sanctum',
        description: 'A circular chamber with a mirror-like floor. A black flame burns at its center.',
        actions: [ActionType.Pray, ActionType.Interact],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You kneel, the flame bends toward you, whispering promises.',
          },
          [ActionType.Interact]: {
            description: 'You reach toward the flame.',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'It flares, consuming the shadows. You feel strength flow through you.',
              effects: [{ stat: 'xp', value: +10 }],
            },
            onFailure: {
              description: 'It burns cold, freezing your breath in your throat.',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'The Black Knight',
        description: 'A towering figure steps from the shadows, armored, silent, blade dripping with darkness.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['dark-knight'],
        },
        next: 'floor_6',
      },
      floor_6: {
        title: 'The Bastion\'s Heart',
        description: 'When the knight falls, the fortress groans, walls cracking like dry skin.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The flame in the sanctum extinguishes, leaving a glowing ember behind.',
            effects: [{ stat: 'xp', value: +20 }, { stat: 'gold', value: +80 }],
          },
        },
      },
    },
  },
];
