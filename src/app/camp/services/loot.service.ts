import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../items/models/items.model';

export interface GroundItem {
  id: string;
  item: Item & { count?: number };
  count: number;
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

  dropItem(
    item: Item,
    pos: { q: number; r: number },
    source: 'enemy' | 'player' = 'player',
    quantity: number = 1
  ): void {
    const existing = this.ground.find(
      g =>
        g.pos.q === pos.q &&
        g.pos.r === pos.r &&
        g.item.id === item.id &&
        item.stackable
    );

    if (existing) {
      existing.count += quantity;
    } else {
      const dropped: GroundItem = {
        id: crypto.randomUUID(),
        item: { ...item },
        count: quantity,
        pos,
        source,
      };
      this.ground.push(dropped);
    }

    this.emitChange();
  }

  pickupItem(groundId: string): Item | null {
    const index = this.ground.findIndex(g => g.id === groundId);
    if (index === -1) return null;

    const [picked] = this.ground.splice(index, 1);
    this.emitChange();
    return picked.item;
  }

  reduceGroundItemCount(groundId: string, amount: number): void {
    const groundItem = this.ground.find(g => g.id === groundId);
    if (!groundItem) return;

    groundItem.count -= amount;
    if (groundItem.count <= 0) {
      this.ground = this.ground.filter(g => g.id !== groundId);
    }

    this.emitChange();
  }

  getItemsAt(pos: { q: number; r: number }): GroundItem[] {
    return this.ground.filter(g => g.pos.q === pos.q && g.pos.r === pos.r);
  }

  getAllGroundItems(): GroundItem[] {
    return [...this.ground];
  }

  restoreGroundItems(items: GroundItem[]): void {
    this.ground = [...items];
    this.emitChange();
  }

  clearAt(pos: { q: number; r: number }): void {
    this.ground = this.ground.filter(
      g => !(g.pos.q === pos.q && g.pos.r === pos.r)
    );
    this.emitChange();
  }

  clearAll(): void {
    this.ground = [];
    this.emitChange();
  }

  private emitChange(): void {
    this.groundSubject.next([...this.ground]);
  }
}
