import { Effect, StatKey } from '../../character/models/effect.model';

/**
 * Applies a list of effects to an entity (player, enemy, etc.)
 * Returns a new modified copy without mutating the original.
 */
export function applyEffectsToEntity<T extends object>(
  entity: T,
  effects?: Effect[]
): T {
  if (!effects || effects.length === 0) return entity;

  const clone: any = { ...entity };

  for (const { stat, value, type = 'flat' } of effects) {
    if (clone[stat] === undefined) continue;

    const current = Number(clone[stat]);
    if (isNaN(current)) continue;

    clone[stat] =
      type === 'flat'
        ? current + value
        : Math.floor(current * (1 + value / 100));
  }

  return clone as T;
}

export function resolveCharacterStats(
  base: { [key: string]: number },
  effects: Effect[]
) {
  const total = { ...base };

  for (const effect of effects) {
    const { stat, value, type = 'flat' } = effect;
    if (!(stat in total)) continue;

    if (type === 'flat') {
      total[stat] += value;
    } else if (type === 'percent') {
      total[stat] = Math.floor(total[stat] * (1 + value / 100));
    }
  }

  return total;
}