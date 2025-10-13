export enum ItemType {
  Accessory = 'Accessory',
  Armor = 'Armor',
  Consumable = 'Consumable',
  Quest = 'Quest',
  Resource = 'Resource',
  Utility = 'Utility',
  WeaponMelee = 'WeaponMelee',
  WeaponRange = 'WeaponRange',
}

export enum RarityType {
  Normal = 'Normal',
  Rare = 'Rare',
  Legendary = 'Legendary',
  Epic = 'Epic',
  Artefact = 'Artefact'
}

export enum EquipSlot {
  Accessory1 = 'Accessory1',
  Accessory2 = 'Accessory2',
  Feet = 'Feet',
  Head = 'Head',
  Hand1 = 'Hand1',
  Hand2 = 'Hand2',
  Torso = 'Torso',
  Weapon1 = 'Weapon1',
  Weapon2 = 'Weapon2'
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  icon: string;
  rarity: RarityType;

  baseValue: number;          // valeur économique de base
  computedValue?: number;     // valeur recalculée via rareté + effets
  stackable?: boolean;        // peut être empilé
  subtype?: ItemSubtype;      // ex: "sword", "shield", "potion"
  equipSlot?: EquipSlot[];    // slots occupés
  twoHanded?: boolean;        // indique si l’objet bloque les deux mains
  effects?: ItemEffect[];     // effets chiffrés et lisibles (atk, hp, etc.)
}

export interface ItemEffect {
  stat: string;     // ex: "atk", "hp", "mp", "def", "tool", "light"
  value: number;    // ex: +10 ou -5
}

export type ItemSubtype =
  | 'sword' | 'axe' | 'dagger' | 'hammer' | 'staff' | 'spear' | 'bow'
  | 'helmet' | 'robe' | 'armor' | 'boots' | 'shield' | 'ring' | 'amulet'
  | 'book' | 'key' | 'torch' | 'resource' | 'potion' | 'food'
  | 'generic';

