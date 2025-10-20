import {Injectable} from '@angular/core';
import {ActionType} from '../models/actions';
import {OverlayInstance, OverlayKind} from '../models/overlays.model';
import {OverlayPhase, PassiveOverlayPhase} from '../models/overlay-phase.model';
import {CharacterService} from './character.service';
import {CombatService} from './combat.service';
import {EnemyFactory} from '../factories/enemy.factory';
import {Enemy} from '../models/enemy.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  public nextOverlay$ = new Subject<OverlayInstance>();
  public startCombat$ = new Subject<Enemy>();
  public closeOverlay$ = new Subject<void>();
  public passiveText$ = new Subject<string>();

  constructor(
    private characterService: CharacterService,
    private combatService: CombatService
  ) {}

  /**
   * Execute action depending on type
   */
  executeAction(action: ActionType, overlay: OverlayInstance) {
    console.log(`🎬 Executing ${action} on ${overlay.name}`);

    if (overlay.eventChain && overlay.currentFloor) {
      const phase = overlay.eventChain[overlay.currentFloor];
      const passive = phase?.actionPassive?.[action];
      if (passive) {
        console.log(`💫 Passive action detected for ${action}`);
        this.handlePassivePhase(passive, overlay, phase);
        return;
      }
    }

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
    if (overlay.eventChain && !overlay.nextFloor) {
      const firstKey = Object.keys(overlay.eventChain)[0];
      if (firstKey) {
        overlay.nextFloor = firstKey;
        this.triggerNextEvent(overlay);
        return;
      }
    }

    if (overlay.nextFloor) {
      this.triggerNextEvent(overlay);
      return;
    }
  }

  private startCombat(overlay: OverlayInstance) {
    if (overlay.eventChain && overlay.currentFloor) {
      const phase = overlay.eventChain[overlay.currentFloor];

      // 🔹 Combat défini sur la floor ?
      if (phase?.encounter) {
        const { chance = 1, enemies, random } = phase.encounter;
        if (Math.random() <= chance) {
          const chosenEnemy = random
            ? enemies[Math.floor(Math.random() * enemies.length)]
            : enemies[0];
          const enemy = EnemyFactory.createByName(chosenEnemy, 1);
          const player = this.characterService.getCharacter();
          if (!player) return;

          console.log(`⚔️ Combat begins: ${player.name} vs ${enemy.name} (Lv ${enemy.level})`);

          this.combatService.startCombat(enemy);
          this.startCombat$.next(enemy);
          return;
        } else {
          console.log('🍀 No encounter this time.');
          return;
        }
      }
    }

    const player = this.characterService.getCharacter();
    if (!player) return;

    const level = overlay.level ?? player.level;
    const enemy = EnemyFactory.createByName(overlay.name, level);

    console.log(`⚔️ Combat begins: ${player.name} vs ${enemy.name} (Lv ${enemy.level})`);

    this.combatService.startCombat(enemy);
    this.startCombat$.next(enemy);
    if(overlay.kind === OverlayKind.Beast || overlay.kind === OverlayKind.Monster) {
      this.closeOverlay$.next();
    }
  }

  // -----------------------------------------------------------------
  // 🔄 NextEvent system for multi-phase overlays
  // -----------------------------------------------------------------
  private triggerNextEvent(overlay: OverlayInstance) {
    if (overlay.isCompleted) {
      this.closeOverlay$.next();
      return;
    }
    if (!overlay.nextFloor || !overlay.eventChain) return;

    const phase = overlay.eventChain[overlay.nextFloor];
    if (!phase) return;

    console.log(`➡️ Triggering phase: ${overlay.nextFloor}`);

    overlay.currentFloor = overlay.nextFloor;

    if (phase.next) {
      const nextOverlay: OverlayInstance = {
        ...overlay,
        id: overlay.id + '-' + phase.next,
        name: phase.title,
        description: phase.description,
        actions: phase.actions,
        nextFloor: phase.next,
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
      nextFloor: undefined,
      isCompleted: true,
      eventChain: overlay.eventChain,
    };
    this.nextOverlay$.next(finalOverlay);
  }

  private handlePassivePhase(passive: PassiveOverlayPhase, overlay: OverlayInstance, phase: OverlayPhase) {
    console.log('🎲 Passive phase triggered:', passive.description ?? '(no description)');

    let msgParts: string[] = [];

    if (passive.description) {
      let base = passive.description;
      if (passive.effects?.length) {
        const effects = passive.effects.map(e =>
          `${e.value > 0 ? '+' : ''}${e.value} ${e.stat.toUpperCase()}`
        ).join(', ');
        base += ` (${effects})`;
      }
      msgParts.push(base);
    }

    if (passive.effects?.length) {
      console.log(`✨ Applying ${passive.effects.length} immediate effect(s).`);
      // TODO: apply effects via CharacterService
    }

    if (passive.check) {
      const roll = Math.floor(Math.random() * 20) + 1;
      const orb = passive.check.orb;
      const difficulty = passive.check.difficulty;
      const bonus = passive.check.modifier ?? 0;
      const total = roll + bonus;
      const success = total >= difficulty;

      const rollMsg = `🎲 Roll: ${roll} (${orb.toUpperCase()} +${bonus}) → total ${total} vs DC ${difficulty} → ${success ? '✅ Success' : '❌ Failure'}`;
      msgParts.push(rollMsg);

      const result = success ? passive.onSuccess : passive.onFailure;
      if (result) {
        if (result.effects?.length) {
          const eff = result.effects.map(e =>
            `${e.value > 0 ? '+' : ''}${e.value} ${e.stat.toUpperCase()}`
          ).join(', ');
          msgParts.push(`🌀 Effect(s): ${eff}`);
        }
        if (result.description){
          msgParts.push(result.description);
        }

        if (result.next) {
          const nextOverlay = this.buildNextOverlay(overlay, phase, result.next);
          this.nextOverlay$.next(nextOverlay);
          return;
        }
      }
    }

    const fullMessage = msgParts.join('\n');
    console.log('📜 Full passive message:', fullMessage);
    this.passiveText$.next(fullMessage);
  }

  private buildNextOverlay(overlay: OverlayInstance, phase: OverlayPhase, nextKey?: string): OverlayInstance {
    return {
      ...overlay,
      id: overlay.id + '-' + (nextKey ?? 'end'),
      name: phase.title,
      description: phase.description,
      actions: phase.actions,
      nextFloor: nextKey,
      eventChain: overlay.eventChain
    };
  }
}
