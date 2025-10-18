import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const RUINS_TABLE: OverlayTemplate[] = [
  {
    name: 'Ancient Temple',
    description: 'The remains of a once-grand temple, now overgrown and forgotten. Here and there, traces of a rich and ingenious civilization can be seen. Perhaps some treasures are still hidden here?',
    icon: 'assets/overlays/ruins.png',
    actions: [ActionType.Explore, ActionType.Avoid],
    eventChain: {
      floor_1: {
        title: 'Ancient Temple: Main Hall',
        description: 'The air is humid, and faint echoes can be heard deep within the temple. Large, still-intact amphorae are stuck to the pillars that support this immense hall.',
        actions: [ActionType.Explore, ActionType.Rest],
        next: 'floor_2',
      },
      floor_2: {
        title: 'Ancient Temple: Forgotten Chamber',
        description: 'You find a cracked and dusty altar. Something precious must have stood on the central pedestal. A chest at the top of an alcove still appears intact.',
        actions: [ActionType.Rest, ActionType.Interact, ActionType.Avoid],
      },
    },
  },
  {
    name: 'Forgotten Fortress',
    description: 'Crumbling walls and broken towers hint at a fortress long lost to time.',
    icon: 'assets/overlays/ruins.png',
    actions: [ActionType.Explore, ActionType.Avoid],
    eventChain: {
      floor_1: {
        title: 'Forgotten Fortress: Great Hall',
        description: 'TODO : description not ready',
        actions: [ActionType.Explore, ActionType.Rest],
        next: 'floor_2',
      },
      floor_2: {
        title: 'Forgotten Fortress: Guardhouse',
        description: 'TODO : description not ready',
        actions: [ActionType.Rest, ActionType.Interact, ActionType.Avoid],
      },
    },
  },
  {
    name: 'Sunken City',
    description: 'Ruins of a city partially submerged, with buildings jutting out of the water.',
    icon: 'assets/overlays/ruins.png',
    actions: [ActionType.Explore, ActionType.Avoid],
    eventChain: {
      floor_1: {
        title: 'Sunken City: Great Place',
        description: 'TODO : description not ready',
        actions: [ActionType.Explore, ActionType.Rest],
        next: 'floor_2',
      },
      floor_2: {
        title: 'Sunken City: Villagers\' Houses',
        description: 'TODO : description not ready',
        actions: [ActionType.Rest, ActionType.Interact, ActionType.Avoid],
      },
    },
  },
  {
    name: 'Deserted Village',
    description: 'Empty streets and abandoned homes tell the story of a village left behind.',
    icon: 'assets/overlays/ruins.png',
    actions: [ActionType.Explore, ActionType.Avoid],
    eventChain: {
      floor_1: {
        title: 'Deserted Village: Abandoned defenses',
        description: 'TODO : description not ready',
        actions: [ActionType.Explore, ActionType.Rest],
        next: 'floor_2',
      },
      floor_2: {
        title: 'Deserted Village: Abandoned Houses',
        description: 'TODO : description not ready',
        actions: [ActionType.Rest, ActionType.Interact, ActionType.Avoid],
      },
    },
  },
  {
    name: 'Mystic Circle',
    description: 'A circle of standing stones, their purpose and origin shrouded in mystery.',
    icon: 'assets/overlays/ruins.png',
    actions: [ActionType.Explore, ActionType.Avoid],
    eventChain: {
      floor_1: {
        title: 'Mystic Circle: Great Hall',
        description: 'TODO : description not ready',
        actions: [ActionType.Explore, ActionType.Rest],
        next: 'floor_2',
      },
      floor_2: {
        title: 'Mystic Circle: Guardhouse',
        description: 'TODO : description not ready',
        actions: [ActionType.Rest, ActionType.Interact, ActionType.Avoid],
      },
    },
  },
];
