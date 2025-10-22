import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const PORTAL_TABLE: OverlayTemplate[] = [
  {
    name: 'Otherworld Portal',
    id: 'otherworld-portal',
    description: 'This portal seems to come from a very ancient technology. You heard about it during your childhood, but no one knows how to use it today.',
    icon: 'assets/overlays/portal.png',
    actions: [ActionType.Quit],
  },
  {
    name: 'Garokt Portal',
    id: 'garokt-portal',
    description: 'TODO DESCRIPTION',
    icon: 'assets/overlays/portal.png',
    actions: [ActionType.Quit],
  },
  {
    name: 'Nature Portal',
    id: 'nature-portal',
    description: 'TODO DESCRIPTION',
    icon: 'assets/overlays/portal.png',
    actions: [ActionType.Quit],
  },
  {
    name: 'Time Portal',
    id: 'time-portal',
    description: 'TODO DESCRIPTION',
    icon: 'assets/overlays/portal.png',
    actions: [ActionType.Quit],
  },
]
