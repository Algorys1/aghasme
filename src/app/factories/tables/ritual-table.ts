import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const RITUAL_TABLE: OverlayTemplate[] = [
  {
    name: 'OVERLAY.SACRED_RITUAL_SITE.NAME',
    description: 'OVERLAY.SACRED_RITUAL_SITE.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'sacred-ritual-site',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.SACRED_RITUAL_SITE.F1.TITLE',
        description: 'OVERLAY.SACRED_RITUAL_SITE.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.SACRED_RITUAL_SITE.F1.OBSERVE.DESCRIPTION',
            check: { orb: 'natural', difficulty: 8 },
            onSuccess: {
              description: 'OVERLAY.SACRED_RITUAL_SITE.F1.OBSERVE.SUCCESS',
              effects: [{ stat: 'hp', value: +4 }],
            },
            onFailure: {
              description: 'OVERLAY.SACRED_RITUAL_SITE.F1.OBSERVE.FAILURE',
            },
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.SACRED_RITUAL_SITE.F1.PRAY.DESCRIPTION',
            effects: [{ stat: 'mp', value: +3 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.SACRED_RITUAL_SITE.F2.TITLE',
        description: 'OVERLAY.SACRED_RITUAL_SITE.F2.DESCRIPTION',
        actions: [ActionType.Interact],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'OVERLAY.SACRED_RITUAL_SITE.F2.INTERACT.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY.SACRED_RITUAL_SITE.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'OVERLAY.SACRED_RITUAL_SITE.F2.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
      },
    },
  },
  {
    name: 'OVERLAY.DARK_RITUAL_CIRCLE.NAME',
    description: 'OVERLAY.DARK_RITUAL_CIRCLE.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'dark-ritual-circle',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.DARK_RITUAL_CIRCLE.F1.TITLE',
        description: 'OVERLAY.DARK_RITUAL_CIRCLE.F1.DESCRIPTION',
        actions: [ActionType.Observe],
        encounter: {
          chance: 1,
          enemies: ['skeleton-warrior', 'disciple'],
          random: true,
        },
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.DARK_RITUAL_CIRCLE.F1.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'hp', value: -2 }],
            onSuccess: {
              description: 'OVERLAY.DARK_RITUAL_CIRCLE.F1.OBSERVE.SUCCESS',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.DARK_RITUAL_CIRCLE.F2.TITLE',
        description: 'OVERLAY.DARK_RITUAL_CIRCLE.F2.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'OVERLAY.DARK_RITUAL_CIRCLE.F2.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 11, modifier: 1 },
            onSuccess: {
              description: 'OVERLAY.DARK_RITUAL_CIRCLE.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: 10 }],
            },
            onFailure: {
              description: 'OVERLAY.DARK_RITUAL_CIRCLE.F2.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.DARK_RITUAL_CIRCLE.F2.PRAY.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'OVERLAY.DARK_RITUAL_CIRCLE.F2.PRAY.SUCCESS',
              effects: [{ stat: 'xp', value: 5 }],
            },
            onFailure: {
              description: 'OVERLAY.DARK_RITUAL_CIRCLE.F2.PRAY.FAILURE',
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'OVERLAY.DARK_RITUAL_CIRCLE.F3.TITLE',
        description: 'OVERLAY.DARK_RITUAL_CIRCLE.F3.DESCRIPTION',
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
    name: 'OVERLAY.NATURE_ALTAR.NAME',
    description: 'OVERLAY.NATURE_ALTAR.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'nature-altar',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.NATURE_ALTAR.F1.TITLE',
        description: 'OVERLAY.NATURE_ALTAR.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.NATURE_ALTAR.F1.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'xp', value: 3 }],
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.NATURE_ALTAR.F1.PRAY.DESCRIPTION',
            check: { orb: 'natural', difficulty: 9 },
            onSuccess: {
              description: 'OVERLAY.NATURE_ALTAR.F1.PRAY.SUCCESS',
              effects: [{ stat: 'hp', value: +5 }],
            },
            onFailure: {
              description: 'OVERLAY.NATURE_ALTAR.F1.PRAY.FAILURE',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.NATURE_ALTAR.F2.TITLE',
        description: 'OVERLAY.NATURE_ALTAR.F2.DESCRIPTION',
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
    name: 'OVERLAY.CELESTIAL_OBSERVATORY.NAME',
    description: 'OVERLAY.CELESTIAL_OBSERVATORY.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'celestial-observatory',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.CELESTIAL_OBSERVATORY.F1.TITLE',
        description: 'OVERLAY.CELESTIAL_OBSERVATORY.F1.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'OVERLAY.CELESTIAL_OBSERVATORY.F1.INSPECT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY.CELESTIAL_OBSERVATORY.F1.INSPECT.SUCCESS',
              effects: [{ stat: 'xp', value: 8 }],
            },
            onFailure: {
              description: 'OVERLAY.CELESTIAL_OBSERVATORY.F1.INSPECT.FAILURE',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.CELESTIAL_OBSERVATORY.F1.PRAY.DESCRIPTION',
            effects: [{ stat: 'mp', value: +4 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.CELESTIAL_OBSERVATORY.F2.TITLE',
        description: 'OVERLAY.CELESTIAL_OBSERVATORY.F2.DESCRIPTION',
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
    name: 'OVERLAY.ELEMENTAL_SHRINE.NAME',
    description: 'OVERLAY.ELEMENTAL_SHRINE.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'elemental-shrine',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.ELEMENTAL_SHRINE.F1.TITLE',
        description: 'OVERLAY.ELEMENTAL_SHRINE.F1.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Observe],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'OVERLAY.ELEMENTAL_SHRINE.F1.INTERACT.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY.ELEMENTAL_SHRINE.F1.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: 6 }],
            },
            onFailure: {
              description: 'OVERLAY.ELEMENTAL_SHRINE.F1.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Observe]: {
            description: 'OVERLAY.ELEMENTAL_SHRINE.F1.OBSERVE.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.ELEMENTAL_SHRINE.F2.TITLE',
        description: 'OVERLAY.ELEMENTAL_SHRINE.F2.DESCRIPTION',
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
    name: 'OVERLAY.ECLIPSE_RITE.NAME',
    description: 'OVERLAY.ECLIPSE_RITE.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'eclipse-rite',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.ECLIPSE_RITE.F1.TITLE',
        description: 'OVERLAY.ECLIPSE_RITE.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Talk],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.ECLIPSE_RITE.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Talk]: {
            description: 'OVERLAY.ECLIPSE_RITE.F1.TALK.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.ECLIPSE_RITE.F2.TITLE',
        description: 'OVERLAY.ECLIPSE_RITE.F2.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Inspect],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'OVERLAY.ECLIPSE_RITE.F2.INTERACT.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'OVERLAY.ECLIPSE_RITE.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'OVERLAY.ECLIPSE_RITE.F2.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Inspect]: {
            description: 'OVERLAY.ECLIPSE_RITE.F2.INSPECT.DESCRIPTION',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'OVERLAY.ECLIPSE_RITE.F3.TITLE',
        description: 'OVERLAY.ECLIPSE_RITE.F3.DESCRIPTION',
        actions: [ActionType.Pray, ActionType.Interact],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'OVERLAY.ECLIPSE_RITE.F3.PRAY.DESCRIPTION',
          },
          [ActionType.Interact]: {
            description: 'OVERLAY.ECLIPSE_RITE.F3.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'OVERLAY.ECLIPSE_RITE.F3.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +10 }],
            },
            onFailure: {
              description: 'OVERLAY.ECLIPSE_RITE.F3.INTERACT.FAILURE',
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'OVERLAY.ECLIPSE_RITE.F4.TITLE',
        description: 'OVERLAY.ECLIPSE_RITE.F4.DESCRIPTION',
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
        title: 'OVERLAY.ECLIPSE_RITE.F5.TITLE',
        description: 'OVERLAY.ECLIPSE_RITE.F5.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.ECLIPSE_RITE.F5.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'xp', value: +20 }, { stat: 'mp', value: +8 }],
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.ECLIPSE_RITE.F5.PRAY.DESCRIPTION',
            effects: [{ stat: 'hp', value: +6 }],
          },
        },
      },
    },
  },
  {
    name: 'OVERLAY.THOUSAND_HANDS_CEREMONY.NAME',
    description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.DESCRIPTION',
    icon: 'assets/overlays/ritual.png',
    id: 'thousand-hands-ceremony',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F1.TITLE',
        description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Interact]: {
            description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F1.INTERACT.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F1.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F1.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F2.TITLE',
        description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F2.DESCRIPTION',
        actions: [ActionType.Pray, ActionType.Observe],
        actionPassive: {
          [ActionType.Pray]: {
            description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F2.PRAY.DESCRIPTION',
          },
          [ActionType.Observe]: {
            description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F2.OBSERVE.DESCRIPTION',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F3.TITLE',
        description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F3.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F3.INSPECT.DESCRIPTION',
          },
          [ActionType.Interact]: {
            description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F3.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 12 },
            onSuccess: {
              description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F3.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +10 }],
            },
            onFailure: {
              description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F3.INTERACT.FAILURE',
              next: 'floor_4',
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F4.TITLE',
        description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F4.DESCRIPTION',
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
        title: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F5.TITLE',
        description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F5.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F5.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'xp', value: +18 }, { stat: 'mp', value: +6 }],
          },
          [ActionType.Rest]: {
            description: 'OVERLAY.THOUSAND_HANDS_CEREMONY.F5.REST.DESCRIPTION',
            effects: [{ stat: 'hp', value: +8 }],
          },
        },
      },
    },
  },
];
