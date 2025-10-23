import {Component, EventEmitter, Output} from '@angular/core';
import { PlayerService } from '../services/player.service';
import { MapService } from '../services/map.service';
import { ActionService } from '../services/action.service';
import { OverlayKind } from '../models/overlays.model';
import {FormsModule} from '@angular/forms';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-rest-window',
  templateUrl: './rest-window.component.html',
  imports: [
    FormsModule,
    DecimalPipe
  ],
  styleUrls: ['./rest-window.component.scss']
})
export class RestWindowComponent {
  hours = 4;
  progress = 0;
  isResting = false;
  interrupted = false;
  canClose = true;

  @Output() closed = new EventEmitter<void>();

  private restInterval: any;

  constructor(
    private playerService: PlayerService,
    private mapService: MapService,
    private actionService: ActionService
  ) {}

  cancel(): void {
    if (this.canClose) this.actionService.closeOverlay$.next();
  }

  startRest(): void {
    this.isResting = true;
    this.canClose = false;
    this.progress = 0;

    const healPercent = this.getHealPercent();
    const duration = this.hours * 1000; // 1h = 1s
    const step = 100 / this.hours;

    this.restInterval = setInterval(() => {
      this.progress += step;
      if (this.progress >= 100) {
        clearInterval(this.restInterval);
        this.endRest(healPercent);
      }
    }, 1000);
  }

  /** 🔹 Termine le repos (ou interruption) */
  private endRest(healPercent: number): void {
    if (this.rollInterruption()) {
      this.interrupted = true;
      this.playerService.heal(healPercent * 0.5);
      this.playerService.restoreMana(healPercent * 0.5);
      setTimeout(() => this.mapService.triggerRandomEncounter(), 1000);
    } else {
      this.playerService.heal(healPercent);
      this.playerService.restoreMana(healPercent);
    }

    setTimeout(() => {
      this.canClose = true;
      this.closed.emit(); // 🚀 informe le parent que la fenêtre peut se fermer
    }, 1200);
  }

  /** 🔹 Calcule la récupération selon la durée et le lieu */
  getHealPercent(): number {
    const base = 12.5 * this.hours;
    const kind = this.mapService.currentOverlay;

    let bonus = 0;
    if (kind === OverlayKind.City) bonus = 0.1;
    else if (kind === OverlayKind.Village) bonus = 0.05;

    return Math.min(base * (1 + bonus), 100);
  }

  /** 🔹 Détermine la probabilité d’interruption */
  private rollInterruption(): boolean {
    const chance = this.getInterruptionChance();
    return Math.random() < chance;
  }

  private getInterruptionChance(): number {
    switch (this.mapService.currentOverlay) {
      case OverlayKind.City:
      case OverlayKind.Village:
      case OverlayKind.Farm:
        return 0;
      case OverlayKind.Forest:
      case OverlayKind.Mine:
        return 0.25;
      default:
        return 0.45;
    }
  }
}
