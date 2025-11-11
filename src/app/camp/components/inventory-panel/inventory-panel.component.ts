import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipSlot, Item, ItemType } from '../../../items/models/items.model';
import { InventoryService } from '../../services/inventory.service';
import { Character } from '../../../character/models/character.model';
import { CharacterService } from '../../../character/services/character.service';
import { BASE_ITEMS } from '../../../items/tables/item-tables';

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
  iconMap: Record<string, string> = {
    all: 'assets/ui/hud-inventory.png',
    equipment: 'assets/ui/hud-tab-equipment.png',
    consumable: 'assets/ui/hud-tab-consumable.png',
    resource: 'assets/ui/hud-tab-resource.png',
    utility: 'assets/ui/hud-tab-utility.png',
  };

  constructor(
    public inventory: InventoryService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.inventory.items$.subscribe(items => (this.items = items));
    this.inventory.equipped$.subscribe(eq => (this.equipped = eq));
    this.characterService.character$.subscribe(char => (this.character = char));

    this.character = this.characterService.getCharacter();
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
