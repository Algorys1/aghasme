import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { Character, OrbKey } from '../models/character.model';
import { MapService } from '../services/map.service';
import { OverlayKind, OverlayInfo, overlayManifest } from '../models/overlay-types';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChild('pixiCanvas', { static: true }) pixiCanvas!: ElementRef<HTMLCanvasElement>;

  character: Character | null = null;
  orbs: { key: OrbKey; name: string; icon: string; value: number }[] = [];

  currentTile: { type: string; description?: string } | null = null;
  currentOverlay: OverlayInfo | null = null;
  actions: string[] = [];

  private ORB_ICONS: Record<OrbKey, string> = {
    bestial: 'assets/ui/orb-strength.png',
    elemental: 'assets/ui/orb-essence.png',
    natural: 'assets/ui/orb-spirit.png',
    mechanic: 'assets/ui/orb-mechanic.png',
  };

  constructor(
    private player: PlayerService,
    private router: Router,
    private mapService: MapService,
  ) {}

  ngOnInit(): void {
    this.character = this.player.getCharacter();
    if (!this.character) {
      this.router.navigate(['/start']);
      return;
    }
    this.refreshOrbs();

    // écoute les changements d’overlay
    this.mapService.overlayChange.subscribe((kind: OverlayKind) => {
      this.currentOverlay = overlayManifest[kind];
      this.actions = this.currentOverlay?.actions ?? [];
    });
    this.mapService.tileChange.subscribe(tile => {
      this.currentTile = tile;
    });
    
  }

  ngAfterViewInit(): void {
    this.mapService.initMap('myCanvas', 4);
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
    // tu pourras brancher ici la logique overlayActions
  }

  // --- HUD buttons ---
  openMap() { console.log('Open Map'); }
  openBackpack() { console.log('Open Backpack'); }
  openQuests() { console.log('Open Quests'); }
  openSkills() { console.log('Open Skills'); }

  // --- APIs pratiques pour MapService (si tu les avais avant) ---
  setTileInfo(type: string, description?: string) {
    this.currentTile = { type, description };
  }

  setOverlayInfo(kind: OverlayKind) {
    this.currentOverlay = overlayManifest[kind];
    this.actions = this.currentOverlay?.actions ?? [];
  }

  setActions(actions: string[]) {
    this.actions = actions;
  }
}
