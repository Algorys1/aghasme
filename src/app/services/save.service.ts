import { Injectable } from '@angular/core';
import { GameState } from '../models/game-state.model';

@Injectable({ providedIn: 'root' })
export class SaveService {
  private storageKey = 'aghasme_saves';

  /** Sauve le jeu dans un slot (par défaut: "last") */
  saveGame(state: GameState, slot: string = 'last'): void {
    const saves = this.loadAllSaves();
    saves[slot] = state;
    localStorage.setItem(this.storageKey, JSON.stringify(saves));
    console.log(`[SaveService] saved to slot "${slot}"`, state);
  }

  /** Charge un slot (par défaut: "last") */
  loadGame(slot: string = 'last'): GameState | null {
    const saves = this.loadAllSaves();
    return saves[slot] ?? null;
  }

  /** Indique si un slot existe (par défaut: "last") */
  hasSave(slot: string = 'last'): boolean {
    return this.loadGame(slot) !== null;
  }

  getSaveSlots(): { slot: string; state: GameState }[] {
    const saves = this.loadAllSaves();
    return Object.entries(saves).map(([slot, state]) => ({ slot, state: state as GameState }));
  }

  deleteSave(slot: string): void {
    const saves = this.loadAllSaves();
    delete saves[slot];
    localStorage.setItem(this.storageKey, JSON.stringify(saves));
  }

  private loadAllSaves(): Record<string, GameState> {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : {};
  }
}
