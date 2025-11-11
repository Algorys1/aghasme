import { ActionType } from '../models/actions';
import { OverlayTemplate } from '../models/overlays.model';

export const ANOMALY_TABLE: OverlayTemplate[] = [
  {
    name: 'ANOMALY.TEMPORAL_RIFT.NAME',
    description: 'ANOMALY.TEMPORAL_RIFT.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'temporal-rift',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'ANOMALY.TEMPORAL_RIFT.F1.TITLE',
        description: 'ANOMALY.TEMPORAL_RIFT.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'ANOMALY.TEMPORAL_RIFT.F1.OBSERVE.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'ANOMALY.TEMPORAL_RIFT.F1.OBSERVE.SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'ANOMALY.TEMPORAL_RIFT.F1.OBSERVE.FAIL',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Interact]: {
            description: 'ANOMALY.TEMPORAL_RIFT.F1.INTERACT.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'ANOMALY.TEMPORAL_RIFT.F2.TITLE',
        description: 'ANOMALY.TEMPORAL_RIFT.F2.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['disciple'],
        },
      },
    },
  },
  {
    name: 'ANOMALY.INFERNAL_SURGE.NAME',
    description: 'ANOMALY.INFERNAL_SURGE.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'infernal-surge',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'ANOMALY.INFERNAL_SURGE.F1.TITLE',
        description: 'ANOMALY.INFERNAL_SURGE.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'ANOMALY.INFERNAL_SURGE.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Pray]: {
            description: 'ANOMALY.INFERNAL_SURGE.F1.PRAY.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'ANOMALY.INFERNAL_SURGE.F1.PRAY.SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'ANOMALY.INFERNAL_SURGE.F1.PRAY.FAIL',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'ANOMALY.INFERNAL_SURGE.F2.TITLE',
        description: 'ANOMALY.INFERNAL_SURGE.F2.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['demon-of-ashes'],
        },
      },
    },
  },
  {
    name: 'ANOMALY.MECHANICAL_DISTORSION.NAME',
    description: 'ANOMALY.MECHANICAL_DISTORSION.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'mechanical-distorsion',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'ANOMALY.MECHANICAL_DISTORSION.F1.TITLE',
        description: 'ANOMALY.MECHANICAL_DISTORSION.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'ANOMALY.MECHANICAL_DISTORSION.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Interact]: {
            description: 'ANOMALY.MECHANICAL_DISTORSION.F1.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY_MECHANICAL_DISTORSION.F1.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'OVERLAY_MECHANICAL_DISTORSION.F1.INTERACT.FAIL',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'ANOMALY.MECHANICAL_DISTORSION.F2.TITLE',
        description: 'ANOMALY.MECHANICAL_DISTORSION.F2.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['orb-mechanic'],
        },
      },
    },
  },
  {
    name: 'ANOMALY.CORRUPTED_GROVE.NAME',
    description: 'ANOMALY.CORRUPTED_GROVE.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'corrupted-grove',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'ANOMALY.CORRUPTED_GROVE.F1.TITLE',
        description: 'ANOMALY.CORRUPTED_GROVE.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'ANOMALY.CORRUPTED_GROVE.F1.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'xp', value: +4 }],
          },
          [ActionType.Interact]: {
            description: 'ANOMALY.CORRUPTED_GROVE.F1.INTERACT.DESCRIPTION',
            effects: [{ stat: 'hp', value: -2 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'ANOMALY.CORRUPTED_GROVE.F2.TITLE',
        description: 'ANOMALY.CORRUPTED_GROVE.F2.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'ANOMALY.CORRUPTED_GROVE.F2.INSPECT.DESCRIPTION',
          },
          [ActionType.Pray]: {
            description: 'ANOMALY.CORRUPTED_GROVE.F2.PRAY.DESCRIPTION',
            check: { orb: 'natural', difficulty: 10 },
            onSuccess: {
              description: 'ANOMALY.CORRUPTED_GROVE.F2.PRAY.SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'ANOMALY.CORRUPTED_GROVE.F2.PRAY.FAIL',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'ANOMALY.CORRUPTED_GROVE.F3.TITLE',
        description: 'ANOMALY.CORRUPTED_GROVE.F3.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['mossy-spider'],
        },
      },
    },
  },
  {
    name: 'ANOMALY.ANCESTRAL_ECHO.NAME',
    description: 'ANOMALY.ANCESTRAL_ECHO.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'ancestral-echo',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'ANOMALY.ANCESTRAL_ECHO.F1.TITLE',
        description: 'ANOMALY.ANCESTRAL_ECHO.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'ANOMALY.ANCESTRAL_ECHO.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Pray]: {
            description: 'ANOMALY.ANCESTRAL_ECHO.F1.PRAY.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'ANOMALY.ANCESTRAL_ECHO.F1.PRAY.SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'ANOMALY.ANCESTRAL_ECHO.F1.PRAY.FAIL',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'ANOMALY.ANCESTRAL_ECHO.F2.TITLE',
        description: 'ANOMALY.ANCESTRAL_ECHO.F2.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['lost-soul', 'ghost'],
          random: true,
        },
      },
    },
  },
  {
    name: 'ANOMALY.ASH_BREACH.NAME',
    description: 'ANOMALY.ASH_BREACH.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    actions: [],
    id: 'ash-breach',
    eventChain: {
      floor_1: {
        title: 'ANOMALY.ASH_BREACH.F1.TITLE',
        description: 'ANOMALY.ASH_BREACH.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'ANOMALY.ASH_BREACH.F1.OBSERVE.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'ANOMALY.ASH_BREACH.F1.OBSERVE.SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'ANOMALY.ASH_BREACH.F1.OBSERVE.FAIL',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Interact]: {
            description: 'ANOMALY.ASH_BREACH.F1.INTERACT.DESCRIPTION',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'ANOMALY.ASH_BREACH.F2.TITLE',
        description: 'ANOMALY.ASH_BREACH.F2.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'ANOMALY.ASH_BREACH.F2.INSPECT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'ANOMALY.ASH_BREACH.F2.INSPECT.SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'ANOMALY.ASH_BREACH.F2.INSPECT.FAIL',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Pray]: {
            description: 'ANOMALY.ASH_BREACH.F2.PRAY.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'ANOMALY.ASH_BREACH.F2.PRAY.SUCCESS',
            },
            onFailure: {
              description: 'ANOMALY.ASH_BREACH.F2.PRAY.FAIL',
              next: 'floor_3',
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'ANOMALY.ASH_BREACH.F3.TITLE',
        description: 'ANOMALY.ASH_BREACH.F3.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'ANOMALY.ASH_BREACH.F3.OBSERVE.DESCRIPTION',
          },
          [ActionType.Interact]: {
            description: 'ANOMALY.ASH_BREACH.F3.INTERACT.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 13 },
            onSuccess: {
              description: 'ANOMALY.ASH_BREACH.F3.INTERACT.SUCCESS',
              effects: [{ stat: 'hp', value: -2 }, { stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'ANOMALY.ASH_BREACH.F3.INTERACT.FAIL',
              effects: [{ stat: 'hp', value: -6 }],
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'ANOMALY.ASH_BREACH.F4.TITLE',
        description: 'ANOMALY.ASH_BREACH.F4.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['drake-of-ashes', 'elemental-fire'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'ANOMALY.ASH_BREACH.F5.TITLE',
        description: 'ANOMALY.ASH_BREACH.F5.DESCRIPTION',
        actions: [ActionType.Rest, ActionType.Observe],
        actionPassive: {
          [ActionType.Rest]: {
            description: 'ANOMALY.ASH_BREACH.F5.REST.DESCRIPTION',
            effects: [{ stat: 'hp', value: +5 }, { stat: 'xp', value: +6 }],
          },
          [ActionType.Observe]: {
            description: 'ANOMALY.ASH_BREACH.F5.OBSERVE.DESCRIPTION',
          },
        },
      },
    },
  },
  {
    name: 'ANOMALY.RIFT_OF_ECHOES.NAME',
    description: 'ANOMALY.RIFT_OF_ECHOES.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'rift-of-echoes',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'ANOMALY.RIFT_OF_ECHOES.F1.TITLE',
        description: 'ANOMALY.RIFT_OF_ECHOES.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Inspect],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'ANOMALY.RIFT_OF_ECHOES.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Inspect]: {
            description: 'ANOMALY.RIFT_OF_ECHOES.F1.INSPECT.DESCRIPTION',
            effects: [{ stat: 'xp', value: +4 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'ANOMALY.RIFT_OF_ECHOES.F2.TITLE',
        description: 'ANOMALY.RIFT_OF_ECHOES.F2.DESCRIPTION',
        actions: [ActionType.Talk, ActionType.Pray],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'ANOMALY.RIFT_OF_ECHOES.F2.TALK.DESCRIPTION',
            effects: [{ stat: 'mp', value: -2 }],
          },
          [ActionType.Pray]: {
            description: 'ANOMALY.RIFT_OF_ECHOES.F2.PRAY.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'ANOMALY.RIFT_OF_ECHOES.F2.PRAY.SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'ANOMALY.RIFT_OF_ECHOES.F2.PRAY.FAIL',
              effects: [{ stat: 'mp', value: -6 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'ANOMALY.RIFT_OF_ECHOES.F3.TITLE',
        description: 'ANOMALY.RIFT_OF_ECHOES.F3.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Inspect],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'ANOMALY.RIFT_OF_ECHOES.F3.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 12 },
            onSuccess: {
              description: 'ANOMALY.RIFT_OF_ECHOES.F3.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'ANOMALY.RIFT_OF_ECHOES.F3.INTERACT.FAIL',
              effects: [{ stat: 'hp', value: -5 }],
              next: 'floor_4',
            },
          },
          [ActionType.Inspect]: {
            description: 'ANOMALY.RIFT_OF_ECHOES.F3.INSPECT.DESCRIPTION',
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'ANOMALY.RIFT_OF_ECHOES.F4.TITLE',
        description: 'ANOMALY.RIFT_OF_ECHOES.F4.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['elemental-air', 'elemental-water'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'ANOMALY.RIFT_OF_ECHOES.F5.TITLE',
        description: 'ANOMALY.RIFT_OF_ECHOES.F5.DESCRIPTION',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'ANOMALY.RIFT_OF_ECHOES.F5.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'xp', value: +15 }, { stat: 'mp', value: +8 }],
          },
        },
      },
    },
  },
  {
    name: 'ANOMALY.ASHEN_CONVERGENCE.NAME',
    description: 'ANOMALY.ASHEN_CONVERGENCE.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'ashen-convergence',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'ANOMALY.ASHEN_CONVERGENCE.F1.TITLE',
        description: 'ANOMALY.ASHEN_CONVERGENCE.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'ANOMALY.ASHEN_CONVERGENCE.F1.OBSERVE.DESCRIPTION',
          },
          [ActionType.Pray]: {
            description: 'ANOMALY.ASHEN_CONVERGENCE.F1.PRAY.DESCRIPTION',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'ANOMALY.ASHEN_CONVERGENCE.F1.PRAY.SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'ANOMALY.ASHEN_CONVERGENCE.F1.PRAY.FAIL',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'ANOMALY.ASHEN_CONVERGENCE.F2.TITLE',
        description: 'ANOMALY.ASHEN_CONVERGENCE.F2.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'ANOMALY.ASHEN_CONVERGENCE.F2.INSPECT.DESCRIPTION',
          },
          [ActionType.Interact]: {
            description: 'ANOMALY.ASHEN_CONVERGENCE.F2.INTERACT.DESCRIPTION',
            check: { orb: 'mechanic', difficulty: 12 },
            onSuccess: {
              description: 'ANOMALY.ASHEN_CONVERGENCE.F2.INTERACT.SUCCESS',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'ANOMALY.ASHEN_CONVERGENCE.F2.INTERACT.FAIL',
              next: 'floor_3',
              effects: [{ stat: 'mp', value: -5 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'ANOMALY.ASHEN_CONVERGENCE.F3.TITLE',
        description: 'ANOMALY.ASHEN_CONVERGENCE.F3.DESCRIPTION',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['demon-of-ashes', 'drake-of-ashes'],
          random: true,
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'ANOMALY.ASHEN_CONVERGENCE.F4.TITLE',
        description: 'ANOMALY.ASHEN_CONVERGENCE.F4.DESCRIPTION',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'ANOMALY.ASHEN_CONVERGENCE.F4.OBSERVE.DESCRIPTION',
            effects: [{ stat: 'xp', value: +20 }, { stat: 'hp', value: +10 }],
          },
        },
      },
    },
  },
];
