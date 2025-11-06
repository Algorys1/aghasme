// CORE VITALS & AFFINITIES
export const VitalsStats = [
  'hp',
  'maxHp',
  'mp',
  'maxMp',
  'action',
  'orbs.bestial',
  'orbs.elemental',
  'orbs.natural',
  'orbs.mechanic',
  'resist.fire',
  'resist.electricity',
  'resist.ice',
  'resist.poison',
] as const;

// COMBAT
export const CombatStats = [
  'attack',
  'damage',
  'critical',
  'defense',
  'speed',
  'fright',
] as const;

// EXPLORATION
export const ExplorationStats = [
  'mv',
  'perception',
  'light',
  'open',
  'lockpick',
  'craft',
  'mine',
  'woodcut',
  'herbalism',
  'flee',
  'fear',
] as const;

// RESOURCES
export const ResourceStats = [
  'xp',
  'gold',
  'loot',
] as const;

// STATUS EFFECTS
export const StatusStats = [
  'burn',
  'frozen',
  'electrified',
  'poison',
  'reflect',
  'regen.mp',
  'regen.hp',
] as const;

export const AllStatKeys = [
  ...VitalsStats,
  ...CombatStats,
  ...ExplorationStats,
  ...ResourceStats,
  ...StatusStats,
] as const;

export type StatKey = typeof AllStatKeys[number];

export interface Effect {
  stat: StatKey;
  value: number;
  type?: 'flat' | 'percent';
  duration?: number;
  source?: string;
}
