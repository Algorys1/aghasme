import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent {
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
