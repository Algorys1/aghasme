import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-start-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent {
  character: Character = {
    name: '',
    strength: 5,
    spirit: 5,
    essence: 5,
    mechanic: 100,
    skills: []
  };

  selectedMap = 'map1';
  maps = ['map1', 'map2', 'map3'];

  constructor(private router: Router) {}

  startGame() {
    // On passe le perso et la carte choisie via state
    this.router.navigate(['/game'], {
      state: {
        character: this.character,
        map: this.selectedMap
      }
    });
  }
}
