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
  Obelisk = 'obelisk',
  Mine = 'mine',
  Oasis = 'oasis',
  Forest = 'forest'
}

// -----------------------------------------------------------------
// Overlay base data
// -----------------------------------------------------------------
export interface OverlayInfo {
  name: string;
  icon: string;
  description: string;
  actions: string[];
}

// -----------------------------------------------------------------
// Overlay manifest (main definitions)
// -----------------------------------------------------------------
export const OVERLAY_MANIFEST: Record<OverlayKind, OverlayInfo> = {
  [OverlayKind.None]: {
    name: 'None',
    icon: '',
    description: '',
    actions: []
  },

  [OverlayKind.Monster]: {
    name: 'Monster',
    icon: 'assets/overlays/monster.png',
    description: 'A dangerous creature is lurking here!',
    actions: ['Fight', 'Flee']
  },
  [OverlayKind.Beast]: {
    name: 'Beast',
    icon: 'assets/overlays/beast.png',
    description: 'A wild beast crosses your path.',
    actions: ['Fight', 'Flee']
  },
  [OverlayKind.Spirit]: {
    name: 'Spirit',
    icon: 'assets/overlays/spirit.png',
    description: 'A mysterious entity manifests itself.',
    actions: ['Talk', 'Fight', 'Flee']
  },
  [OverlayKind.Encounter]: {
    name: 'Encounter',
    icon: 'assets/overlays/encounter.png',
    description: 'There are people around here... friends or enemies?',
    actions: ['Fight', 'Negotiate', 'Flee']
  },

  [OverlayKind.Village]: {
    name: 'Village',
    icon: 'assets/overlays/village.png',
    description: 'A small, welcoming hamlet.',
    actions: ['Visit', 'Trade', 'Rest']
  },
  [OverlayKind.City]: {
    name: 'City',
    icon: 'assets/overlays/city.png',
    description: 'You arrive in front of the gates of a large city.',
    actions: ['Enter', 'Trade', 'Rest', 'Quests']
  },
  [OverlayKind.Farm]: {
    name: 'Farm',
    icon: 'assets/overlays/farm.png',
    description: 'Peaceful farms surround this area.',
    actions: ['Visit', 'Trade']
  },
  [OverlayKind.Tower]: {
    name: 'Tower',
    icon: 'assets/overlays/tower.png',
    description: 'A tower stands here, overlooking the land.',
    actions: ['Explore']
  },
  [OverlayKind.Ruins]: {
    name: 'Ruins',
    icon: 'assets/overlays/ruins.png',
    description: 'The remains of a forgotten past.',
    actions: ['Explore']
  },

  [OverlayKind.Anomaly]: {
    name: 'Anomaly',
    icon: 'assets/overlays/anomaly.png',
    description: 'A strange anomaly distorts the area.',
    actions: ['Investigate', 'Avoid']
  },
  [OverlayKind.Caravan]: {
    name: 'Caravan',
    icon: 'assets/overlays/caravan.png',
    description: 'A traveling caravan is passing through.',
    actions: ['Trade', 'Talk', 'Rest', 'Ignore']
  },
  [OverlayKind.Merchant]: {
    name: 'Merchant',
    icon: 'assets/overlays/merchant.png',
    description: 'A traveling merchant sets up shop here.',
    actions: ['Trade', 'Talk', 'Ignore']
  },
  [OverlayKind.Wanderer]: {
    name: 'Wanderer',
    icon: 'assets/overlays/wanderer.png',
    description: 'A lone wanderer is here, lost in thought.',
    actions: ['Talk', 'Ignore']
  },
  [OverlayKind.Treasure]: {
    name: 'Treasure',
    icon: 'assets/overlays/treasure.png',
    description: 'A hidden treasure chest is buried here.',
    actions: ['Open', 'Ignore']
  },
  [OverlayKind.Ritual]: {
    name: 'Ritual',
    icon: 'assets/overlays/ritual.png',
    description: 'A group is performing a mysterious ritual.',
    actions: ['Observe', 'Join', 'Ignore']
  },

  [OverlayKind.Shrine]: {
    name: 'Shrine',
    icon: 'assets/overlays/shrine.png',
    description: 'A sacred shrine dedicated to an ancient deity.',
    actions: ['Pray', 'Offer', 'Ignore']
  },
  [OverlayKind.Portal]: {
    name: 'Portal',
    icon: 'assets/overlays/portal.png',
    description: 'A swirling portal to another realm.',
    actions: ['Enter', 'Ignore']
  },
  [OverlayKind.Obelisk]: {
    name: 'Obelisk',
    icon: 'assets/overlays/obelisk.png',
    description: 'An ancient obelisk covered in strange runes.',
    actions: ['Study', 'Ignore']
  },
  [OverlayKind.Mine]: {
    name: 'Mine',
    icon: 'assets/overlays/mine.png',
    description: 'An old mine, perhaps there are still resources...',
    actions: ['Explore', 'Mine']
  },
  [OverlayKind.Oasis]: {
    name: 'Oasis',
    icon: 'assets/overlays/oasis.png',
    description: 'A refreshing oasis in the middle of the desert.',
    actions: ['Rest', 'Gather Water']
  },
  [OverlayKind.Forest]: {
    name: 'Forest',
    icon: 'assets/overlays/forest.png',
    description: 'A dense forest full of life and mystery.',
    actions: ['Explore', 'Gather Resources']
  }
};

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
        [OverlayKind.Oasis]: 1,
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
