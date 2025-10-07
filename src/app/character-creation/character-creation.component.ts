import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { Archetype, NewCharacterInput, OrbKey, ORB_DEFINITIONS } from '../models/character.model';
import { CHARACTER_ASSETS } from '../models/character.model';
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

  readonly MAX_ORB_VALUE = 16;

  // On utilise directement les orbes
  orbs: Record<OrbKey, number> = {
    bestial: 8,
    elemental: 8,
    natural: 8,
    mechanic: 8,
  };

  readonly ORB_DEFS = ORB_DEFINITIONS;
  orbKeys: OrbKey[] = ['bestial', 'elemental', 'natural', 'mechanic'];

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

  increaseOrb(key: OrbKey) {
    if (this.remainingPoints > 0 && this.orbs[key] < this.MAX_ORB_VALUE) {
      this.orbs[key]++;
      this.remainingPoints--;
    }
  }

  decreaseOrb(key: OrbKey) {
    if (this.orbs[key] > 0) {
      this.orbs[key]--;
      this.remainingPoints++;
    }
  }

  onCreateCharacter() {
    if (!this.name || this.remainingPoints > 0) {
      alert('Give a name and distribute all points before !');
      return;
    }

    const newChar: NewCharacterInput = {
      name: this.name,
      archetype: this.selectedArchetype,
      orbs: { ...this.orbs },
    };

    this.characterService.createCharacter(newChar);
    this.router.navigate(['/game'], { state: { newGame: true } });
  }
}
