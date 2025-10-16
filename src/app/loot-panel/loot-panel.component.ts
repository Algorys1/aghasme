import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LootService, GroundItem } from '../services/loot.service';
import { InventoryService } from '../services/inventory.service';
import { MapService } from '../services/map.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-loot-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loot-panel.component.html',
  styleUrls: ['./loot-panel.component.scss']
})
export class LootPanelComponent implements OnInit {
  groundItems: GroundItem[] = [];
  selectedItem: GroundItem | null = null;

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
    });
  }  

  selectItem(item: GroundItem) {
    this.selectedItem =
      this.selectedItem?.id === item.id ? null : item;
  }

  takeItem(item: GroundItem) {
    const added = this.inventoryService.addItem(item.item);
    if (added) this.lootService.pickupItem(item.id);
    else alert('Inventory full!');
    if (this.selectedItem?.id === item.id) this.selectedItem = null;
  }

  takeAll() {
    this.groundItems.forEach(item => this.takeItem(item));
    this.selectedItem = null;
  }
}
