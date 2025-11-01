import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../services/inventory.service';
import { CharacterService } from '../../services/character.service';
import { EquipSlot, Item } from '../../models/items';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-equipment-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment-panel.component.html',
  styleUrls: ['./equipment-panel.component.scss'],
})
export class EquipmentPanelComponent implements OnInit {
  equipSlots = Object.values(EquipSlot);
  equipped: Record<EquipSlot, Item | null> = {} as any;
  character: Character | null = null;
  showComparison: boolean = false;
  comparisonTarget: Item | null = null;

  constructor(
    private inventory: InventoryService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.inventory.equipped$.subscribe(eq => (this.equipped = eq));
    this.characterService.character$.subscribe(char => (this.character = char));
    this.character = this.characterService.getCharacter();
  }

  unequip(slot: EquipSlot) {
    this.inventory.unequipItem(slot);
  }

  compare(slot: EquipSlot) {
    this.showComparison = true;
    this.comparisonTarget = this.equipped[slot];
  }
}
