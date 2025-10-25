export type StatKey =
  | 'hp'
  | 'maxHp'
  | 'mp'
  | 'maxMp'
  | 'attack'
  | 'critical'
  | 'damage'
  | 'defense'
  | 'flee'
  | 'burn'
  | 'reflect'
  | 'orbs.bestial'
  | 'orbs.elemental'
  | 'orbs.natural'
  | 'perception'
  | 'light'
  | 'open'
  | 'tool'
  | 'xp'
  | 'gold'
  | 'speed'
  | 'resist';

export interface Effect {
  stat: StatKey;
  value: number;
  type?: 'flat' | 'percent';
  duration?: number;
  source?: string;
}
