import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-start-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit {
  hasSave = false;

  constructor(
    private router: Router,
    private characterService: CharacterService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.hasSave = !!this.characterService.loadFromStorage();
  }

  continueGame() {
    const saved = this.characterService.loadFromStorage();
    if (saved) {
      this.playerService.initPlayer(saved);
      this.router.navigate(['/game'], {
        state: { character: saved, map: 'Map1' }
      });
    }
  }

  newGame() {
    this.router.navigate(['/create-character']);
  }

  loadGame() {
    const saved = this.characterService.loadFromStorage();
    if (saved) {
      this.playerService.initPlayer(saved);
      this.router.navigate(['/game'], {
        state: { character: saved, map: 'Map1' }
      });
    } else {
      alert('No saved game found');
    }
  }
}
