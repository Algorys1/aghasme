import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionType } from '../models/actions';
import { OverlayInstance } from '../factories/overlay.factory';
import { OverlayKind } from '../models/overlays';
import { CharacterService } from './character.service';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
    private router: Router,
    private characterService: CharacterService,
    private mapService: MapService
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
  // 🧩 Logiques gameplay de base (à enrichir progressivement)
  // -----------------------------------------------------------------

  private startCombat(overlay: OverlayInstance) {
    console.log(`⚔️ Combat begins with ${overlay.name}!`);
    // TODO: navigate to combat component or open combat modal
    // this.router.navigate(['/combat'], { state: { enemy: overlay } });
  }

  private fleeEncounter(overlay: OverlayInstance) {
    console.log(`🏃 You escape from ${overlay.name}.`);
    // TODO: maybe apply penalty or stamina cost
  }

  private exploreLocation(overlay: OverlayInstance) {
    console.log(`🧭 Exploring ${overlay.name}...`);
    // TODO: handle exploration success/failure
    this.triggerNextEvent(overlay);
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
  // 🔄 Système de nextEvent
  // -----------------------------------------------------------------
  private triggerNextEvent(overlay: OverlayInstance) {
    if (!overlay.nextEvent) return;

    console.log(`➡️ Triggering next event: ${overlay.nextEvent}`);
    // Ici, tu pourras faire quelque chose comme :
    // this.mapService.spawnNextOverlay(overlay.nextEvent);
    // ou this.router.navigate(['/event', overlay.nextEvent]);
  }
}
