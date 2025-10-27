import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../services/settings.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent {
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();

  constructor(public settings: SettingsService) {}

  setLang(lang: 'fr' | 'en') {
    this.settings.applyLanguage(lang);
  }

  setVolume(type: 'music' | 'sfx', event: Event) {
    const input = event.target as HTMLInputElement;
    this.settings.setVolume(type, +input.value);
  }

  close() {
    this.closed.emit();
  }
}
