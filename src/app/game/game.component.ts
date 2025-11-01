import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from '../services/player.service';
import { Character, OrbKey } from '../models/character.model';
import { MapService } from '../services/map.service';
import { CharacterService } from '../services/character.service';
import { SaveService } from '../services/save.service';
import { GameState } from '../models/game-state.model';
import { OverlayInstance, OverlayKind } from '../models/overlays.model';
import { OverlayFactory } from '../factories/overlay.factory';
import { OverlayWindowComponent } from '../overlay-window/overlay-window.component';
import {ActionType} from '../models/actions';
import {ActionService} from '../services/action.service';
import { CombatComponent } from '../combat/combat.component';
import { LootPanelComponent } from "../loot-panel/loot-panel.component";
import { LootService } from '../services/loot.service';
import { OverlayRegistryService } from '../services/overlay-registry.service';
import { HarvestRegenerationService } from '../services/harvest-regeneration.service';
import { DiceResult, DiceRollComponent, OrbType } from "../dice-roll/dice-roll.component";
import { DiceService } from '../services/dice.service';
import { PlayerPanelComponent } from "../character/main-panel/main-panel.component";

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [OverlayWindowComponent, CombatComponent, LootPanelComponent, DiceRollComponent, PlayerPanelComponent]
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  diceVisible = false;
  pendingOrb: OrbType = 'natural';
  pendingOrbPower = 0;
  private rollResolver?: (r: DiceResult) => void;

  character: Character | null = null;
  orbs: { key: OrbKey; name: string; icon: string; value: number }[] = [];

  currentTile: { type: string; description?: string } | null = null;

  showCombat = false;
  showInventoryPanel = false;
  showLootPanel = false;
  showMenuPanel = false;

  activeOverlay: OverlayInstance | null = null;
  isOverlayPaused = false;
  isTransitioning = false;

  private subs: Subscription[] = [];

  private ORB_ICONS: Record<OrbKey, string> = {
    bestial: 'assets/characters/orbs/orb-bestial.png',
    elemental: 'assets/characters/orbs/orb-elemental.png',
    natural: 'assets/characters/orbs/orb-natural.png',
    mechanic: 'assets/characters/orbs/orb-mechanic.png',
  };

  constructor(
    private player: PlayerService,
    private router: Router,
    private mapService: MapService,
    private saveService: SaveService,
    private characterService: CharacterService,
    private actionService: ActionService,
    private lootService: LootService,
    private overlayRegistry: OverlayRegistryService,
    private harvestRegenService: HarvestRegenerationService,
    private diceService: DiceService
  ) {}

  ngOnInit(): void {
    this.character = this.player.getCharacter();

    this.subs.push(
      this.mapService.playerMoved.subscribe(() => {
        this.harvestRegenService.onPlayerMove();
        this.autoSave()
      }),
      this.mapService.tileChange.subscribe(tile => {
        this.currentTile = tile;
        const hasOverlay = this.mapService.hasActiveOverlay;
        if (!hasOverlay) {
          console.log('No overlay, possible encounter check');
          this.mapService.checkForEncounter();
        }
      }),
      this.mapService.startCombat$.subscribe(enemy => {
        console.log(`🎯 Launching combat UI vs ${enemy.name}`);
        this.showCombat = true;
        this.isOverlayPaused = true;
      }),
      this.mapService.overlayChange.subscribe(kind => {
        if (kind && kind !== OverlayKind.None) {
          const current = this.mapService.getCurrentTile();
          if (!current) return;

          const { q, r } = current;
          const entry = this.overlayRegistry.getByCoords(q, r);

          if (entry) {
            console.log(`🎬 Loading overlay instance: ${entry.kind}/${entry.id} at (${q},${r})`);
            this.activeOverlay = OverlayFactory.createFromId(entry.id, entry.kind);
          } else {
            console.warn(`⚠️ cannot find overlay at (${q},${r}), of kind ${kind}`);
          }
        } else {
          this.activeOverlay = null;
        }
      }),
      this.characterService.character$.subscribe(char => {
        this.character = char;
      }),
      this.actionService.nextOverlay$.subscribe(nextOverlay => {
        console.log('🌀 Transitioning to next overlay:', nextOverlay.name);

        this.isTransitioning = true;

        setTimeout(() => {
          this.activeOverlay = nextOverlay;
          this.isTransitioning = false;
        }, 350);
      }),
      this.actionService.closeOverlay$.subscribe(() => {
        console.log('🧹 Overlay closed via closeOverlay$');
        this.activeOverlay = null;
      }),
      this.diceService.onRequest.subscribe(req => {
        this.pendingOrb = req.orb;
        this.pendingOrbPower = req.orbPower;
        this.rollResolver = req.resolve;
        this.diceVisible = true;
      })
    );
    this.refreshOrbs();
  }

  onDiceRolled(result: DiceResult) {
    this.diceVisible = false;
    this.rollResolver?.(result);
    this.rollResolver = undefined;
  }

  async ngAfterViewInit() {
    await new Promise(r => setTimeout(r, 100));
    const canvas = await this.waitForCanvas();
    if (!canvas) {
      console.error('❌ Impossible to find canvas');
      return;
    }

    const nav = history.state ?? {};
    const chosenSlot: string | undefined = nav.slot;
    const isNewGame: boolean = !!nav.newGame;

    if (isNewGame) {
      console.log('🎲 New game → reset all');
      this.mapService.clearAll();
      this.mapService.generateNewSeed();
      await this.mapService.initMapWithCanvas(canvas, 10);
      return;
    }

    if (chosenSlot) {
      const save = this.saveService.loadGame(chosenSlot);
      if (save?.map && save?.character) {
        this.characterService.setCharacter(save.character);
        this.character = save.character;
        await this.mapService.loadFromSnapshotWithCanvas(save.map, canvas);
        if (save?.groundItems?.length) {
          this.lootService.restoreGroundItems(save.groundItems);
        }
        this.refreshOrbs();
        return;
      }
      await this.mapService.initMapWithCanvas(canvas, 10);
      return;
    }

    const auto = this.saveService.loadGame('auto');
    if (auto?.map && auto?.character) {
      this.characterService.setCharacter(auto.character);
      this.character = auto.character;
      await this.mapService.loadFromSnapshotWithCanvas(auto.map, canvas);
      if (auto?.groundItems?.length) {
        this.lootService.restoreGroundItems(auto.groundItems);
      }
      this.refreshOrbs();
    } else {
      await this.mapService.initMapWithCanvas(canvas, 10);
    }

    if (!this.character) {
      console.warn('⚠️ No character found, back to menu');
      await this.router.navigate(['/start']);
    }
  }

  private waitForCanvas(): Promise<HTMLCanvasElement | null> {
    return new Promise(resolve => {
      const check = () => {
        const canvas = this.canvasRef?.nativeElement;
        if (canvas) resolve(canvas);
        else requestAnimationFrame(check);
      };
      check();
    });
  }

  private refreshOrbs() {
    if (!this.character) { this.orbs = []; return; }
    const o = this.character.orbs;
    this.orbs = [
      { key: 'bestial', name: 'Bestial', icon: this.ORB_ICONS.bestial, value: o.bestial },
      { key: 'elemental', name: 'Élémentaire', icon: this.ORB_ICONS.elemental, value: o.elemental },
      { key: 'natural', name: 'Naturel', icon: this.ORB_ICONS.natural, value: o.natural },
      { key: 'mechanic', name: 'Mécanique', icon: this.ORB_ICONS.mechanic, value: o.mechanic },
    ];
  }

  private buildFullState(): GameState | null {
    const char = this.characterService.getCharacter();
    if (!char) return null;
    const mapState = this.mapService.serializeMap();
    const charState = structuredClone(char);
    const groundItems = this.lootService.getAllGroundItems();
    return {
      character: charState,
      map: mapState,
      groundItems,
      timestamp: Date.now()
    };
  }

  private autoSave() {
    const full = this.buildFullState();
    if (full) this.saveService.saveGame(full, 'auto');
  }

  saveGameManual() {
    const name = prompt("Nom de la sauvegarde :");
    if (!name) return;
    const full = this.buildFullState();
    if (!full) return;
    this.saveService.saveGame(full, name);
    alert(`💾 Sauvegarde "${name}" enregistrée !`);
  }

  // === HUD buttons ===
  openInventoryPanel() { this.showInventoryPanel = true; }
  openLootPanel() { this.showLootPanel = true; }
  openPauseMenu() { this.showMenuPanel = true; }

  closeInventoryPanel() { this.showInventoryPanel = false; }
  closeLootPanel() { this.showLootPanel = false; }
  closePauseMenu() { this.showMenuPanel = false; }

  goHome() { this.router.navigate(['/home']); }

  // === Overlay window actions ===
  onOverlayAction(action: ActionType) {
    if (!this.activeOverlay) return;

    const overlay = this.activeOverlay;
    this.actionService.executeAction(action, overlay);
  }

  onCombatClosed() {
    this.showCombat = false;
    this.isOverlayPaused = false;
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
