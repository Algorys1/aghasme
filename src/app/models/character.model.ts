// src/app/models/character.model.ts
export type Archetype = 'beast' | 'elemental' | 'ant' | 'engineer';

export interface Character {
  name: string;
  archetype: Archetype;
  level: number;
  xp: number;
  hp: number;
  strength: number;
  essence: number;
  mechanic: number;
  spirit: number;
  skills: string[];
  gold: number;
  inventory: string[];
}

export interface NewCharacterInput {
  name: string;
  archetype?: Archetype;
  level?: number;
  xp?: number;
  hp?: number;
  strength?: number;
  essence?: number;
  mechanic?: number;
  spirit?: number;
  skills?: string[];
  gold?: number;
  inventory?: string[];
}
