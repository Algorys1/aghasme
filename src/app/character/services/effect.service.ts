import { Injectable } from '@angular/core';
import type { Effect, StatKey } from '../models/effect.model';
import type { Character } from '../models/character.model';
import { getBaseStat } from '../services/character-stat.adapter';

@Injectable({ providedIn: 'root' })
export class EffectService {
  /** Active effects */
  private activeEffects: Effect[] = [];

  applyEffect(effect: Effect, character?: Character): void {
    if (!effect.duration && !effect.source) {
      if (character) this.applyInstantToCharacter(effect, character);
      return;
    }

    // Permanent: source but no duration
    if (effect.source && !effect.duration) {
      this.activeEffects = this.activeEffects.filter(
        e => !(e.source === effect.source && e.stat === effect.stat)
      );
      this.activeEffects.push({ ...effect, type: effect.type ?? 'flat' });
      return;
    }

    // Temporary: duration > 0 => replace if same (source+stat) otherwise add
    if (effect.duration && effect.duration > 0) {
      this.activeEffects = this.activeEffects.filter(
        e => !(e.source === effect.source && e.stat === effect.stat)
      );
      this.activeEffects.push({ ...effect, type: effect.type ?? 'flat' });
    }
  }

  /** Remove all effect from one source (ie: unequip armor). */
  removeEffectsBySource(source: string): void {
    this.activeEffects = this.activeEffects.filter(e => e.source !== source);
  }

  /** Decrease time of temporary effects (to call for each "action" consumed). */
  tickDurations(): void {
    this.activeEffects = this.activeEffects
      .map(e => (e.duration ? { ...e, duration: e.duration - 1 } : e))
      .filter(e => !e.duration || e.duration > 0);
  }

  /** Get final stat for a given character (base + effects). */
  getFinalStat(stat: StatKey, character: Character): number {
    const base = getBaseStat(character, stat);
    const related = this.activeEffects.filter(e => e.stat === stat);

    let flat = 0;
    let percent = 0;
    for (const e of related) {
      if (e.type === 'percent') percent += e.value;
      else flat += e.value;
    }

    const afterFlat = base + flat;
    return percent ? Math.round((afterFlat * (1 + percent / 100)) * 100) / 100 : afterFlat;
  }

  getActiveEffectsForStat(stat: StatKey): Effect[] {
    return this.activeEffects.filter(e => e.stat === stat);
  }

  getAllEffects(): Effect[] { return [...this.activeEffects]; }
  clearAll(): void { this.activeEffects = []; }

  // --------------------
  // xp/gold/heal on Character
  // --------------------
  private applyInstantToCharacter(effect: Effect, c: Character): void {
    switch (effect.stat) {
      case 'hp':
        c.hp = Math.min(c.maxHp, c.hp + Math.trunc(effect.value));
        break;
      case 'mp':
        c.mp = Math.min(c.maxMp, c.mp + Math.trunc(effect.value));
        break;
      case 'xp':
        c.xp = Math.max(0, c.xp + Math.trunc(effect.value));
        break;
      case 'gold':
        c.gold = Math.max(0, c.gold + Math.trunc(effect.value));
        break;
      default:
        break;
    }
  }
}
