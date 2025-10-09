import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayKind } from '../models/overlays';
import { OverlayInstance } from '../factories/overlay.factory';
import {ActionType} from '../models/actions';

@Component({
  selector: 'app-overlay-window',
  templateUrl: './overlay-window.component.html',
  styleUrls: ['./overlay-window.component.scss']
})
export class OverlayWindowComponent {
  @Input() kind!: OverlayKind;
  @Input() data!: OverlayInstance;

  @Output() close = new EventEmitter<void>();
  @Output() actionSelected = new EventEmitter<ActionType>();

  onAction(action: ActionType) {
    this.actionSelected.emit(action);
  }

  getConsequence(action: string): string {
    switch (action.toLowerCase()) {
      case 'fight': return 'Engage in combat.';
      case 'flee': return 'Try to escape the danger.';
      case 'trade': return 'Open a shop interface.';
      case 'rest': return 'Recover HP and MP.';
      default: return 'Take this action.';
    }
  }
}
