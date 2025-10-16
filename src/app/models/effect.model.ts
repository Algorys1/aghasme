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
  /** Target stat for effect (eg: "attack", "hp", "defense") */
  stat: StatKey;

  /** Value of modifier (-/+) */
  value: number;

  /** Type of effetc : "flat" (direct add) ou "percent" (multiplier) */
  type?: 'flat' | 'percent';

  /** Time in tour / seconds - optional, for temporaryr buffs/debuffs */
  duration?: number;

  /** Origin of effect (weapon, skill, ennemy, etc.) */
  source?: string;
}
