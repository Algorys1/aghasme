export type Archetype = 'anims' | 'frostfire' | 'sylvaris' | 'engineer';
export type Gender = 'male' | 'female';
export type OrbKey = 'bestial' | 'elemental' | 'natural' | 'mechanic';

export const CHARACTER_ASSETS: Record<string, Record <Archetype, string>> = {
  "male" : {
    anims: 'assets/characters/anims-male.png',
    frostfire: 'assets/characters/frostfire-male.png',
    sylvaris: 'assets/characters/sylvaris-male.png',
    engineer: 'assets/characters/engineer-male.png'
  },
  "female" :{
    anims: 'assets/characters/anims-female.png',
    frostfire: 'assets/characters/frostfire-female.png',
    sylvaris: 'assets/characters/sylvaris-female.png',
    engineer: 'assets/characters/engineer-female.png'
  }
};

export interface Orbs {
  bestial: number;
  elemental: number;
  natural: number;
  mechanic: number;
}

export interface Character {
  name: string;
  gender: Gender;
  archetype: Archetype;
  level: number;
  xp: number;

  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;

  gold: number;

  orbs: Orbs;

  skills: string[];
  inventory: string[];

  defense: number;
  attack: number;

  baseStats?: {
    attack: number;
    defense: number;
    maxHp: number;
    maxMp: number;
  };

  secondaryStats?: {
    mv: number
  }
}

export interface NewCharacterInput {
  background: any;
  name: string;
  gender: Gender;
  archetype?: Archetype;
  level?: number;
  xp?: number;

  hp?: number;
  maxHp?: number;
  mp?: number;
  maxMp?: number;

  gold?: number;

  // Orbs provided at creation (otherwise default to 0)
  orbs?: Partial<Orbs>;

  skills?: string[];
  inventory?: string[];
}

export const ORB_DEFINITIONS: Record<OrbKey, { label: string; icon: string; description: string }> = {
  bestial: {
    label: 'Bestial',
    icon: 'assets/characters/orbs/orb-bestial.png',
    description: 'Embodies raw power and primal strength. Enhances your physical attacks and combat prowess.',
  },
  elemental: {
    label: 'Elemental',
    icon: 'assets/characters/orbs/orb-elemental.png',
    description: 'Channel the power of the elements. Improves your mystical energy and magical offense.',
  },
  natural: {
    label: 'Natural',
    icon: 'assets/characters/orbs/orb-natural.png',
    description: 'Represents endurance and balance. Increases vitality, resilience, and connection to nature.',
  },
  mechanic: {
    label: 'Mechanic',
    icon: 'assets/characters/orbs/orb-mechanic.png',
    description: 'Precision and ingenuity. Strengthens your defense and mastery of crafted tools and armor.',
  },
};

export const ARCHETYPE_ORB_MODIFIERS: Record<Archetype, Partial<Orbs>> = {
  anims:      { bestial: +1, elemental: -1 },
  frostfire:  { elemental: +1, mechanic: -1 },
  sylvaris:   { natural: +1, bestial: -1 },
  engineer:   { mechanic: +1, natural: -1 },
};

export function getOrbModifier(orbValue: number): number {
  if (orbValue <= 6) return -2;
  if (orbValue <= 9) return -1;
  if (orbValue <= 12) return 0;
  if (orbValue <= 15) return +1;
  if (orbValue <= 19) return +2;
  return +3;
}
