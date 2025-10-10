import { OverlayKind, OverlayInfo, OVERLAY_MANIFEST } from '../models/overlays';
import { ActionType } from '../models/actions';
import { EnemyFactory } from './enemy.factory';
import { Terrain } from './tile.factory';

export interface OverlayContext {
  playerLevel?: number;
  terrain?: Terrain;
}

export interface OverlayPhase {
  title: string;
  description: string;
  actions: ActionType[];
  next?: string;
  combatChance?: number;
  lootChance?: number;
}

export interface OverlayInstance extends OverlayInfo {
  id: string;
  kind: OverlayKind;
  level?: number;
  nextEvent?: string;
  actions: ActionType[];
  eventChain?: Record<string, OverlayPhase>;
}

export class OverlayFactory {
  static create(kind: OverlayKind, context?: OverlayContext): OverlayInstance {
    const base = { ...OVERLAY_MANIFEST[kind] };
    const id = `${kind}-${crypto.randomUUID().slice(0, 8)}`;
    const playerLevel = context?.playerLevel ?? 1;
    const terrain = context?.terrain ?? 'plain';

    switch (kind) {
      case OverlayKind.Beast:
        return this.createBeast(base, id, kind, playerLevel, terrain);
      case OverlayKind.Monster:
        return this.createMonster(base, id, kind, playerLevel, terrain);
      case OverlayKind.City:
        return this.createCity(base, id, kind);
      case OverlayKind.Village:
        return this.createVillage(base, id, kind);
      case OverlayKind.Tower:
        return this.createTower(base, id, kind);
      case OverlayKind.Anomaly:
        return this.createAnomaly(base, id, kind);
      case OverlayKind.Caravan:
        return this.createCaravan(base, id, kind);
      case OverlayKind.Encounter:
        return this.createEncounter(base, id, kind, playerLevel, terrain);
      case OverlayKind.Farm:
        return this.createFarm(base, id, kind);
      case OverlayKind.Forest:
        return this.createForest(base, id, kind);
      case OverlayKind.Merchant:
        return this.createMerchant(base, id, kind);
      case OverlayKind.Mine:
        return this.createMine(base, id, kind);
      case OverlayKind.Ruins:
        return this.createRuins(base, id, kind);
      case OverlayKind.Obelisk:
        return this.createObelisk(base, id, kind);
      case OverlayKind.Oasis:
        return this.createOasis(base, id, kind);
      case OverlayKind.Portal:
        return this.createPortal(base, id, kind);
      case OverlayKind.Ritual:
        return this.createRitual(base, id, kind);
      case OverlayKind.Shrine:
        return this.createShrine(base, id, kind);
      case OverlayKind.Spirit:
        return this.createSpirit(base, id, kind);
      case OverlayKind.Treasure:
        return this.createTreasure(base, id, kind);
      case OverlayKind.Wanderer:
        return this.createWanderer(base, id, kind);
      default:
        return { ...base, id, kind, actions: []};
    }
  }

