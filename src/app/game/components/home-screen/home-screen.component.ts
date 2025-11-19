import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../../services/settings.service';
import { SettingsMenuComponent } from "../settings-menu/settings-menu.component";

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [CommonModule, TranslateModule, SettingsMenuComponent],
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent {
  showSettings = false;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private settings: SettingsService
  ) {
    const lang = this.settings.language || 'en';
    this.translate.use(lang);
  }

  goToStart() {
    this.router.navigate(['/start']);
  }
}
