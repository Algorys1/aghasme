import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { Archetype, NewCharacterInput } from '../models/character.model';
import { CHARACTER_ASSETS } from '../models/characters-assets';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class CharacterCreationComponent {
  archetypes = Object.keys(CHARACTER_ASSETS) as Archetype[];
  CHARACTER_ASSETS = CHARACTER_ASSETS;

  name: string = '';
  selectedArchetype: Archetype = 'beast';

  // points à répartir
  totalPoints: number = 12;
  remainingPoints: number = this.totalPoints;

  stats = {
    strength: 8,
    essence: 8,
    mechanic: 8,
    spirit: 8
  }

  statKeys: Array<'strength' | 'essence' | 'mechanic' | 'spirit'> = [
    'strength',
    'essence',
    'mechanic',
    'spirit'
  ];
  

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {}

  selectArchetype(type: Archetype) {
    this.selectedArchetype = type;
  }

  assetFor(a: Archetype): string {
    return this.CHARACTER_ASSETS[a];
  }

  increaseStat(stat: 'strength' | 'essence' | 'mechanic' | 'spirit') {
    if (this.remainingPoints > 0) {
      this.stats[stat]++;
      this.remainingPoints--;
    }
  }

  decreaseStat(stat: 'strength' | 'essence' | 'mechanic' | 'spirit') {
    if (this.stats[stat] > 1) {
      this.stats[stat]--;
      this.remainingPoints++;
    }
  }

  onCreateCharacter() {
    if (!this.name || this.remainingPoints > 0) {
      alert('Donne un nom et utilise tous les points avant de continuer !');
      return;
    }

    const newChar: NewCharacterInput = {
      name: this.name,
      archetype: this.selectedArchetype,
      strength: this.stats.strength,
      essence: this.stats.essence,
      mechanic: this.stats.mechanic,
      spirit: this.stats.spirit
    };

    this.characterService.createCharacter(newChar);
    this.characterService.saveToStorage();
    this.router.navigate(['/game']);
  }
}
