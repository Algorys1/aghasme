import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CharacterService } from '../services/character.service';
import {SaveService} from '../services/save.service';

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
    private saveService: SaveService
  ) {}

  ngOnInit() {
    this.hasSave = this.saveService.hasAutoSave();
  }

  continueGame() {
    this.router.navigate(['/game'], { state: { slot: 'auto' } }).then();
  }

  newGame() {
    this.characterService.clearCharacter();
    this.router.navigate(['/create-character']).then();
  }

  loadGame() {
    this.router.navigate(['/saves']).then();
  }

  back() {
    this.router.navigate(['/home']).then();
  }
}
