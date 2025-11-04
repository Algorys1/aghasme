import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {ActionType} from '../models/actions';
import {END_MARKER, OverlayInstance } from '../models/overlays.model';
import {PassiveOverlayPhase} from '../models/overlay-phase.model';
import {CharacterService} from '../../character/services/character.service';
import {CombatService} from '../../combat/services/combat.service';
import {EnemyFactory} from '../../combat/factories/enemy.factory';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  public nextOverlay$ = new Subject<OverlayInstance>();
  public closeOverlay$ = new Subject<void>();
  public passiveText$ = new Subject<string>();
  public enableQuit$ = new Subject<void>();

  public restRequested$ = new Subject<void>();
  public harvestRequested$ = new Subject<OverlayInstance>();
  public tradeRequested$ = new Subject<OverlayInstance>();

  constructor(
    private characterService: CharacterService,
    private combatService: CombatService,
    private translate: TranslateService,
  ) {}

  /**
   * Execute action depending on type
   */
  executeAction(action: ActionType, overlay: OverlayInstance) {
    console.log(`🎬 Executing ${action} on ${overlay.name}`);
    if(overlay.id.includes(END_MARKER) && overlay.isCompleted) {
      this.enableQuit$.next();
    }

    const phase = overlay.currentFloor ? overlay.eventChain?.[overlay.currentFloor] : undefined;
    if (phase?.uniqueChoice) {
      overlay.disabledActions = [...overlay.actions];
    }

    if (overlay.eventChain && overlay.currentFloor) {
      const passive = phase?.actionPassive?.[action];
      if (passive) {
        this.handlePassivePhase(passive);
        return;
      }
    }

    switch (action) {
      case ActionType.Fight:
        this.startCombat(overlay);
        break;
      case ActionType.Continue:
        this.continueOverlay(overlay);
        break;
      case ActionType.Rest:
        this.handleRest();
        break;
      case ActionType.Harvest:
        this.handleHarvest(overlay);
        break;
      case ActionType.Trade:
        this.handleTrade(overlay);
        break;
      case ActionType.Flee:
      case ActionType.Quit:
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

  private continueOverlay(overlay: OverlayInstance) {
    console.log(`🧭 Continue to ${overlay.name}...`);
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

  private handleRest(): void {
    console.log('💤 Rest action triggered');
    this.restRequested$.next();
  }

  private handleHarvest(overlay: OverlayInstance): void {
    console.log('🌿 Harvest action triggered');
    this.harvestRequested$.next(overlay);
  }

  private handleTrade(overlay: OverlayInstance): void {
    console.log('🌿 Trade action triggered');
    this.tradeRequested$.next(overlay);
  }

  private startCombat(overlay: OverlayInstance): void {
    const player = this.characterService.getCharacter();
    if (!player) return;

    const phase = overlay.eventChain?.[overlay.currentFloor ?? overlay.nextFloor ?? ''];
    if (phase?.encounter) {
      const { enemies, random } = phase.encounter;
      const chosenEnemy = random
        ? enemies[Math.floor(Math.random() * enemies.length)]
        : enemies[0];

      const enemy = EnemyFactory.createById(chosenEnemy, 1);
      const player = this.characterService.getCharacter();
      if (!player) return;

      console.log(`⚔️ Combat begins: ${player.name} vs ${enemy.name} (Lv ${enemy.level})`);

      this.combatService.startCombat(enemy);
      return;
    }
  }

  private triggerNextEvent(overlay: OverlayInstance) {
    const nextFloor = overlay.nextFloor;
    if (!nextFloor || !overlay.eventChain) return;

    const nextPhase = overlay.eventChain[nextFloor];
    if (!nextPhase) return;

    console.log(`➡️ Triggering phase: ${nextFloor}`);
    overlay.currentFloor = nextFloor;

    if (nextPhase.next) {
      const nextOverlay: OverlayInstance = {
        ...overlay,
        id: overlay.id + '-' + nextPhase.next,
        name: nextPhase.title,
        description: nextPhase.description,
        actions: nextPhase.actions,
        nextFloor: nextPhase.next,
        eventChain: overlay.eventChain,
      };
      this.nextOverlay$.next(nextOverlay);

      if (nextPhase.encounter) {
        const { chance = 1 } = nextPhase.encounter;
        if (Math.random() <= chance) {
          this.startCombat(nextOverlay);
        }
      }
      return;
    } else {
      const finalOverlay: OverlayInstance = {
        ...overlay,
        id: overlay.id + END_MARKER,
        name: nextPhase.title,
        description: nextPhase.description,
        actions: nextPhase.actions,
        nextFloor: undefined,
        isCompleted: true,
        eventChain: overlay.eventChain,
      };
      this.nextOverlay$.next(finalOverlay);
    }
  }

  private handlePassivePhase(passive: PassiveOverlayPhase) {
    console.log('🎲 Passive phase triggered:', passive.description ?? '(no description)');

    let msgParts: string[] = [];

    if (passive.description) {
      let base = this.translate.instant(passive.description);
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
          let resDesc = this.translate.instant(result.description);
          msgParts.push(resDesc);
        }
      }
    }

    const fullMessage = msgParts.join('\n');
    this.passiveText$.next(fullMessage);
  }
}
