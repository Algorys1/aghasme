import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HarvestResource } from '../../models/harvest.model';
import { CharacterService } from '../../../character/services/character.service';
import { LootService } from '../../../combat/services/loot.service';
import { MapService } from '../../../game/services/map.service';
import { HarvestRegenerationService } from '../../../game/services/harvest-regeneration.service';
import { ItemFactory } from '../../../items/factories/item.factory';
import { DiceService } from '../../../game/services/dice.service';

@Component({
  selector: 'app-harvest-window',
  templateUrl: './harvest-window.component.html',
  styleUrls: ['./harvest-window.component.scss'],
})
export class HarvestWindowComponent implements OnInit {
  @Input() resources: HarvestResource[] = [];
  @Output() closed = new EventEmitter<void>();

  message = '';

  constructor(
    private characterService: CharacterService,
    private mapService: MapService,
    private lootService: LootService,
    private harvestRegenService: HarvestRegenerationService,
    private itemFactory: ItemFactory,
    private diceService: DiceService
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
    if (res.exhausted) return;

    const item = res.item;
    if (!item) return;

    this.setMessage(`⛏️ You are trying to harvest ${res.id}...`);

    const { value, verdict } = await this.diceService.askPlayerRoll(res.orb, this.characterService.getOrbPower(res.orb), res.difficulty + 6);
    const orbPower = this.characterService.getOrbPower(res.orb) ?? 0;

    const total = value + orbPower;
    const success = total >= res.difficulty;
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

      if (verdict === 'criticalSuccess') {
        this.setMessage(`🌟 Critical success! +${qty + 1} ${res.id} (+${res.xpReward} XP)`);
        this.lootService.dropItem(item, this.mapService.getPlayerPosition(), 'player', 1);
      } else {
        this.setMessage(`✨ +${qty} ${res.id} (+${res.xpReward} XP)`);
      }
    } else {
      if (verdict === 'criticalFail') {
        this.setMessage(`💥 Critical fail! You damaged the ${res.id}.`);
      } else {
        this.setMessage(`❌ You fail to extract ${res.id}.`);
      }
    }

    res.exhausted = true;
    this.harvestRegenService.addDepletedResource(res, this.mapService.getPlayerPosition());
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
