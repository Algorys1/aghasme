import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ARCHETYPE_ORB_MODIFIERS, Character, NewCharacterInput, Orbs } from '../models/character.model';

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
  
    // --- Création du personnage final
    this.character = {
      name: data.name,
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

  // --- Mutations simples (toujours mémoire) ---
  addXP(amount: number) {
    if (!this.character) return;
    this.character.xp += Math.max(0, amount);
    while (this.character.xp >= this.xpToNextLevel(this.character.level)) {
      this.character.xp -= this.xpToNextLevel(this.character.level);
      this.levelUp();
    }
  }
  private levelUp() {
    // TODO to improve before release
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

  /** Nettoyage mémoire */
  clearCharacter() {
    this.character = null;
  }

  /** 🔥 One-shot : supprime l’ancienne persistance globale héritée */
  clearLegacyStorage() {
    try { localStorage.removeItem('character'); } catch {}
  }
}
