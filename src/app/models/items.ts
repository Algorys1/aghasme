import { Effect } from "./effect.model";

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
  Head = 'Head',
  Accessory2 = 'Accessory2',
  Hand1 = 'Hand1',
  Torso = 'Torso',
  Hand2 = 'Hand2',
  Weapon1 = 'Weapon1',
  Feet = 'Feet',
  Weapon2 = 'Weapon2'
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  icon: string;
  rarity: RarityType;

  baseValue: number;
  computedValue?: number;
  stackable?: boolean;
  subtype?: ItemSubtype;
  equipSlot?: EquipSlot[];
  twoHanded?: boolean;
  effects: Effect[];
  instanceId?: string,
}

export interface ItemEffect {
  stat: string;     // ex: "atk", "hp", "mp", "def", "tool", "light"
  value: number;    // ex: +10 ou -5
  type?: 'flat' | 'percent';
}

export type ItemSubtype =
  | 'sword' | 'axe' | 'dagger' | 'hammer' | 'staff' | 'spear' | 'bow'
  | 'helmet' | 'robe' | 'armor' | 'boots' | 'shield' | 'ring' | 'amulet'
  | 'book' | 'key' | 'torch' | 'resource' | 'potion' | 'food'
  | 'generic';

export interface HarvestResource {
  id: string;
  type: string;
  orb: 'natural' | 'bestial' | 'mechanic' | 'elemental';
  difficulty: number;
  xpReward: number;
  exhausted?: boolean;
  remainingSteps?: number;
  item?: Item;
}
