import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PROLOGUE_CHAPTERS } from '../../tables/prologue.table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-prologue',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './prologue.component.html',
  styleUrls: ['./prologue.component.scss'],
})
export class PrologueComponent {
  chapters = PROLOGUE_CHAPTERS;

  currentIndex = signal(0);
  currentImage = computed(() => this.chapters[this.currentIndex()].image);

  title = "";
  fullText = computed(() => this.chapters[this.currentIndex()].text);
  displayedText = signal('');
  isTyping = signal(false);

  typeSpeed = 22;
  private typingController: { stopTyping: boolean } = { stopTyping: false };

  constructor(
    private router: Router,
    private translate: TranslateService,
    private settings: SettingsService
  ) {
    // Load settings and language
    this.settings.loadSettings();
    const lang = this.settings.language || 'en';
    this.translate.use(lang);

    this.title = this.chapters[this.currentIndex()].title;

    // Start typing the first chapter
    this.startTyping();
  }

  async startTyping() {
    this.displayedText.set('');
    this.isTyping.set(true);

    // Stop previous typewriter
    this.typingController.stopTyping = true;
    await new Promise(r => setTimeout(r));
    this.typingController = { stopTyping: false };

    const text = this.translate.instant(this.fullText());
    this.title = this.translate.instant(this.chapters[this.currentIndex()].title);

    let out = '';

    for (let i = 0; i < text.length; i++) {
      if (this.typingController.stopTyping) return; // abort typing
      out += text[i];
      this.displayedText.set(out);
      await this.sleep(this.typeSpeed);
    }

    this.isTyping.set(false);
  }

  onTap() {
    if (this.isTyping()) {
      this.typingController.stopTyping = true;
      this.displayedText.set(this.translate.instant(this.fullText()));
      this.isTyping.set(false);
    } else {
      this.next();
    }
  }

  next() {
    if (this.isTyping()) {
      // Prevent skipping while typing
      this.typingController.stopTyping = true;
      this.displayedText.set(this.translate.instant(this.fullText()));
      this.isTyping.set(false);
      return;
    }

    if (this.currentIndex() < this.chapters.length - 1) {
      this.currentIndex.update(i => i + 1);
      this.title = this.chapters[this.currentIndex()].title;
      this.startTyping();
    } else {
      this.finishPrologue();
    }
  }

  skip() {
    this.finishPrologue();
  }

  finishPrologue() {
    this.router.navigate(['/create-character']);
  }

  private sleep(ms: number) {
    return new Promise(res => setTimeout(res, ms));
  }
}