// Base items
export const BASE_ITEMS: Item[] = [
  // ACCESSORIES
  {
    id: 'amulet-epic',
    name: 'Epic Amulet',
    description: 'This ancient amulet has already saved several lives...',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/amulet-epic.png',
    baseValue: 500,
    equipSlot: [EquipSlot.Accessory1],
    rarity: RarityType.Epic,
    subtype: 'amulet'
  },
  {
    id: 'charm-wild',
    name: 'Charm of the Wild',
    description: 'Smells faintly of moss and rain. Grants a deep calm.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/charm-wild.png',
    baseValue: 130,
    rarity: RarityType.Rare,
    subtype: 'amulet',
    equipSlot: [EquipSlot.Accessory1],
    effects: [{ stat: 'hp', value: 10 }, { stat: 'resist', value: 1 }],
  },
  {
    id: 'magic-tome',
    name: 'Magic Tome',
    description: 'A tome of magic, certainly some spells to learn in there.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/magic-tome.png',
    baseValue: 100,
    equipSlot: [EquipSlot.Accessory1],
    rarity: RarityType.Rare,
    subtype: 'book'
  },
  {
    id: 'magic-tome-epic',
    name: 'Epic Grimoire',
    description: 'A grimoire not to be put in everyone\'s hands. Luckily, it\'s in yours.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/magic-tome-epic.png',
    baseValue: 500,
    equipSlot: [EquipSlot.Accessory1],
    rarity: RarityType.Epic,
    subtype: 'book'
  },
  {
    id: 'orb-epic',
    name: 'A Mysterious Orb',
    description: 'A glowing shard from the Bestial Orb.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/orb-epic.png',
    baseValue: 500,
    equipSlot: [EquipSlot.Accessory1],
    effects: [{ stat: 'bestial', value: 1 }],
    rarity: RarityType.Epic,
    subtype: 'amulet'
  },
  {
    id: 'pendant-epic',
    name: 'Ancient Pendant',
    description: 'An antique pendant... the pieces seem to want to stay together despite their condition.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/pendant-epic.png', // corrected icon
    baseValue: 500,
    equipSlot: [EquipSlot.Accessory1],
    effects: [{ stat: 'elemental', value: 1 }],
    rarity: RarityType.Epic,
    subtype: 'amulet'
  },
  {
    id: 'ring-red',
    name: 'A Red Ring',
    description: 'A beautiful ring set with a glowing stone.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/ring-red.png',
    baseValue: 100,
    equipSlot: [EquipSlot.Accessory1],
    rarity: RarityType.Normal
  },
  {
    id: 'ring-blue',
    name: 'A Blue Ring',
    description: 'The blue stone set in this ring gives a beautiful effect.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/ring-blue.png',
    baseValue: 100,
    equipSlot: [EquipSlot.Accessory1],
    rarity: RarityType.Normal
  },
  {
    id: 'ring-sparks',
    name: 'Ring of Sparks',
    description: 'A faint spark dances within the gem.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/ring-sparks.png',
    baseValue: 120,
    rarity: RarityType.Rare,
    subtype: 'ring',
    equipSlot: [EquipSlot.Accessory1, EquipSlot.Accessory2],
    effects: [{ stat: 'mp', value: 5 }, { stat: 'atk', value: 1 }],
  },
  {
    id: 'tab-epic',
    name: 'Ancient Tabler',
    description: 'A tablet from ancient times. It certainly served a deity at one time...',
    type: ItemType.Accessory,
    icon: 'assets/items/weapons-melee/dagger-damaged.png',
    baseValue: 500,
    equipSlot: [EquipSlot.Accessory1],
    rarity: RarityType.Epic
  },
  // ARMORS
  {
    id: 'armor-leather',
    name: 'Leather Armor',
    description: 'Light armor, offers minimal protection but keeps mobility.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/armor-leather.png',
    baseValue: 120,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Normal
  },
  {
    id: 'armor-iron',
    name: 'Iron Armor',
    description: 'Iron armor, heavy certainly, but perfect for protecting yourself against bad blows!',
    type: ItemType.Armor,
    icon: 'assets/items/armors/armor-iron.png',
    baseValue: 250,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Normal
  },
  {
    id: 'boots-travel',
    name: 'Travel Boots',
    description: 'Good walking boots can make all the difference.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/boots-travel.png',
    baseValue: 40,
    equipSlot: [EquipSlot.Feet],
    rarity: RarityType.Normal
  },
  {
    id: 'gloves-leather',
    name: 'Leather Gloves',
    description: 'Well-made leather gloves. A little too big, but they\'re still comfortable.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/gloves-leather.png',
    baseValue: 60,
    equipSlot: [EquipSlot.Hand1],
    rarity: RarityType.Normal
  },
  {
    id: 'helmet-echo',
    name: 'Helm of Echoes',
    description: 'When worn, faint voices murmur warnings before danger strikes.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/helmet-echo.png',
    baseValue: 140,
    rarity: RarityType.Rare,
    subtype: 'helmet',
    equipSlot: [EquipSlot.Head],
    effects: [{ stat: 'perception', value: 1 }],
  },
  {
    id: 'helmet-epic',
    name: 'Dragon Helmet',
    description: 'A dragon helmet, straight from the ancient forges. It\'s an honor to be able to wear it.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/helmet-epic.png',
    baseValue: 500,
    equipSlot: [EquipSlot.Head],
    rarity: RarityType.Epic
  },
  {
    id: 'helmet-leather',
    name: 'Leather Helmet',
    description: 'A finely fitted leather helmet. It doesn\'t obstruct your vision and provides minimal protection.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/helmet-leather.png',
    baseValue: 70,
    equipSlot: [EquipSlot.Head],
    rarity: RarityType.Normal
  },
  {
    id: 'hat-magician',
    name: 'Wizard Hat',
    description: 'A crooked hat, allowing you to avoid being dazzled by the sun when casting a spell.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/hat-magician.png',
    baseValue: 60,
    equipSlot: [EquipSlot.Head],
    rarity: RarityType.Normal
  },
  {
    id: 'hat-travel',
    name: 'Traveler\'s Hat',
    description: 'A simple traveler\'s hat. At least your head won\'t get cold!',
    type: ItemType.Armor,
    icon: 'assets/items/armors/hat-travel.png',
    baseValue: 30,
    equipSlot: [EquipSlot.Head],
    rarity: RarityType.Normal
  },
  {
    id: 'mantle-travel',
    name: 'Traveler\'s Mantle',
    description: 'A cloak that always seems clean, no matter the mud.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/mantle-travel.png',
    baseValue: 150,
    rarity: RarityType.Rare,
    subtype: 'robe',
    equipSlot: [EquipSlot.Torso],
    effects: [{ stat: 'def', value: 2 }, { stat: 'stamina', value: 5 }],
  },
  {
    id: 'shield-mirror',
    name: 'Mirror Shield',
    description: 'Its surface reflects not only faces… but intentions.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/shield-mirror.png',
    baseValue: 220,
    rarity: RarityType.Legendary,
    subtype: 'shield',
    equipSlot: [EquipSlot.Weapon2],
    effects: [{ stat: 'def', value: 4 }, { stat: 'reflect', value: 1 }],
  },
  {
    id: 'outfit-common',
    name: 'Tunic',
    description: 'A common everyday tunic.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/outfit-travel.png',
    baseValue: 20,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Normal
  },
  {
    id: 'outfit-travel',
    name: 'Traveler\'s outfit',
    description: 'Simple yet comfortable, this outfit can last for years.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/outfit-travel.png',
    baseValue: 60,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Normal
  },
  {
    id: 'outfit-magician',
    name: 'Wizard Robe',
    description: 'Long robe and hood, nothing like it to keep your precious ingredients and parchments safe.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/outfit-magician.png',
    baseValue: 100,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Rare
  },
  {
    id: 'outfit-priest',
    name: 'Priest Robe',
    description: 'A priest\'s robe like those seen in churches. Let\'s pray that it brings you luck.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/outfit-priest.png',
    baseValue: 100,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Normal
  },
  {
    id: 'shield-spirit',
    name: 'Spirit Shield',
    description: 'A shield of spirits, certainly linked to an element, but we still need to understand what is written there...',
    type: ItemType.Armor,
    icon: 'assets/items/armors/shield-spirit.png',
    baseValue: 250,
    equipSlot: [EquipSlot.Weapon2],
    rarity: RarityType.Rare
  },
  {
    id: 'shield-iron',
    name: 'Iron Shield',
    description: 'An iron shield, incredibly strong. With this in your hands, no one can touch you!',
    type: ItemType.Armor,
    icon: 'assets/items/armors/shield-epic.png',
    baseValue: 500,
    equipSlot: [EquipSlot.Weapon2],
    rarity: RarityType.Normal
  },
  {
    id: 'shield-long',
    name: 'Long Shield',
    description: 'A long, somewhat bulky shield. However, it is very effective against archers or anything else that comes your way.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/shield-epic.png',
    baseValue: 500,
    equipSlot: [EquipSlot.Weapon2],
    rarity: RarityType.Rare
  },
  {
    id: 'shield-runic',
    name: 'Runic Shield',
    description: 'The decorations engraved on this shield are simply magnificent and incredibly precise.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/shield-runic.png',
    baseValue: 500,
    equipSlot: [EquipSlot.Weapon2],
    rarity: RarityType.Epic
  },
  {
    id: 'shield-small',
    name: 'Small Shield',
    description: 'A small, round shield, light and handy. It can still last for years if taken care of.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/shield-small.png',
    baseValue: 90,
    equipSlot: [EquipSlot.Weapon2],
    rarity: RarityType.Normal
  },
  // CONSUMABLES
  {
    id: 'ammo-arrows',
    name: 'Arrows',
    description: 'Having a bow is good! With arrows it\'s even better.',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/ammo-arrows.png',
    stackable: true,
    baseValue: 2,
    rarity: RarityType.Normal
  },
  {
    id: 'ammo-bolts',
    name: 'Bolts',
    description: 'These crossbow bolts whistle when fired.',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/ammo-bolts.png',
    stackable: true,
    baseValue: 2,
    rarity: RarityType.Normal
  },
  {
    id: 'gold',
    name: 'Gold',
    description: 'Gold remains the master of all. And the more you have, the more you want!',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/gold.png',
    stackable: true,
    baseValue: 1,
    rarity: RarityType.Normal
  },
  {
    id: 'potion-heal-small',
    name: 'Minor Healing Potion',
    description: 'A reddish liquid that heals small wounds (+10 HP)',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/potion-heal-small.png',
    stackable: true,
    baseValue: 20,
    effects: [{stat: 'hp', value: 10}],
    rarity: RarityType.Normal
  },
  {
    id: 'potion-mana-small',
    name: 'Minor Mana Potion',
    description: 'A blue liquid that heals small wounds (+10 MP)',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/potion-mana-small.png',
    stackable: true,
    baseValue: 30,
    effects: [{stat: 'mp', value: 10}],
    rarity: RarityType.Normal
  },
  {
    id: 'trap-mechanic',
    name: 'Simple Mechanical Trap',
    description: 'A rudimentary invention, still dangerous.',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/trap-mechanic.png',
    baseValue: 20,
    effects: [{stat: 'dmg', value: 10}],
    rarity: RarityType.Normal
  },
  {
    id: 'travel-ration',
    name: 'Travel Ration',
    description: 'Not very fresh, but fills the stomach.',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/travel-ration.png',
    stackable: true,
    baseValue: 5,
    effects: [{stat: 'hp', value: 5}],
    rarity: RarityType.Normal
  },
  // RESOURCES
  {
    id: 'bones',
    name: 'Bones',
    description: 'A pile of bones... of perhaps several creatures.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/bones.png',
    stackable: true,
    baseValue: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'coal',
    name: 'Coal',
    description: 'Coal... your hands are all black now!',
    type: ItemType.Resource,
    icon: 'assets/items/resources/coal.png',
    stackable: true,
    baseValue: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'fibers',
    name: 'Fibers',
    description: 'You might not be able to make a rope out of it, but it can still be useful.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/fibers.png',
    stackable: true,
    baseValue: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'herbs',
    name: 'Compound Herbs',
    description: 'Different dried plants with diverse and varied capacities.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/herbs.png',
    stackable: true,
    baseValue: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'iron',
    name: 'Iron',
    description: 'Iron is heavy, but if you melt it down, you can make something solid out of it.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/iron.png',
    stackable: true,
    baseValue: 15,
    rarity: RarityType.Normal
  },
  {
    id: 'leather',
    name: 'Leather',
    description: 'Leather! We need to tan it, wash it, and see what we can create with it?',
    type: ItemType.Resource,
    icon: 'assets/items/resources/leather.png',
    stackable: true,
    baseValue: 15,
    rarity: RarityType.Normal
  },
  {
    id: 'oil',
    name: 'Oil',
    description: 'Oil can be used for so many things. It\'s best to keep it somewhere.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/leather.png',
    stackable: true,
    baseValue: 15,
    rarity: RarityType.Normal
  },
  {
    id: 'sand',
    name: 'Sand',
    description: 'The problem with sand is that it gets everywhere. But hey, there\'s nothing stopping you from keeping a handful.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/sand.png',
    stackable: true,
    baseValue: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'stone',
    name: 'Stones',
    description: 'Stones, stones, they weigh their weight after a while...',
    type: ItemType.Resource,
    icon: 'assets/items/resources/stone.png',
    stackable: true,
    baseValue: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'water',
    name: 'Water',
    description: 'Not sure if we can drink this water, but it will be useful anyway.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/water.png',
    stackable: true,
    baseValue: 5,
    rarity: RarityType.Normal
  },
  {
    id: 'wood',
    name: 'Wood',
    description: 'Wood is an essential resource, you must always have some in stock.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/wood.png',
    stackable: true,
    baseValue: 10,
    rarity: RarityType.Normal
  },
  // UTILITY
  {
    id: 'key-iron',
    name: 'Iron Key',
    description: 'A simple iron key, which must certainly open something... but what?',
    type: ItemType.Utility,
    icon: 'assets/items/utility/key-iron.png',
    baseValue: 10,
    effects: [{stat: 'open', value: 1}],
    rarity: RarityType.Normal
  },
  {
    id: 'scroll-fading',
    name: 'Scroll of Fading Light',
    description: 'Once opened, the letters vanish — but something inside you changes.',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/scroll-fading.png',
    baseValue: 90,
    rarity: RarityType.Rare,
    subtype: 'potion',
    stackable: false,
    effects: [{ stat: 'mp', value: 10 }, { stat: 'xp', value: 25 }],
  },
  {
    id: 'tools',
    name: 'tool Set',
    description: 'You should always have some tools on hand. Even in cell, the\'re useful.',
    type: ItemType.Utility,
    icon: 'assets/items/utility/tools.png',
    effects: [{stat: 'tool', value: 1}],
    baseValue: 20,
    rarity: RarityType.Normal
  },
  {
    id: 'torch',
    name: 'Torch',
    description: 'Provides light in dark areas. And there are dark areas everywhere!',
    type: ItemType.Utility,
    icon: 'assets/items/utility/torch.png',
    baseValue: 5,
    effects: [{stat: 'light', value: 1}],
    rarity: RarityType.Normal
  },
  // WEAPON MELEE
  {
    id: 'axe-wanderer',
    name: 'Axe of the Wanderer',
    description: 'Its edge bears runes of distant tribes — it hums softly when swung.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/axe-wanderer.png',
    baseValue: 160,
    rarity: RarityType.Rare,
    subtype: 'axe',
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    effects: [{ stat: 'atk', value: 6 }],
  },
  {
    id: 'axe',
    name: 'Axe',
    description: 'A good axe can always cut something. A discussion or a head.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/axe.png',
    baseValue: 50,
    subtype: 'axe',
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    effects: [{stat: 'atk', value: 5}],
    rarity: RarityType.Normal
  },
  {
    id: 'club',
    name: 'Club',
    description: 'An ordinary club. Well, it\'s made for hitting, quite simply.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/club.png',
    baseValue: 30,
    effects: [{stat: 'atk', value: 3}],
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Rare
  },
  {
    id: 'dagger-ceremonial',
    name: 'Ceremonial Dagger',
    description: 'This ceremonial dagger is way too clean. It\'s suspicious.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/dagger-ceremonial.png',
    baseValue: 60,
    effects: [{stat: 'atk', value: 8}],
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Rare
  },
  {
    id: 'dagger-damaged',
    name: 'Damaged Dagger',
    description: 'An old, dented dagger, but still sharp enough.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/dagger-damaged.png',
    baseValue: 10,
    effects: [{stat: 'atk', value: 1}],
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Normal
  },
  {
    id: 'dagger-epic',
    name: 'Black Dagger',
    description: 'The very presence of this dagger is enough to frighten. In the dark, it would only be seen too late.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/dagger-epic.png',
    baseValue: 300,
    effects: [{stat: 'atk', value: 10}],
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Epic
  },
  {
    id: 'hammer',
    name: 'Hammer',
    description: 'A big, heavy hammer. As long as you don\'t hit your fingers with it, everything\'s fine.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/hammer.png',
    baseValue: 300,
    effects: [{stat: 'atk', value: 8}],
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    twoHanded: true,
    rarity: RarityType.Normal
  },
  {
    id: 'hammer-epic',
    name: 'Sacred Hammer',
    description: 'This hammer looks so imposing and yet it\'s so light. You just have to let yourself be guided.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/hammer-epic.png',
    baseValue: 500,
    effects: [{stat: 'atk', value: 15}],
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    twoHanded: true,
    rarity: RarityType.Epic
  },
  {
    id: 'hammer-soul',
    name: 'Smith’s Soul Hammer',
    description: 'It vibrates faintly, as if remembering the blows that forged it.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/hammer-soul.png',
    baseValue: 190,
    rarity: RarityType.Rare,
    subtype: 'hammer',
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    twoHanded: true,
    effects: [{ stat: 'atk', value: 10 }, { stat: 'tool', value: 1 }],
  },
  {
    id: 'sword-long',
    name: 'Long Sword',
    description: 'This sword requires some training. But once mastered, it wreaks havoc.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/sword-long.png',
    baseValue: 70,
    effects: [{stat: 'atk', value: 6}],
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    rarity: RarityType.Normal
  },
  {
    id: 'sword-short',
    name: 'Short Sword',
    description: 'A short sword at your side can always be useful.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/sword-short.png',
    baseValue: 50,
    effects: [{stat: 'atk', value: 3}],
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    rarity: RarityType.Normal
  },
  {
    id: 'sword-embers',
    name: 'Sword of Embers',
    description: 'A faint orange glow dances along the blade — warm to the touch.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/sword-embers.png',
    baseValue: 180,
    rarity: RarityType.Rare,
    subtype: 'sword',
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    effects: [{ stat: 'atk', value: 7 }, { stat: 'burn', value: 1 }],
  },
  {
    id: 'saber',
    name: 'Saber',
    description: 'This is a very sharp saber, we will have to test it to verify that.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/saber.png',
    baseValue: 40,
    effects: [{ stat: 'atk', value: 3 }],
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    rarity: RarityType.Normal
  },
  {
    id: 'spear',
    name: 'Spear',
    description: 'It\'s always a pleasure to be able to impale an enemy. It\'s messy, sure, but enjoyable.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/spear.png',
    baseValue: 70,
    effects: [{ stat: 'atk', value: 7 }],
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    twoHanded: true,
    rarity: RarityType.Normal
  },
  {
    id: 'staff-fighting',
    name: 'Fight Staff',
    description: 'Those who know how to handle batons can knock you out faster than you think.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/staff-fighting.png',
    baseValue: 50,
    effects: [{ stat: 'atk', value: 5 }],
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    twoHanded: true,
    rarity: RarityType.Normal
  },
  {
    id: 'sword-epic',
    name: 'Rune Sword',
    description: 'Once the magic is released from this sword, the fight is no longer the same.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/sword-epic.png',
    baseValue: 50,
    effects: [{ stat: 'atk', value: 15 }],
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    rarity: RarityType.Epic
  },
  {
    id: 'wrench',
    name: 'Wrench',
    description: 'The advantage of these keys is that they are just as useful for beating monsters as they are for repairing things.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/sword-epic.png',
    baseValue: 50,
    effects: [{ stat: 'atk', value: 15 }, { stat: 'tool', value: 2}],
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    rarity: RarityType.Normal
  },
  // WEAPON RANGE
  {
    id: 'bow-short',
    name: 'Short Bow',
    description: 'A short bow. Simple but effective for those who know how to handle it.',
    type: ItemType.WeaponRange,
    icon: 'assets/items/weapons-range/bow-short.png',
    baseValue: 50,
    subtype: 'bow',
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    rarity: RarityType.Normal
  },
  {
    id: 'bow-whisper',
    name: 'Bow of Whispering Winds',
    description: 'The bowstring sings with the sound of wind when drawn.',
    type: ItemType.WeaponRange,
    icon: 'assets/items/weapons-range/bow-whisper.png',
    baseValue: 200,
    rarity: RarityType.Rare,
    subtype: 'bow',
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    twoHanded: true,
    effects: [{ stat: 'atk', value: 4 }, { stat: 'crit', value: 5 }],
  },
];
