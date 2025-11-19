// save-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SaveService } from '../../services/save.service';
import { GameState } from '../../models/game-state.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-save-list',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './save-list.component.html',
  styleUrls: ['./save-list.component.scss']
})
export class SaveListComponent implements OnInit {
  saves: { slot: string; state: GameState }[] = [];

  constructor(
    private saveService: SaveService,
    private router: Router,
    private translate: TranslateService,
    private settings: SettingsService
  ) {
    const lang = this.settings.language || 'en';
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.saves = this.saveService.getSaveSlots();
  }

  load(slot: string) {
    this.router.navigateByUrl('/game', { state: { slot } }).then();
  }

  delete(slot: string) {
    if (confirm(`Supprimer la sauvegarde "${slot}" ?`)) {
      this.saveService.deleteSave(slot);
      this.saves = this.saveService.getSaveSlots();
    }
  }

  newGame() {
    this.router.navigateByUrl('/game', { state: { newGame: true } }).then();
  }

  back() {
    this.router.navigate(['/start']).then();
  }
}
