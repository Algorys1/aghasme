import { MapSnapshot } from '../services/map.service';
import { Character } from '../../character/models/character.model';
import { GroundItem } from '../../combat/services/loot.service';

export interface GameState {
  character: Character;
  map: MapSnapshot;
  timestamp: number;
  groundItems: GroundItem[]
}
