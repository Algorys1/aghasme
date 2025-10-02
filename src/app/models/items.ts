// src/app/models/items.ts

export enum ItemType {
  Weapon = 'Weapon',
  Armor = 'Armor',
  Accessory = 'Accessory',
  Consumable = 'Consumable',
  Resource = 'Resource',
  Quest = 'Quest',
  Utility = 'Utility',
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  icon?: string;         // path to the asset
  stackable?: boolean;   // true if multiple can stack
  effect?: string;       // optional text effect (heal, +stats…)
  value?: number;        // could be attack bonus, heal amount, etc.
  equipSlot?: 'weapon' | 'armor' | 'accessory'; // optional for equipment
}

// Base items for testing
export const BASE_ITEMS: Item[] = [
  {
    id: 'rusty-sword',
    name: 'Rusty Sword',
    description: 'An old, dented sword, but still sharp enough.',
    type: ItemType.Weapon,
    icon: 'assets/items/rusty-sword.png',
    value: 2,
    equipSlot: 'weapon',
  },
  {
    id: 'hunter-bow',
    name: 'Hunter\'s Bow',
    description: 'A simple bow, often used for hunting.',
    type: ItemType.Weapon,
    icon: 'assets/items/hunter-bow.png',
    value: 1,
    equipSlot: 'weapon',
  },
  {
    id: 'leather-armor',
    name: 'Leather Armor',
    description: 'Light armor, offers minimal protection but keeps mobility.',
    type: ItemType.Armor,
    icon: 'assets/items/leather-armor.png',
    value: 2,
    equipSlot: 'armor',
  },
  {
    id: 'minor-healing-potion',
    name: 'Minor Healing Potion',
    description: 'A reddish liquid that heals small wounds.',
    type: ItemType.Consumable,
    icon: 'assets/items/potion-heal.png',
    stackable: true,
    value: 20, // heal amount
    effect: 'Heals 20 HP',
  },
  {
    id: 'stale-bread',
    name: 'Stale Bread',
    description: 'Not very fresh, but fills the stomach.',
    type: ItemType.Consumable,
    icon: 'assets/items/bread.png',
    stackable: true,
    value: 5, // heal amount
    effect: 'Restores 5 HP',
  },
  {
    id: 'orb-fragment-bestial',
    name: 'Bestial Orb Fragment',
    description: 'A glowing shard from the Bestial Orb.',
    type: ItemType.Resource,
    icon: 'assets/items/orb-fragment-bestial.png',
  },
  {
    id: 'healing-herb',
    name: 'Healing Herb',
    description: 'A plant with soothing and medicinal properties.',
    type: ItemType.Resource,
    icon: 'assets/items/herb.png',
  },
  {
    id: 'rusty-key',
    name: 'Rusty Key',
    description: 'Seems fragile, but could still open something.',
    type: ItemType.Quest,
    icon: 'assets/items/key.png',
  },
  {
    id: 'ancient-map-fragment',
    name: 'Ancient Map Fragment',
    description: 'A torn piece of an old map, with faded markings.',
    type: ItemType.Quest,
    icon: 'assets/items/map-fragment.png',
  },
  {
    id: 'torch',
    name: 'Torch',
    description: 'Provides light in dark areas.',
    type: ItemType.Utility,
    icon: 'assets/items/torch.png',
    stackable: true,
    effect: 'Lights up dark places',
  },
  {
    id: 'mechanical-trap',
    name: 'Simple Mechanical Trap',
    description: 'A rudimentary invention, still dangerous.',
    type: ItemType.Utility,
    icon: 'assets/items/trap.png',
    effect: 'Deals damage to an enemy if triggered',
  },
];
