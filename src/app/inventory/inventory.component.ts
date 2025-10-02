import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../services/inventory.service';
import { BASE_ITEMS, Item } from '../models/items';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  items: (Item & { count?: number })[] = [];
  rows = 2;
  cols = 4;

  private subItems!: Subscription;
  private subSize!: Subscription;

  tooltipVisible = false;
  tooltipItem: Item | null = null;
  tooltipX = 0;
  tooltipY = 0;
  isMobile = false;

  constructor(private inventory: InventoryService) {}

  ngOnInit(): void {
    this.subItems = this.inventory.items$.subscribe((items) => {
      this.items = items;
    });

    this.subSize = this.inventory.size$.subscribe((size) => {
      this.rows = size.rows;
      this.cols = size.cols;
    });

    this.isMobile = window.innerWidth < 768;

    this.inventory.addItem(BASE_ITEMS[0]);
    this.inventory.addItem(BASE_ITEMS[3]);
    this.inventory.addItem(BASE_ITEMS[3]);
    this.inventory.addItem(BASE_ITEMS[4]);
  }

  ngOnDestroy(): void {
    this.subItems.unsubscribe();
    this.subSize.unsubscribe();
  }

  showTooltip(item: Item, event: MouseEvent): void {
    this.tooltipItem = item;
    this.tooltipVisible = true;
  
    if (!this.isMobile) {
      this.tooltipX = event.clientX + 10;
      this.tooltipY = event.clientY + 10;
    }
  }  

  hideTooltip(): void {
    this.tooltipVisible = false;
    this.tooltipItem = null;
  }

  getItemAt(index: number): (Item & { count?: number }) | null {
    return this.items[index] || null;
  }

  use(item: Item) {
    console.log(this.inventory.getItems())

    const result = this.inventory.useItem(item.id);
    if (result) {
      alert(result); // TODO: replace with in-game HUD message
    }
    this.hideTooltip();
    console.log(this.inventory.getItems())
  }

  remove(item: Item) {
    this.inventory.removeItem(item.id);
    this.hideTooltip();
  }
}
