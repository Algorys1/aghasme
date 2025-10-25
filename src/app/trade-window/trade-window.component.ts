import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActionService } from '../services/action.service';
import { TradeService } from '../services/trade.service';
import { CharacterService } from '../services/character.service';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/items';

@Component({
  selector: 'app-trade-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trade-window.component.html',
  styleUrls: ['./trade-window.component.scss']
})
export class TradeWindowComponent implements OnInit, OnDestroy {
  show = false;
  tab: 'shop' | 'inventory' = 'shop';
  selectedItem: (Item & { count: number }) | null = null;

  qtyPopup = false;
  qty = 1;
  qtyMax = 1;
  qtyMode: 'buy' | 'sell' = 'buy';

  sessionSub?: Subscription;

  merchantItems: (Item & { count: number })[] = [];
  playerItems: (Item & { count: number })[] = [];

  logMessage: string | null = null;
  logTimeout?: any;

  constructor(
    public tradeService: TradeService,
    private actionService: ActionService,
    private characterService: CharacterService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.sessionSub = this.tradeService.session$.subscribe(session => {
      this.show = !!session;
      this.selectedItem = null;

      if (session) {
        this.merchantItems = session.merchantItems;
        this.refreshPlayerInventory();
      }
    });
  }

  ngOnDestroy(): void {
    this.sessionSub?.unsubscribe();
  }

  private refreshPlayerInventory(): void {
    this.playerItems = this.inventoryService.getItems();
  }

  private setMessage(msg: string) {
    this.logMessage = msg;
    clearTimeout(this.logTimeout);
    this.logTimeout = setTimeout(() => (this.logMessage = null), 4000);
  }

  close(): void {
    this.tradeService.closeTrade();
    this.actionService.closeOverlay$.next();
  }

  setTab(tab: 'shop' | 'inventory'): void {
    this.tab = tab;
    this.selectedItem = null;
  }

  selectItem(item: Item & { count: number }): void {
    this.selectedItem = item;
  }

  buyPrice(item: Item): number {
    return this.tradeService.getBuyPrice(item);
  }

  sellPrice(item: Item): number {
    return this.tradeService.getSellPrice(item);
  }

  buy(): void {
    if (!this.selectedItem) return;
    const it = this.selectedItem;
    const maxByGold = Math.floor(this.characterService.getCharacter()!.gold / this.buyPrice(it));
    const maxByStock = it.count;
    const max = Math.min(maxByGold, maxByStock);

    if (max <= 1 || !it.stackable) {
      const result = this.tradeService.buy(it, this.qty);
      if (result === null) {
        const label = it.stackable && this.qty > 1
          ? `${this.qty} × ${it.name} purchased`
          : `${it.name} purchased`;
        this.setMessage(`✅ ${label}`);
      } else {
        this.setMessage(`❌ ${result}`);
      }
      return;
    }

    this.qtyPopup = true;
    this.qty = 1;
    this.qtyMax = max;
    this.qtyMode = 'buy';
  }

  sell(): void {
    if (!this.selectedItem) return;
    const it = this.selectedItem;
    const owned = this.playerItems.find(i => i.id === it.id)?.count ?? 0;
    const max = Math.min(owned, 99);
    if (max <= 1 || !it.stackable) {
      const result = this.tradeService.sell(it, this.qty);
      if (result === null) {
        const label = it.stackable && this.qty > 1
          ? `${this.qty} × ${it.name} sold`
          : `${it.name} sold`;
        this.setMessage(`💰 ${label}`);
      } else {
        this.setMessage(`❌ ${result}`);
      }

      return;
    }

    this.qtyPopup = true;
    this.qty = 1;
    this.qtyMax = max;
    this.qtyMode = 'sell';
  }

  inc(): void {
    if (this.qty < this.qtyMax) this.qty++;
  }
  dec(): void {
    if (this.qty > 1) this.qty--;
  }

  confirmQty(): void {
    if (!this.selectedItem) return;
    const it = this.selectedItem;

    if (this.qtyMode === 'buy') {
      const result = this.tradeService.buy(it, this.qty);
      if (result === null) {
        const label = it.stackable && this.qty > 1
          ? `${this.qty} × ${it.name} purchased`
          : `${it.name} purchased`;
        this.setMessage(`✅ ${label}`);
      } else {
        this.setMessage(`❌ ${result}`);
      }
    } else {
      const result = this.tradeService.sell(it, this.qty);
      if (result === null) {
        const label = it.stackable && this.qty > 1
          ? `${this.qty} × ${it.name} sold`
          : `${it.name} sold`;
        this.setMessage(`💰 ${label}`);
      } else {
        this.setMessage(`❌ ${result}`);
      }
    }

    this.qtyPopup = false;
    this.refreshPlayerInventory();
  }

  cancelQty(): void {
    this.qtyPopup = false;
  }

  get gold(): number {
    return this.characterService.getCharacter()?.gold ?? 0;
  }

  canBuy(): boolean {
    if (!this.selectedItem) return false;
    return this.gold >= this.buyPrice(this.selectedItem) && this.selectedItem.count > 0;
  }

  canSell(): boolean {
    if (!this.selectedItem) return false;
    const owned = this.playerItems.find(i => i.id === this.selectedItem!.id)?.count ?? 0;
    return owned > 0;
  }
}
