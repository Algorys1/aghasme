import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipSlot, Item, ItemType } from '../../models/items';
import { InventoryService } from '../../services/inventory.service';
import { Character } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';
import { BASE_ITEMS } from '../../factories/item-tables';

type InventoryFilter = 'all' | 'equipment' | 'consumable' | 'resource' | 'utility';

@Component({
  selector: 'app-inventory-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-panel.component.html',
  styleUrls: ['./inventory-panel.component.scss'],
})
export class InventoryPanelComponent implements OnInit {
  equipSlots = Object.values(EquipSlot);
  equipped: Record<EquipSlot, Item | null> = {} as any;
  items: (Item & { count?: number })[] = [];
  selectedItem: Item | null = null;
  character: Character | null = null;

  activeFilter: InventoryFilter = 'all';
  filterOptions: InventoryFilter[] = ['all', 'equipment', 'consumable', 'resource', 'utility'];

  constructor(
    public inventory: InventoryService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.inventory.items$.subscribe(items => (this.items = items));
    this.inventory.equipped$.subscribe(eq => (this.equipped = eq));
    this.characterService.character$.subscribe(char => (this.character = char));

    this.character = this.characterService.getCharacter();
    if (!this.inventory.getItems().length) {
      this.loadtestInventory();
    }
  }

  get filteredItems() {
    if (this.activeFilter === 'all') return this.items;

    switch (this.activeFilter) {
      case 'equipment':
        return this.items.filter(i =>
          [ItemType.WeaponMelee, ItemType.WeaponRange, ItemType.Armor, ItemType.Accessory].includes(i.type)
        );
      case 'consumable':
        return this.items.filter(i => i.type === ItemType.Consumable);
      case 'resource':
        return this.items.filter(i => i.type === ItemType.Resource);
      case 'utility':
        return this.items.filter(i => i.type === ItemType.Utility);
      default:
        return this.items;
    }
  }

  selectFilter(filter: InventoryFilter) {
    this.activeFilter = filter;
    this.selectedItem = null;
  }

  loadtestInventory() {
    this.inventory.addItem(BASE_ITEMS[2]);
    this.inventory.addItem(BASE_ITEMS[9]);
    this.inventory.addItem(BASE_ITEMS[10]);
    this.inventory.addItem(BASE_ITEMS[34]);
    this.inventory.addItem(BASE_ITEMS[35]);
    this.inventory.addItem(BASE_ITEMS[60]);
    this.inventory.addItem(BASE_ITEMS[63]);
  }

  selectItem(item: Item) {
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
