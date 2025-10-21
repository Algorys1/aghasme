import { OverlayPhase } from "./overlay-phase.model";
import { ActionType } from "./actions";
import {Enemy} from './enemy.model';

// Each overlay in the game: events, encounters, locations, etc.
export enum OverlayKind {
  None = 'None',

  // Encounters
  Monster = 'monster',
  Beast = 'beast',
  Encounter = 'encounter',

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
  Portal = 'portal',


  // Mystical / Resources
  Mine = 'mine',
  Forest = 'forest',
  Farm = 'farm',
}

// -----------------------------------------------------------------
// Overlay base data
// -----------------------------------------------------------------
export interface OverlayTemplate {
  name: string;
  icon: string;
  description: string;
  actions: ActionType[];
  eventChain?: Record<string, OverlayPhase>;
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

// -----------------------------------------------------------------
// Overlay biome pools (generation weights)
// -----------------------------------------------------------------
export const OVERLAY_POOLS: Record<string, Partial<Record<OverlayKind, number>>> = {
    plain: {
        [OverlayKind.None]: 70,
        [OverlayKind.Farm]: 8,
        [OverlayKind.Village]: 3,
        [OverlayKind.City]: 3,
        [OverlayKind.Encounter]: 8,
        [OverlayKind.Beast]: 2,
      },
      forest: {
        [OverlayKind.None]: 65,
        [OverlayKind.Beast]: 5,
        [OverlayKind.Spirit]: 3,
        [OverlayKind.Ruins]: 5,
        [OverlayKind.Forest]: 10,
        [OverlayKind.City]: 3,
        [OverlayKind.Village]: 3,
        [OverlayKind.Farm]: 3,
      },
      desert: {
        [OverlayKind.None]: 80,
        [OverlayKind.Anomaly]: 4,
        [OverlayKind.Caravan]: 4,
        [OverlayKind.Beast]: 2,
        [OverlayKind.Monster]: 2,
        [OverlayKind.Encounter]: 2,
        [OverlayKind.Village]: 3,
        [OverlayKind.City]: 1,
        [OverlayKind.Portal]: 1,
      },
      mountain: {
        [OverlayKind.None]: 60,
        [OverlayKind.Mine]: 10,
        [OverlayKind.Ruins]: 3,
        [OverlayKind.Tower]: 6,
        [OverlayKind.Beast]: 3,
        [OverlayKind.Monster]: 3,
        [OverlayKind.Ritual]: 6,
        [OverlayKind.Village]: 2,
        [OverlayKind.City]: 1,
      },
      volcano: {
        [OverlayKind.None]: 65,
        [OverlayKind.Anomaly]: 4,
        [OverlayKind.Ruins]: 6,
        [OverlayKind.Beast]: 3,
        [OverlayKind.Monster]: 6,
        [OverlayKind.Ritual]: 6,
        [OverlayKind.Portal]: 2,
      },
      jungle: {
        [OverlayKind.None]: 75,
        [OverlayKind.Spirit]: 3,
        [OverlayKind.Ruins]: 8,
        [OverlayKind.Beast]: 5,
        [OverlayKind.Monster]: 5,
        [OverlayKind.Village]: 2,
        [OverlayKind.Forest]: 3,
      },
      swamp: {
        [OverlayKind.None]: 75,
        [OverlayKind.Spirit]: 6,
        [OverlayKind.Ritual]: 6,
        [OverlayKind.Beast]: 4,
        [OverlayKind.Monster]: 4,
        [OverlayKind.Village]: 1,
      },
      sea: {
        [OverlayKind.None]: 80,
        [OverlayKind.Wanderer]: 3,
        [OverlayKind.Beast]: 3,
        [OverlayKind.Monster]: 3,
        [OverlayKind.Anomaly]: 8,
        [OverlayKind.Portal]: 2,
      },
};

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
  [OverlayKind.Monster]: 'assets/overlays/monster.png',
  [OverlayKind.Beast]: 'assets/overlays/beast.png',
  [OverlayKind.Encounter]: 'assets/overlays/encounter.png',
  [OverlayKind.Treasure]: 'assets/overlays/treasure.png',
  [OverlayKind.Anomaly]: 'assets/overlays/anomaly.png',
  [OverlayKind.Shrine]: 'assets/overlays/shrine.png',
  [OverlayKind.Portal]: 'assets/overlays/portal.png',
}
