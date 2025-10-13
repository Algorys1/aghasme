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
  Artefact = 'Artefat'
}

export enum EquipSlot {
  Accessory1 = 'Accessory1',
  Accessory2 = 'Accessory2',
  Feet = 'Foot',
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
  value: number;           // base gold value... To see if we don't use "value" for the chances of finding it and if we don't calculate the price of the object via the effects and its rarity?
  icon: string;            // path to the asset
  rarity: RarityType;      // defines the rarity of an item and the chances of finding it   
  stackable?: boolean;     // true if multiple can stack
  count?: number;          // count of items
  effect?: string;         // optional text effect (heal, +stats…)
  equipSlot?: EquipSlot[]; // optional for equipment
}

// Base items for testing
export const BASE_ITEMS: Item[] = [
  // ACCESSORIES
  {
    id: 'amulet-epic',
    name: 'Epic Amulet',
    description: 'This ancient amulet has already saved several lives...',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/amulet-epic.png',
    value: 500,
    equipSlot: [EquipSlot.Accessory1],
    rarity: RarityType.Epic
  },
  {
    id: 'magic-tome',
    name: 'Magic Tome',
    description: 'A tome of magic, certainly some spells to learn in there.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/magic-tome.png',
    value: 100,
    equipSlot: [EquipSlot.Accessory1],
    rarity: RarityType.Rare
  },
  {
    id: 'magic-tome-epic',
    name: 'Epic Grimoire',
    description: 'A grimoire not to be put in everyone\'s hands. Luckily, it\'s in yours.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/magic-tome-epic.png',
    value: 500,
    equipSlot: [EquipSlot.Accessory1],
    rarity: RarityType.Epic
  },
  {
    id: 'orb-epic',
    name: 'A Mysterious Orb',
    description: 'A glowing shard from the Bestial Orb.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/orb-epic.png',
    value: 500,
    equipSlot: [EquipSlot.Accessory1],
    effect: '1:bestial',
    rarity: RarityType.Epic
  },
  {
    id: 'pendant-epic',
    name: 'A pen',
    description: 'An antique pendant... the pieces seem to want to stay together despite their condition.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/orb-epic.png',
    value: 500,
    equipSlot: [EquipSlot.Accessory1],
    effect: '1:elemental',
    rarity: RarityType.Epic
  },
  {
    id: 'ring-red',
    name: 'A Red Ring',
    description: 'A beautiful ring set with a glowing stone.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/ring-red.png',
    value: 100,
    equipSlot: [EquipSlot.Accessory1],
    rarity: RarityType.Normal
  },
  {
    id: 'ring-blue',
    name: 'A Blue Ring',
    description: 'The blue stone set in this ring gives a beautiful effect.',
    type: ItemType.Accessory,
    icon: 'assets/items/accessories/ring-blue.png',
    value: 100,
    equipSlot: [EquipSlot.Accessory1],
    rarity: RarityType.Normal
  },
  {
    id: 'tab-epic',
    name: 'Ancient Tabler',
    description: 'A tablet from ancient times. It certainly served a deity at one time...',
    type: ItemType.Accessory,
    icon: 'assets/items/weapons-melee/dagger-damaged.png',
    value: 500,
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
    value: 120,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Normal
  },
  {
    id: 'armor-iron',
    name: 'Iron Armor',
    description: 'Iron armor, heavy certainly, but perfect for protecting yourself against bad blows!',
    type: ItemType.Armor,
    icon: 'assets/items/armors/armor-iron.png',
    value: 250,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Normal
  },
  {
    id: 'boots-travel',
    name: 'Travel Boots',
    description: 'Good walking boots can make all the difference.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/boots-travel.png',
    value: 40,
    equipSlot: [EquipSlot.Feet],
    rarity: RarityType.Normal
  },
  {
    id: 'gloves-leather',
    name: 'Leather Gloves',
    description: 'Well-made leather gloves. A little too big, but they\'re still comfortable.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/gloves-leather.png',
    value: 60,
    equipSlot: [EquipSlot.Hand1],
    rarity: RarityType.Normal
  },
  {
    id: 'helmet-epic',
    name: 'Dragon Helmet',
    description: 'A dragon helmet, straight from the ancient forges. It\'s an honor to be able to wear it.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/helmet-epic.png',
    value: 500,
    equipSlot: [EquipSlot.Head],
    rarity: RarityType.Epic
  },
  {
    id: 'helmet-leather',
    name: 'Leather Helmet',
    description: 'A finely fitted leather helmet. It doesn\'t obstruct your vision and provides minimal protection.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/helmet-leather.png',
    value: 70,
    equipSlot: [EquipSlot.Head],
    rarity: RarityType.Normal
  },
  {
    id: 'hat-magician',
    name: 'Wizard Hat',
    description: 'A crooked hat, allowing you to avoid being dazzled by the sun when casting a spell.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/hat-magician.png',
    value: 60,
    equipSlot: [EquipSlot.Head],
    rarity: RarityType.Normal
  },
  {
    id: 'hat-travel',
    name: 'Traveler\'s Hat',
    description: 'A simple traveler\'s hat. At least your head won\'t get cold!',
    type: ItemType.Armor,
    icon: 'assets/items/armors/hat-travel.png',
    value: 30,
    equipSlot: [EquipSlot.Head],
    rarity: RarityType.Normal
  },
  {
    id: 'outfit-common',
    name: 'Tunic',
    description: 'A common everyday tunic.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/outfit-travel.png',
    value: 20,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Normal
  },
  {
    id: 'outfit-travel',
    name: 'Traveler\'s outfit',
    description: 'Simple yet comfortable, this outfit can last for years.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/outfit-travel.png',
    value: 60,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Normal
  },
  {
    id: 'outfit-magician',
    name: 'Wizard Robe',
    description: 'Long robe and hood, nothing like it to keep your precious ingredients and parchments safe.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/outfit-magician.png',
    value: 100,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Rare
  },
  {
    id: 'outfit-priest',
    name: 'Priest Robe',
    description: 'A priest\'s robe like those seen in churches. Let\'s pray that it brings you luck.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/outfit-priest.png',
    value: 100,
    equipSlot: [EquipSlot.Torso],
    rarity: RarityType.Normal
  },
  {
    id: 'shield-spirit',
    name: 'Spirit Shield',
    description: 'A shield of spirits, certainly linked to an element, but we still need to understand what is written there...',
    type: ItemType.Armor,
    icon: 'assets/items/armors/shield-spirit.png',
    value: 250,
    equipSlot: [EquipSlot.Weapon2],
    rarity: RarityType.Rare
  },
  {
    id: 'shield-iron',
    name: 'Iron Shield',
    description: 'An iron shield, incredibly strong. With this in your hands, no one can touch you!',
    type: ItemType.Armor,
    icon: 'assets/items/armors/shield-epic.png',
    value: 500,
    equipSlot: [EquipSlot.Weapon2],
    rarity: RarityType.Normal
  },
  {
    id: 'shield-long',
    name: 'Long Shield',
    description: 'A long, somewhat bulky shield. However, it is very effective against archers or anything else that comes your way.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/shield-epic.png',
    value: 500,
    equipSlot: [EquipSlot.Weapon2],
    rarity: RarityType.Rare
  },
  {
    id: 'shield-runic',
    name: 'Runic Shield',
    description: 'The decorations engraved on this shield are simply magnificent and incredibly precise.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/shield-runic.png',
    value: 500,
    equipSlot: [EquipSlot.Weapon2],
    rarity: RarityType.Epic
  },
  {
    id: 'shield-small',
    name: 'Small Shield',
    description: 'A small, round shield, light and handy. It can still last for years if taken care of.',
    type: ItemType.Armor,
    icon: 'assets/items/armors/shield-small.png',
    value: 90,
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
    value: 2,
    rarity: RarityType.Normal
  },
  {
    id: 'ammo-bolts',
    name: 'Bolts',
    description: 'These crossbow bolts whistle when fired.',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/ammo-bolts.png',
    stackable: true,
    value: 2,
    rarity: RarityType.Normal
  },
  {
    id: 'gold',
    name: 'Gold',
    description: 'Gold remains the master of all. And the more you have, the more you want!',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/gold.png',
    stackable: true,
    value: 1,
    rarity: RarityType.Normal
  },
  {
    id: 'potion-heal-small',
    name: 'Minor Healing Potion',
    description: 'A reddish liquid that heals small wounds (+10 HP)',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/potion-heal-small.png',
    stackable: true,
    value: 20,
    effect: 'hp:10',
    rarity: RarityType.Normal
  },
  {
    id: 'potion-mana-small',
    name: 'Minor Mana Potion',
    description: 'A blue liquid that heals small wounds (+10 MP)',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/potion-mana-small.png',
    stackable: true,
    value: 30,
    effect: 'mp:10',
    rarity: RarityType.Normal
  },
  {
    id: 'trap-mechanic',
    name: 'Simple Mechanical Trap',
    description: 'A rudimentary invention, still dangerous.',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/trap-mechanic.png',
    value: 20,
    effect: 'dmg:10',
    rarity: RarityType.Normal
  },
  {
    id: 'travel-ration',
    name: 'Travel Ration',
    description: 'Not very fresh, but fills the stomach.',
    type: ItemType.Consumable,
    icon: 'assets/items/consumables/travel-ration.png',
    stackable: true,
    value: 5,
    effect: 'hp:5',
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
    value: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'coal',
    name: 'Coal',
    description: 'Coal... your hands are all black now!',
    type: ItemType.Resource,
    icon: 'assets/items/resources/coal.png',
    stackable: true,
    value: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'fibers',
    name: 'Fibers',
    description: 'You might not be able to make a rope out of it, but it can still be useful.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/fibers.png',
    stackable: true,
    value: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'herbs',
    name: 'Compound Herbs',
    description: 'Different dried plants with diverse and varied capacities.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/herbs.png',
    stackable: true,
    value: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'iron',
    name: 'Iron',
    description: 'Iron is heavy, but if you melt it down, you can make something solid out of it.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/iron.png',
    stackable: true,
    value: 15,
    rarity: RarityType.Normal
  },
  {
    id: 'leather',
    name: 'Leather',
    description: 'Leather! We need to tan it, wash it, and see what we can create with it?',
    type: ItemType.Resource,
    icon: 'assets/items/resources/leather.png',
    stackable: true,
    value: 15,
    rarity: RarityType.Normal
  },
  {
    id: 'oil',
    name: 'Oil',
    description: 'Oil can be used for so many things. It\'s best to keep it somewhere.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/leather.png',
    stackable: true,
    value: 15,
    rarity: RarityType.Normal
  },
  {
    id: 'sand',
    name: 'Sand',
    description: 'The problem with sand is that it gets everywhere. But hey, there\'s nothing stopping you from keeping a handful.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/sand.png',
    stackable: true,
    value: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'stone',
    name: 'Stones',
    description: 'Stones, stones, they weigh their weight after a while...',
    type: ItemType.Resource,
    icon: 'assets/items/resources/stone.png',
    stackable: true,
    value: 10,
    rarity: RarityType.Normal
  },
  {
    id: 'water',
    name: 'Water',
    description: 'Not sure if we can drink this water, but it will be useful anyway.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/water.png',
    stackable: true,
    value: 5,
    rarity: RarityType.Normal
  },
  {
    id: 'wood',
    name: 'Wood',
    description: 'Wood is an essential resource, you must always have some in stock.',
    type: ItemType.Resource,
    icon: 'assets/items/resources/wood.png',
    stackable: true,
    value: 10,
    rarity: RarityType.Normal
  },
  // UTILITY
  {
    id: 'key-iron',
    name: 'Iron Key',
    description: 'A simple iron key, which must certainly open something... but what?',
    type: ItemType.Utility,
    icon: 'assets/items/utility/key-iron.png',
    value: 10,
    effect: 'open:simple',
    rarity: RarityType.Normal
  },
  {
    id: 'tools',
    name: 'tool Set',
    description: 'You should always have some tools on hand. Even in cell, the\'re useful.',
    type: ItemType.Utility,
    icon: 'assets/items/utility/tools.png',
    effect: 'tool',
    value: 20,
    rarity: RarityType.Normal
  },
  {
    id: 'torch',
    name: 'Torch',
    description: 'Provides light in dark areas. And there are dark areas everywhere!',
    type: ItemType.Utility,
    icon: 'assets/items/utility/torch.png',
    value: 5,
    effect: 'light',
    rarity: RarityType.Normal
  },
  // WEAPON MELEE
  {
    id: 'axe',
    name: 'Axe',
    description: 'A good axe can always cut something. A discussion or a head.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/axe.png',
    value: 50,
    equipSlot: [EquipSlot.Weapon1],
    effect: 'atk:5',
    rarity: RarityType.Normal
  },
  {
    id: 'club',
    name: 'Club',
    description: 'An ordinary club. Well, it\'s made for hitting, quite simply.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/club.png',
    value: 30,
    effect: 'atk:10',
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Rare
  },
  {
    id: 'dagger-ceremonial',
    name: 'Ceremonial Dagger',
    description: 'This ceremonial dagger is way too clean. It\'s suspicious.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/dagger-ceremonial.png',
    value: 60,
    effect: 'atk:10',
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Rare
  },
  {
    id: 'dagger-damaged',
    name: 'Damaged Dagger',
    description: 'An old, dented dagger, but still sharp enough.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/dagger-damaged.png',
    value: 10,
    effect: 'atk:1',
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Normal
  },
  {
    id: 'dagger-epic',
    name: 'Black Dagger',
    description: 'The very presence of this dagger is enough to frighten. In the dark, it would only be seen too late.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/dagger-epic.png',
    value: 300,
    effect: 'atk:10',
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Epic
  },
  {
    id: 'hammer',
    name: 'Hammer',
    description: 'A big, heavy hammer. As long as you don\'t hit your fingers with it, everything\'s fine.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/hammer.png',
    value: 300,
    effect: 'atk:1',
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Normal
  },
  {
    id: 'hammer-epic',
    name: 'Sacred Hammer',
    description: 'This hammer looks so imposing and yet it\'s so light. You just have to let yourself be guided.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/hammer-epic.png',
    value: 300,
    effect: 'atk:1',
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Epic
  },
  {
    id: 'sword-long',
    name: 'Long Sword',
    description: 'This sword requires some training. But once mastered, it wreaks havoc.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/sword-long.png',
    value: 70,
    effect: 'atk:5',
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Normal
  },
  {
    id: 'sword-short',
    name: 'Short Sword',
    description: 'A short sword at your side can always be useful.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/sword-short.png',
    value: 50,
    effect: 'atk:3',
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Normal
  },
  {
    id: 'saber',
    name: 'Saber',
    description: 'This is a very sharp saber, we will have to test it to verify that.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/saber.png',
    value: 40,
    effect: 'atk:3',
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Normal
  },
  {
    id: 'spear',
    name: 'Spear',
    description: 'It\'s always a pleasure to be able to impale an enemy. It\'s messy, sure, but enjoyable.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/spear.png',
    value: 70,
    effect: 'atk:7',
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    rarity: RarityType.Normal
  },
  {
    id: 'staff-fighting',
    name: 'Fight Staff',
    description: 'Those who know how to handle batons can knock you out faster than you think.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/staff-fighting.png',
    value: 50,
    effect: 'atk:5',
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    rarity: RarityType.Normal
  },
  {
    id: 'sword-epic',
    name: 'Rune Sword',
    description: 'Once the magic is released from this sword, the fight is no longer the same.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/sword-epic.png',
    value: 50,
    effect: 'atk:15',
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Epic
  },
  {
    id: 'wrench',
    name: 'Wrench',
    description: 'The advantage of these keys is that they are just as useful for beating monsters as they are for repairing things.',
    type: ItemType.WeaponMelee,
    icon: 'assets/items/weapons-melee/sword-epic.png',
    value: 50,
    effect: 'atk:15|tool',
    equipSlot: [EquipSlot.Weapon1],
    rarity: RarityType.Normal
  },
  // WEAPON RANGE
  {
    id: 'bow-short',
    name: 'Short Bow',
    description: 'A short bow. Simple but effective for those who know how to handle it.',
    type: ItemType.WeaponRange,
    icon: 'assets/items/weapons-range/bow-short.png',
    value: 50,
    equipSlot: [EquipSlot.Weapon1, EquipSlot.Weapon2],
    rarity: RarityType.Normal
  },
  
];
