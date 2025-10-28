import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const RITUAL_TABLE: OverlayTemplate[] = [
  {
    name: 'RITUAL.SACRED_RITUAL_SITE.NAME',
    description: 'RITUAL.SACRED_RITUAL_SITE.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'sacred-ritual-site',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'RITUAL.SACRED_RITUAL_SITE.F1.TITLE',
        description: 'RITUAL.SACRED_RITUAL_SITE.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'RITUAL.SACRED_RITUAL_SITE.F1.OBSERVE.DESCRIPTION',
            check: { orb: 'natural', difficulty: 8 },
            onSuccess: {
              description: 'RITUAL.SACRED_RITUAL_SITE.F1.OBSERVE.SUCCESS',
              effects: [{ stat: 'hp', value: +4 }],
            },
            onFailure: {
              description: 'RITUAL.SACRED_RITUAL_SITE.F1.OBSERVE.FAILURE',
            },
          },
          [ActionType.Pray]: {
            description: 'RITUAL.SACRED_RITUAL_SITE.F1.PRAY.DESCRIPTION',
            effects: [{ stat: 'mp', value: +3 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'RITUAL.SACRED_RITUAL_SITE.F2.TITLE',
        description: 'RITUAL.SACRED_RITUAL_SITE.F2.DESCRIPTION',
        actions: [ActionType.Interact],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'RITUAL.SACRED_RITUAL_SITE.F2.INTERACT.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'RITUAL.SACRED_RITUAL_SITE.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'RITUAL.SACRED_RITUAL_SITE.F2.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
      },
    },
  },
  {
    name: 'RITUAL.DARK_RITUAL_CIRCLE.NAME',
    description: 'RITUAL.DARK_RITUAL_CIRCLE.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'dark-ritual-circle',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'RITUAL.DARK_RITUAL_CIRCLE.F1.TITLE',
        description: 'RITUAL.DARK_RITUAL_CIRCLE.F1.DESCRIPTION',
        actions: [ActionType.Observe],
        encounter: {
          chance: 1,
          enemies: ['skeleton-warrior', 'disciple'],
          random: true,
        },
        actionPassive: {
          [ActionType.Observe]: {
            description: 'RITUAL.DARK_RITUAL_CIRCLE.F1.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'hp', value: -2 }],
            onSuccess: {
              description: 'RITUAL.DARK_RITUAL_CIRCLE.F1.OBSERVE.SUCCESS',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'RITUAL.DARK_RITUAL_CIRCLE.F2.TITLE',
        description: 'RITUAL.DARK_RITUAL_CIRCLE.F2.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'RITUAL.DARK_RITUAL_CIRCLE.F2.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 11, modifier: 1 },
            onSuccess: {
              description: 'RITUAL.DARK_RITUAL_CIRCLE.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: 10 }],
            },
            onFailure: {
              description: 'RITUAL.DARK_RITUAL_CIRCLE.F2.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
          [ActionType.Pray]: {
            description: 'RITUAL.DARK_RITUAL_CIRCLE.F2.PRAY.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'RITUAL.DARK_RITUAL_CIRCLE.F2.PRAY.SUCCESS',
              effects: [{ stat: 'xp', value: 5 }],
            },
            onFailure: {
              description: 'RITUAL.DARK_RITUAL_CIRCLE.F2.PRAY.FAILURE',
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'RITUAL.DARK_RITUAL_CIRCLE.F3.TITLE',
        description: 'RITUAL.DARK_RITUAL_CIRCLE.F3.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['skeleton-warrior', 'disciple'],
          random: true,
        },
      },
    },
  },
  {
    name: 'RITUAL.NATURE_ALTAR.NAME',
    description: 'RITUAL.NATURE_ALTAR.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'nature-altar',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'RITUAL.NATURE_ALTAR.F1.TITLE',
        description: 'RITUAL.NATURE_ALTAR.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'RITUAL.NATURE_ALTAR.F1.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'xp', value: 3 }],
          },
          [ActionType.Pray]: {
            description: 'RITUAL.NATURE_ALTAR.F1.PRAY.DESCRIPTION',
            check: { orb: 'natural', difficulty: 9 },
            onSuccess: {
              description: 'RITUAL.NATURE_ALTAR.F1.PRAY.SUCCESS',
              effects: [{ stat: 'hp', value: +5 }],
            },
            onFailure: {
              description: 'RITUAL.NATURE_ALTAR.F1.PRAY.FAILURE',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'RITUAL.NATURE_ALTAR.F2.TITLE',
        description: 'RITUAL.NATURE_ALTAR.F2.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['wild-boar'],
        },
      },
    },
  },
  {
    name: 'RITUAL.CELESTIAL_OBSERVATORY.NAME',
    description: 'RITUAL.CELESTIAL_OBSERVATORY.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'celestial-observatory',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'RITUAL.CELESTIAL_OBSERVATORY.F1.TITLE',
        description: 'RITUAL.CELESTIAL_OBSERVATORY.F1.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'RITUAL.CELESTIAL_OBSERVATORY.F1.INSPECT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'RITUAL.CELESTIAL_OBSERVATORY.F1.INSPECT.SUCCESS',
              effects: [{ stat: 'xp', value: 8 }],
            },
            onFailure: {
              description: 'RITUAL.CELESTIAL_OBSERVATORY.F1.INSPECT.FAILURE',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Pray]: {
            description: 'RITUAL.CELESTIAL_OBSERVATORY.F1.PRAY.DESCRIPTION',
            effects: [{ stat: 'mp', value: +4 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'RITUAL.CELESTIAL_OBSERVATORY.F2.TITLE',
        description: 'RITUAL.CELESTIAL_OBSERVATORY.F2.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['disciple', 'corrupt-sorcerer'],
          random: true,
        },
      },
    },
  },
  {
    name: 'RITUAL.ELEMENTAL_SHRINE.NAME',
    description: 'RITUAL.ELEMENTAL_SHRINE.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'elemental-shrine',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'RITUAL.ELEMENTAL_SHRINE.F1.TITLE',
        description: 'RITUAL.ELEMENTAL_SHRINE.F1.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Observe],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'RITUAL.ELEMENTAL_SHRINE.F1.INTERACT.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'RITUAL.ELEMENTAL_SHRINE.F1.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: 6 }],
            },
            onFailure: {
              description: 'RITUAL.ELEMENTAL_SHRINE.F1.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Observe]: {
            description: 'RITUAL.ELEMENTAL_SHRINE.F1.OBSERVE.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'RITUAL.ELEMENTAL_SHRINE.F2.TITLE',
        description: 'RITUAL.ELEMENTAL_SHRINE.F2.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['orb-mechanic', 'beetle-lava'],
          random: true,
        },
      },
    },
  },
  {
    name: 'RITUAL.ECLIPSE_RITE.NAME',
    description: 'RITUAL.ECLIPSE_RITE.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'eclipse-rite',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'RITUAL.ECLIPSE_RITE.F1.TITLE',
        description: 'RITUAL.ECLIPSE_RITE.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Talk],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'RITUAL.ECLIPSE_RITE.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Talk]: {
            description: 'RITUAL.ECLIPSE_RITE.F1.TALK.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'RITUAL.ECLIPSE_RITE.F2.TITLE',
        description: 'RITUAL.ECLIPSE_RITE.F2.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Inspect],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'RITUAL.ECLIPSE_RITE.F2.INTERACT.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'RITUAL.ECLIPSE_RITE.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'RITUAL.ECLIPSE_RITE.F2.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Inspect]: {
            description: 'RITUAL.ECLIPSE_RITE.F2.INSPECT.DESCRIPTION',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'RITUAL.ECLIPSE_RITE.F3.TITLE',
        description: 'RITUAL.ECLIPSE_RITE.F3.DESCRIPTION',
        actions: [ActionType.Pray, ActionType.Interact],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'RITUAL.ECLIPSE_RITE.F3.PRAY.DESCRIPTION',
          },
          [ActionType.Interact]: {
            description: 'RITUAL.ECLIPSE_RITE.F3.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'RITUAL.ECLIPSE_RITE.F3.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +10 }],
            },
            onFailure: {
              description: 'RITUAL.ECLIPSE_RITE.F3.INTERACT.FAILURE',
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'RITUAL.ECLIPSE_RITE.F4.TITLE',
        description: 'RITUAL.ECLIPSE_RITE.F4.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['elemental-air', 'elemental-fire'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'RITUAL.ECLIPSE_RITE.F5.TITLE',
        description: 'RITUAL.ECLIPSE_RITE.F5.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'RITUAL.ECLIPSE_RITE.F5.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'xp', value: +20 }, { stat: 'mp', value: +8 }],
          },
          [ActionType.Pray]: {
            description: 'RITUAL.ECLIPSE_RITE.F5.PRAY.DESCRIPTION',
            effects: [{ stat: 'hp', value: +6 }],
          },
        },
      },
    },
  },
  {
    name: 'RITUAL.THOUSAND_HANDS_CEREMONY.NAME',
    description: 'RITUAL.THOUSAND_HANDS_CEREMONY.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'thousand-hands-ceremony',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'RITUAL.THOUSAND_HANDS_CEREMONY.F1.TITLE',
        description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Interact]: {
            description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F1.INTERACT.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F1.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F1.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'RITUAL.THOUSAND_HANDS_CEREMONY.F2.TITLE',
        description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F2.DESCRIPTION',
        actions: [ActionType.Pray, ActionType.Observe],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F2.PRAY.DESCRIPTION',
          },
          [ActionType.Observe]: {
            description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F2.OBSERVE.DESCRIPTION',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'RITUAL.THOUSAND_HANDS_CEREMONY.F3.TITLE',
        description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F3.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F3.INSPECT.DESCRIPTION',
          },
          [ActionType.Interact]: {
            description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F3.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 12 },
            onSuccess: {
              description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F3.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +10 }],
            },
            onFailure: {
              description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F3.INTERACT.FAILURE',
              next: 'floor_4',
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'RITUAL.THOUSAND_HANDS_CEREMONY.F4.TITLE',
        description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F4.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['golem-mechanic', 'elemental-earth'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'RITUAL.THOUSAND_HANDS_CEREMONY.F5.TITLE',
        description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F5.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F5.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'xp', value: +18 }, { stat: 'mp', value: +6 }],
          },
          [ActionType.Rest]: {
            description: 'RITUAL.THOUSAND_HANDS_CEREMONY.F5.REST.DESCRIPTION',
            effects: [{ stat: 'hp', value: +8 }],
          },
        },
      },
    },
  },
];
