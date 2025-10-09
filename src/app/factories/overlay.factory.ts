import { OverlayKind, OverlayInfo, OVERLAY_MANIFEST } from '../models/overlays';

export interface OverlayInstance extends OverlayInfo {
  id: string;
  level?: number;
  nextEvent?: string;
  kind: OverlayKind;
}

export class OverlayFactory {
  static create(kind: OverlayKind): OverlayInstance {
    const base = { ...OVERLAY_MANIFEST[kind] };
    const id = `${kind}-${crypto.randomUUID().slice(0, 8)}`;

    switch (kind) {
      case OverlayKind.Beast:
        return this.createBeast(base, id, kind);
      case OverlayKind.Monster:
        return this.createMonster(base, id, kind);
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
        return this.createEncounter(base, id, kind);
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
        return { ...base, id, kind };
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
      actions: ['Investigate', 'Avoid', 'Collect Samples'],
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
      actions: ['Trade', 'Join', 'Observe'],
    };
  }

  private static createEncounter(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const encounters = [
      this.createBeast, this.createMonster, this.createMerchant, this.createSpirit, this.createWanderer
    ];
    const choice = encounters[Math.floor(Math.random() * encounters.length)];

    return choice.call(this, base, id, kind);
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
      actions: ['Trade', 'Talk', 'Ignore'],
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
      actions: ['Harvest', 'Trade', 'Rest'],
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
      actions: ['Explore', 'Gather Herbs', 'Rest'],
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
      actions: ['Explore', 'Gather Resources', 'Rest'],
    };
  }

  private static createBeast(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const beasts = [
      { name: 'Wolf', desc: 'A lone wolf growls nearby.', icon: 'assets/monsters/wolf.png' },
      { name: 'Wild Boar', desc: 'A furious wild boar charges at you!', icon: 'assets/monsters/wild-boar.png' },
      { name: 'Rats', desc: 'A massive rat prowls in the darkness.', icon: 'assets/monsters/rats.png' },
      { name: 'Bear', desc: 'A large bear blocks your way.', icon: 'assets/monsters/bear.png' },
      { name: 'Spider', desc: 'A monstrous spider is heading towards you at high speed.', icon: 'assets/monsters/spider.png' },
      { name: 'Snake', desc: 'A huge snake stands before you, its mouth open, ready to bite.', icon: 'assets/monsters/snake.png' },
    ];
    const choice = beasts[Math.floor(Math.random() * beasts.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: choice.icon,
      actions: ['Fight', 'Flee', 'Observe'],
      level: Math.ceil(Math.random() * 3),
    };
  }

  private static createMonster(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const monsters = [
      { name: 'Bandit', desc: 'These roads aren\'t safe, you knew that. You\'re face to face with a highwayman.', icon: 'assets/monsters/bandit.png' },
      { name: 'Disciple', desc: 'A dark disciple mutters forbidden incantations.', icon: 'assets/monsters/disciple.png' },
      { name: 'Ghost', desc: 'A vaporous mass forms in front of you, it\'s definitely a creature from the beyond: a ghost!', icon: 'assets/monsters/goblin-warrior.png' },
      { name: 'Goblin Archer', desc: 'Perched on a rock, a goblin stares at you, ready to fire his arrow.', icon: 'assets/monsters/goblin-archer.png' },
      { name: 'Goblin Shaman', desc: 'A goblin shaman is looking at you maliciously, probably preparing to cast a dark spell...', icon: 'assets/monsters/goblin-shaman.png' },
      { name: 'Goblin Warrior', desc: 'A sneaky goblin jumps right in front of you and challenges you', icon: 'assets/monsters/goblin-warrior.png' },
      { name: 'Mechaninic Orb', desc: 'What you thought was a pile of inert scrap metal suddenly finds itself flying around you. That glowing eye doesn\'t bode well for you...', icon: 'assets/monsters/orb-mechanic.png' },
      { name: 'Priest', desc: 'This hooded person is chanting incomprehensible words... Better to shut him up before he\'s finished.', icon: 'assets/monsters/priest.png' },
      { name: 'Skeleton', desc: 'A previously inert skeleton rises up and attacks you!', icon: 'assets/monsters/skeleton.png' },
      { name: 'Mechanic Spider', desc: 'This monstrosity from a forgotten era is going to give you a hard time. You\'re going to have to hit hard!', icon: 'assets/monsters/spider-mechanic.png' },
      { name: 'Robot on Wheels', desc: 'Although it may seem wobbly, this creature seems to have retained all its danger. Beware!', icon: 'assets/monsters/wheel-mechanic.png' },
      { name: 'Zombie', desc: 'The undead rise, a dark age is fast approaching! If you kill him, that will always be one less!', icon: 'assets/monsters/zombie.png' },
    ];
    const choice = monsters[Math.floor(Math.random() * monsters.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: choice.icon,
      actions: ['Fight', 'Negotiate', 'Flee'],
      level: Math.ceil(Math.random() * 5),
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
      actions: ['Visit', 'Trade', 'Rest', 'Quests'],
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
      actions: ['Visit', 'Trade', 'Rest'],
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
      actions: ['Visit', 'Rest', 'Meditate'],
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
      actions: ['Explore', 'Search for Artifacts', 'Rest'],
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
      actions: ['Investigate', 'Meditate', 'Avoid'],
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
      actions: ['Rest', 'Gather Water', 'Explore'],
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
      actions: ['Enter', 'Study', 'Avoid'],
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
      actions: ['Observe', 'Join', 'Avoid'],
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
      actions: ['Pray', 'Offer', 'Avoid'],
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
      actions: ['Communicate', 'Fight', 'Avoid'],
      level: Math.ceil(Math.random() * 4),
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
      actions: ['Open', 'Inspect', 'Leave'],
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
      actions: ['Talk', 'Trade', 'Ignore'],
    };
  }

  // ----------------------------------------------------------
  // 🏰 (TODO)
  // ----------------------------------------------------------
  // private static createTower(...) { ... }
  // private static createVillage(...) { ... }
  // private static createEvent(...) { ... }
}
