import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LootService, GroundItem } from '../services/loot.service';
import { InventoryService } from '../services/inventory.service';
import { MapService } from '../services/map.service';
import { BASE_ITEMS } from '../factories/item-tables';

@Component({
  selector: 'app-loot-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loot-panel.component.html',
  styleUrls: ['./loot-panel.component.scss']
})
export class LootPanelComponent implements OnInit {
  groundItems: GroundItem[] = [];

  constructor(
    public lootService: LootService,
    private inventoryService: InventoryService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.lootService.ground$.subscribe(loots => {
      this.groundItems = loots;
    });

    // TODO for Tests
    const item = BASE_ITEMS[56];
    this.lootService.dropItem(item, this.mapService.getPlayerPosition(), "player")
  }

  takeItem(item: GroundItem) {
    const added = this.inventoryService.addItem(item.item);
    if (added) this.lootService.pickupItem(item.id);
    else alert('Inventory full!');
  }

  takeAll() {
    this.groundItems.forEach(item => this.takeItem(item));
  }
}
