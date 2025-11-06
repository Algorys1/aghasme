import { StatKey, VitalsStats } from '../../character/models/effect.model';
import { RarityType } from '../models/items.model';

export interface EffectTemplate {
  stat: StatKey;
  base: number;
  scale?: number;
  type?: 'flat' | 'percent';
}

export const EFFECT_POOL: Record<string, EffectTemplate[]> = {
  vitals: [
    { stat: 'hp', base: 5 },
    { stat: 'maxHp', base: 5 },
    { stat: 'mp', base: 5 },
    { stat: 'maxMp', base: 1 },
    { stat: 'action', base: 1 },
    { stat: 'orbs.bestial', base: 1 },
    { stat: 'orbs.elemental', base: 1 },
    { stat: 'orbs.natural', base: 1 },
    { stat: 'orbs.mechanic', base: 1 },
    { stat: 'resist.fire', base: 3, type: 'percent' },
    { stat: 'resist.electricity', base: 3, type: 'percent' },
    { stat: 'resist.ice', base: 3, type: 'percent' },
    { stat: 'resist.poison', base: 3, type: 'percent' },
  ],
  combat: [
    { stat: 'attack', base: 1 },
    { stat: 'damage', base: 3 },
    { stat: 'critical', base: 5, type: 'percent' },
    { stat: 'defense', base: 1 },
    { stat: 'speed', base: 1 },
    { stat: 'fright', base: 1 },
  ],
  exploration: [
    { stat: 'mv', base: 1 },
    { stat: 'perception', base: 1 },
    { stat: 'light', base: 1 },
    { stat: 'open', base: 1 },
    { stat: 'lockpick', base: 1 },
    { stat: 'craft', base: 1 },
    { stat: 'mine', base: 1 },
    { stat: 'woodcut', base: 1 },
    { stat: 'herbalism', base: 1 },
    { stat: 'flee', base: 1 },
    { stat: 'fear', base: 1 },
  ],
  resource: [
    { stat: 'xp', base: 5 },
    { stat: 'gold', base: 1 },
    { stat: 'loot', base: 1 },
  ],
  status: [
    { stat: 'burn', base: 1 },
    { stat: 'frozen', base: 1 },
    { stat: 'electrified', base: 1 },
    { stat: 'poison', base: 1 },
    { stat: 'reflect', base: 1 },
    { stat: 'regen.mp', base: 1 },
    { stat: 'regen.hp', base: 1 },
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
