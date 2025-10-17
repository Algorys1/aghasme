import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { CharacterService } from '../services/character.service';
import { Archetype, Orbs, Gender, ORB_DEFINITIONS, ARCHETYPE_ORB_MODIFIERS } from '../models/character.model';
import { BACKGROUNDS, CharacterBackground } from '../models/background.model';

@Component({
  selector: 'app-character-creation',
  imports: [TitleCasePipe, FormsModule],
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.scss']
})
export class CharacterCreationComponent {
  step = 1; // 1: archetype, 2: orbs, 3: name

  archetypes: Archetype[] = ['beast', 'elemental', 'ant', 'engineer'];
  genders: Gender[] = ['male', 'female'];
  selectedArchetype: Archetype | null = null;
  selectedGender: Gender = 'male';
  hasInitialized = false;

  orbs: Orbs = { bestial: 7, elemental: 7, natural: 7, mechanic: 7 };
  orbKeys: (keyof Orbs)[] = ['bestial', 'elemental', 'natural', 'mechanic'];
  orbDefs = ORB_DEFINITIONS;
  orbModifiers: Partial<Orbs> = {};
  pointsLeft = 10;
  name = '';

  backgrounds = BACKGROUNDS;
  selectedBackground: CharacterBackground | null = null;

  previewStats = {
    attack: 0,
    defense: 0,
    maxHp: 0,
    maxMp: 0
  };

  constructor(
    public characterService: CharacterService,
    private router: Router
  ) {}

  // === STEP 1 : ARCHETYPE & GENDER ===
  selectArchetype(type: Archetype) {
    this.selectedArchetype = type;
    this.orbModifiers = ARCHETYPE_ORB_MODIFIERS[type] ?? {};
    this.updatePreview();
  }

  selectGender(g: Gender) {
    this.selectedGender = g;
  }

  // === STEP 2 : ORBS ===
  adjustOrb(key: keyof Orbs, delta: number) {
    const current = this.orbs[key];

    if (delta < 0 && current <= 0) return;
    if (delta > 0 && this.pointsLeft === 0) return;
    if (delta > 0 && current >= 16) return;
  
    this.orbs[key] = current + delta;
    this.pointsLeft -= delta;

    this.updatePreview();
  }

  updatePreview() {
    if (!this.selectedArchetype) return;
    this.previewStats = this.characterService.previewStats(this.selectedArchetype, this.orbs);
  }
  
  // === STEP 3 : BACKGROUND ===
  selectBackground(bg: CharacterBackground) {
    this.selectedBackground = bg;
  }  

  // === STEP 4 : NAME & CONFIRMATION ===
  validateName(raw: string): string {
    if (!raw) return '';
  
    let name = raw.trim();
  
    name = name.replace(/[^a-zA-Z _-]/g, '');
    name = name.replace(/\s{2,}/g, ' ');
    name = name.slice(0, 12);
  
    if (name.length > 0) {
      name = name[0].toUpperCase() + name.slice(1);
    }
  
    return name;
  }

  confirm() {
    if (!this.selectedArchetype || !this.name.trim()) return;
    const cleanName = this.validateName(this.name);
    if (!cleanName) return;
  
    const newChar = this.characterService.createCharacter({
      name: cleanName,
      archetype: this.selectedArchetype,
      gender: this.selectedGender,
      orbs: this.orbs,
      background: this.selectedBackground?.id
    });
  
    this.router.navigate(['/game'], {
      state: { newGame: true }
    });
  }  

  nextStep() {
    if (this.step < 4) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  backToHome() {
    this.router.navigate(['/start']);
  }

  getSlideTransform(): string {
    return `translateX(${(this.step - 1) * -100}vw)`;
  }
  
  
  getPortrait(): string {
    if (!this.selectedArchetype) return 'assets/characters/default.png';
    return `assets/characters/${this.selectedArchetype}-${this.selectedGender}.png`;
  }
}
