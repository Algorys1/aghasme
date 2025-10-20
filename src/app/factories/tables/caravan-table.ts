import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const CARAVAN_TABLE: OverlayTemplate[] = [
  {
    name: 'Merchant Caravan',
    description: 'A bustling caravan of traders and merchants traveling between distant towns.',
    icon: 'assets/overlays/caravan.png',
    actions: [ActionType.Trade, ActionType.Observe],
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
          enemies: ['Bandit'],
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
          enemies: ['Bandit'],
        },
      },
    },
  },
  {
    name: 'Nomadic Tribe',
    description: 'A group of nomads traveling with their livestock and ancient traditions.',
    icon: 'assets/overlays/caravan.png',
    actions: [ActionType.Talk, ActionType.Trade],
    eventChain: {
      floor_1: {
        title: 'Campfire Gathering',
        description: 'A ring of tents surrounds a central fire. The air smells of roasted herbs and sand.',
        actions: [ActionType.Talk, ActionType.Observe],
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
          enemies: ['Snake'],
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
    actions: [ActionType.Talk, ActionType.Observe],
    eventChain: {
      floor_1: {
        title: 'Checkpoint Inspection',
        description: 'Soldiers block the road with spears and banners. Their captain steps forward.',
        actions: [ActionType.Talk, ActionType.Interact],
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
          enemies: ['Bandit'],
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
          enemies: ['Dark Knight'],
        },
      },
    },
  },
  {
    name: 'Pilgrim Group',
    description: 'A band of weary pilgrims journeying toward a distant shrine.',
    icon: 'assets/overlays/caravan.png',
    actions: [ActionType.Talk, ActionType.Pray],
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
          chance: 0.3,
          enemies: ['Ghost'],
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
          enemies: ['Ghost'],
        },
      },
    },
  },
  {
    name: 'Exploration Party',
    description: 'A group of adventurers mapping uncharted lands and seeking fortune.',
    icon: 'assets/overlays/caravan.png',
    actions: [ActionType.Trade, ActionType.Talk],
    eventChain: {
      floor_1: {
        title: 'Camp on the Frontier',
        description: 'Tents and crates are scattered near a small campfire. Maps and compasses litter a makeshift table.',
        actions: [ActionType.Talk, ActionType.Observe],
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
          enemies: ['Disciple'],
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
              description: 'Your tone angers one of them. He reaches for his blade.',
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
          enemies: ['Corrupt Sorcerer'],
        },
      },
    },
  },
];
