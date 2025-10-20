import { OverlayPhase } from "./overlay-phase.model";
import { ActionType } from "./actions";

// Each overlay in the game: events, encounters, locations, etc.
export enum OverlayKind {
  None = 'None',

  // Encounters
  Monster = 'monster',
  Beast = 'beast',
  Spirit = 'spirit',
  Encounter = 'encounter',

  // Civilization
  Village = 'village',
  City = 'city',
  Farm = 'farm',
  Tower = 'tower',
  Ruins = 'ruins',

  // Events
  Anomaly = 'anomaly',
  Caravan = 'caravan',
  Merchant = 'merchant',
  Wanderer = 'wanderer',
  Treasure = 'treasure',
  Ritual = 'ritual',

  // Mystical / Resources
  Shrine = 'shrine',
  Portal = 'portal',
  Mine = 'mine',
  Forest = 'forest'
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
  level?: number;
  currentFloor?: string;
  nextFloor?: string;
  isCompleted?: boolean;
}

// -----------------------------------------------------------------
// Overlay biome pools (generation weights)
// -----------------------------------------------------------------
export const OVERLAY_POOLS: Record<string, Partial<Record<OverlayKind, number>>> = {
    plain: {
        [OverlayKind.None]: 30,
        [OverlayKind.Farm]: 2,
        [OverlayKind.Village]: 2,
        [OverlayKind.Encounter]: 1,
    },
    forest: {
        [OverlayKind.None]: 40,
        [OverlayKind.Beast]: 2,
        [OverlayKind.Spirit]: 1,
        [OverlayKind.Ruins]: 1,
        [OverlayKind.Forest]: 1,
    },
    desert: {
        [OverlayKind.None]: 50,
        [OverlayKind.Anomaly]: 1,
        [OverlayKind.Caravan]: 2,
        [OverlayKind.Beast]: 10,
        [OverlayKind.Monster]: 15,
        [OverlayKind.Encounter]: 1,
    },
    mountain: {
        [OverlayKind.None]: 50,
        [OverlayKind.Mine]: 2,
        [OverlayKind.Ruins]: 1,
        [OverlayKind.Tower]: 1,
    },
    volcano: {
        [OverlayKind.None]: 60,
        [OverlayKind.Anomaly]: 1,
        [OverlayKind.Ruins]: 1,
        [OverlayKind.Monster]: 1,
    },
    jungle: {
        [OverlayKind.None]: 50,
        [OverlayKind.Spirit]: 2,
        [OverlayKind.Ruins]: 1,
        [OverlayKind.Anomaly]: 1,
    },
    swamp: {
        [OverlayKind.None]: 60,
        [OverlayKind.Spirit]: 1,
        [OverlayKind.Ritual]: 1,
        [OverlayKind.Anomaly]: 1,
    },
    sea: {
        [OverlayKind.None]: 80,
        [OverlayKind.Caravan]: 1,
        [OverlayKind.Wanderer]: 1,
    },
};

export const OVERLAY_ICONS: Record<OverlayKind, string> = {
  [OverlayKind.None]: 'assets/overlays/farm.png',
  [OverlayKind.City]: 'assets/overlays/city.png',
  [OverlayKind.Village]: 'assets/overlays/city.png',
  [OverlayKind.Ruins]: 'assets/overlays/ruins.png',
  [OverlayKind.Tower]: 'assets/overlays/tower.png',
  [OverlayKind.Farm]: 'assets/overlays/farm.png',
  [OverlayKind.Forest]: 'assets/overlays/forest.png',
  [OverlayKind.Merchant]: 'assets/overlays/merchant.png',
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
