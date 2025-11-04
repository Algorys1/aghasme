import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayerService } from '../../character/services/player.service';
import { Enemy } from '../models/enemy.model';
import { Character } from '../../character/models/character.model';
import { CombatEntity, CombatInitPayload, CombatResult, CombatStateGlobal, Turn } from '../models/combat.model';

@Injectable({ providedIn: 'root' })
export class CombatService {
  private state: CombatStateGlobal | null = null;
  private inCombat = false;

  // --- EVENTS ---
  public combatStarted$ = new Subject<CombatInitPayload>();
  public turnChanged$ = new Subject<Turn>();
  public combatEnded$ = new Subject<CombatResult>();
  public entityMoved$ = new Subject<{ id: string; x: number; y: number }>();

  constructor(private playerService: PlayerService) {}

  /**
   * Lance un nouveau combat contre un ennemi
   */
  startCombat(enemy: Enemy): void {
    const player = this.playerService.getCharacter();
    if (!player) return;

    // Création des entités de combat
    const playerEntity = this.createCombatEntityFromCharacter(player, true);
    const enemyEntity = this.createCombatEntityFromEnemy(enemy);

    this.state = {
      turn: 'player',
      entities: { player: playerEntity, enemy: enemyEntity },
    };

    this.inCombat = true;

    // Notifie le board / l’UI
    this.combatStarted$.next({
      player: playerEntity,
      enemy: enemyEntity,
      gridSize: { cols: 6, rows: 8 }, // provisoire, adaptable plus tard
    });

    // Premier tour = joueur
    this.turnChanged$.next('player');
  }

  /**
   * Déplace une entité (player ou enemy) sur la grille
   */
  moveEntity(id: string, x: number, y: number): void {
    if (!this.state) return;
    const entity = Object.values(this.state.entities).find(e => e.id === id);
    if (!entity) return;

    entity.position = { x, y };
    entity.actionsRemaining = Math.max(0, entity.actionsRemaining - 1);

    this.entityMoved$.next({ id, x, y });

    this.checkEndOfTurn();
  }

  /**
   * Termine le tour si l’entité active n’a plus d’actions
   */
  private checkEndOfTurn(): void {
    if (!this.state) return;
    const active = this.state.turn === 'player' ? this.state.entities.player : this.state.entities.enemy;
    if (active.actionsRemaining <= 0) {
      this.endTurn();
    }
  }

  /**
   * Change de tour (joueur ↔ ennemi)
   */
  public endTurn(): void {
    if (!this.state) return;
    const nextTurn: Turn = this.state.turn === 'player' ? 'enemy' : 'player';
    this.state.turn = nextTurn;

    // Recharge les points d’action pour le nouveau tour
    const active = this.state.entities[nextTurn];
    active.actionsRemaining = 2;

    this.turnChanged$.next(nextTurn);
  }

  /**
   * Termine le combat
   */
  endCombat(winner: 'player' | 'enemy'): void {
    if (!this.state) return;
    const result: CombatResult = {
      winner,
      xpGained: winner === 'player' ? this.state.entities.enemy.level * 10 : 0,
      goldGained: winner === 'player' ? Math.floor(5 + Math.random() * 6) : 0,
    };

    if (winner === 'player') {
      this.playerService.gainXP(result.xpGained);
      this.playerService.gainGold(result.goldGained);
    }

    this.inCombat = false;
    this.state = null;
    this.combatEnded$.next(result);
  }

  /**
   * Crée une entité de combat depuis le joueur
   */
  private createCombatEntityFromCharacter(character: Character, isPlayer = false): CombatEntity {
    return {
      id: 'player',
      name: character.name,
      isPlayer,
      level: character.level,
      hp: character.hp,
      maxHp: character.maxHp,
      mp: character.mp,
      maxMp: character.maxMp,
      attackBonus: character.attack ?? 0,
      defenseBonus: character.defense ?? 0,
      orbs: character.orbs,
      mov: Math.max(1, Math.floor((character.orbs.natural + character.orbs.elemental) / 10)),
      position: { x: 1, y: 4 },
      actionsRemaining: 2,
    };
  }

  /**
   * Crée une entité de combat depuis l’ennemi
   */
  private createCombatEntityFromEnemy(enemy: Enemy): CombatEntity {
    return {
      id: 'enemy',
      name: enemy.name,
      isPlayer: false,
      level: enemy.level,
      hp: enemy.hp,
      maxHp: enemy.hp,
      mp: enemy.mp,
      maxMp: enemy.mp,
      attackBonus: enemy.attack ?? 0,
      defenseBonus: enemy.defense ?? 0,
      orbs: {
        bestial: 10,
        natural: 10,
        mechanic: 10,
        elemental: 10,
      },
      mov: 2,
      position: { x: 4, y: 4 },
      actionsRemaining: 2,
      icon: enemy.icon,
    };
  }

  isInCombat(): boolean {
    return this.inCombat;
  }

  getState(): CombatStateGlobal | null {
    return this.state;
  }

  reset(): void {
    this.state = null;
    this.inCombat = false;
  }
}
