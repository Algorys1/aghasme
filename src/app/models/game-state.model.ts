import { MapSnapshot } from '../services/map.service';
import { Character } from './character.model';
import { OverlayKind } from './overlay-types';

export interface GameState {
  character: Character;
  map: MapSnapshot;
  timestamp: number;
}
