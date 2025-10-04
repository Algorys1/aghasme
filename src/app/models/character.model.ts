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

  /** Orbes canoniques utilisés par le HUD et la logique */
  orbs: Orbs;

  skills: string[];
  inventory: string[]; // -> pourra être remplacé plus tard par un type Item[]
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
    description: 'Puissance brute et instincts primaires. Augmente la vitalité et la survie.',
  },
  elemental: {
    label: 'Elemental',
    icon: 'assets/ui/orb-elemental.png',
    description: 'Connexion aux forces de la nature et de la magie. Détermine l’énergie mystique.',
  },
  natural: {
    label: 'Natural',
    icon: 'assets/ui/orb-natural.png',
    description: 'Résilience, harmonie et croissance. Représente l’endurance et l’adaptation.',
  },
  mechanic: {
    label: 'Mechanic',
    icon: 'assets/ui/orb-mechanic.png',
    description: 'Ingénierie, technologie et invention. Confère précision et outils avancés.',
  },
};