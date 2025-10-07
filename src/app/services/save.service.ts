import { Injectable } from '@angular/core';
import { GameState } from '../models/game-state.model';

@Injectable({ providedIn: 'root' })
export class SaveService {
  private readonly storageKey = 'aghasme_saves';

  /** Sauvegarde complète du jeu (GameState) dans un slot */
  public saveGame(state: GameState, slot: string): void {
    const saves = this.loadAllSaves();
    saves[slot] = structuredClone(state);
    localStorage.setItem(this.storageKey, JSON.stringify(saves));
    console.log(`💾 Sauvegarde '${slot}' enregistrée (${new Date(state.timestamp).toLocaleString()})`);
  }

  /** Charge la sauvegarde d’un slot donné */
  public loadGame(slot: string): GameState | null {
    const saves = this.loadAllSaves();
    return saves[slot] ? structuredClone(saves[slot]) : null;
  }

  /** Liste tous les slots existants */
  public getSaveSlots(): { slot: string; state: GameState }[] {
    return Object.entries(this.loadAllSaves()).map(([slot, state]) => ({
      slot,
      state: state as GameState
    }));
  }

  /** Supprime un slot */
  public deleteSave(slot: string): void {
    const saves = this.loadAllSaves();
    delete saves[slot];
    localStorage.setItem(this.storageKey, JSON.stringify(saves));
  }

  /** Lecture interne */
  private loadAllSaves(): Record<string, GameState> {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error('❌ Erreur lecture sauvegardes', e);
      return {};
    }
  }
}
