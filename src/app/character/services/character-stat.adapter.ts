import type { Character } from '../models/character.model';
import type { StatKey } from '../models/effect.model';

/**
* Provides the base value (before effects) of a StatKey for a Character.
* By default, any stat not present in Character has a base of 0.
* This prevents the model from becoming too large while maintaining extensibility.
*/
export function getBaseStat(c: Character, stat: StatKey): number {
  switch (stat) {
    // ---------------- VITALS & AFFINITIES ----------------
    case 'hp': return c.hp;
    case 'maxHp': return c.maxHp;
    case 'mp': return c.mp;
    case 'maxMp': return c.maxMp;
    case 'action': return 0; // si tu ajoutes des AP, remplace ici

    case 'orbs.bestial': return c.orbs.bestial;
    case 'orbs.elemental': return c.orbs.elemental;
    case 'orbs.natural': return c.orbs.natural;
    case 'orbs.mechanic': return c.orbs.mechanic;

    case 'resist.fire': return 0;
    case 'resist.electricity': return 0;
    case 'resist.ice': return 0;
    case 'resist.poison': return 0;

    // ---------------- COMBAT ----------------
    case 'attack': return c.baseStats?.attack ?? c.attack ?? 0;
    case 'defense': return c.baseStats?.defense ?? c.defense ?? 0;
    case 'damage': return 0;
    case 'critical': return 0;
    case 'speed': return 0;
    case 'fright': return 0;

    // ---------------- EXPLORATION ----------------
    case 'mv': return 0;
    case 'perception': return 0;
    case 'light': return 0;
    case 'open': return 0;
    case 'lockpick': return 0;
    case 'mine': return 0;
    case 'woodcut': return 0;
    case 'herbalism': return 0;
    case 'flee': return 0;
    case 'fear': return 0;

    // ---------------- RESOURCES (casual) ----------------
    case 'xp': return c.xp;
    case 'gold': return c.gold;
    case 'loot': return 0;

    // ---------------- STATUS (always via effects) ----------------
    case 'burn':
    case 'frozen':
    case 'electrified':
    case 'poison':
    case 'reflect':
    case 'regen.mp':
    case 'regen.hp':
      return 0;

    default:
      return 0;
  }
}
