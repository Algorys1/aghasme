import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EquipSlot, Item, ItemType } from '../models/items';
import { CharacterService } from './character.service';
import { LootService } from './loot.service';
import { MapService } from './map.service';
import { Effect } from '../models/effect.model';
import { applyEffectsToEntity, resolveCharacterStats } from '../tools/effect-utils';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private items: (Item & { count: number })[] = [];

  private rows = 2;
  private cols = 4;

  private itemsSubject = new BehaviorSubject<(Item & { count: number })[]>([]);
  public items$ = this.itemsSubject.asObservable();

  private equippedItemsSubject = new BehaviorSubject<Record<EquipSlot, Item | null>>({
    [EquipSlot.Head]: null,
    [EquipSlot.Torso]: null,
    [EquipSlot.Hand1]: null,
    [EquipSlot.Hand2]: null,
    [EquipSlot.Feet]: null,
    [EquipSlot.Accessory1]: null,
    [EquipSlot.Accessory2]: null,
    [EquipSlot.Weapon1]: null,
    [EquipSlot.Weapon2]: null,
  });
  equipped$ = this.equippedItemsSubject.asObservable();

  private sizeSubject = new BehaviorSubject<{ rows: number; cols: number }>({
    rows: this.rows,
    cols: this.cols,
  });
  public size$ = this.sizeSubject.asObservable();

  private errorSubject = new Subject<string>();
  public errors$ = this.errorSubject.asObservable();

  constructor(
    private characterService: CharacterService,
    private lootService: LootService,
    private mapService: MapService
  ) {}

  getItems(): (Item & { count: number })[] {
    return [...this.items];
  }

  get maxSlots(): number {
    return this.rows * this.cols;
  }

  get usedSlots(): number {
    return this.items.length;
  }

  addItem(newItem: Item & { count?: number }): boolean {
    newItem.instanceId = crypto.randomUUID();
    const quantity = newItem.count && newItem.count > 0 ? newItem.count : 1;

    if (newItem.stackable) {
      const existing = this.items.find((i) => i.id === newItem.id);
      if (existing) {
        existing.count += quantity;
        this.itemsSubject.next(this.getItems());
        return true;
      } else {
        if (this.usedSlots >= this.maxSlots) {
          this.errorSubject.next('Inventaire plein');
          return false;
        }
        this.items.push({ ...newItem, count: quantity });
        this.itemsSubject.next(this.getItems());
        return true;
      }
    }

    for (let i = 0; i < quantity; i++) {
      if (this.usedSlots >= this.maxSlots) {
        this.errorSubject.next('Inventaire plein');
        if (i === 0) return false;
        break;
      }
      this.items.push({ ...newItem, count: 1, instanceId: crypto.randomUUID() });
    }

    this.itemsSubject.next(this.getItems());
    return true;
  }

  dropItem(item: Item): boolean {
    const removed = this.removeItem(item.id);
    if (!removed) return false;

    const pos = this.mapService.getPlayerPosition();
    this.lootService.dropItem(item, pos, 'player');
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
      this.errorSubject.next(`Item no usable: ${item.name}`);
    }

    return effectMessage;
  }

  clear(): void {
    this.items = [];
    this.itemsSubject.next([]);
  }

  equipItem(item: Item) {
    if (!item.equipSlot) return;
    const current = { ...this.equippedItemsSubject.value };

    let equipped = false;
    for (const slot of item.equipSlot) {
      if (!current[slot]) {
        current[slot] = item;
        equipped = true;
        break;
      }
    }

    if (!equipped) {
      this.errorSubject.next(`No available slot for ${item.name}`);
      return;
    }

    this.equippedItemsSubject.next(current);
    this.removeItem(item.id);

    this.recalculateCharacterStats();

    return `Equipped ${item.name}`;
  }

  unequipItem(slot: EquipSlot) {
    const current = { ...this.equippedItemsSubject.value };
    const item = current[slot];
    if (!item) return;

    current[slot] = null;
    this.equippedItemsSubject.next(current);
    this.addItem(item);

    this.recalculateCharacterStats();

    return `Unequipped ${item.name}`;
  }

  recalculateCharacterStats() {
    const char = this.characterService.getCharacter();
    if (!char || !char.baseStats) return;

    const equipped = this.equippedItemsSubject.value;

    const effects: Effect[] = [];
    Object.values(equipped).forEach(item => {
      if (item?.effects?.length) {
        effects.push(...item.effects);
      }
    });

    const base = {
      attack: char.baseStats.attack,
      defense: char.baseStats.defense,
      maxHp: char.baseStats.maxHp,
      maxMp: char.baseStats.maxMp,
    };

    const modified = applyEffectsToEntity(base, effects);

    const newHp = Math.min(char.hp, modified.maxHp);
    const newMp = Math.min(char.mp, modified.maxMp);

    console.log('💥 Base stats:', char.baseStats);
    console.log('💥 Modified stats:', modified);

    this.characterService.setCharacter({
      ...char,
      ...modified,
      hp: newHp,
      mp: newMp,
    });
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
