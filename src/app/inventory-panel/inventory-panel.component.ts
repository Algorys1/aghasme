import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipSlot, Item } from '../models/items';
import { InventoryService } from '../services/inventory.service';
import { Character } from '../models/character.model';
import { CharacterService } from '../services/character.service';
import { BASE_ITEMS } from '../factories/item-tables';

@Component({
  selector: 'app-inventory-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-panel.component.html',
  styleUrls: ['./inventory-panel.component.scss'],
})
export class InventoryPanelComponent {
  equipSlots = Object.values(EquipSlot);
  equipped: Record<EquipSlot, Item | null> = {} as any;

  items: (Item & { count?: number })[] = [];
  selectedItem: Item | null = null;

  character: Character | null = null;

  constructor(
    public inventory: InventoryService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.inventory.items$.subscribe(items => (this.items = items));
    this.inventory.equipped$.subscribe(eq => (this.equipped = eq));

    this.characterService.character$.subscribe(char => {
      this.character = char;
    });
    
    this.character = this.characterService.getCharacter();
    // FOR TESTING PURPOSE
    if (!this.inventory.getItems().length) {
      this.loadtestInventory();
    }
  }

  loadtestInventory() {
    this.inventory.addItem(BASE_ITEMS[2]);
    this.inventory.addItem(BASE_ITEMS[9]);
    this.inventory.addItem(BASE_ITEMS[10]);
    this.inventory.addItem(BASE_ITEMS[35]);
    this.inventory.addItem(BASE_ITEMS[60]);
    this.inventory.addItem(BASE_ITEMS[63]);
  }

  selectItem(item: any) {
    this.selectedItem = item;
  }

  clearSelection() {
    this.selectedItem = null;
  }

  useItem() {
    if (!this.selectedItem) return;
    const result = this.inventory.useItem(this.selectedItem.id);
    if (result) alert(result);
  }

  unequip(slot: EquipSlot) {
    this.inventory.unequipItem(slot);
  }
}
