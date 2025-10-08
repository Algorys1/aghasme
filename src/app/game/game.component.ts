// game.component.ts
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {PlayerService} from '../services/player.service';
import {Character, OrbKey} from '../models/character.model';
import {MapService} from '../services/map.service';
import { OVERLAY_MANIFEST, OverlayInfo, OverlayKind } from '../models/overlays';
import {Subscription} from 'rxjs';
import {CharacterService} from '../services/character.service';
import {SaveService} from '../services/save.service';
import {GameState} from '../models/game-state.model';
import { MinimapComponent } from "../minimap/minimap.component";
import { OverlayWindowComponent } from '../overlay-window/overlay-window.component';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [MinimapComponent, OverlayWindowComponent]
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
[x: string]: any;
  @ViewChild('gameCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  character: Character | null = null;
  orbs: { key: OrbKey; name: string; icon: string; value: number }[] = [];

  currentTile: { type: string; description?: string } | null = null;
  currentOverlay: OverlayInfo | null = null;
  activeOverlayKind: OverlayKind | null = null;
  actions: string[] = [];

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
  ) {}

  get activeOverlayData(): OverlayInfo | null {
    return this.activeOverlayKind ? OVERLAY_MANIFEST[this.activeOverlayKind] : null;
  }

  ngOnInit(): void {
    this.character = this.player.getCharacter();

    this.subs.push(
      this.mapService.playerMoved.subscribe(() => {
        this.autoSave();
      }),
      this.mapService.tileChange.subscribe(tile => {
        this.currentTile = tile;
      }),
      this.mapService.overlayChange.subscribe(kind => {
        this.currentOverlay = OVERLAY_MANIFEST[kind];
        this.actions = this.currentOverlay?.actions ?? [];      
        if (kind && kind !== OverlayKind.None) {
          this.onTileEnter({ overlayKind: kind });
        }
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
      return;
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
    if (!full) return;
    this.saveService.saveGame(full, 'auto');
  }

  saveGameManual() {
    const name = prompt("Nom de la sauvegarde :");
    if (!name) return;
    const full = this.buildFullState();
    if (!full) return;
    this.saveService.saveGame(full, name);
    alert(`💾 Sauvegarde "${name}" enregistrée !`);
  }

  // --- TODO HUD buttons ---
  openMap() {
    this.showMap = !this.showMap;
  }

  openBackpack() { console.log('Open Backpack'); }
  openQuests() { console.log('Open Quests'); }
  openSkills() { console.log('Open Skills'); }

  // --- TODO HUD Actions ---
  onAction(action: string) { console.log('[Action]', action, 'on', this.currentOverlay?.name); }

  goHome() { this.router.navigate(['/home']); }

  openPauseMenu() { this.pauseMenuOpen = true; }
  closePauseMenu() { this.pauseMenuOpen = false; }

  onTileEnter(tile: any) {
    if (tile.overlayKind && tile.overlayKind !== OverlayKind.None) {
      this.activeOverlayKind = tile.overlayKind;
    }
  }
  
  onOverlayAction(action: string) {
    console.log('Overlay action:', action);
  
    // Exemple : enchaînement vers combat, exploration, etc.
    if (action === 'Fight') {
      // this.startCombat(this.activeOverlayKind!);
    }
  
    this.activeOverlayKind = null;
  }
  

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
