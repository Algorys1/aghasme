import { ActionType } from '../models/actions';
import { OverlayTemplate } from '../models/overlays.model';

export const CITY_TABLE: OverlayTemplate[] = [
  {
    name: 'CITY.AGHASME.NAME',
    id: 'aghasme',
    description: 'CITY.AGHASME.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/city-aghasme.png',
    actions: [ActionType.Trade, ActionType.Rest],
    allowedTerrains: ['plain', 'mountain'],
    minCityDistance: 10
  },
  {
    name: 'CITY.ELDERGATE.NAME',
    id: 'eldergate',
    description: 'CITY.ELDERGATE.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/city-eldergate.png',
    actions: [ActionType.Trade, ActionType.Rest],
    allowedTerrains: ['plain', 'mountain'],
    minCityDistance: 8
  },
  {
    name: 'CITY.HIGHWALL.NAME',
    id: 'highwall',
    description: 'CITY.HIGHWALL.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/city-highwall.png',
    actions: [ActionType.Trade, ActionType.Rest],
    allowedTerrains: ['plain', 'forest'],
    minCityDistance: 8
  },
  {
    name: 'CITY.IRONVALE.NAME',
    id: 'ironvale',
    description: 'CITY.IRONVALE.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/city-ironvale.png',
    actions: [ActionType.Trade, ActionType.Rest],
    allowedTerrains: ['mountain', 'plain'],
    minCityDistance: 8
  },
  {
    name: 'CITY.MECHANICA.NAME',
    id: 'mechanica',
    description: 'CITY.MECHANICA.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/city-mechanica.png',
    actions: [ActionType.Trade, ActionType.Rest],
    allowedTerrains: ['desert', 'volcano'],
    minCityDistance: 10
  },
  {
    name: 'CITY.RIVERTOWN.NAME',
    id: 'rivertown',
    description: 'CITY.RIVERTOWN.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/city-rivertown.png',
    actions: [ActionType.Trade, ActionType.Rest],
    allowedTerrains: ['plain', 'forest'],
    requireAdjSea: true,
    minCityDistance: 8
  },
  {
    name: 'CITY.STORMHOLD.NAME',
    id: 'stormhold',
    description: 'CITY.STORMHOLD.DESCRIPTION',
    icon: 'assets/overlays/backgrounds/city-stormhold.png',
    actions: [ActionType.Trade, ActionType.Rest],
    allowedTerrains: ['mountain'],
    requireAdjSea: true,
    minCityDistance: 10
  }
];
