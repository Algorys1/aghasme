import { Injectable } from '@angular/core';
import { OverlayKind } from '../models/overlays.model';
import { OverlayFactory } from '../factories/overlay.factory';

/**
 * Service central pour gérer la distribution unique des overlays narratifs sur la carte.
 * - Tire des overlays à partir des tables de OverlayFactory
 * - Garantit qu'un même overlay ne sera jamais attribué deux fois
 * - Stocke uniquement les IDs, types et coordonnées
 */
@Injectable({ providedIn: 'root' })
export class OverlayRegistryService {

  /** Liste des overlays déjà assignés sur la carte */
  private assigned: Map<string, { kind: OverlayKind; coords: { q: number; r: number } }> = new Map();

  /** Index inverse : coordonnées → id */
  private coordsToId: Map<string, string> = new Map();

  /** IDs déjà utilisés (pour éviter tout doublon de tirage) */
  private usedIds: Set<string> = new Set();

  constructor() {}

  // ============================================================
  // 🔹 TIRAGE D'OVERLAY DISPONIBLE
  // ============================================================

  /**
   * Tire un ID aléatoire pour un type d'overlay donné (Ritual, Ruins, Tower...).
   * - Exclut les IDs déjà utilisés
   * - Retourne `undefined` si plus aucun overlay n'est disponible
   */
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
    console.log(`🎯 Overlay tiré : ${kind} → ${choice.id}`);
    return choice.id;
  }

  // ============================================================
  // 🔹 ENREGISTREMENT DU PLACEMENT
  // ============================================================

  /**
   * Enregistre la position d'un overlay tiré sur la carte.
   */
  register(id: string, kind: OverlayKind, coords: { q: number; r: number }): void {
    if (this.assigned.has(id)) return; // déjà assigné
    this.assigned.set(id, { kind, coords });
    this.coordsToId.set(`${coords.q},${coords.r}`, id);
    console.log(`🧭 Overlay placé : ${kind}/${id} @ (${coords.q},${coords.r})`);
  }

  // ============================================================
  // 🔹 CONSULTATION
  // ============================================================

  /**
   * Récupère l'overlay associé à une position donnée (si existant).
   */
  getByCoords(q: number, r: number): { id: string; kind: OverlayKind } | undefined {
    const id = this.coordsToId.get(`${q},${r}`);
    if (!id) return undefined;
    const entry = this.assigned.get(id);
    if (!entry) return undefined;
    return { id, kind: entry.kind };
  }

  /**
   * Retourne les coordonnées d'un overlay connu par son ID.
   */
  getById(id: string): { kind: OverlayKind; coords: { q: number; r: number } } | undefined {
    return this.assigned.get(id);
  }

  /**
   * Fournit un résumé du stock restant pour chaque type d'overlay.
   * (Utile pour équilibrer la génération)
   */
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
  // 🔹 RESET / SAUVEGARDE
  // ============================================================

  reset(): void {
    this.assigned.clear();
    this.coordsToId.clear();
    this.usedIds.clear();
    console.log('♻️ OverlayRegistry réinitialisé.');
  }

  /**
   * Permet d'exporter le registre (pour sauvegarde de partie)
   */
  serialize(): any[] {
    return [...this.assigned.entries()].map(([id, data]) => ({
      id,
      kind: data.kind,
      coords: data.coords,
    }));
  }

  /**
   * Restaure un registre depuis une sauvegarde.
   */
  deserialize(data: any[]): void {
    this.reset();
    for (const entry of data) {
      this.register(entry.id, entry.kind, entry.coords);
      this.usedIds.add(entry.id);
    }
    console.log(`💾 OverlayRegistry restauré (${data.length} entrées).`);
  }
}
