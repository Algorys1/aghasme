import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from '../services/player.service';
import { Character, OrbKey } from '../models/character.model';
import { MapService } from '../services/map.service';
import { CharacterService } from '../services/character.service';
import { SaveService } from '../services/save.service';
import { GameState } from '../models/game-state.model';
import { OverlayKind } from '../models/overlays';
import { OverlayFactory, OverlayInstance } from '../factories/overlay.factory';
import { MinimapComponent } from "../minimap/minimap.component";
import { OverlayWindowComponent } from '../overlay-window/overlay-window.component';
import {ActionType} from '../models/actions';
import {ActionService} from '../services/action.service';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [MinimapComponent, OverlayWindowComponent]
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  character: Character | null = null;
  orbs: { key: OrbKey; name: string; icon: string; value: number }[] = [];

  currentTile: { type: string; description?: string } | null = null;

  activeOverlay: OverlayInstance | null = null;

  private subs: Subscription[] = [];

  private ORB_ICONS: Record<OrbKey, string> = {
    bestial: 'assets/ui/orb-bestial.png',
    elemental: 'assets/ui/orb-elemental.png',
    natural: 'assets/ui/orb-natural.png',
    mechanic: 'assets/ui/orb-mechanic.png',
  };

  pauseMenuOpen = false;
  showMap = false;

  constructor(
    private player: PlayerService,
    private router: Router,
    private mapService: MapService,
    private saveService: SaveService,
    private characterService: CharacterService,
    private actionService: ActionService
  ) {}

  ngOnInit(): void {
    this.character = this.player.getCharacter();

    // Abonnements aux événements de la carte
    this.subs.push(
      this.mapService.playerMoved.subscribe(() => this.autoSave()),
      this.mapService.tileChange.subscribe(tile => {
        this.currentTile = tile;
      }),
      this.mapService.overlayChange.subscribe(kind => {
        // Si l’overlay n’est pas vide → on génère une instance unique
        if (kind && kind !== OverlayKind.None) {
          this.activeOverlay = OverlayFactory.create(kind);
        } else {
          this.activeOverlay = null;
        }
      }),
      this.actionService.nextOverlay$.subscribe(o => {
        this.activeOverlay = o;
      })
    );

    this.refreshOrbs();
  }

  async ngAfterViewInit() {
    const canvas = await this.waitForCanvas();
    if (!canvas) {
      console.error('❌ Impossible de trouver le canvas');
      return;
    }

    this.characterService.clearLegacyStorage();

    const nav = history.state ?? {};
    const chosenSlot: string | undefined = nav.slot;
    const isNewGame: boolean = !!nav.newGame;

    if (isNewGame) {
      console.log('🎲 Nouvelle partie demandée → reset complet');
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
    return { character: charState, map: mapState, timestamp: Date.now() };
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
  openMap() { this.showMap = !this.showMap; }
  openBackpack() { console.log('Open Backpack'); }
  openQuests() { console.log('Open Quests'); }
  openSkills() { console.log('Open Skills'); }

  goHome() { this.router.navigate(['/home']); }

  openPauseMenu() { this.pauseMenuOpen = true; }
  closePauseMenu() { this.pauseMenuOpen = false; }

  // === Overlay window actions ===
  onOverlayAction(action: ActionType) {
    if (!this.activeOverlay) return;
    this.actionService.executeAction(action, this.activeOverlay);
    this.activeOverlay = null;
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
