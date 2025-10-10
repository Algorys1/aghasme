export interface EnemyData {
    name: string;
    desc: string;
    icon: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    category: 'beast' | 'monster';
  }
  
  export class Enemy {
    name?: string;
    desc?: string;
    icon?: string;
    level?: number;
    hp?: number;
    attack?: number;
    defense?: number;
    category?: 'beast' | 'monster';
  
    constructor(data: EnemyData) {
      Object.assign(this, data);
    }
  }
  