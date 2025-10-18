import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const ANOMALY_TABLE: OverlayTemplate[] = [
  {
    name: 'Temporal Rift',
    description: 'A swirling rift distorts time and space here.',
    icon: 'assets/overlays/anomaly.png',
    actions: [ActionType.Explore, ActionType.Avoid],
  },
  {
    name: 'Gravity Well',
    description: 'An area where gravity behaves erratically.',
    icon: 'assets/overlays/anomaly.png',
    actions: [ActionType.Explore, ActionType.Avoid],
  },
  {
    name: 'Magnetic Storm',
    description: 'A storm of magnetic energy disrupts technology.',
    icon: 'assets/overlays/anomaly.png',
    actions: [ActionType.Explore, ActionType.Avoid],
  },
  {
    name: 'Ethereal Fog',
    description: 'A dense fog that seems to whisper secrets.',
    icon: 'assets/overlays/anomaly.png',
    actions: [ActionType.Explore, ActionType.Avoid],
  },
  {
    name: 'Crystal Growth',
    description: 'Gigantic crystals have erupted from the ground.',
    icon: 'assets/overlays/anomaly.png',
    actions: [ActionType.Explore, ActionType.Avoid],
  },
];
