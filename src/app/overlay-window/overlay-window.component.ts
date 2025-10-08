import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayKind, OverlayInfo } from '../models/overlays';

@Component({
  selector: 'app-overlay-window',
  templateUrl: './overlay-window.component.html',
  styleUrls: ['./overlay-window.component.scss']
})
export class OverlayWindowComponent {
  @Input() kind!: OverlayKind;
  @Input() data!: OverlayInfo;

  @Output() close = new EventEmitter<void>();
  @Output() actionSelected = new EventEmitter<string>();

  onAction(action: string) {
    this.actionSelected.emit(action);
  }

  onClose() {
    this.close.emit();
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
