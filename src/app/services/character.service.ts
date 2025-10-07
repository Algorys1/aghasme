// character.service.ts
import { Injectable } from '@angular/core';
import { Character, NewCharacterInput, Orbs } from '../models/character.model';

const DEFAULT_ORBS: Orbs = { bestial: 0, elemental: 0, natural: 0, mechanic: 0 };

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private character: Character | null = null;

  /** Création (ou remplacement) du personnage (mémoire uniquement) */
  createCharacter(data: NewCharacterInput): Character {
    const level = data.level ?? 1;
    const orbs: Orbs = { ...DEFAULT_ORBS, ...(data.orbs ?? {}) };
    const baseMaxHp = Math.floor((orbs.natural + orbs.mechanic) / 2);
    const baseMaxMp = Math.floor((orbs.elemental + orbs.bestial) / 2);

    this.character = {
      name: data.name,
      archetype: data.archetype ?? 'beast',
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
    };
    return this.character;
  }

  /** Lecture (mémoire uniquement) */
  getCharacter(): Character | null {
    return this.character;
  }

  /** Remplace le personnage courant (mémoire uniquement) */
  setCharacter(c: Character) {
    this.character = { ...c };
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
    if (!this.character) return;
    this.character.level += 1;
    this.character.maxHp += 10;
    this.character.maxMp += 5;
    this.character.hp = this.character.maxHp;
    this.character.mp = this.character.maxMp;
  }
  spendMP(amount: number): boolean {
    if (!this.character || this.character.mp < amount) return false;
    this.character.mp -= amount;
    return true;
  }
  heal(amount: number) {
    if (!this.character) return;
    this.character.hp = Math.min(this.character.maxHp, this.character.hp + amount);
  }
  takeDamage(amount: number) {
    if (!this.character) return;
    this.character.hp = Math.max(0, this.character.hp - amount);
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
