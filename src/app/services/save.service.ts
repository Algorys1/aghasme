import { Injectable } from '@angular/core';
import { GameState } from '../models/game-state.model';
import { MapService, MapSnapshot } from './map.service';

@Injectable({ providedIn: 'root' })
export class SaveService {
  private storageKey = 'aghasme_saves';

  constructor(private map: MapService) {}

  saveGame(state: GameState, slot: string = 'autosave'): void {
    const saves = this.loadAllSaves();
    saves[slot] = state;
    localStorage.setItem(this.storageKey, JSON.stringify(saves));
  }

  loadGame(slot: string = 'autosave'): GameState | null {
    const saves = this.loadAllSaves();
    return saves[slot] ?? null;
  }

  hasSave(slot: string = 'autosave'): boolean {
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

  /**
   * Étape 1 : exporte uniquement la carte dans un fichier .json
   * (Non cassant : n’interfère pas avec ta sauvegarde existante si tu en as une)
   */
  public exportMapToFile(filename: string = 'save_map.json'): void {
    const snapshot: MapSnapshot = this.map.serializeMap();

    const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = filename;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Étape 1 : importe un fichier JSON et recharge la carte à l’identique
   */
  public async importMapFromFile(file: File): Promise<void> {
    const json = await this.readFileAsText(file);
    let data: unknown;
    try {
      data = JSON.parse(json);
    } catch {
      throw new Error('Le fichier de sauvegarde est invalide (JSON illisible).');
    }

    // Validation minimale du format
    const snapshot = this.ensureMapSnapshotShape(data);

    await this.map.loadFromSnapshot(snapshot);
  }

  // --- Helpers privés ---

  private readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result ?? ''));
      fr.onerror = () => reject(fr.error ?? new Error('Lecture fichier échouée'));
      fr.readAsText(file);
    });
  }

  private ensureMapSnapshotShape(data: any): MapSnapshot {
    if (!data || typeof data !== 'object') {
      throw new Error('Sauvegarde invalide : structure manquante.');
    }
    if (data.version !== 1 || !Array.isArray(data.tiles)) {
      throw new Error('Sauvegarde invalide : version/tiles manquants.');
    }
    // Optionnel : validations plus strictes sur chaque tuile
    return data as MapSnapshot;
  }
}
