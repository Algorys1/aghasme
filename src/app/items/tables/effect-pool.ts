import { StatKey } from '../models/effect.model';
import { RarityType } from '../models/items.model';

export interface EffectTemplate {
  stat: StatKey;
  base: number;
  scale?: number;
  type?: 'flat' | 'percent';
}

export const EFFECT_POOL: Record<string, EffectTemplate[]> = {
  offensive: [
    { stat: 'attack', base: 1 },
    { stat: 'damage', base: 3 },
    { stat: 'critical', base: 5, type: 'percent' },
  ],
  defensive: [
    { stat: 'defense', base: 1 },
    { stat: 'resist', base: 3 },
    { stat: 'reflect', base: 5, type: 'percent' },
  ],
  mystic: [
    { stat: 'maxMp', base: 5 },
    { stat: 'xp', base: 5 },
    { stat: 'light', base: 1 },
  ],
  utility: [
    { stat: 'speed', base: 1 },
    { stat: 'flee', base: 1 },
    { stat: 'tool', base: 1 },
  ],
};

export const RARITY_MULTIPLIERS: Record<RarityType, number> = {
  [RarityType.Normal]: 1.0,
  [RarityType.Rare]: 1.5,
  [RarityType.Epic]: 2.5,
  [RarityType.Legendary]: 4.0,
  [RarityType.Artefact]: 6.0,
};

export const RARITY_EFFECT_COUNT: Record<RarityType, number> = {
  [RarityType.Normal]: 0,
  [RarityType.Rare]: 1,
  [RarityType.Epic]: 2,
  [RarityType.Legendary]: 4,
  [RarityType.Artefact]: 5,
};
