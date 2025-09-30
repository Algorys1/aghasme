import { Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { GameComponent } from './game/game.component';
import { StartGameComponent } from './start-game/start-game.component';
import { CharacterCreationComponent } from './character-creation/character-creation.component';
import { CharacterGuard } from './guards/character.guard';

export const routes: Routes = [
  { path: '', component: HomeScreenComponent },
  { path: 'start', component: StartGameComponent },
  { path: 'create-character', component: CharacterCreationComponent },
  { path: 'game', component: GameComponent, canActivate: [CharacterGuard] },
  { path: '**', redirectTo: '' } // fallback
];
