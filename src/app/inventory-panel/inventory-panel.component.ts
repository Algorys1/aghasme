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

    this.character = this.characterService.getCharacter();

    // TODO for test purpose
    this.inventory.expandInventory();
    this.inventory.expandInventory();
    this.inventory.addItem(BASE_ITEMS[8]);
    this.inventory.addItem(BASE_ITEMS[9]);
    this.inventory.addItem(BASE_ITEMS[10]);
    this.inventory.addItem(BASE_ITEMS[12]);
    this.inventory.addItem(BASE_ITEMS[26]);
    this.inventory.addItem(BASE_ITEMS[33]);
    this.inventory.addItem(BASE_ITEMS[33]);
    this.inventory.addItem(BASE_ITEMS[35]);
    this.inventory.addItem(BASE_ITEMS[60]);
    this.inventory.addItem(BASE_ITEMS[63]);
    this.inventory.addItem(BASE_ITEMS[58]);
    this.inventory.addItem(BASE_ITEMS[40]);
    this.inventory.addItem(BASE_ITEMS[42]);
    this.inventory.addItem(BASE_ITEMS[42]);
    this.inventory.addItem(BASE_ITEMS[42]);
    this.inventory.addItem(BASE_ITEMS[42]);
    this.inventory.addItem(BASE_ITEMS[8]);
    this.inventory.addItem(BASE_ITEMS[9]);
    this.inventory.addItem(BASE_ITEMS[10]);
    this.inventory.addItem(BASE_ITEMS[12]);
    this.inventory.addItem(BASE_ITEMS[26]);
    this.inventory.addItem(BASE_ITEMS[33]);
    this.inventory.addItem(BASE_ITEMS[33]);
    this.inventory.addItem(BASE_ITEMS[35]);
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
