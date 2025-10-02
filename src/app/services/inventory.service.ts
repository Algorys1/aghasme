// src/app/services/inventory.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, ItemType } from '../models/items';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private items: (Item & { count?: number })[] = [];

  // Taille inventaire (par défaut 2 lignes x 4 colonnes = 8 slots)
  private rows = 2;
  private cols = 4;

  private itemsSubject = new BehaviorSubject<(Item & { count?: number })[]>([]);
  public items$ = this.itemsSubject.asObservable();

  private sizeSubject = new BehaviorSubject<{ rows: number; cols: number }>({
    rows: this.rows,
    cols: this.cols,
  });
  public size$ = this.sizeSubject.asObservable();

  constructor() {}

  /** Retourne les items actuels */
  getItems(): (Item & { count?: number })[] {
    console.log('[Inventory] getItems =>', this.items);
    return [...this.items];
  }

  /** Ajoute un item (gère stackables) */
  addItem(newItem: Item): void {
    console.log('[Inventory] addItem', newItem);

    // Inventaire plein si pas stackable
    if (this.items.length >= this.rows * this.cols && !newItem.stackable) {
      console.warn('[Inventory] Inventory full!');
      return;
    }

    if (newItem.stackable) {
      const existing = this.items.find((i) => i.id === newItem.id);
      if (existing) {
        existing.count = (existing.count || 1) + 1;
      } else {
        this.items.push({ ...newItem, count: 1 });
      }
    } else {
      this.items.push({ ...newItem });
    }

    this.itemsSubject.next(this.getItems());
  }

  /** Retire un item (gère stackables) */
  removeItem(itemId: string): void {
    console.log('[Inventory] removeItem', itemId);

    const index = this.items.findIndex((i) => i.id === itemId);
    if (index !== -1) {
      const item = this.items[index];
      if (item.stackable && item.count && item.count > 1) {
        item.count -= 1;
      } else {
        this.items.splice(index, 1);
      }
      this.itemsSubject.next(this.getItems());
    }
  }

  /** Utilise un item (consommables, utilitaires...) */
  useItem(itemId: string): string | null {
    console.log('[Inventory] useItem', itemId);

    const item = this.items.find((i) => i.id === itemId);
    if (!item) {
      console.warn('[Inventory] Item not found:', itemId);
      return null;
    }

    let effectMessage: string | null = null;

    if (item.type === ItemType.Consumable || item.type === ItemType.Utility) {
      effectMessage = item.effect || `${item.name} used.`;
      this.removeItem(itemId);
    } else {
      console.log('[Inventory] Item not usable:', item.name);
    }

    return effectMessage;
  }

  /** Vide l'inventaire */
  clear(): void {
    console.log('[Inventory] clear');
    this.items = [];
    this.itemsSubject.next([]);
  }

  /** Augmente la taille de l’inventaire (ajoute une ligne) */
  expandInventory(): void {
    this.rows += 1;
    console.log('[Inventory] expandInventory =>', this.rows, 'rows');
    this.sizeSubject.next({ rows: this.rows, cols: this.cols });
  }
}
