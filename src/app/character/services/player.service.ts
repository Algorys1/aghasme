import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { CharacterService } from '../services/character.service';
import { CHARACTER_ASSETS } from '../models/character.model';


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

  get portrait(): string {
    const char = this.getCharacter();
    if (!char) return 'assets/monsters/lost-soul.png';
    return CHARACTER_ASSETS[char.gender][char.archetype];
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

  // --- TODO Delegate on CharacterService ---
  takeDamage(amount: number) { this.characterService.takeDamage(amount); this.refresh(); }
  heal(amount: number) { this.characterService.heal(amount); this.refresh(); }
  restoreMana(amount: number) { this.characterService.restoreMana(amount); this.refresh(); }
  spendMP(amount: number) { const ok = this.characterService.spendMP(amount); this.refresh(); return ok; }
  gainXP(amount: number) { this.characterService.addXP(amount); this.refresh(); }
  gainGold(amount: number) { this.characterService.gainGold(amount); this.refresh(); }
  spendGold(amount: number) { const ok = this.characterService.spendGold(amount); this.refresh(); return ok; }

  getCharacter(): Character | null {
    return this.characterService.getCharacter();
  }
}
