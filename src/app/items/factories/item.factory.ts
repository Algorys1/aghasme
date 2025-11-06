import { Injectable } from '@angular/core';
import { Item, ItemType, RarityType } from '../models/items.model';
import { BASE_ITEMS } from '../tables/item-tables';
import { EFFECT_POOL, RARITY_EFFECT_COUNT, RARITY_MULTIPLIERS } from '../tables/effect-pool';
import { Effect } from '../../character/models/effect.model';
import { OverlayKind } from '../../overlays/models/overlays.model';

@Injectable({ providedIn: 'root' })
export class ItemFactory {

  getById(id: string): Item | undefined {
    const base = BASE_ITEMS.find(i => i.id === id);
    if (!base) return undefined;
    return structuredClone(base);
  }

  generateItem(options: {
    level?: number;
    rarity?: RarityType;
    type?: ItemType;
    fixedId?: string;
  }): Item | undefined {
    const { level = 1, rarity, type, fixedId } = options;

    let baseItem: Item;
    if (fixedId) {
      const item = this.getById(fixedId);
      if (!item) return undefined;
      baseItem = item;
    } else {
      const pool = BASE_ITEMS.filter(i =>
        (!type || i.type === type) &&
        (!rarity || i.rarity === rarity)
      );
      if (!pool.length) return undefined;
      baseItem = structuredClone(pool[Math.floor(Math.random() * pool.length)]);
    }

    const finalItem = this.applyRandomEffects(baseItem, rarity ?? baseItem.rarity, level);

    finalItem.computedValue = Math.round(
      baseItem.baseValue *
      (RARITY_MULTIPLIERS[finalItem.rarity] ?? 1) *
      (1 + level / 20)
    );

    return finalItem;
  }

  private applyRandomEffects(item: Item, rarity: RarityType, level: number): Item {
    const nbEffects = RARITY_EFFECT_COUNT[rarity];
    if (!nbEffects) return item;

    const pool = this.selectPool(item.type);
    const effects: Effect[] = [];

    for (let i = 0; i < nbEffects; i++) {
      const template = pool[Math.floor(Math.random() * pool.length)];
      const rarityMult = RARITY_MULTIPLIERS[rarity] ?? 1;
      const scaledValue = Math.round(template.base * rarityMult * (1 + level / 10));

      effects.push({
        stat: template.stat,
        value: scaledValue,
        type: template.type ?? 'flat',
        source: `rarity-${rarity}`
      });
    }

    return { ...item, effects };
  }

  private selectPool(type: ItemType): { stat: any; base: number; type?: 'flat' | 'percent' }[] {
    switch (type) {
      case ItemType.WeaponMelee:
      case ItemType.WeaponRange:
        return [...EFFECT_POOL['offensive'], ...EFFECT_POOL['utility']];
      case ItemType.Armor:
        return [...EFFECT_POOL['defensive'], ...EFFECT_POOL['utility']];
      case ItemType.Accessory:
        return [...EFFECT_POOL['mystic'], ...EFFECT_POOL['utility']];
      default:
        return [...EFFECT_POOL['utility']];
    }
  }

  generateShopPool(level: number, kind: OverlayKind): Item[] {
    const baseSizes = {
      [OverlayKind.Farm]: 5,
      [OverlayKind.Village]: 7,
      [OverlayKind.City]: 10,
    } as const;

    const growthRates = {
      [OverlayKind.Farm]: { perLevel: 8, max: 8 },
      [OverlayKind.Village]: { perLevel: 6, max: 12 },
      [OverlayKind.City]: { perLevel: 5, max: 16 },
    } as const;

    const baseSize = (baseSizes as Record<string, number>)[kind] ?? 5;
    const growth = (growthRates as Record<string, { perLevel: number; max: number }>)[kind]
                 ?? growthRates[OverlayKind.Farm];
    const extra = Math.floor(level / growth.perLevel);
    const shopSize = Math.min(baseSize + extra, growth.max);

    // === 2️⃣ Définir pondération de rareté selon niveau + overlay ===
    const rarityWeights: Record<RarityType, number> = {
      [RarityType.Normal]: 0,
      [RarityType.Rare]: 0,
      [RarityType.Epic]: 0,
      [RarityType.Legendary]: 0,
      [RarityType.Artefact]: 0,
    };

    switch (kind) {
      case OverlayKind.Farm:
        Object.assign(rarityWeights, {
          Normal: 85,
          Rare: 15,
          Epic: 0,
          Legendary: 0,
          Artefact: 0,
        });
        break;
      case OverlayKind.Village:
        Object.assign(rarityWeights, {
          Normal: 70,
          Rare: 25,
          Epic: 5,
          Legendary: 0,
          Artefact: 0,
        });
        break;
      case OverlayKind.City:
        Object.assign(rarityWeights, {
          Normal: 50,
          Rare: 35,
          Epic: 10,
          Legendary: 4,
          Artefact: 1,
        });
        break;
    }

    rarityWeights.Rare += level * 0.2;
    rarityWeights.Epic += level * 0.1;
    rarityWeights.Legendary += level > 25 ? (level - 25) * 0.2 : 0;

    const typeWeights: Record<ItemType, number> = {
      [ItemType.Resource]: 0,
      [ItemType.Utility]: 0,
      [ItemType.Consumable]: 0,
      [ItemType.WeaponMelee]: 0,
      [ItemType.WeaponRange]: 0,
      [ItemType.Armor]: 0,
      [ItemType.Accessory]: 0,
      [ItemType.Quest]: 0,
    };

    switch (kind) {
      case OverlayKind.Farm:
        Object.assign(typeWeights, {
          Resource: 60,
          Utility: 20,
          Consumable: 20,
        });
        break;
      case OverlayKind.Village:
        Object.assign(typeWeights, {
          WeaponMelee: 30,
          Armor: 25,
          Consumable: 25,
          Accessory: 20,
        });
        break;
      case OverlayKind.City:
        Object.assign(typeWeights, {
          WeaponMelee: 25,
          WeaponRange: 20,
          Armor: 25,
          Accessory: 15,
          Utility: 15,
        });
        break;
    }

    const shopItems: Item[] = [];
    const usedIds = new Set<string>();
    let stackableCount = 0;

    while (shopItems.length < shopSize) {
      const rarity = this.weightedPick(rarityWeights);
      const type = this.weightedPick(typeWeights);
      const item = this.generateItem({ level, rarity, type });
      if (!item) continue;

      if (usedIds.has(item.id)) continue;
      usedIds.add(item.id);

      if (item.stackable) {
        if (stackableCount >= 3) continue;
        stackableCount++;
        const baseQty = type === ItemType.Resource ? 3 : 2;
        const scale = level < 10 ? 1 : level < 20 ? 2 : 3;
        (item as any).quantity = Math.floor(baseQty * scale + Math.random() * scale * 2);
      }

      if (kind === OverlayKind.Farm && (item.type === ItemType.WeaponMelee || item.type === ItemType.Armor)) continue;
      if (kind === OverlayKind.City && item.type === ItemType.Resource && item.rarity === RarityType.Normal) continue;

      shopItems.push(item);
    }

    shopItems.sort((a, b) => b.rarity.localeCompare(a.rarity));

    return shopItems;
  }

  private weightedPick<T extends string | number>(
    weights: Record<T, number>
  ): T {
    const entries = Object.entries(weights) as [T, number][];
    const total = entries.reduce((sum, [, w]) => sum + w, 0);
    const r = Math.random() * total;
    let acc = 0;
    for (const [key, weight] of entries) {
      acc += weight;
      if (r <= acc) return key;
    }
    return entries[0][0];
  }
}
