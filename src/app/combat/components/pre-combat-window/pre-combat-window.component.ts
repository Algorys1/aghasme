import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombatEntity } from '../../models/combat.model';

@Component({
  selector: 'app-pre-combat-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pre-combat-window.component.html',
  styleUrls: ['./pre-combat-window.component.scss']
})
export class PreCombatWindowComponent {
  @Input() player!: CombatEntity;
  @Input() enemy!: CombatEntity;

  @Output() fight = new EventEmitter<void>();
  @Output() flee = new EventEmitter<void>();
}
