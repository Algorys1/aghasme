import { Injectable } from '@angular/core';
import { GameState } from '../models/game-state.model';

/**
 * Service de gestion des sauvegardes locales (Android friendly)
 * 
 * Gère :
 *  - Sauvegarde complète du jeu (carte + joueur + stats) dans localStorage
 *  - Chargement / suppression / listing des sauvegardes
 */
@Injectable({ providedIn: 'root' })
export class SaveService {
  private readonly storageKey = 'aghasme_saves';

  constructor() {}

  // === SAUVEGARDE LOCALE =====================================================

  /** Sauvegarde complète du jeu (GameState) dans le localStorage. */
  public saveGame(state: GameState, slot: string = 'autosave'): void {
    const saves = this.loadAllSaves();
    saves[slot] = state;
    localStorage.setItem(this.storageKey, JSON.stringify(saves));
    console.log(`💾 Sauvegarde '${slot}' enregistrée (${new Date(state.timestamp).toLocaleString()})`);
  }

  /** Charge une sauvegarde complète depuis le localStorage. */
  public loadGame(slot: string = 'autosave'): GameState | null {
    const saves = this.loadAllSaves();
    return saves[slot] ?? null;
  }

  /** Vérifie si une sauvegarde existe. */
  public hasSave(slot: string = 'autosave'): boolean {
    return !!this.loadGame(slot);
  }

  /** Liste tous les slots de sauvegarde disponibles. */
  public getSaveSlots(): { slot: string; state: GameState }[] {
    return Object.entries(this.loadAllSaves()).map(([slot, state]) => ({
      slot,
      state: state as GameState
    }));
  }

  /** Supprime un slot de sauvegarde. */
  public deleteSave(slot: string): void {
    const saves = this.loadAllSaves();
    delete saves[slot];
    localStorage.setItem(this.storageKey, JSON.stringify(saves));
    console.log(`🗑️ Sauvegarde '${slot}' supprimée`);
  }

  // === OUTILS INTERNES =======================================================

  /** Lecture de toutes les sauvegardes du localStorage. */
  private loadAllSaves(): Record<string, GameState> {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      console.error('❌ Erreur de lecture des sauvegardes locales :', err);
      return {};
    }
  }
}
