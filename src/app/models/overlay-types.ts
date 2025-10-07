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
  Fortress = 'fortress',
  Ruins = 'ruins',

  // Events
  Blizzard = 'blizzard',
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
    name: 'Aucun',
    icon: '',
    description: '',
    actions: [],
  },

  [OverlayKind.Monster]: {
    name: 'Monstre',
    icon: 'assets/overlays/monster.png',
    description: 'Une créature dangereuse rôde ici.',
    actions: ['Combattre', 'Fuir'],
  },
  [OverlayKind.Beast]: {
    name: 'Bête',
    icon: 'assets/overlays/beast.png',
    description: 'Une bête sauvage croise votre route.',
    actions: ['Combattre', 'Fuir'],
  },
  [OverlayKind.Spirit]: {
    name: 'Esprit',
    icon: 'assets/overlays/spirit.png',
    description: 'Une entité mystérieuse se manifeste.',
    actions: ['Parler', 'Combattre', 'Fuir'],
  },
  [OverlayKind.Encounter]: {
    name: 'Encounter',
    icon: 'assets/overlays/bandits.png',
    description: 'Un groupe de bandits bloque le passage.',
    actions: ['Combattre', 'Négocier', 'Fuir'],
  },

  [OverlayKind.Village]: {
    name: 'Village',
    icon: 'assets/overlays/village.png',
    description: 'Un petit hameau accueillant.',
    actions: ['Entrer', 'Marchander', 'Se reposer'],
  },
  [OverlayKind.City]: {
    name: 'Ville',
    icon: 'assets/overlays/city.png',
    description: 'Une grande cité animée.',
    actions: ['Entrer', 'Explorer', 'Quêtes'],
  },
  [OverlayKind.Farm]: {
    name: 'Ferme',
    icon: 'assets/overlays/farm.png',
    description: 'Une ferme isolée.',
    actions: ['Visiter', 'Marchander'],
  },
  [OverlayKind.Tower]: {
    name: 'Tour',
    icon: 'assets/overlays/tower.png',
    description: 'Une tour mystérieuse se dresse ici.',
    actions: ['Explorer', 'Entrer'],
  },
  [OverlayKind.Fortress]: {
    name: 'Forteresse',
    icon: 'assets/overlays/fortress.png',
    description: 'Une forteresse imposante garde ces terres.',
    actions: ['Entrer', 'Marchander', 'Parler'],
  },
  [OverlayKind.Ruins]: {
    name: 'Ruines',
    icon: 'assets/overlays/ruins.png',
    description: 'Vestiges d\'un passé oublié.',
    actions: ['Explorer', 'Fouiller'],
  },

  [OverlayKind.Blizzard]: {
    name: 'Blizzard',
    icon: 'assets/overlays/blizzard.png',
    description: 'Une tempête de neige féroce.',
    actions: ['Attendre', 'Chercher un abri'],
  },
  [OverlayKind.Caravan]: {
    name: 'Caravane',
    icon: 'assets/overlays/caravan.png',
    description: 'Une caravane de marchands en voyage.',
    actions: ['Marchander', 'Parler'],
  },
  [OverlayKind.Merchant]: {
    name: 'Marchand',
    icon: 'assets/overlays/merchant.png',
    description: 'Un marchand solitaire propose ses biens.',
    actions: ['Marchander'],
  },
  [OverlayKind.Wanderer]: {
    name: 'Voyageur',
    icon: 'assets/overlays/wanderer.png',
    description: 'Un voyageur solitaire croise votre route.',
    actions: ['Parler', 'Ignorer'],
  },
  [OverlayKind.Treasure]: {
    name: 'Trésor',
    icon: 'assets/overlays/treasure.png',
    description: 'Un coffre mystérieux attire votre regard.',
    actions: ['Ouvrir', 'Ignorer'],
  },
  [OverlayKind.Ritual]: {
    name: 'Rituel',
    icon: 'assets/overlays/ritual.png',
    description: 'Un rituel mystique est en cours.',
    actions: ['Observer', 'Intervenir', 'Ignorer'],
  },

  [OverlayKind.Shrine]: {
    name: 'Sanctuaire',
    icon: 'assets/overlays/shrine.png',
    description: 'Un ancien sanctuaire orné de runes.',
    actions: ['Prier', 'Explorer'],
  },
  [OverlayKind.Portal]: {
    name: 'Portail',
    icon: 'assets/overlays/portal.png',
    description: 'Un portail vers un autre monde.',
    actions: ['Entrer', 'Observer'],
  },
  [OverlayKind.Obelisk]: {
    name: 'Obélisque',
    icon: 'assets/overlays/obelisk.png',
    description: 'Un obélisque couvert d’inscriptions.',
    actions: ['Lire', 'Ignorer'],
  },
  [OverlayKind.Mine]: {
    name: 'Mine',
    icon: 'assets/overlays/mine.png',
    description: 'Une mine abandonnée (ou pas ?).',
    actions: ['Explorer', 'Miner'],
  },
  [OverlayKind.Oasis]: {
    name: 'Oasis',
    icon: 'assets/overlays/oasis.png',
    description: 'Un havre de paix dans le désert.',
    actions: ['Se reposer', 'Explorer'],
  },
  [OverlayKind.Forest]: {
    name: 'Forêt',
    icon: 'assets/overlays/forest.png',
    description: 'Une dense forêt pleine de mystères.',
    actions: ['Explorer', 'Couper du bois'],
  },
};
