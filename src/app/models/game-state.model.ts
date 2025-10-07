import { MapSnapshot } from '../services/map.service';
import { Character } from './character.model';

export interface GameState {
  character: Character;
  map: MapSnapshot;
  timestamp: number;
}
