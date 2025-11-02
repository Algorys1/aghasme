export type StatKey =
  | 'action'
  | 'hp'
  | 'maxHp'
  | 'mp'
  | 'maxMp'
  | 'attack'
  | 'critical'
  | 'damage'
  | 'defense'
  | 'mv'
  | 'flee'
  | 'burn'
  | 'fear'
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
