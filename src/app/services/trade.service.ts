import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CharacterService } from './character.service';
import { InventoryService } from './inventory.service';
import { OverlayKind } from '../models/overlays.model';
import { Item } from '../models/items';
import { ItemFactory } from '../factories/item.factory';

export enum ShopType {
  General = 'general',
  Blacksmith = 'blacksmith',
  Alchemist = 'alchemist',
  Magic = 'magic',
}

export const OverlayShopMap: Record<OverlayKind, ShopType[]> = {
  [OverlayKind.City]: [ShopType.General, ShopType.Blacksmith, ShopType.Alchemist, ShopType.Magic],
  [OverlayKind.Village]: [ShopType.General, ShopType.Blacksmith],
  [OverlayKind.Farm]: [ShopType.General],
  [OverlayKind.None]: [],
  [OverlayKind.Spirit]: [],
  [OverlayKind.Tower]: [],
  [OverlayKind.Ruins]: [],
  [OverlayKind.Anomaly]: [],
  [OverlayKind.Caravan]: [ShopType.General],
  [OverlayKind.Wanderer]: [],
  [OverlayKind.Treasure]: [],
  [OverlayKind.Ritual]: [],
  [OverlayKind.Shrine]: [],
  [OverlayKind.Mine]: [],
  [OverlayKind.Forest]: [],
  [OverlayKind.Portal]: []
};

export interface TradeSession {
  shopType: ShopType;
  merchantItems: (Item & { count: number })[];
  buyMultiplier: number;
  sellMultiplier: number;
}

@Injectable({ providedIn: 'root' })
export class TradeService {
  private sessionSubject = new BehaviorSubject<TradeSession | null>(null);
  session$ = this.sessionSubject.asObservable();

  constructor(
    private characterService: CharacterService,
    private inventoryService: InventoryService,
    private itemFactory: ItemFactory
  ) {}

  openTrade(shopType: ShopType, kind: OverlayKind, playerLevel: number = 1): void {
    const merchantItems = this.itemFactory
      .generateShopPool(playerLevel, kind)
      .map(item => ({ ...item, count: item.stackable ? 10 : 1 }));

    const session: TradeSession = {
      shopType,
      merchantItems,
      buyMultiplier: this.randomRange(0.9, 1.1),
      sellMultiplier: this.randomRange(0.4, 0.6),
    };

    this.sessionSubject.next(session);
    console.log(`🛒 Trade session opened (${shopType}) — ${merchantItems.length} items`);
  }

  closeTrade(): void {
    this.sessionSubject.next(null);
  }

  getSession(): TradeSession | null {
    return this.sessionSubject.value;
  }

  getBuyPrice(item: Item, session?: TradeSession): number {
    const s = session ?? this.sessionSubject.value;
    if (!s) return item.computedValue ?? item.baseValue;
    const value = item.computedValue ?? item.baseValue;
    return Math.max(1, Math.floor(value * s.buyMultiplier));
  }

  getSellPrice(item: Item, session?: TradeSession): number {
    const s = session ?? this.sessionSubject.value;
    if (!s) return Math.floor((item.computedValue ?? item.baseValue) * 0.5);
    const value = item.computedValue ?? item.baseValue;
    return Math.max(1, Math.floor(value * s.sellMultiplier));
  }

  getTotalBuy(item: Item, qty: number): number {
    return this.getBuyPrice(item) * qty;
  }

  getTotalSell(item: Item, qty: number): number {
    return this.getSellPrice(item) * qty;
  }

  buy(item: Item & { count: number }, quantity: number = 1): string | null {
    const session = this.sessionSubject.value;
    if (!session) return 'No active trade session.';

    const price = this.getBuyPrice(item, session);
    const total = price * quantity;
    const player = this.characterService.getCharacter();
    if (!player) return 'No active character.';

    if (player.gold < total) {
      return 'Not enough gold.';
    }

    const items = this.inventoryService.getItems();
    const hasStack = item.stackable && items.some(i => i.id === item.id);
    const used = this.inventoryService.usedSlots;
    const max = (this.inventoryService as any).maxSlots ?? (2 * 4);

    const needsSlots = item.stackable ? (hasStack ? 0 : 1) : quantity;
    if (used + needsSlots > max) {
      return 'Inventory is full.';
    }

    if (item.count < quantity) {
      return 'Merchant does not have enough stock.';
    }

    const spent = this.characterService.spendGold(total);
    if (!spent) return 'Failed to spend gold.';

    this.inventoryService.addItem({ ...item, count: quantity });
    item.count -= quantity;
    this.refreshSession(session);

    console.log(`✅ Bought ${quantity} × ${item.name} (${total}g)`);
    return null;
  }

  sell(item: Item & { count: number }, quantity: number = 1): string | null {
    const session = this.sessionSubject.value;
    if (!session) return 'No active trade session.';

    const price = this.getSellPrice(item, session);
    const total = price * quantity;
    const player = this.characterService.getCharacter();
    if (!player) return 'No active character.';

    const owned = this.inventoryService.getItems().find(i => i.id === item.id);
    if (!owned || owned.count < quantity) {
      return 'Not enough items to sell.';
    }

    // remove the sold items
    for (let i = 0; i < quantity; i++) {
      this.inventoryService.removeItem(item.id);
    }

    this.characterService.gainGold(total);

    // optionally restock merchant
    const merchant = session.merchantItems.find(m => m.id === item.id);
    if (merchant) merchant.count += quantity;
    else session.merchantItems.push({ ...item, count: quantity });

    this.refreshSession(session);

    console.log(`💰 Sold ${quantity} × ${item.name} (+${total}g)`);
    return null;
  }

  private randomRange(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  private refreshSession(session: TradeSession): void {
    this.sessionSubject.next({ ...session });
  }
}
