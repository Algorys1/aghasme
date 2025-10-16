import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EquipSlot, Item, ItemType } from '../models/items';
import { CharacterService } from './character.service';

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

  constructor(private characterService: CharacterService) {}

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
    newItem.instanceId = crypto.randomUUID();
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

  equipItem(item: Item) {
    if (!item.equipSlot) return;
    const current = this.equippedItemsSubject.value;
  
    for (const slot of item.equipSlot) {
      if (!current[slot]) {
        current[slot] = item;
        this.equippedItemsSubject.next({ ...current });
        this.removeItem(item.id);
        this.applyItemEffects();
        return `Equipped ${item.name}`;
      }
    }
    return `No available slot for ${item.name}`;
  }  
  
  unequipItem(slot: EquipSlot) {
    const current = this.equippedItemsSubject.value;
    const item = current[slot];
    if (item) {
      this.addItem(item);
      this.removeItemEffects();
      current[slot] = null;
      this.equippedItemsSubject.next({ ...current });
    }
  }
  
  private applyItemEffects(): void {
    this.recalculateCharacterStats();
  }
  
  private removeItemEffects(): void {
    this.recalculateCharacterStats();
  }  

  recalculateCharacterStats() {
    const char = this.characterService.getCharacter();
    const equipped = this.equippedItemsSubject.value;
    if (!char || !char.baseStats) return;
  
    // Reset to base stats  
    char.attack = char.baseStats.attack;
    char.defense = char.baseStats.defense;
    char.maxHp = char.baseStats.maxHp;
    char.maxMp = char.baseStats.maxMp;
  
    // Apply all equipped item effects
    Object.values(equipped).forEach(item => {
      if (!item?.effects) return;
      item.effects.forEach(effect => {
        switch (effect.stat) {
          case 'hp': char.maxHp += effect.value; break;
          case 'mp': char.maxMp += effect.value; break;
          case 'atk': char.attack += effect.value; break;
          case 'def': char.defense += effect.value; break;
          default: break;
        }
      });
    });
  
    // Adjust current HP/MP if max changed
    char.hp = Math.min(char.hp, char.maxHp);
    char.mp = Math.min(char.mp, char.maxMp);
  
    this.characterService.setCharacter(char);
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
