import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/items';

export interface GroundItem {
  id: string;
  item: Item;
  pos: { q: number; r: number };
  source?: 'enemy' | 'player';
}

@Injectable({
  providedIn: 'root',
})
export class LootService {
  private ground: GroundItem[] = [];
  private groundSubject = new BehaviorSubject<GroundItem[]>([]);
  public ground$ = this.groundSubject.asObservable();

  constructor() {}

  /** Drop item on ground */
  dropItem(item: Item, pos: { q: number; r: number }, source: 'enemy' | 'player' = 'player'): void {
    const dropped: GroundItem = {
      id: crypto.randomUUID(),
      item,
      pos,
      source,
    };
    this.ground.push(dropped);
    this.emitChange();
    console.log(`💎 Item dropped: ${item.name} at (${pos.q}, ${pos.r})`);
  }

  /** Get item on ground by ID */
  pickupItem(groundId: string): Item | null {
    const index = this.ground.findIndex((g) => g.id === groundId);
    if (index === -1) return null;

    const [picked] = this.ground.splice(index, 1);
    this.emitChange();
    return picked.item;
  }

  /** Return all items for a position */
  getItemsAt(pos: { q: number; r: number }): GroundItem[] {
    return this.ground.filter((g) => g.pos.q === pos.q && g.pos.r === pos.r);
  }

  /** Remove all loots for a given slot (after fight for example) */
  clearAt(pos: { q: number; r: number }): void {
    this.ground = this.ground.filter((g) => !(g.pos.q === pos.q && g.pos.r === pos.r));
    this.emitChange();
  }

  /** Clean all ground */
  clearAll(): void {
    this.ground = [];
    this.emitChange();
  }

  /** Force update of UI */
  private emitChange(): void {
    this.groundSubject.next([...this.ground]);
  }
}
