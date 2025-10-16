import { MapSnapshot } from '../services/map.service';
import { Character } from './character.model';
import { GroundItem } from '../services/loot.service';

export interface GameState {
  character: Character;
  map: MapSnapshot;
  timestamp: number;
  groundItems: GroundItem[]
}
