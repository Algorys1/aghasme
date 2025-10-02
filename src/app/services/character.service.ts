import { Injectable } from '@angular/core';
import { Character, NewCharacterInput, Archetype } from '../models/character.model';
import { CHARACTER_ASSETS } from '../models/characters-assets';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private character: Character | null = null;

  createCharacter(data: NewCharacterInput): Character {
    this.character = {
      name: data.name,
      archetype: data.archetype ?? 'beast',
      level: data.level ?? 1,
      xp: data.xp ?? 0,
      hp: data.hp ?? 100,
      strength: data.strength ?? 5,
      essence: data.essence ?? 5,
      mechanic: data.mechanic ?? 5,
      spirit: data.spirit ?? 5,
      skills: data.skills ?? [],
      gold: data.gold ?? 0,
      inventory: data.inventory ?? [],
    };
    return this.character;
  }

  getCharacter(): Character | null {
    return this.character;
  }

  addXP(amount: number) {
    if (!this.character) return;
    this.character.xp += amount;
    if (this.character.xp >= this.character.level * 100) {
      this.character.level++;
      this.character.xp = 0;
      this.character.hp += 10;
    }
  }

  saveToStorage() {
    if (this.character) localStorage.setItem('character', JSON.stringify(this.character));
  }

  loadFromStorage(): Character | null {
    const saved = localStorage.getItem('character');
    this.character = saved ? JSON.parse(saved) : null;
    return this.character;
  }

  getCharacterAsset(archetype: Archetype): string {
    return CHARACTER_ASSETS[archetype];
  }
}
