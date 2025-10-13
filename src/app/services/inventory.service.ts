import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Item, ItemType } from '../models/items';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private items: (Item & { count: number })[] = [];

  private rows = 2;
  private cols = 4;

  private itemsSubject = new BehaviorSubject<(Item & { count: number })[]>([]);
  public items$ = this.itemsSubject.asObservable();

  private sizeSubject = new BehaviorSubject<{ rows: number; cols: number }>({
    rows: this.rows,
    cols: this.cols,
  });
  public size$ = this.sizeSubject.asObservable();

  private errorSubject = new Subject<string>();
  public errors$ = this.errorSubject.asObservable();

  constructor() {}

  /** Retourne les items actuels */
  getItems(): (Item & { count: number })[] {
    return [...this.items];
  }

  private get maxSlots(): number {
    return this.rows * this.cols;
  }

  get usedSlots(): number {
    return this.items.length;
  }

  addItem(newItem: Item): boolean {
    if (newItem.stackable) {
      const existing = this.items.find((i) => i.id === newItem.id);
      if (existing) {
        existing.count += 1;
        this.itemsSubject.next(this.getItems());
        return true;
      } else {
        if (this.usedSlots >= this.maxSlots) {
          this.errorSubject.next('Inventaire plein');
          return false;
        }
        this.items.push({ ...newItem, count: 1 });
        this.itemsSubject.next(this.getItems());
        return true;
      }
    }

    if (this.usedSlots >= this.maxSlots) {
      this.errorSubject.next('Inventaire plein');
      return false;
    }

    this.items.push({ ...newItem, count: 1 });
    this.itemsSubject.next(this.getItems());
    return true;
  }

  removeItem(itemId: string): boolean {
    const index = this.items.findIndex((i) => i.id === itemId);
    if (index === -1) {
      return false;
    }

    const item = this.items[index];
    if (item.stackable && item.count > 1) {
      item.count -= 1;
    } else {
      this.items.splice(index, 1);
    }

    this.itemsSubject.next(this.getItems());
    return true;
  }

  useItem(itemId: string): string | null {
    const item = this.items.find((i) => i.id === itemId);
    if (!item) {
      this.errorSubject.next('Cannot find item'); 
      return null;
    }

    let effectMessage: string | null = null;

    if (item.type === ItemType.Consumable || item.type === ItemType.Utility) {
      effectMessage = `${item.effects}` || `${item.name} used.`;
      this.removeItem(itemId);
    } else {
      this.errorSubject.next(`Item non utilisable: ${item.name}`);
    }

    return effectMessage;
  }

  clear(): void {
    this.items = [];
    this.itemsSubject.next([]);
  }

  expandInventory(): void {
    this.rows += 1;
    this.sizeSubject.next({ rows: this.rows, cols: this.cols });
  }

  setGridSize(rows: number, cols: number): void {
    this.rows = rows;
    this.cols = cols;
    this.sizeSubject.next({ rows: this.rows, cols: this.cols });
  }

  refresh(): void {
    this.itemsSubject.next(this.getItems());
  }
}
