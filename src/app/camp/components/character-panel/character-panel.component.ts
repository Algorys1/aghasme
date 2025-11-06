import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../../character/services/character.service';
import { Character, ORB_DEFINITIONS, OrbKey } from '../../../character/models/character.model';
import { EffectService } from '../../../character/services/effect.service';

@Component({
  selector: 'app-character-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-panel.component.html',
  styleUrls: ['./character-panel.component.scss'],
})
export class CharacterPanelComponent implements OnInit {
  character: Character | null = null;
  orbDefs = ORB_DEFINITIONS;

  constructor(
    private characterService: CharacterService,
    private effectService: EffectService
  ) {}

  ngOnInit() {
    this.characterService.character$.subscribe(char => (this.character = char));
    this.character = this.characterService.getCharacter();
  }

  orbKeys(): OrbKey[] {
    return ['bestial', 'elemental', 'natural', 'mechanic'];
  }

  getStat(stat: string): number {
    if (!this.character) return 0;
    return this.effectService.getFinalStat(stat as any, this.character);
  }
}
