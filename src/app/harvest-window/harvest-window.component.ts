import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HarvestResource } from '../models/items';
import { CharacterService } from '../services/character.service';
import { LootService } from '../services/loot.service';
import { RESOURCE_ITEMS } from '../factories/item-tables';
import { PlayerService } from '../services/player.service';
import { MapService } from '../services/map.service';
import { HarvestRegenerationService } from '../services/harvest-regeneration.service';
import { ItemFactory } from '../factories/item.factory';

@Component({
  selector: 'app-harvest-window',
  templateUrl: './harvest-window.component.html',
  styleUrls: ['./harvest-window.component.scss'],
})
export class HarvestWindowComponent implements OnInit {
  @Input() resources: HarvestResource[] = [];
  @Output() closed = new EventEmitter<void>();

  isProcessing = false;
  message = '';
  progress = 0;

  constructor(
    private characterService: CharacterService,
    private mapService: MapService,
    private lootService: LootService,
    private harvestRegenService: HarvestRegenerationService,
    private itemFactory: ItemFactory
  ) {}

  ngOnInit() {
    const pos = this.mapService.getPlayerPosition();

    this.resources.forEach(res => {
      const item = this.itemFactory.getById(res.id);
      if (item) res.item = item;

      const remaining = this.harvestRegenService.getRemainingSteps(res.id, pos);
      if (remaining !== null) {
        res.exhausted = true;
        (res as any).remainingSteps = remaining;
      } else {
        res.exhausted = false;
        (res as any).remainingSteps = 0;
      }
    });
  }

  async harvest(res: HarvestResource) {
    if (res.exhausted || this.isProcessing) return;

    const item = res.item;
    if (!item) return;

    this.isProcessing = true;
    this.progress = 0;
    this.setMessage(`⛏️ You are trying to harvest ${res.id}...`);

    const duration = 1000 + (res.difficulty * 150);
    const step = 50;
    const increment = (step / duration) * 100;

    for (let t = 0; t < duration; t += step) {
      await new Promise(r => setTimeout(r, step));
      this.progress = Math.min(100, this.progress + increment);
    }

    const roll = this.characterService.getOrbPower(res.orb) ?? 1;
    const success = roll >= res.difficulty;

    let minQty: number;
    let maxQty: number;
    if (res.difficulty <= 3) {
      minQty = 2;
      maxQty = 5;
    } else if (res.difficulty <= 6) {
      minQty = 2;
      maxQty = 4;
    } else {
      minQty = 1;
      maxQty = 2;
    }

    if (success) {
      const qty = this.randomBetween(minQty, maxQty);
      this.lootService.dropItem(
        item,
        this.mapService.getPlayerPosition(),
        'player',
        qty
      );

      this.characterService.addXP(res.xpReward);
      this.setMessage(`✨ +${qty} ${res.id} (+${res.xpReward} XP)`);
    } else {
      this.setMessage(`❌ You fail to extract ${res.id}.`);
    }

    res.exhausted = true;
    this.harvestRegenService.addDepletedResource(res, this.mapService.getPlayerPosition());
    this.isProcessing = false;
    this.progress = 0;
  }

  quit() {
    this.closed.emit();
  }

  private randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setMessage(msg: string) {
    this.message = msg;

    const el = document.querySelector('.message');
    if (el) {
      el.classList.remove('visible');
      void (el as HTMLElement).offsetWidth; // force reflow
      el.classList.add('visible');
    }
  }
}
