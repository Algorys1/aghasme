import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LootService, GroundItem } from '../../services/loot.service';
import { InventoryService } from '../../../camp/services/inventory.service';
import { MapService } from '../../../game/services/map.service';
import { combineLatest } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loot-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loot-panel.component.html',
  styleUrls: ['./loot-panel.component.scss']
})
export class LootPanelComponent implements OnInit {
  groundItems: GroundItem[] = [];
  selectedItem: GroundItem | null = null;

  showQuantitySelector = false;
  quantityToTake = 1;
  maxQuantity = 1;
  itemPendingTake: GroundItem | null = null;

  constructor(
    private lootService: LootService,
    private inventoryService: InventoryService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.lootService.ground$,
      this.mapService.playerMoved
    ]).subscribe(([loots, pos]) => {
      this.groundItems = loots.filter(
        g => g.pos.q === pos.q && g.pos.r === pos.r
      );
      console.log("Ground items", this.groundItems)
    });
  }

  selectItem(item: GroundItem) {
    this.selectedItem = this.selectedItem?.id === item.id ? null : item;

    if (item.item.stackable && item.count > 1) {
      this.showQuantitySelector = true;
      this.quantityToTake = 1;
      this.maxQuantity = item.count;
      this.itemPendingTake = item;
    } else {
      this.showQuantitySelector = false;
      this.itemPendingTake = null;
    }
  }

  takeItem(item: GroundItem) {
    const added = this.inventoryService.addItem(item.item);
    if (added) this.lootService.pickupItem(item.id);
    else alert('Inventory full!');
    if (this.selectedItem?.id === item.id) this.selectedItem = null;
  }

  confirmTake() {
    if (!this.itemPendingTake) return;

    const toTake = this.quantityToTake;
    const sourceItem = this.itemPendingTake.item;
    const added = this.inventoryService.addItem({ ...sourceItem, count: toTake });

    if (added) {
      this.lootService.reduceGroundItemCount(this.itemPendingTake.id, toTake);
    }

    this.showQuantitySelector = false;
    this.itemPendingTake = null;
    this.selectedItem = null;
  }

  takeAll() {
    this.groundItems.forEach(item => this.takeItem(item));
    this.selectedItem = null;
  }
}
