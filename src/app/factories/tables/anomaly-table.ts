import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const ANOMALY_TABLE: OverlayTemplate[] = [
  {
    name: 'OVERLAY.TEMPORAL_RIFT.NAME',
    description: 'OVERLAY.TEMPORAL_RIFT.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'temporal-rift',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.TEMPORAL_RIFT.F1.TITLE',
        description: 'Birds hang motionless midair. Even your heartbeat seems delayed. The world moves a half-second too slow.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You watch a raindrop suspended before your eyes.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'Time resumes for a heartbeat, you see glimpses of yourself standing elsewhere.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The distortion flares, your mind reels from the paradox.',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Interact]: {
            description: 'You reach toward the ripple, the air resists your hand like thick glass.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Echo of the Past',
        description: 'A familiar figure stands before you, it’s you, or rather, a version that shouldn’t exist.',
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
    name: 'OVERLAY.INFERNAL_SURGE.NAME',
    description: 'OVERLAY.INFERNAL_SURGE.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'infernal-surge',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.INFERNAL_SURGE.F1.TITLE',
        description: 'OVERLAY.INFERNAL_SURGE.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.INFERNAL_SURGE.F1.OBSERVE',
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.INFERNAL_SURGE.F1.PRAY',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'OVERLAY.INFERNAL_SURGE.F1.PRAY_SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'OVERLAY.INFERNAL_SURGE.F1.PRAY_FAIL',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.INFERNAL_SURGE.F2.TITLE',
        description: 'OVERLAY.INFERNAL_SURGE.F2.DESCRIPTION',
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
    name: 'OVERLAY.MECHANICAL_DISTORSION.NAME',
    description: 'OVERLAY.MECHANICAL_DISTORSION.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'mechanical-distorsion',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.MECHANICAL_DISTORSION.F1.TITLE',
        description: 'OVERLAY.MECHANICAL_DISTORSION.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.MECHANICAL_DISTORSION.F1.OBSERVE',
          },
          [ActionType.Interact]: {
            description: 'OVERLAY.MECHANICAL_DISTORSION.F1.INTERACT',
            check: { orb: 'mechanic', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY_MECHANICAL_DISTORSION.F1.INTERACT_SUCCESS',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'OVERLAY_MECHANICAL_DISTORSION.F1.INTERACT_FAIL',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.MECHANICAL_DISTORSION.F2.TITLE',
        description: 'OVERLAY.MECHANICAL_DISTORSION.F2.DESCRIPTION',
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
    name: 'OVERLAY.CORRUPTED_GROVE.NAME',
    description: 'OVERLAY.CORRUPTED_GROVE.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'corrupted-grove',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.CORRUPTED_GROVE.F1.TITLE',
        description: 'OVERLAY.CORRUPTED_GROVE.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.CORRUPTED_GROVE.F1.OBSERVE',
            effects: [{ stat: 'xp', value: +4 }],
          },
          [ActionType.Interact]: {
            description: 'OVERLAY.CORRUPTED_GROVE.F1.INTERACT',
            effects: [{ stat: 'hp', value: -2 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.CORRUPTED_GROVE.F2.TITLE',
        description: 'OVERLAY.CORRUPTED_GROVE.F2.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'OVERLAY.CORRUPTED_GROVE.F2.INSPECT',
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.CORRUPTED_GROVE.F2.PRAY',
            check: { orb: 'natural', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY.CORRUPTED_GROVE.F2.PRAY_SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'OVERLAY.CORRUPTED_GROVE.F2.PRAY_FAIL',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'OVERLAY.CORRUPTED_GROVE.F3.TITLE',
        description: 'OVERLAY.CORRUPTED_GROVE.F3.DESCRIPTION',
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
    name: 'OVERLAY.ANCESTRAL_ECHO.NAME',
    description: 'OVERLAY.ANCESTRAL_ECHO.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'ancestral-echo',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.ANCESTRAL_ECHO.F1.TITLE',
        description: 'OVERLAY.ANCESTRAL_ECHO.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.ANCESTRAL_ECHO.F1.OBSERVE',
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.ANCESTRAL_ECHO.F1.PRAY',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'OVERLAY.ANCESTRAL_ECHO.F1.PRAY_SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'OVERLAY.ANCESTRAL_ECHO.F1.PRAY_FAIL',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.ANCESTRAL_ECHO.F2.TITLE',
        description: 'OVERLAY.ANCESTRAL_ECHO.F2.DESCRIPTION',
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
    name: 'OVERLAY.ASH_BREACH.NAME',
    description: 'OVERLAY.ASH_BREACH.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    actions: [],
    id: 'ash-breach',
    eventChain: {
      floor_1: {
        title: 'OVERLAY.ASH_BREACH.F1.TITLE',
        description: 'OVERLAY.ASH_BREACH.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.ASH_BREACH.F1.OBSERVE',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY.ASH_BREACH.F1.OBSERVE_SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'OVERLAY.ASH_BREACH.F1.OBSERVE_FAIL',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
          [ActionType.Interact]: {
            description: 'OVERLAY.ASH_BREACH.F1.INTERACT',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.ASH_BREACH.F2.TITLE',
        description: 'OVERLAY.ASH_BREACH.F2.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'OVERLAY.ASH_BREACH.F2.INSPECT',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'OVERLAY.ASH_BREACH.F2.INSPECT_SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'OVERLAY.ASH_BREACH.F2.INSPECT_FAIL',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.ASH_BREACH.F2.PRAY',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'OVERLAY.ASH_BREACH.F2.PRAY_SUCCESS',
            },
            onFailure: {
              description: 'OVERLAY.ASH_BREACH.F2.PRAY_FAIL',
              next: 'floor_3',
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'OVERLAY.ASH_BREACH.F3.TITLE',
        description: 'OVERLAY.ASH_BREACH.F3.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.ASH_BREACH.F3.OBSERVE',
          },
          [ActionType.Interact]: {
            description: 'OVERLAY.ASH_BREACH.F3.INTERACT',
            check: { orb: 'elemental', difficulty: 13 },
            onSuccess: {
              description: 'OVERLAY.ASH_BREACH.F3.INTERACT_SUCCESS',
              effects: [{ stat: 'hp', value: -2 }, { stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'OVERLAY.ASH_BREACH.F3.INTERACT_FAIL',
              effects: [{ stat: 'hp', value: -6 }],
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'OVERLAY.ASH_BREACH.F4.TITLE',
        description: 'OVERLAY.ASH_BREACH.F4.DESCRIPTION',
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
        title: 'OVERLAY.ASH_BREACH.F5.TITLE',
        description: 'OVERLAY.ASH_BREACH.F5.DESCRIPTION',
        actions: [ActionType.Rest, ActionType.Observe],
        actionPassive: {
          [ActionType.Rest]: {
            description: 'OVERLAY.ASH_BREACH.F5.REST',
            effects: [{ stat: 'hp', value: +5 }, { stat: 'xp', value: +6 }],
          },
          [ActionType.Observe]: {
            description: 'OVERLAY.ASH_BREACH.F5.OBSERVE',
          },
        },
      },
    },
  },
  {
    name: 'OVERLAY.RIFT_OF_ECHOES.NAME',
    description: 'OVERLAY.RIFT_OF_ECHOES.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'rift-of-echoes',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.RIFT_OF_ECHOES.F1.TITLE',
        description: 'OVERLAY.RIFT_OF_ECHOES.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Inspect],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.RIFT_OF_ECHOES.F1.OBSERVE',
          },
          [ActionType.Inspect]: {
            description: 'OVERLAY.RIFT_OF_ECHOES.F1.INSPECT',
            effects: [{ stat: 'xp', value: +4 }],
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.RIFT_OF_ECHOES.F2.TITLE',
        description: 'OVERLAY.RIFT_OF_ECHOES.F2.DESCRIPTION',
        actions: [ActionType.Talk, ActionType.Pray],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'OVERLAY.RIFT_OF_ECHOES.F2.TALK',
            effects: [{ stat: 'mp', value: -2 }],
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.RIFT_OF_ECHOES.F2.PRAY',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'OVERLAY.RIFT_OF_ECHOES.F2.PRAY_SUCCESS',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'OVERLAY.RIFT_OF_ECHOES.F2.PRAY_FAIL',
              next: 'floor_3',
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'OVERLAY.RIFT_OF_ECHOES.F3.TITLE',
        description: 'OVERLAY.RIFT_OF_ECHOES.F3.DESCRIPTION',
        actions: [ActionType.Interact, ActionType.Inspect],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'OVERLAY.RIFT_OF_ECHOES.F3.INTERACT',
            check: { orb: 'mechanic', difficulty: 12 },
            onSuccess: {
              description: 'OVERLAY.RIFT_OF_ECHOES.F3.INTERACT_SUCCESS',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'OVERLAY.RIFT_OF_ECHOES.F3.INTERACT_FAIL',
              effects: [{ stat: 'hp', value: -5 }],
              next: 'floor_4',
            },
          },
          [ActionType.Inspect]: {
            description: 'OVERLAY.RIFT_OF_ECHOES.F3.INSPECT',
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'OVERLAY.RIFT_OF_ECHOES.F4.TITLE',
        description: 'OVERLAY.RIFT_OF_ECHOES.F4.DESCRIPTION',
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
        title: 'OVERLAY.RIFT_OF_ECHOES.F5.TITLE',
        description: 'OVERLAY.RIFT_OF_ECHOES.F5.DESCRIPTION',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.RIFT_OF_ECHOES.F5.OBSERVE',
            effects: [{ stat: 'xp', value: +15 }, { stat: 'mp', value: +8 }],
          },
        },
      },
    },
  },
  {
    name: 'OVERLAY.ASHEN_CONVERGENCE.NAME',
    description: 'OVERLAY.ASHEN_CONVERGENCE.DESCRIPTION',
    icon: 'assets/overlays/anomaly.png',
    id: 'ashen-convergence',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'OVERLAY.ASHEN_CONVERGENCE.F1.TITLE',
        description: 'OVERLAY.ASHEN_CONVERGENCE.F1.DESCRIPTION',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.ASHEN_CONVERGENCE.F1.OBSERVE',
          },
          [ActionType.Pray]: {
            description: 'OVERLAY.ASHEN_CONVERGENCE.F1.PRAY',
            check: { orb: 'elemental', difficulty: 11 },
            onSuccess: {
              description: 'OVERLAY.ASHEN_CONVERGENCE.F1.PRAY_SUCCESS',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'OVERLAY.ASHEN_CONVERGENCE.F1.PRAY_FAIL',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'OVERLAY.ASHEN_CONVERGENCE.F2.TITLE',
        description: 'OVERLAY.ASHEN_CONVERGENCE.F2.DESCRIPTION',
        actions: [ActionType.Inspect, ActionType.Interact],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'OVERLAY.ASHEN_CONVERGENCE.F2.INSPECT',
          },
          [ActionType.Interact]: {
            description: 'OVERLAY.ASHEN_CONVERGENCE.F2.INTERACT',
            check: { orb: 'mechanic', difficulty: 12 },
            onSuccess: {
              description: 'OVERLAY.ASHEN_CONVERGENCE.F2.INTERACT_SUCCESS',
              effects: [{ stat: 'xp', value: +8 }],
            },
            onFailure: {
              description: 'OVERLAY.ASHEN_CONVERGENCE.F2.INTERACT_FAIL',
              next: 'floor_3',
              effects: [{ stat: 'hp', value: -5 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'OVERLAY.ASHEN_CONVERGENCE.F3.TITLE',
        description: 'OVERLAY.ASHEN_CONVERGENCE.F3.DESCRIPTION',
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
        title: 'OVERLAY.ASHEN_CONVERGENCE.F4.TITLE',
        description: 'OVERLAY.ASHEN_CONVERGENCE.F4.DESCRIPTION',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'OVERLAY.ASHEN_CONVERGENCE.F4.OBSERVE',
            effects: [{ stat: 'xp', value: +20 }, { stat: 'hp', value: +10 }],
          },
        },
      },
    },
  },
];
