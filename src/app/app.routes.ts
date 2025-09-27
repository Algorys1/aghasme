import { Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { GameComponent } from './game/game.component';
import { StartGameComponent } from './start-game/start-game.component';

export const routes: Routes = [
  { path: '', component: HomeScreenComponent },
  { path: 'start', component: StartGameComponent },
  { path: 'game', component: GameComponent }
];
