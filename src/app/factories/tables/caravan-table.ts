import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const CARAVAN_TABLE: OverlayTemplate[] = [
  {
    name: 'Merchant Caravan',
    description: 'A bustling caravan of traders and merchants traveling between distant towns.',
    icon: 'assets/overlays/caravan.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Roadside Market',
        description: 'Colorful tents and wagons form a small bazaar. Merchants shout prices, children run between crates of spice and cloth.',
        actions: [ActionType.Observe, ActionType.Trade, ActionType.Talk],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You scan the stalls, the goods range from exotic fruits to rusty blades.',
          },
          [ActionType.Trade]: {
            description: 'You approach a merchant offering talismans of dubious power.',
            effects: [{ stat: 'gold', value: -5 }],
          },
          [ActionType.Talk]: {
            description: 'The merchant grins, whispering about “something rare” hidden in his wagon.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Hidden Wagon',
        description: 'Behind the main caravan, a covered wagon creaks quietly. The merchant waves you closer, glancing around nervously.',
        actions: [ActionType.Interact, ActionType.Inspect],
        encounter: {
          chance: 0.4,
          enemies: ['bandit'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You peek under the tarp...',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'You find a small chest, inside, a handful of silver coins.',
              effects: [{ stat: 'gold', value: +15 }],
            },
            onFailure: {
              description: 'A knife glints, someone was waiting for you.',
            },
          },
          [ActionType.Inspect]: {
            description: 'You notice faint footprints leading away into the brush.',
          },
        },
      },
      floor_3: {
        title: 'Ambushed!',
        description: 'The merchant\'s smile fades, shadows move behind the wagons.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1.0,
          enemies: ['merchant'],
        },
      },
    },
  },
  {
    name: 'Nomadic Tribe',
    description: 'A group of nomads traveling with their livestock and ancient traditions.',
    icon: 'assets/overlays/caravan.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Campfire Gathering',
        description: 'A ring of tents surrounds a central fire. The air smells of roasted herbs and sand.',
        actions: [ActionType.Talk, ActionType.Observe, ActionType.Trade],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'An elder invites you to share tea and stories.',
            effects: [{ stat: 'hp', value: +3 }],
          },
          [ActionType.Observe]: {
            description: 'Children play with small carved idols. They watch you curiously.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Sacred Beast',
        description: 'A massive beast rests nearby, half-camel, half-serpent. Its scales shimmer faintly.',
        actions: [ActionType.Inspect, ActionType.Pray],
        encounter: {
          chance: 0.3,
          enemies: ['snake'],
        },
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You study the creature carefully.',
            check: { orb: 'natural', difficulty: 9 },
            onSuccess: {
              description: 'It snorts softly, you feel accepted in its presence.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'It hisses and shifts, clearly displeased.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You bow your head, offering silent respect.',
          },
        },
      },
    },
  },
  {
    name: 'Military Convoy',
    description: 'A convoy of armored soldiers on patrol. Their eyes track your every move.',
    icon: 'assets/overlays/caravan.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Checkpoint Inspection',
        description: 'Soldiers block the road with spears and banners. Their captain steps forward.',
        actions: [ActionType.Talk, ActionType.Interact, ActionType.Trade],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You explain your presence. The captain listens with suspicion.',
            check: { orb: 'bestial', difficulty: 9 },
            onSuccess: {
              description: 'He nods reluctantly and allows you to pass.',
              effects: [{ stat: 'xp', value: +4 }],
            },
            onFailure: {
              description: 'He frowns. “Search the stranger.”',
              next: 'floor_2',
            },
          },
          [ActionType.Interact]: {
            description: 'You hand over your travel papers, keeping your tone steady.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Search and Suspicion',
        description: 'The soldiers rummage through your pack. One of them smirks, pocketing a coin.',
        actions: [ActionType.Interact, ActionType.Talk],
        encounter: {
          chance: 0.3,
          enemies: ['guard'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You try to protest calmly.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'The captain intervenes, scolding his men. You\'re free to go.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The soldiers laugh, one shoves you roughly.',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
          [ActionType.Talk]: {
            description: 'You remain silent, meeting their gaze until they look away.',
          },
        },
      },
      floor_3: {
        title: 'If Looks Could Kill',
        description: 'The situation escalates, blades are drawn.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1.0,
          enemies: ['dark-knight'],
        },
      },
    },
  },
  {
    name: 'Pilgrim Group',
    description: 'A band of weary pilgrims journeying toward a distant shrine.',
    icon: 'assets/overlays/caravan.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Song of the Road',
        description: 'Pilgrims march in rhythm, humming an old hymn. A soft peace fills the air.',
        actions: [ActionType.Pray, ActionType.Observe],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You join in their chant. The melody carries your worries away.',
            effects: [{ stat: 'mp', value: +4 }],
          },
          [ActionType.Observe]: {
            description: 'One pilgrim stumbles, the others help him without a word.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Relic\'s Burden',
        description: 'They carry a small chest bound in silver wire. Its glow leaks faintly from the seams.',
        actions: [ActionType.Interact, ActionType.Inspect],
        encounter: {
          chance: 0.5,
          enemies: ['lost-soul'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You reach toward the chest.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'The relic hums, filling you with tranquil warmth.',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'Your hand burns. The relic rejects you.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Inspect]: {
            description: 'You notice a sigil, protection or imprisonment?',
          },
        },
      },
      floor_3: {
        title: 'The Relic Stirs',
        description: 'The chest shakes violently, something awakens within.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1.0,
          enemies: ['ghost'],
        },
      },
    },
  },
  {
    name: 'Exploration Party',
    description: 'A group of adventurers mapping uncharted lands and seeking fortune.',
    icon: 'assets/overlays/caravan.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Camp on the Frontier',
        description: 'Tents and crates are scattered near a small campfire. Maps and compasses litter a makeshift table.',
        actions: [ActionType.Talk, ActionType.Observe, ActionType.Trade],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'One of the explorers brags about finding an ancient ruin nearby.',
          },
          [ActionType.Observe]: {
            description: 'You notice one adventurer slipping something into his bag, quietly.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Missing Supplies',
        description: 'Tension rises, a crate of provisions is missing, and suspicions abound.',
        actions: [ActionType.Interact, ActionType.Inspect],
        encounter: {
          chance: 0.4,
          enemies: ['bandit'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You question the group, trying to mediate.',
            check: { orb: 'bestial', difficulty: 9 },
            onSuccess: {
              description: 'You calm them down before things turn violent.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'Your tone irritates one of them. He taps the hilt of his blade.',
            },
          },
          [ActionType.Inspect]: {
            description: 'You look inside the tents, traces of struggle, a torn map...',
          },
        },
      },
      floor_3: {
        title: 'Betrayal in the Dark',
        description: 'A figure lunges from the shadows, one of the explorers, eyes wild with greed.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1.0,
          enemies: ['thief'],
        },
      },
    },
  },
  {
    name: 'The Sandstorm Caravan',
    description: 'A caravan half-buried in dunes, flags torn to ribbons by the wind. A single horn sounds through the storm.',
    icon: 'assets/overlays/caravan.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Echoes in the Wind',
        description: 'You can barely see through the swirling sand. Shapes of wagons loom and vanish like ghosts.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'Through the haze, you spot figures waving, or are they just shadows?',
          },
          [ActionType.Interact]: {
            description: 'You press forward, shielding your eyes. The wind screams louder as if alive.',
            effects: [{ stat: 'hp', value: -2 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Stranded Merchant',
        description: 'You find a wagon overturned. A merchant coughs under his scarf, clutching a locked chest.',
        actions: [ActionType.Talk, ActionType.Interact],
        actionPassive: {
          [ActionType.Talk]: {
            description: '"Sand took my guards," he gasps. "Help me reclaim the goods, I’ll reward you."',
            effects: [{ stat: 'xp', value: +3 }],
          },
          [ActionType.Interact]: {
            description: 'You help him lift the chest. It’s far heavier than gold should be.',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'You heave the chest up, it hums faintly. Strange energy pulses inside.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'You drop it, the lock hisses, emitting heat.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Caravan’s Curse',
        description: 'The other wagons are gone, only dunes remain. The merchant looks panicked. “This place repeats itself!”',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You notice the same rocks and bones around you, again and again. The desert loops.',
          },
          [ActionType.Pray]: {
            description: 'You close your eyes and try to ground yourself in reality.',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'The horizon shifts, the loop falters for a moment.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'You feel dizzy, the world folds in again.',
              next: 'floor_4',
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'Guardians of the Dune',
        description: 'From beneath the sand rise enormous shapes, eyes glowing amber, like molten glass.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['sand-worm', 'beetle-sand'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Treasures Beneath the Sand',
        description: 'As the storm dies, you find yourself among ruined wagons, the chest split open, revealing radiant shards.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You pocket one glowing shard, it hums faintly in your pack.',
            effects: [{ stat: 'xp', value: +15 }, { stat: 'gold', value: +60 }],
          },
        },
      },
    },
  },
  {
    name: 'The Night Convoy',
    description: 'A column of wagons glides silently under a moonless sky. The torches burn blue, and the drivers do not blink.',
    icon: 'assets/overlays/caravan.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Silent March',
        description: 'You walk beside the wagons. The wheels leave no tracks. One rider gestures for you to join without a word.',
        actions: [ActionType.Observe, ActionType.Talk],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You realize their faces are pale as marble, frozen expressions of peace.',
          },
          [ActionType.Talk]: {
            description: 'You whisper a greeting. No one replies, but the nearest driver tilts his head slightly toward you.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Nameless Cargo',
        description: 'You peek into one wagon, inside, coffins stacked neatly, all with the same sigil burned into them.',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'The sigil reads “Deliver Unto Dawn.” The wood is warm to the touch.',
            effects: [{ stat: 'xp', value: +4 }],
          },
          [ActionType.Pray]: {
            description: 'You mutter a quiet blessing. One of the torches flickers purple for a moment.',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Midnight Halt',
        description: 'The convoy stops by a ruined bridge. The leader, hooded and ageless, turns to you and says: “Only the living may cross.”',
        actions: [ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You step forward, uncertain. The bridge creaks but holds.',
            effects: [{ stat: 'hp', value: -2 }],
          },
          [ActionType.Pray]: {
            description: 'You bow your head, invoking passage.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'The leader nods, the convoy fades slightly, as if turning translucent.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The air chills, whispers fill your mind: “You are not one of us.”',
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Wailing Driver',
        description: 'One of the wagons tips, the driver falls, shrieking. His body hits the ground, dissolving into smoke. Something crawls out from the wreck.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['lost-soul', 'ghost'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Dawn on the Other Side',
        description: 'The bridge ends abruptly, no convoy behind you, no wagons ahead. Only a single lantern remains, still burning blue.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'Inside the lantern’s glass, a small sigil glows faintly, the mark of safe passage.',
            effects: [{ stat: 'xp', value: +18 }, { stat: 'mp', value: +6 }],
          },
        },
      },
    },
  },
];
