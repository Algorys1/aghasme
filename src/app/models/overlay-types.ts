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

export interface OverlayInfo {
  name: string;
  icon: string;
  description?: string;
  actions: string[];
}

export const overlayManifest: Record<OverlayKind, OverlayInfo> = {
  [OverlayKind.None]: {
    name: 'Nothing',
    icon: '',
    description: '',
    actions: [],
  },

  [OverlayKind.Monster]: {
    name: 'Monster',
    icon: 'assets/overlays/monster.png',
    description: 'A dangerous creature is lurking here!',
    actions: ['Fight', 'Flee'],
  },
  [OverlayKind.Beast]: {
    name: 'Beast',
    icon: 'assets/overlays/beast.png',
    description: 'A wild beast crosses your path.',
    actions: ['Fight', 'Flee'],
  },
  [OverlayKind.Spirit]: {
    name: 'Spirit',
    icon: 'assets/overlays/spirit.png',
    description: 'A mysterious entity manifests itself.',
    actions: ['Talk', 'Fight', 'Flee'],
  },
  [OverlayKind.Encounter]: {
    name: 'Encounter',
    icon: 'assets/overlays/bandits.png',
    description: 'There are people around here... friends or enemies?',
    actions: ['Fight', 'Negotiate', 'Flee'],
  },

  [OverlayKind.Village]: {
    name: 'Village',
    icon: 'assets/overlays/village.png',
    description: 'A small, welcoming hamlet.',
    actions: ['Visit', 'Trade', 'Rest'],
  },
  [OverlayKind.City]: {
    name: 'City',
    icon: 'assets/overlays/city.png',
    description: 'You arrive in front of the gates of a large city.',
    actions: ['Enter', 'Trade', 'Rest', 'Quests'],
  },
  [OverlayKind.Farm]: {
    name: 'Farm',
    icon: 'assets/overlays/farm.png',
    description: 'Peaceful farms',
    actions: ['Visit', 'Trade'],
  },
  [OverlayKind.Tower]: {
    name: 'Tower',
    icon: 'assets/overlays/tower.png',
    description: 'A tower stands here, it remains to be seen who occupies it.',
    actions: ['Explore'],
  },
  [OverlayKind.Ruins]: {
    name: 'Ruins',
    icon: 'assets/overlays/ruins.png',
    description: 'The remains of a forgotten past...',
    actions: ['Explore'],
  },
  [OverlayKind.Caravan]: {
    name: 'Caravan',
    icon: 'assets/overlays/caravan.png',
    description: 'A traveling caravan is passing through.',
    actions: ['Trade', 'Talk', 'Rest', 'Ignore'],
  },
  [OverlayKind.Merchant]: {
    name: 'Merchant',
    icon: 'assets/overlays/merchant.png',
    description: 'A traveling merchant sets up shop here.',
    actions: ['Trade', 'Talk', 'Ignore'],
  },
  [OverlayKind.Wanderer]: {
    name: 'Wanderer',
    icon: 'assets/overlays/wanderer.png',
    description: 'A lone wanderer is here, perhaps they have stories to tell.',
    actions: ['Talk', 'Ignore'],
  },
  [OverlayKind.Treasure]: {
    name: 'Treasure',
    icon: 'assets/overlays/treasure.png',
    description: 'A hidden treasure chest is buried here.',
    actions: ['Open', 'Ignore'],
  },
  [OverlayKind.Ritual]: {
    name: 'Ritual',
    icon: 'assets/overlays/ritual.png',
    description: 'A group is performing a mysterious ritual.',
    actions: ['Observe', 'Join', 'Ignore'],
  },
  [OverlayKind.Shrine]: {
    name: 'Shrine',
    icon: 'assets/overlays/shrine.png',
    description: 'A sacred shrine dedicated to an ancient deity.',
    actions: ['Pray', 'Offerings', 'Ignore'],
  },
  [OverlayKind.Portal]: {
    name: 'Portal',
    icon: 'assets/overlays/portal.png',
    description: 'A swirling portal to another realm.',
    actions: ['Enter', 'Ignore'],
  },
  [OverlayKind.Obelisk]: {
    name: 'Obelisk',
    icon: 'assets/overlays/obelisk.png',
    description: 'An ancient obelisk covered in runes.',
    actions: ['Study', 'Ignore'],
  },
  [OverlayKind.Mine]: {
    name: 'Mine',
    icon: 'assets/overlays/mine.png',
    description: 'An old mine, perhaps there are still resources to be found.',
    actions: ['Explore', 'Mine'],
  },
  [OverlayKind.Oasis]: {
    name: 'Oasis',
    icon: 'assets/overlays/oasis.png',
    description: 'A refreshing oasis in the middle of the desert.',
    actions: ['Rest', 'Gather Water'],
  },
  [OverlayKind.Forest]: {
    name: 'Forest',
    icon: 'assets/overlays/forest.png',
    description: 'A dense forest full of life and mystery.',
    actions: ['Explore', 'Gather Resources'],
  },
  [OverlayKind.Anomaly]: {
    name: 'Anomaly',
    icon: 'assets/overlays/anomaly.png',
    description: 'A strange anomaly distorts the area.',
    actions: ['Investigate', 'Avoid'],
  }
};
