// src/app/models/character.model.ts
export type Archetype = 'beast' | 'elemental' | 'ant' | 'engineer';

export type OrbKey = 'bestial' | 'elemental' | 'natural' | 'mechanic';

export interface Orbs {
  bestial: number;
  elemental: number;
  natural: number;
  mechanic: number;
}

export interface Character {
  name: string;
  archetype: Archetype;
  level: number;
  xp: number;

  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;

  gold: number;

  /** Orbes canoniques utilisés par le HUD */
  orbs: Orbs;

  /** Champs legacy conservés pour compat (saves anciens) */
  strength?: number;
  essence?: number;
  mechanic?: number;
  spirit?: number;

  skills: string[];
  inventory: string[];
}

export interface NewCharacterInput {
  name: string;
  archetype?: Archetype;
  level?: number;
  xp?: number;

  hp?: number;
  maxHp?: number;
  mp?: number;
  maxMp?: number;

  gold?: number;

  orbs?: Partial<Orbs>;

  /** Legacy (pour migration éventuelle) */
  strength?: number;
  essence?: number;
  mechanic?: number;
  spirit?: number;

  skills?: string[];
  inventory?: string[];
}
