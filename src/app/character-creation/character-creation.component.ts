import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { PlayerService } from '../services/player.service';
import { Character } from '../models/character.model';
import { LucideAngularModule, Dumbbell, Leaf, Cog, Brain } from 'lucide-angular';

@Component({
  selector: 'app-character-creation',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.scss']
})
export class CharacterCreationComponent {
  // expose icons to template
  icons = { Dumbbell, Leaf, Cog, Brain };

  name = '';
  archetype: Character['archetype'] = 'warrior';

  strength = 2;
  essence = 2;
  mechanic = 2;
  spirit = 2;

  points = 9;

  constructor(
    private characterService: CharacterService,
    private playerService: PlayerService,
    private router: Router
  ) {}

  get remainingPoints(): number {
    return this.points;
  }

  increase(stat: 'strength' | 'essence' | 'mechanic' | 'spirit') {
    if (this.points > 0) {
      this[stat]++;
      this.points--;
    }
  }

  decrease(stat: 'strength' | 'essence' | 'mechanic' | 'spirit') {
    if (this[stat] > 2) {
      this[stat]--;
      this.points++;
    }
  }

  create() {
    if (this.points > 0) {
      alert('You must use all points before starting!');
      return;
    }

    const character = this.characterService.createCharacter({
      name: this.name || 'Hero',
      archetype: this.archetype,
      strength: this.strength,
      essence: this.essence,
      mechanic: this.mechanic,
      spirit: this.spirit,
      skills: []
    });

    this.playerService.initPlayer(character);
    this.characterService.saveToStorage();

    this.router.navigate(['/game'], {
      state: { character, map: 'Map1' }
    });
  }
}
