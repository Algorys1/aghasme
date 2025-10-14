import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { InventoryService } from '../services/inventory.service';
import { LootService, GroundItem } from '../services/loot.service';
import { BASE_ITEMS, Item } from '../models/items';

@Component({
  selector: 'app-inventory-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-panel.component.html',
  styleUrls: ['./inventory-panel.component.scss'],
})
export class InventoryPanelComponent implements OnInit, OnDestroy {
  // === Données ===
  playerItems: (Item & { count: number })[] = [];
  groundItems: GroundItem[] = [];

  rows = 2;
  cols = 4;

  private subs: Subscription[] = [];

  constructor(
    private inventory: InventoryService,
    private loot: LootService
  ) {}

  ngOnInit(): void {
    // 🔹 Inventaire joueur
    this.subs.push(
      this.inventory.items$.subscribe(items => (this.playerItems = items))
    );

    // 🔹 Taille grille
    this.subs.push(
      this.inventory.size$.subscribe(size => {
        this.rows = size.rows;
        this.cols = size.cols;
      })
    );

    // 🔹 Loot au sol
    this.subs.push(
      this.loot.ground$.subscribe(loots => (this.groundItems = loots))
    );

    this.inventory.addItem(BASE_ITEMS[10]);
    this.inventory.addItem(BASE_ITEMS[25]);
    this.inventory.addItem(BASE_ITEMS[25]);
    this.inventory.addItem(BASE_ITEMS[56]);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  // === INVENTAIRE JOUEUR ===
  get slotIndexes(): number[] {
    return Array.from({ length: this.rows * this.cols }, (_, i) => i);
  }
  trackByIndex(_value: number, index: number): number {
    return index;
  }

  getItemAt(index: number): (Item & { count: number }) | null {
    return this.playerItems[index] || null;
  }

  useItem(item: Item) {
    const result = this.inventory.useItem(item.id);
    if (result) alert(result);
  }

  dropItem(item: Item) {
    console.log('📦 Dropping item:', item.name);
    this.inventory.removeItem(item.id);
    this.loot.dropItem(item, { q: 0, r: 0 }, 'player'); // TODO: remplacer coords par MapService
  }

  expandInventory() {
    this.inventory.expandInventory();
  }

  // === LOOT AU SOL ===
  takeItem(ground: GroundItem) {
    const added = this.inventory.addItem(ground.item);
    if (added) {
      this.loot.pickupItem(ground.id);
    } else {
      alert('Inventory full!');
    }
  }
}
