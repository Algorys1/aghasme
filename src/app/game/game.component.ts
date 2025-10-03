import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PlayerService} from '../services/player.service';
import {Character, OrbKey} from '../models/character.model';
import {MapService} from '../services/map.service';
import {OverlayInfo, overlayManifest} from '../models/overlay-types';
import {Subscription} from 'rxjs';
import {CharacterService} from '../services/character.service';
import {SaveService} from '../services/save.service';
import {GameState} from '../models/game-state.model';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  character: Character | null = null;
  orbs: { key: OrbKey; name: string; icon: string; value: number }[] = [];

  currentTile: { type: string; description?: string } | null = null;
  currentOverlay: OverlayInfo | null = null;
  actions: string[] = [];

  private subs: Subscription[] = [];

  private ORB_ICONS: Record<OrbKey, string> = {
    bestial: 'assets/ui/orb-strength.png',
    elemental: 'assets/ui/orb-essence.png',
    natural: 'assets/ui/orb-spirit.png',
    mechanic: 'assets/ui/orb-mechanic.png',
  };

  pauseMenuOpen = false;

  constructor(
    private player: PlayerService,
    private router: Router,
    private mapService: MapService,
    private saveService: SaveService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.character = this.player.getCharacter();
    console.log('[Character OnInit]', this.character?.archetype);

    if (!this.character) {
      this.router.navigate(['/start']);
      return;
    }
    this.subs.push(
      this.mapService.playerMoved.subscribe(() => {
        this.autoSave();
      }),
      this.mapService.tileChange.subscribe(tile => {
        this.currentTile = tile;
      }),
      this.mapService.overlayChange.subscribe(kind => {
        this.currentOverlay = overlayManifest[kind];
        this.actions = this.currentOverlay?.actions ?? [];
      })
    );
    this.refreshOrbs();
  }

  async ngAfterViewInit() {
    const last = this.saveService.loadGame('auto');

    if (last && last.map) {
      await this.mapService.loadMapState(last.map, 'myCanvas', 4);
      this.characterService.setCharacter(last.character);
      this.character = last.character;
      this.refreshOrbs();
    } else {
      await this.mapService.initMap('myCanvas', 4);
    }
  }

  private refreshOrbs() {
    if (!this.character) {
      this.orbs = [];
      return;
    }
    const o = this.character.orbs;
    this.orbs = [
      { key: 'bestial', name: 'Bestial', icon: this.ORB_ICONS.bestial, value: o.bestial },
      { key: 'elemental', name: 'Élémentaire', icon: this.ORB_ICONS.elemental, value: o.elemental },
      { key: 'natural', name: 'Naturel', icon: this.ORB_ICONS.natural, value: o.natural },
      { key: 'mechanic', name: 'Mécanique', icon: this.ORB_ICONS.mechanic, value: o.mechanic },
    ];
  }

  // --- HUD Actions ---
  onAction(action: string) {
    console.log('[Action]', action, 'on', this.currentOverlay?.name);
    // TODO : logiques overlay ici
  }

  // --- HUD buttons ---
  openMap() { console.log('Open Map'); }
  openBackpack() { console.log('Open Backpack'); }
  openQuests() { console.log('Open Quests'); }
  openSkills() { console.log('Open Skills'); }

  private buildFullState(): GameState | null {
    const char = this.characterService.getCharacter();
    if (!char) return null;

    const mapState = this.mapService.getMapState();
    return {
      character: char,
      map: mapState,
      timestamp: Date.now()
    };
  }

  private autoSave() {
    const full = this.buildFullState();
    if (!full) return;
    this.saveService.saveGame(full, 'autosave');
  }

  openPauseMenu() { this.pauseMenuOpen = true; }
  closePauseMenu() { this.pauseMenuOpen = false; }

  saveGameManual() {
    const name = prompt("Nom de la sauvegarde :");
    if (!name) return;

    const full = this.buildFullState();
    if (!full) return;

    this.saveService.saveGame(full, name);
    alert(`Sauvegarde "${name}" créée !`);
  }

  goHome() { this.router.navigate(['/home']); }
  quitGame() { this.router.navigate(['/home']); }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
