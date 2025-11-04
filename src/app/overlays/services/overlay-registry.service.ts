import { Injectable } from '@angular/core';
import { OverlayKind } from '../models/overlays.model';
import { OverlayFactory } from '../factories/overlay.factory';

@Injectable({ providedIn: 'root' })
export class OverlayRegistryService {
  private assigned: Map<string, { kind: OverlayKind; coords: { q: number; r: number } }> = new Map();

  private coordsToId: Map<string, string> = new Map();
  private usedIds: Set<string> = new Set();

  constructor() {}

  getRandomAvailableId(kind: OverlayKind): string | undefined {
    const table = OverlayFactory.getTable(kind);
    if (!table || table.length === 0) {
      console.warn(`⚠️ Aucun overlay défini pour le type '${kind}'`);
      return undefined;
    }

    const available = table.filter(t => !this.usedIds.has(t.id));
    if (available.length === 0) {
      console.warn(`⚠️ Aucun overlay disponible pour le type '${kind}' (stock épuisé)`);
      return undefined;
    }

    const choice = available[Math.floor(Math.random() * available.length)];
    this.usedIds.add(choice.id);
    return choice.id;
  }

  register(id: string, kind: OverlayKind, coords: { q: number; r: number }): void {
    if (this.assigned.has(id)) return; // déjà assigné
    this.assigned.set(id, { kind, coords });
    this.coordsToId.set(`${coords.q},${coords.r}`, id);
  }

  getByCoords(q: number, r: number): { id: string; kind: OverlayKind } | undefined {
    const id = this.coordsToId.get(`${q},${r}`);
    if (!id) return undefined;
    const entry = this.assigned.get(id);
    if (!entry) return undefined;
    return { id, kind: entry.kind };
  }

  getById(id: string): { kind: OverlayKind; coords: { q: number; r: number } } | undefined {
    return this.assigned.get(id);
  }

  getRemainingStockSummary(): void {
    const summary: Record<string, number> = {};
    for (const kind of Object.values(OverlayKind)) {
      const table = OverlayFactory.getTable(kind);
      if (!table) continue;
      const remaining = table.filter(t => !this.usedIds.has(t.id)).length;
      if (remaining < table.length) summary[kind] = remaining;
    }

    console.groupCollapsed('📊 Stock restant après génération');
    console.table(summary);
    console.groupEnd();
  }

  // ============================================================
  // 🔹 RESET / SAVE
  // ============================================================

  reset(): void {
    this.assigned.clear();
    this.coordsToId.clear();
    this.usedIds.clear();
  }

  serialize(): any[] {
    return [...this.assigned.entries()].map(([id, data]) => ({
      id,
      kind: data.kind,
      coords: data.coords,
    }));
  }

  deserialize(data: any[]): void {
    this.reset();
    for (const entry of data) {
      this.register(entry.id, entry.kind, entry.coords);
      this.usedIds.add(entry.id);
    }
  }
}
