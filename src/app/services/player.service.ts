import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { CharacterService } from './character.service';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private characterSub: BehaviorSubject<Character | null>;
  character$: Observable<Character | null>;

  constructor(private characterService: CharacterService) {
    const initChar = this.characterService.getCharacter();
    this.characterSub = new BehaviorSubject<Character | null>(initChar);
    this.character$ = this.characterSub.asObservable();
  }

  /** Récupère le personnage actuel */
  get character(): Character | null {
    return this.characterSub.getValue();
  }

  /** Rafraîchit les observables */
  refresh() {
    this.characterSub.next(this.characterService.getCharacter());
  }

  /** Réinitialise complètement le joueur */
  clear() {
    this.characterService.clearCharacter();
    this.characterSub.next(null);
  }

  // --- TODO Getters ---
  get hp() { return this.character?.hp ?? 0; }
  get maxHp() { return this.character?.maxHp ?? 0; }
  get mp() { return this.character?.mp ?? 0; }
  get maxMp() { return this.character?.maxMp ?? 0; }
  get xp() { return this.character?.xp ?? 0; }
  get gold() { return this.character?.gold ?? 0; }

  // --- TODO Delegate on CharacterService ---
  takeDamage(amount: number) { this.characterService.takeDamage(amount); this.refresh(); }
  heal(amount: number) { this.characterService.heal(amount); this.refresh(); }
  spendMP(amount: number) { const ok = this.characterService.spendMP(amount); this.refresh(); return ok; }
  gainXP(amount: number) { this.characterService.addXP(amount); this.refresh(); }
  gainGold(amount: number) { this.characterService.gainGold(amount); this.refresh(); }
  spendGold(amount: number) { const ok = this.characterService.spendGold(amount); this.refresh(); return ok; }

  getCharacter(): Character | null {
    return this.characterService.getCharacter();
  }
}
