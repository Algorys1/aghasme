import { Effect } from "../../items/models/effect.model";

export type EnnemySubCategory =
  'undead' | 'human' | 'goblin' | 'dragon' | 'elemental' | 'flying' | 'vermin' |
  'mechanical' | 'aquatic' | 'mineral' | 'fire' | 'lightning' | 'plant';

export interface EnemyData {
  name: string;
  desc: string;
  icon: string;
  level: number;
  hp: number;
  mp: number;
  attack: number;
  defense: number;
  effects?: Effect[];
}

export class Enemy implements EnemyData {
  name: string;
  desc: string;
  icon: string;
  level: number;
  hp: number;
  mp: number;
  attack: number;
  defense: number;
  effects?: Effect[];

  constructor(data: EnemyData) {
    this.name = data.name;
    this.desc = data.desc;
    this.icon = data.icon;
    this.level = data.level;
    this.hp = data.hp;
    this.mp = data.mp;
    this.attack = data.attack;
    this.defense = data.defense;
    this.effects = data.effects;
  }
}
