import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { CharacterService } from './character.service';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private character: Character | null = null;
  actions = ['Attaquer', 'Explorer', 'Inventaire'];

  constructor(private characterService: CharacterService) {
    this.character = this.characterService.getCharacter();
  }

  initPlayer(character: Character) { this.character = character; }

  get hp() { return this.character?.hp ?? 0; }
  get xp() { return this.character?.xp ?? 0; }

  takeDamage(amount: number) {
    if (!this.character) return;
    this.character.hp = Math.max(0, this.character.hp - amount);
    this.characterService.saveToStorage();
  }

  gainXP(amount: number) {
    if (!this.character) return;
    this.characterService.addXP(amount);
    this.characterService.saveToStorage();
  }

  getCharacter() { return this.character; }
}
