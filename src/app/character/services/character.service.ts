import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Archetype, ARCHETYPE_ORB_MODIFIERS, Character, NewCharacterInput, OrbKey, Orbs } from '../models/character.model';
import { BACKGROUNDS } from '../models/background.model';

const DEFAULT_ORBS: Orbs = { bestial: 0, elemental: 0, natural: 0, mechanic: 0 };

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private character: Character | null = null;
  private characterSubject = new BehaviorSubject<Character | null>(null);
  character$ = this.characterSubject.asObservable();

  createCharacter(data: NewCharacterInput): Character {
    const level = data.level ?? 1;
    let orbs: Orbs = { ...DEFAULT_ORBS, ...(data.orbs ?? {}) };
    const archetype = data.archetype ?? 'beast';

    const mods = ARCHETYPE_ORB_MODIFIERS[archetype];
    for (const key of Object.keys(mods) as (keyof Orbs)[]) {
      orbs[key] = Math.max(0, (orbs[key] ?? 0) + (mods[key] ?? 0));
    }

    // --- HP & MP
    const baseMaxHp = Math.floor((orbs.natural + orbs.mechanic) / 2);
    const baseMaxMp = Math.floor((orbs.elemental + orbs.natural) / 2);

    // --- ATTACK calculation
    const baseAttack = Math.floor((orbs.bestial + orbs.elemental) / 2);
    let attackBonus = 0;

    if (baseAttack >= 5 && baseAttack <= 7) attackBonus = -1;
    else if (baseAttack >= 8 && baseAttack <= 11) attackBonus = 0;
    else if (baseAttack >= 12 && baseAttack <= 14) attackBonus = 1;
    else if (baseAttack >= 15 && baseAttack <= 17) attackBonus = 2;
    else if (baseAttack >= 18 && baseAttack <= 20) attackBonus = 3;

    const finalAttack = baseAttack + attackBonus;

    // --- DEFENSE calculation (palier-based)
    const baseDefense = Math.floor((orbs.mechanic + orbs.natural) / 2);
    let defenseBonus = 0;

    if (baseDefense >= 5 && baseDefense <= 7) defenseBonus = -1;
    else if (baseDefense >= 8 && baseDefense <= 11) defenseBonus = 0;
    else if (baseDefense >= 12 && baseDefense <= 14) defenseBonus = 1;
    else if (baseDefense >= 15 && baseDefense <= 17) defenseBonus = 2;
    else if (baseDefense >= 18 && baseDefense <= 20) defenseBonus = 3;

    const finalDefense = defenseBonus;

    // --- Create & finalize
    this.character = {
      name: data.name,
      gender: data.gender,
      archetype,
      level,
      xp: data.xp ?? 0,
      hp: baseMaxHp,
      maxHp: baseMaxHp,
      mp: baseMaxMp,
      maxMp: baseMaxMp,
      gold: data.gold ?? 0,
      orbs,
      skills: data.skills ?? [],
      inventory: data.inventory ?? [],
      attack: finalAttack,
      defense: finalDefense,

      baseStats: {
        attack: finalAttack,
        defense: finalDefense,
        maxHp: baseMaxHp,
        maxMp: baseMaxMp,
      },
    };

    if (data.background) {
      const bg = BACKGROUNDS.find(b => b.id === data.background);
      if (bg) {
        bg.effects?.forEach(eff => {
          switch (eff.stat) {
            case 'attack': this.character!.attack += eff.value; break;
            case 'defense': this.character!.defense += eff.value; break;
            case 'maxHp': this.character!.maxHp += eff.value; this.character!.hp = this.character!.maxHp; break;
            case 'maxMp': this.character!.maxMp += eff.value; this.character!.mp = this.character!.maxMp; break;
            case 'bestial':
            case 'elemental':
            case 'natural':
            case 'mechanic':
              (this.character!.orbs as any)[eff.stat] += eff.value;
              break;
          }
        });

        // Equipment
        if (bg.startingItemIds?.length) {
          this.character!.inventory.push(...bg.startingItemIds);
        }
      }
    }

    this.characterSubject.next(this.character);

    return this.character;
  }

  /** Lecture (mémoire uniquement) */
  getCharacter(): Character | null {
    return this.character;
  }

  /** Remplace le personnage courant (mémoire uniquement) */
  setCharacter(c: Character) {
    this.character = { ...c };
    this.characterSubject.next(this.character);
  }

  getOrbPower(orb: OrbKey) {
    if(!this.character) {
      console.warn(`⚠️ cannot find orb ${orb} cause character is undefined`);
      return 1;
    }
    return this.character.orbs[orb];
  }

  addXP(amount: number) {
    if (!this.character) return;
    this.character.xp += Math.max(0, amount);
    while (this.character.xp >= this.xpToNextLevel(this.character.level)) {
      this.character.xp -= this.xpToNextLevel(this.character.level);
      this.levelUp();
    }
  }
  private levelUp() {
    if (!this.character) return;
    this.character.level += 1;
    this.character.maxHp += 10;
    this.character.maxMp += 5;
    this.character.hp = this.character.maxHp;
    this.character.mp = this.character.maxMp;
    this.character.attack = (this.character.attack ?? 5) + 2;
    this.character.defense = (this.character.defense ?? 3) + 1;
  }

  spendMP(amount: number): boolean {
    if (!this.character || this.character.mp < amount) return false;
    this.character.mp -= amount;
    this.characterSubject.next(this.character);
    return true;
  }
  heal(amount: number) {
    if (!this.character) return;
    this.character.hp = Math.min(this.character.maxHp, this.character.hp + amount);
    this.characterSubject.next(this.character);
  }
  restoreMana(amount: number) {
    if (!this.character) return;
    this.character.mp = Math.min(this.character.maxMp, this.character.mp + amount);
    this.characterSubject.next(this.character);
  }
  takeDamage(amount: number) {
    if (!this.character) return;
    this.character.hp = Math.max(0, this.character.hp - amount);
    this.characterSubject.next(this.character);
  }
  gainGold(amount: number) {
    if (!this.character) return;
    this.character.gold += amount;
  }
  spendGold(amount: number): boolean {
    if (!this.character || this.character.gold < amount) return false;
    this.character.gold -= amount;
    return true;
  }

  private xpToNextLevel(level: number) {
    return 100 + (level - 1) * 50;
  }

  previewStats(archetype: Archetype, orbs: Orbs) {
    const mods = ARCHETYPE_ORB_MODIFIERS[archetype];
    const adjusted = { ...orbs };
    for (const key of Object.keys(mods) as (keyof Orbs)[]) {
      adjusted[key] = Math.max(0, adjusted[key] + (mods[key] ?? 0));
    }

    const baseAttack = Math.floor((adjusted.bestial + adjusted.elemental) / 2);
    const baseDefense = Math.floor((adjusted.mechanic + adjusted.natural) / 2);

    let attackBonus = 0;
    if (baseAttack >= 5 && baseAttack <= 7) attackBonus = -1;
    else if (baseAttack >= 8 && baseAttack <= 11) attackBonus = 0;
    else if (baseAttack >= 12 && baseAttack <= 14) attackBonus = 1;
    else if (baseAttack >= 15 && baseAttack <= 17) attackBonus = 2;
    else if (baseAttack >= 18 && baseAttack <= 20) attackBonus = 3;

    let defenseBonus = 0;
    if (baseDefense >= 5 && baseDefense <= 7) defenseBonus = -1;
    else if (baseDefense >= 8 && baseDefense <= 11) defenseBonus = 0;
    else if (baseDefense >= 12 && baseDefense <= 14) defenseBonus = 1;
    else if (baseDefense >= 15 && baseDefense <= 17) defenseBonus = 2;
    else if (baseDefense >= 18 && baseDefense <= 20) defenseBonus = 3;

    return {
      attack: baseAttack + attackBonus,
      defense: defenseBonus,
      maxHp: Math.floor((adjusted.natural + adjusted.mechanic) / 2),
      maxMp: Math.floor((adjusted.elemental + adjusted.natural) / 2),
      adjustedOrbs: adjusted,
    };
  }

  getArchetypeModifiers(archetype: Archetype) {
    const mods = ARCHETYPE_ORB_MODIFIERS[archetype];
    return Object.entries(mods).map(([key, value]) => ({
      key,
      value,
    }));
  }

  clearCharacter() {
    this.character = null;
  }
}