  private static createAnomaly(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const anomalies = [
      { name: 'Temporal Rift', desc: 'A swirling rift distorts time and space here.' },
      { name: 'Gravity Well', desc: 'An area where gravity behaves erratically.'},
      { name: 'Magnetic Storm', desc: 'A storm of magnetic energy disrupts technology.'},
      { name: 'Ethereal Fog', desc: 'A dense fog that seems to whisper secrets.' },
      { name: 'Crystal Growth', desc: 'Gigantic crystals have erupted from the ground.' },
    ];
    const choice = anomalies[Math.floor(Math.random() * anomalies.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/anomaly.png',
      actions: [ActionType.Inspect, ActionType.Avoid, ActionType.Harvest],
    };
  }

  private static createCaravan(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const caravanTypes = [
      { name: 'Merchant Caravan', desc: 'A bustling caravan of traders and merchants.' },
      { name: 'Nomadic Tribe', desc: 'A group of nomads traveling with their livestock.' },
      { name: 'Military Convoy', desc: 'A convoy of soldiers on patrol.' },
      { name: 'Pilgrim Group', desc: 'A group of pilgrims journeying to a sacred site.' },
      { name: 'Exploration Party', desc: 'Adventurers seeking new lands and treasures.' },
    ];
    const choice = caravanTypes[Math.floor(Math.random() * caravanTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/caravan.png',
      actions: [ActionType.Trade, ActionType.Observe],
    };
  }

  private static createEncounter(base: OverlayInfo, id: string, kind: OverlayKind, playerLevel: number, terrain: Terrain): OverlayInstance {
    const encounters = [
      this.createBeast, this.createMonster, this.createMerchant, this.createSpirit, this.createWanderer
    ];
    const choice = encounters[Math.floor(Math.random() * encounters.length)];

    return choice.call(this, base, id, kind, playerLevel, terrain);
  }

  private static createMerchant(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const merchantTypes = [
      { name: 'Traveling Merchant', desc: 'A merchant with a variety of goods for sale.' },
      { name: 'Blacksmith', desc: 'A skilled blacksmith offering weapons and armor.'},
      { name: 'Herbalist', desc: 'A vendor specializing in potions and herbs.'},
      { name: 'Artisan', desc: 'An artisan selling crafted items and trinkets.' },
      { name: 'Food Vendor', desc: 'A vendor offering food and drink for travelers.'},
    ];
    const choice = merchantTypes[Math.floor(Math.random() * merchantTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/merchant.png',
      actions: [ActionType.Trade, ActionType.Talk],
    };
  }

  private static createFarm(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const farmTypes = [
      { name: 'Wheat Farm', desc: 'A sprawling farm with golden wheat fields swaying in the breeze.', ressources: 'food' },
      { name: 'Dairy Farm', desc: 'A bustling dairy farm with cows grazing peacefully.', ressources: 'food' },
      { name: 'Poultry Farm', desc: 'A lively farm filled with chickens, ducks, and other fowl.', ressources: 'food' },
      { name: 'Vegetable Farm', desc: 'A vibrant farm growing a variety of fresh vegetables.', ressources: 'food:potion' },
      { name: 'Orchard', desc: 'A lush orchard filled with fruit-bearing trees.', ressources: 'food' },
      { name: 'Livestock Farm', desc: 'A farm raising cattle, sheep, and other livestock.', ressources: 'food:wood' },
      { name: 'Flower Farm', desc: 'A colorful farm cultivating beautiful flowers and herbs.', ressources: 'food:milk' },
    ];
    const choice = farmTypes[Math.floor(Math.random() * farmTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/farm.png',
      actions: [ActionType.Harvest, ActionType.Trade, ActionType.Rest],
    };
  }

  private static createForest(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const forestTypes = [
      { name: 'Enchanted Forest', desc: 'A mystical forest filled with magical creatures and glowing plants.', ressources: 'wood' },
      { name: 'Dark Woods', desc: 'A dense and shadowy forest, home to many dangers.', ressources: 'wood:beast' },
      { name: 'Ancient Grove', desc: 'A serene grove with towering ancient trees and a peaceful atmosphere.' },
      { name: 'Whispering Forest', desc: 'A forest where the trees seem to whisper secrets to those who listen.', ressources: 'wood:sacred_wood' },
      { name: 'Sacred Forest', desc: 'A holy forest protected by nature spirits and ancient magic.' },
    ];
    const choice = forestTypes[Math.floor(Math.random() * forestTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/forest.png',
      actions: [ActionType.Explore, ActionType.Harvest, ActionType.Rest],
    };
  }

  private static createMine(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const mineTypes = [
      { name: 'Abandoned Mine', desc: 'An old mine, long forgotten and filled with danger.', ressources: 'stone' },
      { name: 'Active Mine', desc: 'A bustling mine with workers extracting valuable resources.', ressources: 'stone:iron' },
      { name: 'Crystal Cavern', desc: 'A mine filled with glowing crystals and hidden treasures.', ressources: 'stone:crystal' },
      { name: 'Goblin Mine', desc: 'A mine overrun by goblins, beware of ambushes!', ressources: 'stone:coal' },
      { name: 'Dwarven Mine', desc: 'A sturdy mine built by dwarves, known for its rich veins of ore.', ressources: 'stone:coal' },
    ];
    const choice = mineTypes[Math.floor(Math.random() * mineTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/mine.png',
      actions: [ActionType.Explore, ActionType.Harvest, ActionType.Rest],
    };
  }

  private static createBeast(base: OverlayInfo, id: string, kind: OverlayKind, playerLevel: number, terrain: Terrain): OverlayInstance {
    const beast = EnemyFactory.generateBeast(playerLevel, terrain);

    return {
      ...base,
      id,
      kind,
      name: beast.name || 'error',
      description: beast.desc || 'error',
      icon: beast.icon || 'error',
      actions: [ActionType.Fight, ActionType.Flee],
      level: beast.level,
    };
  }
  
  private static createMonster(base: OverlayInfo, id: string, kind: OverlayKind, playerLevel: number, terrain: Terrain): OverlayInstance {
    const monster = EnemyFactory.generateMonster(playerLevel, terrain);

    return {
      ...base,
      id,
      kind,
      name: monster.name || 'error',
      description: monster.desc || 'error',
      icon: monster.icon || 'error',
      actions: [ActionType.Fight, ActionType.Flee],
      level: monster.level,
    };
  }
  

  private static createCity(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const names = ['Rivertown', 'Eldergate', 'Stormhold', 'Ironvale', 'Highwall'];
    const name = names[Math.floor(Math.random() * names.length)];

    return {
      ...base,
      id,
      kind,
      name,
      description: `You arrive at the gates of ${name}. The streets bustle with life and opportunity.`,
      actions: [ActionType.Explore, ActionType.Trade, ActionType.Rest, ActionType.Quests],
    };
  }

  private static createVillage(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const names = ['Oakwood', 'Pinehill', 'Maplecross', 'Birchfield', 'Cedarbrook'];
    const name = names[Math.floor(Math.random() * names.length)];

    return {
      ...base,
      id,
      kind,
      name,
      description: `You reach the quaint village of ${name}. The villagers greet you warmly, offering food and shelter.`,
      actions: [ActionType.Explore, ActionType.Trade, ActionType.Rest],
    };
  }

  private static createTower(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const names = ['Mage\'s Spire', 'Wizard\'s Keep', 'Arcane Tower', 'Sorcerer\'s Pinnacle', 'Enchanter\'s Watch'];
    const name = names[Math.floor(Math.random() * names.length)];

    return {
      ...base,
      id,
      kind,
      name,
      description: `You stand before the imposing ${name}. Mystical energies crackle around its peak.`,
      actions: [ActionType.Explore, ActionType.Rest],
    };
  }

  private static createRuins(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const ruinTypes = [
      { name: 'Ancient Temple', desc: 'The remnants of a once-grand temple, now overgrown and forgotten.' },
      { name: 'Forgotten Fortress', desc: 'Crumbling walls and broken towers hint at a fortress long lost to time.' },
      { name: 'Sunken City', desc: 'Ruins of a city partially submerged, with buildings jutting out of the water.' },
      { name: 'Deserted Village', desc: 'Empty streets and abandoned homes tell the story of a village left behind.' },
      { name: 'Mystic Circle', desc: 'A circle of standing stones, their purpose and origin shrouded in mystery.' },
    ];
    const choice = ruinTypes[Math.floor(Math.random() * ruinTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/ruins.png',
      actions: [ActionType.Explore, ActionType.Rest],
      nextEvent: 'floor_1',
      eventChain: {
        floor_1: {
          title: 'Ruins - Lower Halls',
          description: 'The air is damp and you can hear faint echoes deeper inside.',
          actions: [ActionType.Explore, ActionType.Rest],
          next: 'floor_2',
          combatChance: 0.3,
          lootChance: 0.5
        },
        floor_2: {
          title: 'Ruins - Forgotten Chamber',
          description: 'You find a cracked altar covered with dust. Something valuable might be hidden here.',
          actions: [ActionType.Explore, ActionType.Open, ActionType.Avoid],
          combatChance: 0.4,
          lootChance: 0.8
        }
      }
    };
  }

  private static createObelisk(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const obeliskTypes = [
      {name: 'Stone Obelisk', desc: 'A tall stone obelisk covered in ancient runes.'},
      {name: 'Crystal Obelisk', desc: 'A shimmering obelisk made of pure crystal, glowing faintly.'},
      {name: 'Metal Obelisk', desc: 'A sleek obelisk of unknown metal, humming with energy.'},
      {name: 'Wooden Obelisk', desc: 'A carved wooden obelisk, adorned with tribal symbols.'},
      {name: 'Bone Obelisk', desc: 'An eerie obelisk constructed from bones and skulls.'},
    ];
    const choice = obeliskTypes[Math.floor(Math.random() * obeliskTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/obelisk.png',
      actions: [ActionType.Explore, ActionType.Pray, ActionType.Avoid],
    };
  }

  private static createOasis(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const oasisTypes = [
      { name: 'Desert Oasis', desc: 'A lush oasis in the middle of a barren desert, with palm trees and a sparkling pond.' },
      { name: 'Jungle Oasis', desc: 'A hidden oasis deep within a dense jungle, teeming with exotic plants and wildlife.' },
      { name: 'Mountain Oasis', desc: 'A serene oasis nestled in a mountain valley, with clear streams and wildflowers.' },
      { name: 'Savannah Oasis', desc: 'A rare oasis on the open savannah, providing vital water and shade for travelers.' },
      { name: 'Arctic Oasis', desc: 'A surprising oasis in a frozen tundra, with geothermal springs creating a warm refuge.' },
    ];
    const choice = oasisTypes[Math.floor(Math.random() * oasisTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/oasis.png',
      actions: [ActionType.Rest, ActionType.Harvest, ActionType.Explore],
    };
  }

  private static createPortal(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const portalTypes = [
      { name: 'Mystic Portal', desc: 'A swirling portal of arcane energy, pulsing with magical power.' },
      { name: 'Ancient Gateway', desc: 'A stone archway inscribed with runes, leading to unknown realms.' },
      { name: 'Dimensional Rift', desc: 'A tear in the fabric of reality, revealing glimpses of other worlds.' },
      { name: 'Celestial Gate', desc: 'A radiant portal bathed in light, promising passage to heavenly places.' },
      { name: 'Shadow Veil', desc: 'A dark and foreboding portal, shrouded in shadows and mystery.' },
    ];
    const choice = portalTypes[Math.floor(Math.random() * portalTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/portal.png',
      actions: [ActionType.Explore, ActionType.Inspect, ActionType.Avoid],
    };
  }

  private static createRitual(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const ritualTypes = [
      { name: 'Sacred Ritual Site', desc: 'A place where ancient rituals were performed, still radiating spiritual energy.' },
      { name: 'Dark Ritual Circle', desc: 'A sinister site marked by dark symbols, hinting at forbidden practices.' },
      { name: 'Nature\'s Altar', desc: 'An altar dedicated to nature spirits, surrounded by offerings and carvings.' },
      { name: 'Celestial Observatory', desc: 'A site aligned with the stars, used for celestial rituals and ceremonies.' },
      { name: 'Elemental Shrine', desc: 'A shrine dedicated to the elemental forces, with signs of recent activity.' },
    ];
    const choice = ritualTypes[Math.floor(Math.random() * ritualTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/ritual.png',
      actions: [ActionType.Avoid, ActionType.Talk],
    };
  }

  private static createShrine(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const shrineTypes = [
      { name: 'Ancient Shrine', desc: 'A weathered shrine dedicated to forgotten deities, still revered by locals.' },
      { name: 'Moon Shrine', desc: 'A shrine illuminated by moonlight, known for its mystical properties.' },
      { name: 'Crystal Shrine', desc: 'A shrine adorned with crystals, believed to enhance magical abilities.' },
      { name: 'Gobelin Shrine', desc: 'A small shrine built by goblins, dedicated to their trickster god.' },
      { name: 'Necromantic Shrine', desc: 'A dark shrine used for necromantic rituals, emanating an eerie aura.' },
    ];
    const choice = shrineTypes[Math.floor(Math.random() * shrineTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/shrine.png',
      actions: [ActionType.Pray, ActionType.Avoid],
    };
  }

  private static createSpirit(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const spirits = [
      { name: 'Nature Spirit', desc: 'A gentle spirit of the forest, radiating calm and wisdom.', icon: 'assets/spirits/forest-spirit.png' },
      { name: 'Water Spirit', desc: 'A playful spirit of the water, shimmering with fluid grace.', icon: 'assets/spirits/water-spirit.png' },
      { name: 'Fire Spirit', desc: 'A fierce spirit of fire, crackling with intense energy.', icon: 'assets/spirits/fire-spirit.png' },
      { name: 'Earth Spirit', desc: 'A steadfast spirit of the earth, embodying strength and resilience.', icon: 'assets/spirits/earth-spirit.png' },
      { name: 'Air Spirit', desc: 'A swift spirit of the air, moving with ethereal lightness.', icon: 'assets/spirits/air-spirit.png' },
    ];
    const choice = spirits[Math.floor(Math.random() * spirits.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: choice.icon,
      actions: [ActionType.Talk, ActionType.Fight, ActionType.Avoid],
      level: Math.ceil(Math.random() * 4),  // TODO create a factory for level based on monster type (only subtype spirit)
    };
  }

  private static createTreasure(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const treasureTypes = [
      { name: 'Hidden Cache', desc: 'A concealed stash of valuables, waiting to be discovered.' },
      { name: 'Buried Chest', desc: 'An old chest buried underground, filled with gold and jewels.' },
      { name: 'Forgotten Hoard', desc: 'A hoard of treasures left behind by ancient adventurers.' },
      { name: 'Mystic Relic', desc: 'A relic imbued with magical properties, highly sought after.' },
      { name: 'Cursed Treasure', desc: 'A treasure rumored to be cursed, bringing misfortune to its finder.' },
    ];
    const choice = treasureTypes[Math.floor(Math.random() * treasureTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/treasure.png',
      actions: [ActionType.Open, ActionType.Explore, ActionType.Avoid],
    };
  }

  private static createWanderer(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const wandererTypes = [
      { name: 'Lone Traveler', desc: 'A solitary figure wandering the lands, seeking adventure.' },
      { name: 'Mystic Seeker', desc: 'A wanderer in search of ancient knowledge and spiritual enlightenment.' },
      { name: 'Wandering Merchant', desc: 'A merchant traveling from place to place, offering rare goods.' },
      { name: 'Lost Soul', desc: 'A confused wanderer, unsure of their path and purpose.' },
      { name: 'Adventurous Nomad', desc: 'A nomad embracing the freedom of the open road, always on the move.' },
    ];
    const choice = wandererTypes[Math.floor(Math.random() * wandererTypes.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: 'assets/overlays/wanderer.png',
      actions: [ActionType.Talk, ActionType.Trade, ActionType.Avoid],
    };
  }
}
