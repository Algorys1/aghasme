// src/app/models/combat.model.ts
import { Orbs } from '../../character/models/character.model';

export type Turn = 'player' | 'enemy';

export interface Vec2 {
  x: number;
  y: number;
}

export interface CombatEntity {
  id: string;
  name: string;
  isPlayer: boolean;
  level: number;

  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;

  attackBonus: number;
  defenseBonus: number;

  orbs: Orbs;

  mov: number;                 // cases par action
  position: Vec2;              // coords sur la grille
  actionsRemaining: number;    // 0..2

  icon?: string;               // optionnel, pour l’UI
}

export interface CombatInitPayload {
  player: CombatEntity;
  enemy: CombatEntity;
  gridSize: { cols: number; rows: number };
}

export interface CombatResult {
  winner: Turn;
  xpGained: number;
  goldGained: number;
  lootIds?: string[];
}

export interface CombatStateGlobal {
  turn: Turn;
  entities: {
    player: CombatEntity;
    enemy: CombatEntity;
  };
}
