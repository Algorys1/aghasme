export interface EnemyData {
  name: string;
  desc: string;
  icon: string;
  category: 'beast' | 'monster';
  level: number;
  hp: number;
  attack: number;
  defense: number;
}

export class Enemy implements EnemyData {
  name: string;
  desc: string;
  icon: string;
  category: 'beast' | 'monster';
  level: number;
  hp: number;
  attack: number;
  defense: number;

  constructor(data: EnemyData) {
    this.name = data.name;
    this.desc = data.desc;
    this.icon = data.icon;
    this.category = data.category;
    this.level = data.level;
    this.hp = data.hp;
    this.attack = data.attack;
    this.defense = data.defense;
  }
}
