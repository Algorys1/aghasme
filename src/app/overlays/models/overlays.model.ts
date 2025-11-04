import { OverlayPhase } from "./overlay-phase.model";
import { ActionType } from "../models/actions";
import { Enemy } from '../../combat/models/enemy.model';
import { Terrain } from "../../game/factories/tile.factory";
import { HarvestResource } from "./harvest.model";

// Each overlay in the game: events, encounters, locations, etc.
export enum OverlayKind {
  None = 'None',

  // Stories
  Spirit = 'spirit',
  Tower = 'tower',
  Ruins = 'ruins',
  Anomaly = 'anomaly',
  Caravan = 'caravan',
  Wanderer = 'wanderer',
  Treasure = 'treasure',
  Ritual = 'ritual',
  Shrine = 'shrine',

  // Civilization
  Village = 'village',
  City = 'city',
  Farm = 'farm',

  // Resources
  Mine = 'mine',
  Forest = 'forest',

  // Special
  Portal = 'portal',
}

// -----------------------------------------------------------------
// Overlay base data
// -----------------------------------------------------------------
export interface OverlayTemplate {
  name: string;
  icon: string;
  description: string;
  actions: ActionType[];
  id: string;

  eventChain?: Record<string, OverlayPhase>;
  allowedTerrains?: Terrain[];
  minDistance?: number;
  maxDistanceFromCity?: number;
  resources?: HarvestResource[];
}

export interface OverlayInstance extends OverlayTemplate {
  id: string;
  kind: OverlayKind;

  currentFloor?: string;
  nextFloor?: string;
  isCompleted?: boolean;
  disabledActions?: ActionType[];
  ennemy?: Enemy
}

export const END_MARKER = '-end';

export const OVERLAY_ICONS: Record<OverlayKind, string> = {
  [OverlayKind.None]: 'assets/overlays/farm.png',
  [OverlayKind.City]: 'assets/overlays/city.png',
  [OverlayKind.Village]: 'assets/overlays/village.png',
  [OverlayKind.Ruins]: 'assets/overlays/ruins.png',
  [OverlayKind.Tower]: 'assets/overlays/tower.png',
  [OverlayKind.Farm]: 'assets/overlays/farm.png',
  [OverlayKind.Forest]: 'assets/overlays/forest.png',
  [OverlayKind.Caravan]: 'assets/overlays/caravan.png',
  [OverlayKind.Mine]: 'assets/overlays/mine.png',
  [OverlayKind.Ritual]: 'assets/overlays/ritual.png',
  [OverlayKind.Spirit]: 'assets/overlays/spirit.png',
  [OverlayKind.Wanderer]: 'assets/overlays/wanderer.png',
  [OverlayKind.Treasure]: 'assets/overlays/treasure.png',
  [OverlayKind.Anomaly]: 'assets/overlays/anomaly.png',
  [OverlayKind.Shrine]: 'assets/overlays/shrine.png',
  [OverlayKind.Portal]: 'assets/overlays/portal.png',
}

export const OVERLAY_COMPATIBILITY: Partial<Record<OverlayKind, Terrain[]>> = {
   [OverlayKind.Anomaly]: ['sea', 'volcano', 'desert', 'swamp'],
   [OverlayKind.Caravan]: ['plain', 'desert'],
   [OverlayKind.City]: ['plain', 'desert'],
   [OverlayKind.Farm]: ['plain', 'jungle'],
   [OverlayKind.Forest]: ['forest', 'jungle'],
   [OverlayKind.Ritual]: ['forest', 'jungle', 'swamp'],
   [OverlayKind.Ruins]: ['plain', 'mountain'],
   [OverlayKind.Tower]: ['mountain', 'plain'],

   [OverlayKind.Village]: ['plain', 'forest'],
   [OverlayKind.Mine]: ['mountain', 'plain'],
};
