import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';
import { MapService } from '../services/map.service';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  character!: Character;
  map!: string; // <- ajout pour la map
  stats: any[] = [];

  constructor(private router: Router, private mapService: MapService) {
    // Récupère les données passées depuis StartGame
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { character: Character; map: string };

    if (state) {
      this.character = state.character;
      this.map = state.map;
    } else {
      // fallback si aucune donnée n'est reçue
      this.character = {
        name: 'Héros',
        strength: 5,
        essence: 5,
        mechanic: 5,
        spirit: 5,
        skills: []
      };
      this.map = 'Map1';
    }

    // Prépare les stats pour le panneau du haut
    this.stats = [
      { name: 'Strength', value: this.character.strength, icon: 'Dumbbell', color: '#8B0000' },
      { name: 'Essence', value: this.character.essence, icon: 'Leaf', color: '#228B22' },
      { name: 'Mechanic', value: this.character.mechanic, icon: 'Cog', color: '#000000' },
      { name: 'Spirit', value: this.character.spirit, icon: 'Brain', color: '#1E90FF' }
    ];
  }

  async ngOnInit() {
    // Affiche la carte selon la map choisie
    const mapSize = this.map === 'Map1' ? 3 : this.map === 'Map2' ? 5 : 7;
    await this.mapService.initMap('myCanvas', mapSize);
  }
}
