import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryPanelComponent } from '../inventory-panel/inventory-panel.component';
import { CharacterPanelComponent } from '../character-panel/character-panel.component';
import { EquipmentPanelComponent } from '../equipment-panel/equipment-panel.component';
import { MinimapComponent } from "../minimap-panel/minimap.component";

export type Tabs = 'inventory' | 'equipment' | 'character'  | 'minimap';

@Component({
  selector: 'app-player-panel',
  standalone: true,
  imports: [CommonModule, InventoryPanelComponent, CharacterPanelComponent, EquipmentPanelComponent, MinimapComponent],
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss'],
})
export class PlayerPanelComponent {
  tab: Tabs = 'inventory';

  switchTab(tab: Tabs) {
    this.tab = tab;
  }
}
