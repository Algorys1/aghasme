import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionType } from '../models/actions';
import { OverlayInstance } from '../models/overlays.model';
import { OverlayPhase, PassiveOverlayPhase } from '../models/overlay-phase.model';
import { CharacterService } from './character.service';
import { MapService } from './map.service';
import { CombatService } from './combat.service';
import { EnemyFactory } from '../factories/enemy.factory';
import { Enemy } from '../models/enemy.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  public nextOverlay$ = new Subject<OverlayInstance>();
  public startCombat$ = new Subject<Enemy>();
  public closeOverlay$ = new Subject<void>();

  constructor(
    private router: Router,
    private characterService: CharacterService,
    private mapService: MapService,
    private combatService: CombatService
  ) {}

  /**
   * Execute action depending on type
   */
  executeAction(action: ActionType, overlay: OverlayInstance) {
    console.log(`🎬 Executing ${action} on ${overlay.name}`);

    switch (action) {
      case ActionType.Fight:
        this.startCombat(overlay);
        break;
      case ActionType.Explore:
        this.exploreLocation(overlay);
        break;
      case ActionType.Flee:
      case ActionType.Harvest:
      case ActionType.Trade:
      case ActionType.Talk:
      case ActionType.Pray:
      case ActionType.Rest:
      case ActionType.Interact:
      case ActionType.Inspect:
      case ActionType.Avoid:
        this.skipOverlay(overlay);
        break;
      default:
        console.warn('⚠️ Unhandled action type:', action);
        break;
    }
  }

  private skipOverlay(overlay: OverlayInstance) {
    console.log(`🚶 You decide to move on from ${overlay.name}.`);
    this.closeOverlay$.next();
  }

  private exploreLocation(overlay: OverlayInstance) {
    console.log(`🧭 Exploring ${overlay.name}...`);
    if (overlay.eventChain && !overlay.nextEvent) {
      const firstKey = Object.keys(overlay.eventChain)[0];
      if (firstKey) {
        overlay.nextEvent = firstKey;
        this.triggerNextEvent(overlay);
        return;
      }
    }

    if (overlay.nextEvent) {
      this.triggerNextEvent(overlay);
      return;
    }
  }

  private startCombat(overlay: OverlayInstance) {
    const player = this.characterService.getCharacter();
    if (!player) return;

    const tile = this.mapService.getCurrentTile?.();
    const terrain = tile?.terrain ?? 'plain';
    const level = overlay.level ?? player.level;

    const enemy = EnemyFactory.createByName(overlay.name, level);

    console.log(`⚔️ Combat begins: ${player.name} vs ${enemy.name} (Lv ${enemy.level})`);

    this.combatService.startCombat(enemy);
    this.startCombat$.next(enemy);
  }

  // -----------------------------------------------------------------
  // 🔄 NextEvent system for multi-phase overlays
  // -----------------------------------------------------------------
  private triggerNextEvent(overlay: OverlayInstance) {
    if (!overlay.nextEvent || !overlay.eventChain) return;

    const phase = overlay.eventChain[overlay.nextEvent];
    if (!phase) return;

    console.log(`➡️ Triggering phase: ${overlay.nextEvent}`);

    if (phase.next) {
      const nextOverlay: OverlayInstance = {
        ...overlay,
        id: overlay.id + '-' + phase.next,
        name: phase.title,
        description: phase.description,
        actions: phase.actions,
        nextEvent: phase.next,
        eventChain: overlay.eventChain,
      };
      this.nextOverlay$.next(nextOverlay);
      return;
    }

    // Otherwise final floor
    const finalOverlay: OverlayInstance = {
      ...overlay,
      id: overlay.id + '-end',
      name: phase.title,
      description: phase.description,
      actions: phase.actions,
      nextEvent: undefined,
      eventChain: overlay.eventChain,
    };
    this.nextOverlay$.next(finalOverlay);
  }

  private handlePassivePhase(passive: PassiveOverlayPhase, overlay: OverlayInstance, phase: OverlayPhase) {
    console.log('🎲 Passive phase triggered:', passive.description ?? '(no description)');

    if (passive.effects?.length) {
      console.log(`✨ Applying ${passive.effects.length} immediate effect(s).`);
      // TODO: apply effects via CharacterService
    }

    // Simule un D20 (pour l'instant)
    if (passive.check) {
      const roll = Math.floor(Math.random() * 20) + 1;
      const orb = passive.check.orb;
      const difficulty = passive.check.difficulty;
      const bonus = passive.check.modifier ?? 0;
      const total = roll + bonus;

      const success = total >= difficulty;

      console.log(
        `🎲 Rolled D20 = ${roll} (${orb.toUpperCase()} check +${bonus}) → total ${total} vs DC ${difficulty} → ${success ? '✅ success' : '❌ fail'}`
      );

      const result = success ? passive.onSuccess : passive.onFailure;
      if (result) {
        if (result.effects?.length) {
          console.log(`🌀 Applying ${result.effects.length} result effect(s).`);
          // TODO: apply result.effects to character
        }
        if (result.description) console.log(result.description);

        if (result.next) {
          const nextOverlay = this.buildNextOverlay(overlay, phase, result.next);
          this.nextOverlay$.next(nextOverlay);
          return;
        }
      }
    }
    console.log('🕯️ The situation remains unchanged.');
  }

  private buildNextOverlay(
    overlay: OverlayInstance,
    phase: OverlayPhase,
    nextKey?: string
  ): OverlayInstance {
    const nextOverlay: OverlayInstance = {
      ...overlay,
      id: overlay.id + '-' + (nextKey ?? 'end'),
      name: phase.title,
      description: phase.description,
      actions: phase.actions,
      nextEvent: nextKey,
      eventChain: overlay.eventChain
    };
    return nextOverlay;
  }
}
