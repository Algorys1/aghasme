import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionType } from '../models/actions';
import { OverlayInstance } from '../factories/overlay.factory';
import { OverlayKind } from '../models/overlays';
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

  constructor(
    private router: Router,
    private characterService: CharacterService,
    private mapService: MapService,
    private combatService: CombatService
  ) {}

  /**
   * Point d’entrée unique : exécute une action selon son type.
   */
  executeAction(action: ActionType, overlay: OverlayInstance) {
    console.log(`🎬 Executing ${action} on ${overlay.name}`);

    switch (action) {
      // === Fight / Flee ===
      case ActionType.Fight:
        this.startCombat(overlay);
        break;
      case ActionType.Flee:
        this.fleeEncounter(overlay);
        break;

      // === Explore / Collect ===
      case ActionType.Explore:
      case ActionType.Harvest:
        this.exploreLocation(overlay);
        break;

      // === Trade / Talk ===
      case ActionType.Trade:
        this.openTrade(overlay);
        break;
      case ActionType.Talk:
        this.startDialogue(overlay);
        break;

      // === Spirit ===
      case ActionType.Pray:
        this.performRitual(overlay);
        break;

      // === Rest / Quest ===
      case ActionType.Rest:
        this.restAtLocation(overlay);
        break;
      case ActionType.Quests:
        this.showQuests(overlay);
        break;

      // === Others ===
      case ActionType.Open:
      case ActionType.Inspect:
        this.openDiscovery(overlay);
        break;
      case ActionType.Avoid:
        this.skipOverlay(overlay);
        break;

      default:
        console.warn('⚠️ Unhandled action type:', action);
        break;
    }
  }

  // -----------------------------------------------------------------
  // 🧩 Gameplay Logic (TODO)
  // -----------------------------------------------------------------

  private startCombat(overlay: OverlayInstance) {
    const player = this.characterService.getCharacter();
    if (!player) return;
  
    const tile = this.mapService.getCurrentTile?.();
    const terrain = tile?.terrain ?? 'plain';
    const level = overlay.level ?? player.level;
  
    // Génère l'ennemi exact de l'overlay
    const enemy = EnemyFactory.createByName(overlay.name, level);
  
    console.log(`⚔️ Combat begins: ${player.name} vs ${enemy.name} (Lv ${enemy.level})`);
  
    // Démarre le combat dans le CombatService
    this.combatService.startCombat(enemy);
  
    // Notifie le GameComponent pour afficher l'interface de combat
    this.startCombat$.next(enemy);
  }

  private fleeEncounter(overlay: OverlayInstance) {
    console.log(`🏃 You escape from ${overlay.name}.`);
    // TODO: maybe apply penalty or stamina cost
  }

  private exploreLocation(overlay: OverlayInstance) {
    console.log(`🧭 Exploring ${overlay.name}...`);
    if (overlay.nextEvent) {
      this.triggerNextEvent(overlay);
      return;
    }

    if (Math.random() < 0.3) {
      console.log('💰 You find a few coins on the ground.');
    } else if (Math.random() < 0.2) {
      console.log('⚔️ A wild creature attacks!');
    } else {
      console.log('Nothing of interest here.');
    }
  }

  private openTrade(overlay: OverlayInstance) {
    console.log(`💰 Opening trade with ${overlay.name}.`);
    // TODO: open trade overlay or merchant component
  }

  private startDialogue(overlay: OverlayInstance) {
    console.log(`🗣️ Talking to ${overlay.name}.`);
    // TODO: open dialogue interface
  }

  private performRitual(overlay: OverlayInstance) {
    console.log(`🙏 Performing a ritual at ${overlay.name}.`);
    // TODO: grant buff or trigger mystical event
  }

  private restAtLocation(overlay: OverlayInstance) {
    const char = this.characterService.getCharacter();
    if (!char) return;
    const restoredHp = Math.min(char.maxHp, char.hp + Math.ceil(char.maxHp * 0.5));
    const restoredMp = Math.min(char.maxMp, char.mp + Math.ceil(char.maxMp * 0.5));

    char.hp = restoredHp;
    char.mp = restoredMp;
    this.characterService.setCharacter(char);

    console.log(`😴 You rest at ${overlay.name}. HP/MP restored.`);
  }

  private showQuests(overlay: OverlayInstance) {
    console.log(`📜 Viewing quests at ${overlay.name}.`);
    // TODO: open quest board
  }

  private openDiscovery(overlay: OverlayInstance) {
    console.log(`🎁 Inspecting discovery at ${overlay.name}.`);
    // TODO: trigger loot or special scene
  }

  private skipOverlay(overlay: OverlayInstance) {
    console.log(`🚶 You decide to move on from ${overlay.name}.`);
    // TODO: simple dismiss or step forward
  }

  // -----------------------------------------------------------------
  // 🔄 NextEvent system for multi-phase overlays
  // -----------------------------------------------------------------
  private triggerNextEvent(overlay: OverlayInstance) {
    if (!overlay.nextEvent || !overlay.eventChain) return;
  
    const phase = overlay.eventChain[overlay.nextEvent];
    if (!phase) return;
  
    console.log(`➡️ Triggering next event: ${overlay.nextEvent}`);
  
    if (phase.combatChance && Math.random() < phase.combatChance) {
      console.log('⚔️ A hidden enemy appears!');
      // TODO: combat to be handled later
      return;
    }
  
    if (phase.lootChance && Math.random() < phase.lootChance) {
      const gold = Math.floor(Math.random() * 20) + 5;
      console.log(`💰 You find ${gold} gold!`);
      // TODO: add gold to player inventory
    }
  
    const nextOverlay: OverlayInstance = {
      ...overlay,
      id: overlay.id + '-' + overlay.nextEvent,
      name: phase.title,
      description: phase.description,
      actions: phase.actions,
      nextEvent: phase.next,
      eventChain: overlay.eventChain
    };
  
    // 🔹 Et on notifie les abonnés (GameComponent)
    this.nextOverlay$.next(nextOverlay);
  }
  

}
