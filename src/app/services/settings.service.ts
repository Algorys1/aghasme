import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface GameSettings {
  language: 'fr' | 'en';
  musicVolume: number;
  sfxVolume: number;
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly STORAGE_KEY = 'aghasme_settings';
  settings: GameSettings = {
    language: 'fr',
    musicVolume: 0.8,
    sfxVolume: 0.8
  };

  private translate = inject(TranslateService, { optional: true });

  constructor() {
    this.loadSettings();
    queueMicrotask(() => {
      if (this.translate) {
        this.applyLanguage(this.settings.language);
      }
    });
  }

  loadSettings() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.settings = { ...this.settings, ...JSON.parse(data) };
    }
  }

  saveSettings() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings));
  }

  applyLanguage(lang: 'fr' | 'en') {
    this.settings.language = lang;
    this.translate?.use(lang);
    this.saveSettings();
  }

  setVolume(type: 'music' | 'sfx', value: number) {
    if (type === 'music') this.settings.musicVolume = value;
    else this.settings.sfxVolume = value;
    this.saveSettings();
  }

  getVolume(type: 'music' | 'sfx') {
    return type === 'music' ? this.settings.musicVolume : this.settings.sfxVolume;
  }

  get language() {
    return this.settings.language;
  }
}
