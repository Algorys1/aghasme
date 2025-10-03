import { Character } from './character.model';
import { OverlayKind } from './overlay-types';

export interface GameState {
  character: Character;
  map: {
    seed: number;
    radius: number;
    player: { q: number; r: number };
    overlays: { q: number; r: number; kind: OverlayKind }[];
    discovered: { q: number; r: number }[];
  };
  timestamp: number;
}
