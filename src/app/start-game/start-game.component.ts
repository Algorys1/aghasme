import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { PlayerService } from '../services/player.service';
import {SaveService} from '../services/save.service';
import {MapService} from '../services/map.service';

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
    private playerService: PlayerService,
    private saveService: SaveService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.hasSave = this.saveService.hasSave('autosave');
  }

  continueGame() {
    const state = this.saveService.loadGame('autosave');
    if (!state) {
      alert('Aucune sauvegarde trouvée.');
      this.hasSave = false;
      return;
    }

    this.characterService.setCharacter(state.character);
    this.playerService['refresh']?.();

    if (state.map?.player) {
      this.mapService.setPlayerHex(state.map.player.q, state.map.player.r);
    }

    this.router.navigate(['/game']);
  }

  newGame() {
    this.router.navigate(['/create-character']);
  }

  loadGame() {
    this.router.navigate(['/saves']);
  }

  back() {
    this.router.navigate(['/home']);
  }
}
