export type Archetype = 'beast' | 'elemental' | 'ant' | 'engineer';

export const CHARACTER_ASSETS: Record<Archetype, string> = {
  beast: 'assets/characters/beast.png',
  elemental: 'assets/characters/elemental.png',
  ant: 'assets/characters/ant.png',
  engineer: 'assets/characters/engineer.png'
};

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

  /** Orbes fournis à la création (sinon par défaut 0) */
  orbs?: Partial<Orbs>;

  skills?: string[];
  inventory?: string[];
}

export const ORB_DEFINITIONS: Record<OrbKey, { label: string; icon: string; description: string }> = {
  bestial: {
    label: 'Bestial',
    icon: 'assets/ui/orb-bestial.png',
    description: 'Raw power and primal instincts. Increases vitality and your chances of survival.',
  },
  elemental: {
    label: 'Elemental',
    icon: 'assets/ui/orb-elemental.png',
    description: 'Connection to the elements that make up the world. Determines mystical energy.',
  },
  natural: {
    label: 'Natural',
    icon: 'assets/ui/orb-natural.png',
    description: 'Resilience, harmony, and growth. Represents endurance, adaptation, and your connection to nature.',
  },
  mechanic: {
    label: 'Mechanic',
    icon: 'assets/ui/orb-mechanic.png',
    description: 'Engineering, technology, and invention. Provides precision and mastery of advanced tools.',
  },
};

export const ARCHETYPE_ORB_MODIFIERS: Record<Archetype, Partial<Orbs>> = {
  beast:      { bestial: +1, elemental: -1 },
  elemental:  { elemental: +1, mechanic: -1 },
  ant:        { natural: +1, bestial: -1 },
  engineer:   { mechanic: +1, natural: -1 },
};