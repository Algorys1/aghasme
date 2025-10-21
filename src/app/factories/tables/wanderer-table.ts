import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const WANDERER_TABLE: OverlayTemplate[] = [
  {
    name: 'The Tired Mage',
    description: 'A robed figure trudges through the dust, muttering to himself. His staff flickers with faint energy.',
    icon: 'assets/overlays/wanderer.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Roadside Encounter',
        description: 'He stops at your approach, his eyes dim with exhaustion. “Traveler… the ley lines here are twisted.”',
        actions: [ActionType.Talk, ActionType.Observe],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You offer him a greeting. His voice is calm but heavy with regret.',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'He nods. “You feel it too, then. The air hums wrong here.”',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'He waves you off, too drained to speak further.',
            },
          },
          [ActionType.Observe]: {
            description: 'You notice his staff’s crystal cracked, leaking slow motes of blue light.',
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
              description: 'The crystal stabilizes, his expression softens. “Thank you.”',
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
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Roadside Rest',
        description: 'He squints at you, clutching his sack. “Not steal, not steal. Just carry stone. Magic stone.”',
        actions: [ActionType.Talk, ActionType.Observe],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You ask what his “magic stones” are.',
            check: { orb: 'natural', difficulty: 9 },
            onSuccess: {
              description: 'He proudly shows you, they’re just river pebbles polished smooth.',
              effects: [{ stat: 'xp', value: +3 }],
            },
            onFailure: {
              description: 'He hides them quickly. “No touch! Not yours.”',
            },
          },
          [ActionType.Observe]: {
            description: 'His “cart” is actually an old shield strapped with vines.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Offering',
        description: 'He holds out a single stone, eyes shining. “Gift. You strong. You lucky now.”',
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
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Fallen Wing',
        description: 'Its scales shimmer faintly, dulled by dust and blood. “Leave… or help,” it growls weakly.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You see old scars, not from humans, but claws. Another dragon did this.',
          },
          [ActionType.Interact]: {
            description: 'You approach carefully, offering water.',
            check: { orb: 'natural', difficulty: 10 },
            onSuccess: {
              description: 'It drinks slowly. “Few would risk approaching… you are brave.”',
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
        description: 'The drake’s pupils narrow, instinct wars with reason. “If you mean harm, burn with me.”',
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
              description: 'He whispers, “Forgiveness… or fire.”',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'He laughs sharply, the sound echoes too long.',
            },
          },
          [ActionType.Observe]: {
            description: 'The idol’s face is half-erased, its remaining eye weeps red dust.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Trial of Faith',
        description: 'He turns suddenly, eyes burning. “You doubt too, I can smell it.”',
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
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Whispers in the Breeze',
        description: 'The air speaks before the figure does. “Do you hear me, solid one?”',
        actions: [ActionType.Talk, ActionType.Pray],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You answer cautiously, the wind chuckles, scattering leaves.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: '“Ah, rare one! A listener among stones.”',
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
        description: 'The spirit grows restless. “I remember… being free. Before the bindings.”',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You sense its energy spiraling erratically, uncontrolled emotion.',
          },
          [ActionType.Interact]: {
            description: 'You raise a hand, steadying the wind’s chaotic flow.',
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
];
