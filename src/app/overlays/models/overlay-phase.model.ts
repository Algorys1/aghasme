import { ActionType } from '../../overlays/models/actions';
import { Effect } from '../../items/models/effect.model';
import { Terrain } from '../../game/factories/tile.factory';

/**
 * Narrative context for generating or evaluating an overlay.
 */
export interface OverlayContext {
  playerLevel?: number;
  terrain?: Terrain;
}

/**
 * Describes a context modifier (object, buff, condition, etc.)
 */
export interface OverlayContextModifier {
  key: string;
  value: number;
  /** If true: applies when the condition is met, otherwise when it is absent */
  requiresPresence?: boolean;
}

/**
 * Test de compétence basé sur un jet D20 + orb correspondante.
 */
export interface OverlayCheck {
  orb: 'bestial' | 'natural' | 'elemental' | 'mechanic';
  difficulty: number;
  modifier?: number;
  contextModifiers?: OverlayContextModifier[];
}

/**
* Special action without changing floor,
* may involve a die roll and/or effects.
*/
export interface PassiveOverlayPhase {
  description?: string;
  effects?: Effect[];

  check?: OverlayCheck;

  onSuccess?: {
    description?: string;
    effects?: Effect[];
    next?: string;
  };

  onFailure?: {
    description?: string;
    effects?: Effect[];
    next?: string;
  };
}

/**
* Stage of an overlay narrative event.
* Contains possible actions and transitions.
*/
export interface OverlayPhase {
  title: string;
  description: string;
  actions: ActionType[];
  next?: string;
  uniqueChoice?: boolean;

  /** Associates each action with a phase or passive behavior */
  actionPassive?: Partial<Record<ActionType, PassiveOverlayPhase>>;

  /** Encounter describe possible encounter during an Overlay**/
  encounter?: {
    chance?: number;             // 1 = 100% chance, otherwise .2, .1, .5
    enemies: string[];           // list of possible ennemies
    random?: boolean;            // true = pick an enemy in the list
  };
}
