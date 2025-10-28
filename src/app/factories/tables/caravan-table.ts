import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const CARAVAN_TABLE: OverlayTemplate[] = [
  {
    name: 'OVERLAY.MERCHANT_CARAVAN.NAME',
    description: 'OVERLAY.MERCHANT_CARAVAN.DESCRIPTION',
    icon: 'assets/overlays/caravan.png',
    id: 'merchant-caravan',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.MERCHANT_CARAVAN.F1.TITLE',
        description: 'OVERLAY.MERCHANT_CARAVAN.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Trade, ActionType.Talk],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.MERCHANT_CARAVAN.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Trade]: {
            description: 'OVERLAY.MERCHANT_CARAVAN.F1.TRADE.DESCRIPTION',
            effects: [{ stat: 'gold', value: -5 }],
          },
          [ActionType.Talk]: {
            description: 'OVERLAY.MERCHANT_CARAVAN.F1.TALK.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.MERCHANT_CARAVAN.F2.TITLE',
        description: 'OVERLAY.MERCHANT_CARAVAN.F2.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Inspect],
        encounter: {
          chance: 0.4,
          enemies: ['bandit'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'OVERLAY.MERCHANT_CARAVAN.F2.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY.MERCHANT_CARAVAN.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'gold', value: +15 }],
            },
            onFailure: {
              description: 'OVERLAY.MERCHANT_CARAVAN.F2.INTERACT.FAILURE',
            },
          },
          [ActionType.Inspect]: {
            description: 'OVERLAY.MERCHANT_CARAVAN.F2.INSPECT.DESCRIPTION',
          },
        },
      },
      floor_3: {
        title: 'OVERLAY.MERCHANT_CARAVAN.F3.TITLE',
        description: 'OVERLAY.MERCHANT_CARAVAN.F3.DESCRIPTION',
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
    name: 'OVERLAY.NOMADIC_TRIBE.NAME',
    description: 'OVERLAY.NOMADIC_TRIBE.DESCRIPTION',
    icon: 'assets/overlays/caravan.png',
    id: 'nomadic-tribe',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.NOMADIC_TRIBE.F1.TITLE',
        description: 'OVERLAY.NOMADIC_TRIBE.F1.DESCRIPTION',
        actions: [ActionType.Talk, ActionType.Observe, ActionType.Trade],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'OVERLAY.NOMADIC_TRIBE.F1.TALK.DESCRIPTION',
            effects: [{ stat: 'hp', value: +3 }],
          },
          [ActionType.Observe]: {
            description: 'OVERLAY.NOMADIC_TRIBE.F1.OBSERVE.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.NOMADIC_TRIBE.F2.TITLE',
        description: 'OVERLAY.NOMADIC_TRIBE.F2.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Pray],
        encounter: {
          chance: 0.3,
          enemies: ['snake'],
        },
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'OVERLAY.NOMADIC_TRIBE.F2.INSPECT.DESCRIPTION',
            check: { orb: 'natural', difficulty: 9 },
            onSuccess: {
              description: 'OVERLAY.NOMADIC_TRIBE.F2.INSPECT.SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'OVERLAY.NOMADIC_TRIBE.F2.INSPECT.FAILURE',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.NOMADIC_TRIBE.F2.PRAY.DESCRIPTION',
          },
        },
      },
    },
  },
  {
    name: 'OVERLAY.MILITARY_CONVOY.NAME',
    description: 'OVERLAY.MILITARY_CONVOY.DESCRIPTION',
    icon: 'assets/overlays/caravan.png',
    id: 'military-convoy',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.MILITARY_CONVOY.F1.TITLE',
        description: 'OVERLAY.MILITARY_CONVOY.F1.DESCRIPTION',
        actions: [ActionType.Talk, ActionType.Interact, ActionType.Trade],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'OVERLAY.MILITARY_CONVOY.F1.TALK.DESCRIPTION',
            check: { orb: 'bestial', difficulty: 9 },
            onSuccess: {
              description: 'OVERLAY.MILITARY_CONVOY.F1.TALK.SUCCESS',
              effects: [{ stat: 'xp', value: +4 }],
            },
            onFailure: {
              description: 'OVERLAY.MILITARY_CONVOY.F1.TALK.FAILURE',
              next: 'floor_2',
            },
          },
          [ActionType.Interact]: {
            description: 'OVERLAY.MILITARY_CONVOY.F1.INTERACT.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.MILITARY_CONVOY.F2.TITLE',
        description: 'OVERLAY.MILITARY_CONVOY.F2.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Observe],
        encounter: {
          chance: 0.3,
          enemies: ['guard'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'OVERLAY.MILITARY_CONVOY.F2.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY.MILITARY_CONVOY.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'OVERLAY.MILITARY_CONVOY.F2.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
          [ActionType.Observe]: {
            description: 'OVERLAY.MILITARY_CONVOY.F2.OBSERVE.DESCRIPTION',
          },
        },
      },
      floor_3: {
        title: 'OVERLAY.MILITARY_CONVOY.F3.TITLE',
        description: 'OVERLAY.MILITARY_CONVOY.F3.DESCRIPTION',
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
    name: 'OVERLAY.PILGRIM_GROUP.NAME',
    description: 'OVERLAY.PILGRIM_GROUP.DESCRIPTION',
    icon: 'assets/overlays/caravan.png',
    id: 'pilgrim-group',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.PILGRIM_GROUP.F1.TITLE',
        description: 'OVERLAY.PILGRIM_GROUP.F1.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Observe],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'OVERLAY.PILGRIM_GROUP.F1.INTERACT.DESCRIPTION',
            effects: [{ stat: 'mp', value: +4 }],
          },
          [ActionType.Observe]: {
            description: 'OVERLAY.PILGRIM_GROUP.F1.OBSERVE.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.PILGRIM_GROUP.F2.TITLE',
        description: 'OVERLAY.PILGRIM_GROUP.F2.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Inspect],
        encounter: {
          chance: 0.5,
          enemies: ['lost-soul'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'OVERLAY.PILGRIM_GROUP.F2.INTERACT.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY.PILGRIM_GROUP.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'OVERLAY.PILGRIM_GROUP.F2.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Inspect]: {
            description: 'OVERLAY.PILGRIM_GROUP.F2.INSPECT.DESCRIPTION',
          },
        },
      },
      floor_3: {
        title: 'OVERLAY.PILGRIM_GROUP.F3.TITLE',
        description: 'OVERLAY.PILGRIM_GROUP.F3.DESCRIPTION',
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
    name: 'OVERLAY.EXPLORATION_PARTY.NAME',
    description: 'OVERLAY.EXPLORATION_PARTY.DESCRIPTION',
    icon: 'assets/overlays/caravan.png',
    id: 'exploration-party',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.EXPLORATION_PARTY.F1.TITLE',
        description: 'OVERLAY.EXPLORATION_PARTY.F1.DESCRIPTION',
        actions: [ActionType.Talk, ActionType.Observe, ActionType.Trade],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'OVERLAY.EXPLORATION_PARTY.F1.TALK.DESCRIPTION',
          },
          [ActionType.Observe]: {
            description: 'OVERLAY.EXPLORATION_PARTY.F1.OBSERVE.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.EXPLORATION_PARTY.F2.TITLE',
        description: 'OVERLAY.EXPLORATION_PARTY.F2.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Inspect],
        encounter: {
          chance: 0.4,
          enemies: ['bandit'],
        },
        actionPassive: {
          [ActionType.Interact]: {
            description: 'OVERLAY.EXPLORATION_PARTY.F2.INTERACT.DESCRIPTION',
            check: { orb: 'bestial', difficulty: 9 },
            onSuccess: {
              description: 'OVERLAY.EXPLORATION_PARTY.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'OVERLAY.EXPLORATION_PARTY.F2.INTERACT.FAILURE',
            },
          },
          [ActionType.Inspect]: {
            description: 'OVERLAY.EXPLORATION_PARTY.F2.INSPECT.DESCRIPTION',
          },
        },
      },
      floor_3: {
        title: 'OVERLAY.EXPLORATION_PARTY.F3.TITLE',
        description: 'OVERLAY.EXPLORATION_PARTY.F3.DESCRIPTION',
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
    name: 'OVERLAY.SANDSTORM_CARAVAN.NAME',
    description: 'OVERLAY.SANDSTORM_CARAVAN.DESCRIPTION',
    icon: 'assets/overlays/caravan.png',
    id: 'sandstorm-caravan',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.SANDSTORM_CARAVAN.F1.TITLE',
        description: 'OVERLAY.SANDSTORM_CARAVAN.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.SANDSTORM_CARAVAN.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Interact]: {
            description: 'OVERLAY.SANDSTORM_CARAVAN.F1.INTERACT.DESCRIPTION',
            effects: [{ stat: 'hp', value: -2 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.SANDSTORM_CARAVAN.F2.TITLE',
        description: 'OVERLAY.SANDSTORM_CARAVAN.F2.DESCRIPTION',
        actions: [ActionType.Talk, ActionType.Interact],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'OVERLAY.SANDSTORM_CARAVAN.F2.TALK.DESCRIPTION',
            effects: [{ stat: 'xp', value: +3 }],
          },
          [ActionType.Interact]: {
            description: 'OVERLAY.SANDSTORM_CARAVAN.F2.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY.SANDSTORM_CARAVAN.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'OVERLAY.SANDSTORM_CARAVAN.F2.INTERACT.FAILURE',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'OVERLAY.SANDSTORM_CARAVAN.F3.TITLE',
        description: 'OVERLAY.SANDSTORM_CARAVAN.F3.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.SANDSTORM_CARAVAN.F3.OBSERVE.DESCRIPTION',
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.SANDSTORM_CARAVAN.F3.PRAY.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'OVERLAY.SANDSTORM_CARAVAN.F3.PRAY.SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'OVERLAY.SANDSTORM_CARAVAN.F3.PRAY.FAILURE',
              effects: [{ stat: 'xp', value: -10 }],
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'OVERLAY.SANDSTORM_CARAVAN.F4.TITLE',
        description: 'OVERLAY.SANDSTORM_CARAVAN.F4.DESCRIPTION',
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
        title: 'OVERLAY.SANDSTORM_CARAVAN.F5.TITLE',
        description: 'OVERLAY.SANDSTORM_CARAVAN.F5.DESCRIPTION',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.SANDSTORM_CARAVAN.F5.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'xp', value: +15 }, { stat: 'gold', value: +60 }],
          },
        },
      },
    },
  },
  {
    name: 'OVERLAY.NIGHT_CONVOY.NAME',
    description: 'OVERLAY.NIGHT_CONVOY.DESCRIPTION',
    icon: 'assets/overlays/caravan.png',
    actions: [],
    id: 'night-convoy',
    eventChain: {
      floor_1: {
        title: 'OVERLAY.NIGHT_CONVOY.F1.TITLE',
        description: 'OVERLAY.NIGHT_CONVOY.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Talk],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.NIGHT_CONVOY.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Talk]: {
            description: 'OVERLAY.NIGHT_CONVOY.F1.TALK.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.NIGHT_CONVOY.F2.TITLE',
        description: 'OVERLAY.NIGHT_CONVOY.F2.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'OVERLAY.NIGHT_CONVOY.F2.INSPECT.DESCRIPTION',
            effects: [{ stat: 'xp', value: +4 }],
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.NIGHT_CONVOY.F2.PRAY.DESCRIPTION',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'OVERLAY.NIGHT_CONVOY.F3.TITLE',
        description: 'OVERLAY.NIGHT_CONVOY.F3.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'OVERLAY.NIGHT_CONVOY.F3.INTERACT.DESCRIPTION',
            effects: [{ stat: 'hp', value: -2 }],
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.NIGHT_CONVOY.F3.PRAY.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY.NIGHT_CONVOY.F3.PRAY.SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'OVERLAY.NIGHT_CONVOY.F3.PRAY.FAILURE',
              effects: [{ stat: 'xp', value: -10 }],
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'OVERLAY.NIGHT_CONVOY.F4.TITLE',
        description: 'OVERLAY.NIGHT_CONVOY.F4.DESCRIPTION',
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
        title: 'OVERLAY.NIGHT_CONVOY.F5.TITLE',
        description: 'OVERLAY.NIGHT_CONVOY.F5.DESCRIPTION',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.NIGHT_CONVOY.F5.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'xp', value: +18 }, { stat: 'mp', value: +6 }],
          },
        },
      },
    },
  },
];
