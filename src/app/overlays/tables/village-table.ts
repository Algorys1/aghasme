import { ActionType } from '../models/actions';
import { OverlayTemplate } from '../models/overlays.model';

export const VILLAGE_TABLE: OverlayTemplate[] = [
  {
    name: 'VILLAGE.OAKWOOD.NAME',
    description: 'VILLAGE.OAKWOOD.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-oakwood.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'oakwood',
    allowedTerrains: ['forest', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 6
  },
  {
    name: 'VILLAGE.PINEHILL.NAME',
    description: 'VILLAGE.PINEHILL.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-pinehill.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'pinehill',
    allowedTerrains: ['forest', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 6
  },
  {
    name: 'VILLAGE.CEDARBROOK.NAME',
    description: 'VILLAGE.CEDARBROOK.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-cedarbrook.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'cedarbrook',
    allowedTerrains: ['forest', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 6
  },
  {
    name: 'VILLAGE.MAPLECROSS.NAME',
    description: 'VILLAGE.MAPLECROSS.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-maplecross.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'maple-cross',
    allowedTerrains: ['forest', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 6
  },
  {
    name: 'VILLAGE.BIRCHFIELD.NAME',
    description: 'VILLAGE.BIRCHFIELD.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-birchfield.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'birchfield',
    allowedTerrains: ['forest', 'plain'],
    minDistance: 2,
    maxDistanceFromCity: 6
  },
  {
    name: 'VILLAGE.DARKROAD.NAME',
    description: 'VILLAGE.DARKROAD.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-darkroad.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'darkroad',
    allowedTerrains: ['plain', 'forest'],
    minDistance: 2,
    maxDistanceFromCity: 6
  },
  {
    name: 'VILLAGE.WOODENPALE.NAME',
    description: 'VILLAGE.WOODENPALE.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-woodenpale.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'woodenpale',
    allowedTerrains: ['forest'],
    minDistance: 2,
    maxDistanceFromCity: 6
  },
  {
    name: 'VILLAGE.SANDBLOOM.NAME',
    description: 'VILLAGE.SANDBLOOM.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-sandbloom.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'sandbloom',
    allowedTerrains: ['desert'],
    minDistance: 2,
    maxDistanceFromCity: 6
  },
  {
    name: 'VILLAGE.HIGHPEAK.NAME',
    description: 'VILLAGE.HIGHPEAK.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-highpeak.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'highpeak',
    allowedTerrains: ['mountain'],
    minDistance: 2,
    maxDistanceFromCity: 6
  },
  {
    name: 'VILLAGE.GREENRISE.NAME',
    description: 'VILLAGE.GREENRISE.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/village-greenrise.png',
    actions: [ActionType.Trade, ActionType.Rest],
    id: 'greenrise',
    allowedTerrains: ['forest', 'jungle'],
    minDistance: 2,
    maxDistanceFromCity: 6
  }
];
