import { Injectable } from '@angular/core';
import { Character, NewCharacterInput, Archetype, Orbs } from '../models/character.model';
import { CHARACTER_ASSETS } from '../models/characters-assets';

const DEFAULT_ORBS: Orbs = { bestial: 0, elemental: 0, natural: 0, mechanic: 0 };

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private character: Character | null = null;
  private STORAGE_KEY = 'character';

  /** Création (ou remplacement) du personnage */
  createCharacter(data: NewCharacterInput): Character {
    const level = data.level ?? 1;

    const orbs: Orbs = {
      ...DEFAULT_ORBS,
      ...(data.orbs ?? {}),
    };

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

    this.saveToStorage();
    return this.character;
  }

  /** Lecture (charge depuis storage si nécessaire) */
  getCharacter(): Character | null {
    if (!this.character) this.loadFromStorage();
    return this.character;
  }

  setCharacter(c: Character) {
    this.character = { ...c };
    this.saveToStorage();
  }

  addXP(amount: number) {
    if (!this.character) return;
    this.character.xp += Math.max(0, amount);
    while (this.character.xp >= this.xpToNextLevel(this.character.level)) {
      this.character.xp -= this.xpToNextLevel(this.character.level);
      this.levelUp();
    }
    this.saveToStorage();
  }

  private levelUp() {
    if (!this.character) return;
    this.character.level += 1;
    // Ici tu peux garder du fixe ou recalculer selon les orbes
    this.character.maxHp += 10;
    this.character.maxMp += 5;
    this.character.hp = this.character.maxHp;
    this.character.mp = this.character.maxMp;
  }

  spendMP(amount: number): boolean {
    if (!this.character) return false;
    if (this.character.mp < amount) return false;
    this.character.mp -= amount;
    this.saveToStorage();
    return true;
  }

  heal(amount: number) {
    if (!this.character) return;
    this.character.hp = Math.min(this.character.maxHp, this.character.hp + amount);
    this.saveToStorage();
  }

  takeDamage(amount: number) {
    if (!this.character) return;
    this.character.hp = Math.max(0, this.character.hp - amount);
    this.saveToStorage();
  }

  gainGold(amount: number) {
    if (!this.character) return;
    this.character.gold += amount;
    this.saveToStorage();
  }

  spendGold(amount: number): boolean {
    if (!this.character) return false;
    if (this.character.gold < amount) return false;
    this.character.gold -= amount;
    this.saveToStorage();
    return true;
  }

  setOrb(key: keyof Orbs, value: number) {
    if (!this.character) return;
    this.character.orbs[key] = Math.max(0, value);
    this.saveToStorage();
  }

  saveToStorage() {
    if (this.character) localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.character));
  }

  loadFromStorage(): Character | null {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (!saved) return null;
    try {
      this.character = JSON.parse(saved) as Character;
      return this.character;
    } catch {
      return null;
    }
  }

  getCharacterAsset(archetype: Archetype): string {
    return CHARACTER_ASSETS[archetype];
  }

  private xpToNextLevel(level: number) {
    return 100 + (level - 1) * 50;
  }
}
