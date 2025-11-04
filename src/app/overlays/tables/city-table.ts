import { ActionType } from '../models/actions';
import { OverlayTemplate } from '../models/overlays.model';

export const CITY_TABLE: OverlayTemplate[] = [
  {
    name: 'CITY.AGHASME.NAME',
    id: 'aghasme',
    description: 'CITY.AGHASME.DESCRIPTION',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'CITY.RIVERTOWN.NAME',
    id: 'rivertown',
    description: 'CITY.RIVERTOWN.DESCRIPTION',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'CITY.ELDERGATE.NAME',
    id: 'eldergate',
    description: 'CITY.STORMHOLD.DESCRIPTION',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'CITY.STORMHOLD.NAME',
    id: 'stormhold',
    description: 'CITY.STORMHOLD.DESCRIPTION',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'CITY.IRONVALE.NAME',
    id: 'ironvale',
    description: 'CITY.IRONVALE.DESCRIPTION',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'CITY.HIGHWALL.NAME',
    id: 'highwall',
    description: 'CITY.HIGHWALL.DESCRIPTION',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
  {
    name: 'CITY.MECHANICA.NAME',
    id: 'highwall',
    description: 'CITY.MECHANICA.DESCRIPTION',
    icon: 'assets/overlays/city.png',
    actions: [ActionType.Trade, ActionType.Rest],
  },
]
