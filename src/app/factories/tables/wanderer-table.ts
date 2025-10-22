import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const WANDERER_TABLE: OverlayTemplate[] = [
  {
    name: 'The Tired Mage',
    description: 'A robed figure trudges through the dust, muttering to himself. His staff flickers with faint energy.',
    icon: 'assets/overlays/wanderer.png',
    id: 'tired-mage',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Roadside Encounter',
        description: 'He stops at your approach, his eyes dim with exhaustion. "Traveler… the ley lines here are twisted."',
        actions: [ActionType.Talk, ActionType.Observe],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You offer him a greeting. His voice is calm but heavy with regret.',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'He nods. "You feel it too, then. The air hums wrong here."',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'He waves you off, too drained to speak further.',
            },
          },
          [ActionType.Observe]: {
            description: 'You notice his staff\'s crystal cracked, leaking slow motes of blue light.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Spark Within',
        description: 'He asks for your help repairing his staff, or mercy to end his burden.',
        actions: [ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You attempt to channel energy into the staff.',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'The crystal stabilizes, his expression softens. "Thank you."',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'The crystal bursts, spraying sparks of mana.',
              effects: [{ stat: 'hp', value: -4 }],
              next: 'floor_3',
            },
          },
          [ActionType.Pray]: {
            description: 'You kneel and let his fate flow where it must.',
            effects: [{ stat: 'mp', value: +5 }],
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'A Ripple in the Air',
        description: 'As the mage fades into mist, the air around you brightens, lighter, calmer.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You feel his parting blessing: a fragment of ancient understanding.',
            effects: [{ stat: 'xp', value: +5 }],
          },
        },
      },
    },
  },
  {
    name: 'The Goblin Pilgrim',
    description: 'A small goblin wrapped in rags drags a cart of stones and herbs. He looks up, startled but not hostile.',
    icon: 'assets/overlays/wanderer.png',
    id: 'goblin-pilgrim',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Roadside Rest',
        description: 'He squints at you, clutching his sack. "Not steal, not steal. Just carry stone. Magic stone."',
        actions: [ActionType.Talk, ActionType.Observe],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You ask what his "magic stones" are.',
            check: { orb: 'natural', difficulty: 9 },
            onSuccess: {
              description: 'He proudly shows you, they\'re just river pebbles polished smooth.',
              effects: [{ stat: 'xp', value: +3 }],
            },
            onFailure: {
              description: 'He hides them quickly. "No touch! Not yours."',
            },
          },
          [ActionType.Observe]: {
            description: 'His "cart" is actually an old shield strapped with vines.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Offering',
        description: 'He holds out a single stone, eyes shining. "Gift. You strong. You lucky now."',
        actions: [ActionType.Interact],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You accept the gift, it feels oddly warm in your hand.',
            effects: [{ stat: 'gold', value: +5 }, { stat: 'xp', value: +4 }],
          },
        },
      },
    },
  },
  {
    name: 'The Exiled Drake',
    description: 'A wounded young dragon lies beneath a broken archway. Smoke curls weakly from its nostrils.',
    icon: 'assets/overlays/wanderer.png',
    id: 'exiled-drake',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Fallen Wing',
        description: 'Its scales shimmer faintly, dulled by dust and blood. "Leave… or help," it growls weakly.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You see old scars, not from humans, but claws. Another dragon did this.',
          },
          [ActionType.Interact]: {
            description: 'You approach carefully, offering water.',
            check: { orb: 'natural', difficulty: 10 },
            onSuccess: {
              description: 'It drinks slowly. "Few would risk approaching… you are brave."',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'It snaps instinctively, singeing your arm.',
              effects: [{ stat: 'hp', value: -4 }],
              next: 'floor_2',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Trust or Instinct',
        description: 'The drake\'s pupils narrow, instinct wars with reason. "If you mean harm, burn with me."',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 0.6,
          enemies: ['dragon-red-young', 'dragon-blue-young'],
          random: true,
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'Ash and Gratitude',
        description: 'The drake limps away into the distance, leaving behind a scale glowing faintly blue.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The scale pulses gently in your hand, warm, protective.',
            effects: [{ stat: 'xp', value: +10 }, { stat: 'defense', value: +1 }],
          },
        },
      },
    },
  },
  {
    name: 'The Lost Disciple',
    description: 'A lone figure in tattered robes prays facing a cracked idol. His voice trembles as if arguing with himself.',
    icon: 'assets/overlays/wanderer.png',
    id: 'lost-disciple',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Faith in Ruin',
        description: 'You hear fragments of his prayer, devotion and rage intertwined.',
        actions: [ActionType.Talk, ActionType.Observe],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You ask what he prays for.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'He whispers, "Forgiveness… or fire."',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'He laughs sharply, the sound echoes too long.',
            },
          },
          [ActionType.Observe]: {
            description: 'The idol\'s face is half-erased, its remaining eye weeps red dust.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Trial of Faith',
        description: 'He turns suddenly, eyes burning. "You doubt too, I can smell it."',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['disciple'],
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'A Quiet End',
        description: 'Only silence remains. The idol crumbles completely, leaving behind a single charm of clay.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You pocket the charm, it hums faintly when you hold your breath.',
            effects: [{ stat: 'mp', value: +4 }],
          },
        },
      },
    },
  },
  {
    name: 'The Elemental Vagabond',
    description: 'A translucent form drifts lazily through the clearing, shaped like wind made flesh.',
    icon: 'assets/overlays/wanderer.png',
    id: 'elemental-vagabond',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Whispers in the Breeze',
        description: 'The air speaks before the figure does. "Do you hear me, solid one?"',
        actions: [ActionType.Talk, ActionType.Pray],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You answer cautiously, the wind chuckles, scattering leaves.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: '"Ah, rare one! A listener among stones."',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The gust sighs, blowing cold against your neck.',
            },
          },
          [ActionType.Pray]: {
            description: 'You close your eyes and attune to its rhythm.',
            effects: [{ stat: 'mp', value: +4 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Shifting Mood',
        description: 'The spirit grows restless. "I remember… being free. Before the bindings."',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You sense its energy spiraling erratically, uncontrolled emotion.',
          },
          [ActionType.Interact]: {
            description: 'You raise a hand, steadying the wind\'s chaotic flow.',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'The air calms, condensing into a soft swirl that bows to you.',
              effects: [{ stat: 'xp', value: +10 }],
            },
            onFailure: {
              description: 'The gust explodes outward, slicing your cheek.',
              effects: [{ stat: 'hp', value: -4 }],
              next: 'floor_3',
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'Rage of the Airborne',
        description: 'The spirit condenses into a violent vortex, its voice shrieking in all directions.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['elemental-air'],
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'Calm After the Tempest',
        description: 'The wind softens to a gentle breeze. A single feather drifts down before vanishing.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'Your skin tingles faintly, the world feels a little lighter.',
            effects: [{ stat: 'xp', value: +8 }],
          },
        },
      },
    },
  },
  {
    name: 'The Nameless Pilgrim',
    description: 'A weary traveler sits by a dying fire. His face is familiar, though you\'ve never met him.',
    icon: 'assets/overlays/wanderer.png',
    id: 'nameless-pilgrim',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Flickering Fire',
        description: 'He looks up as you approach. "Do you walk to find, or to flee?"',
        actions: [ActionType.Talk, ActionType.Observe],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You sit beside him. He offers you a sip of something warm and bitter.',
            effects: [{ stat: 'hp', value: +3 }],
          },
          [ActionType.Observe]: {
            description: 'His eyes reflect the flames — twin suns in the dark.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Echoes of Roads Past',
        description: 'He speaks of cities that no longer exist, and wars that never were. You feel you remember them.',
        actions: [ActionType.Talk, ActionType.Observe],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You share your own stories. He listens as though you were an old friend.',
            effects: [{ stat: 'xp', value: +5 }],
          },
          [ActionType.Observe]: {
            description: 'You notice — his shadow does not move when the fire crackles.',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Forgotten Name',
        description: '"I was once… something," he murmurs. "A hero, a fool — maybe both."',
        actions: [ActionType.Pray, ActionType.Talk],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'You whisper a prayer for him, even without knowing who he was.',
            check: { orb: 'natural', difficulty: 10 },
            onSuccess: {
              description: 'He smiles faintly. "Then remember me as light."',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'He winces — "Names are burdens, after all."',
            },
          },
          [ActionType.Talk]: {
            description: 'You ask his name. He chuckles. "I was you, once."',
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'Ashes of Memory',
        description: 'The fire dies suddenly. The pilgrim stands — or his shadow does. "We meet again, don\'t we?"',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 0.7,
          enemies: ['lost-soul', 'dark-knight'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'The Last Ember',
        description: 'When the fight ends, only the ember remains. It glows faintly in your palm.',
        actions: [ActionType.Observe, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You feel calmer — as if a part of yourself had finally been forgiven.',
            effects: [{ stat: 'xp', value: +18 }, { stat: 'mp', value: +10 }],
          },
          [ActionType.Rest]: {
            description: 'You warm your hands over what\'s left of the fire. It never goes out.',
            effects: [{ stat: 'hp', value: +6 }],
          },
        },
      },
    },
  },
  {
    name: 'The Goblin Philosopher',
    description: 'A goblin in tattered robes sits cross-legged atop a rock, muttering about "the futility of chewing."',
    icon: 'assets/overlays/wanderer.png',
    id: 'goblin-philosopher',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Rock of Thoughts',
        description: 'The goblin greets you with a solemn nod. "Traveler, do you think the sky ever gets tired of falling?"',
        actions: [ActionType.Talk, ActionType.Observe],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You reply honestly: "Maybe it enjoys it." He seems genuinely impressed.',
            effects: [{ stat: 'xp', value: +4 }],
          },
          [ActionType.Observe]: {
            description: 'His staff is made of bones — but he uses it to stir soup.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Lesson of Hunger',
        description: 'He offers you a bowl. The stew smells terrible — yet strangely nostalgic.',
        actions: [ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You eat it. It tastes like rain and regret.',
            check: { orb: 'natural', difficulty: 9 },
            onSuccess: {
              description: 'You feel oddly nourished — and at peace.',
              effects: [{ stat: 'hp', value: +5 }],
            },
            onFailure: {
              description: 'You gag, coughing up green mist. The goblin laughs heartily.',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
          [ActionType.Pray]: {
            description: 'You politely refuse and bow your head. He calls you "wise for a tall one."',
            effects: [{ stat: 'xp', value: +3 }],
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Philosophy of Falling',
        description: 'He points at a nearby cliff. "To fall is to understand the ground."',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You peer down — it\'s deep enough to question your choices.',
          },
          [ActionType.Interact]: {
            description: 'He jumps without hesitation. You panic — then hear laughter below.',
            effects: [{ stat: 'xp', value: +5 }],
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'At the Bottom of Wisdom',
        description: 'You climb down. The goblin sits unharmed, stirring his stew again.',
        actions: [ActionType.Talk, ActionType.Pray],
        actionPassive: {
          [ActionType.Talk]: {
            description: '"See?" he says. "Falling only hurts if you care about landing."',
            effects: [{ stat: 'xp', value: +8 }],
          },
          [ActionType.Pray]: {
            description: 'You close your eyes and breathe. For a moment, everything feels simple.',
            effects: [{ stat: 'mp', value: +6 }],
          },
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Departure of the Thinker',
        description: 'The goblin stands and dusts himself off. "You\'ve learned something today. Don\'t remember it."',
        actions: [ActionType.Observe, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'He disappears into the fog — leaving behind his wooden spoon.',
            effects: [{ stat: 'xp', value: +15 }, { stat: 'gold', value: +20 }],
          },
          [ActionType.Rest]: {
            description: 'You rest beside the pot. The stew still bubbles — somehow cheerful.',
            effects: [{ stat: 'hp', value: +4 }],
          },
        },
      },
    },
  },
];
