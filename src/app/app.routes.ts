import { Routes } from '@angular/router';
import { HomeScreenComponent } from './game/components/home-screen/home-screen.component';
import { GameComponent } from './game/components/game.component';
import { StartGameComponent } from './game/components/start-game/start-game.component';
import { CharacterCreationComponent } from './character/components/character-creation/character-creation.component';
import {SaveListComponent} from './game/components/save-list/save-list.component';

export const routes: Routes = [
  { path: '', component: HomeScreenComponent },
  { path: 'start', component: StartGameComponent },
  { path: 'create-character', component: CharacterCreationComponent },
  { path: 'game', component: GameComponent },
  { path: 'saves', component: SaveListComponent },
  { path: '**', redirectTo: '' } // fallback
];
