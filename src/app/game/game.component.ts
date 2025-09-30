import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MapService } from '../services/map.service';
import { OverlayKind } from '../models/overlay-types';
import { PlayerService } from '../services/player.service';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {
  character!: Character;
  currentOverlay: OverlayKind | null = null;

  constructor(
    private router: Router,
    private mapService: MapService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    // Retrieve character from PlayerService
    const char = this.playerService.getCharacter();
    if (!char) {
      this.router.navigate(['/start']);
      return;
    }
    this.character = char;

    // Subscribe to overlay changes (city, village, event)
    this.mapService.overlayChange.subscribe(overlay => {
      this.currentOverlay = overlay;
    });
  }

  async ngAfterViewInit() {
    // Generate the map when component view is ready
    const mapSize = 4; // fixed value for now
    await this.mapService.initMap('myCanvas', mapSize);
  }

  get actions(): string[] {
    return this.mapService.getActiveActions();
  }
  
  onAction(action: string) {
    console.log(`Player chose action: ${action} on ${this.currentOverlay}`);
    // TODO: branch gameplay logic here
  }  

  enterCity() {
    console.log('Entered city!');
  }

  enterVillage() {
    console.log('Entered village!');
  }

  discoverEvent() {
    console.log('Discovered an event!');
  }
}
