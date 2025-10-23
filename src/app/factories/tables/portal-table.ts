import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

// All portals are related to One Orb : bestial, elemental, nature and mechanical.
export const PORTAL_TABLE: OverlayTemplate[] = [
  {
    name: 'Otherworld Portal',
    id: 'otherworld-portal',
    description: 'This portal seems to come from a very ancient technology. Its surface shimmers with an ethereal light, hinting at a connection to realms beyond our own. There is some kind of cogwheel mechanism next to it, possibly to activate it.',
    icon: 'assets/overlays/portal.png',
    actions: [],
  },
  {
    name: 'Garokt Portal',
    id: 'garokt-portal',
    description: 'This portal is adorned with primal symbols and carvings of fierce beasts. It emanates a raw, untamed energy, suggesting a link to the wild and the primal forces of nature.',
    icon: 'assets/overlays/portal.png',
    actions: [],
  },
  {
    name: 'Nature Portal',
    id: 'nature-portal',
    description: 'This portal is entwined with vines and blooming flowers, radiating a soothing aura. It seems to be a gateway to a realm where nature reigns supreme, filled with lush landscapes and vibrant life.',
    icon: 'assets/overlays/portal.png',
    actions: [],
  },
  {
    name: 'Elemental Portal',
    id: 'elemental-portal',
    description: 'This portal crackles with elemental energy, shifting between flames, water, earth, and air. It appears to be a conduit to a realm where the fundamental forces of nature are in constant flux and harmony.',
    icon: 'assets/overlays/portal.png',
    actions: [],
  },
]
