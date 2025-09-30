import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CharacterService } from '../services/character.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterGuard implements CanActivate {
  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {}

  canActivate(): boolean {
    let character = this.characterService.getCharacter();

    // try loading from localStorage if not already in memory
    if (!character) {
      character = this.characterService.loadFromStorage();
    }

    if (character) {
      return true; // allow access to /game
    }

    // no character -> redirect to main menu
    this.router.navigate(['/start']);
    return false;
  }
}
