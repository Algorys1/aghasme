import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CharacterService } from '../services/character.service';
import {SaveService} from '../services/save.service';
import { SettingsMenuComponent } from "../settings-menu/settings-menu.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-start-game',
  standalone: true,
  imports: [CommonModule, SettingsMenuComponent, TranslateModule],
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit {
  hasSave = false;
  showSettings = false;

  constructor(
    private router: Router,
    private characterService: CharacterService,
    private saveService: SaveService,
    private translate: TranslateService,
    private settings: SettingsService
  ) {
    const lang = this.settings.language || 'en';
    this.translate.use(lang);
  }

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
