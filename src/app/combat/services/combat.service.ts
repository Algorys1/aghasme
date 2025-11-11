import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Enemy } from '../models/enemy.model';
import { Character, CHARACTER_ASSETS } from '../../character/models/character.model';
import { CombatEntity, CombatInitPayload, CombatResult, CombatStateGlobal, Turn } from '../models/combat.model';
import { CharacterService } from '../../character/services/character.service';

@Injectable({ providedIn: 'root' })
export class CombatService {
  private state: CombatStateGlobal | null = null;
  private inCombat = false;
  private playerEntity?: CombatEntity;
  private enemyEntity?: CombatEntity;

  // --- EVENTS ---
  public attackPerformed$ = new Subject<{ attacker: string; target: string; damage: number }>();
  public preCombatStarted$ = new Subject<{ player: CombatEntity; enemy: CombatEntity }>();
  public combatStarted$ = new ReplaySubject<CombatInitPayload>(1);
  public turnChanged$ = new Subject<Turn>();
  public combatEnded$ = new Subject<CombatResult>();
  public entityMoved$ = new Subject<{ id: string; x: number; y: number }>();

  constructor(private characterService: CharacterService) {}

  startPreCombat(enemy: Enemy): void {
    const player = this.characterService.getCharacter();
    if (!player) return;

    this.playerEntity = this.createCombatEntityFromCharacter(player, true);
    this.enemyEntity = this.createCombatEntityFromEnemy(enemy);

    this.state = { turn: 'player', entities: { player: this.playerEntity, enemy: this.enemyEntity } };
    this.inCombat = true;

    this.preCombatStarted$.next({ player: this.playerEntity, enemy: this.enemyEntity });
  }

  startCombat(): void {
    if(!this.playerEntity || !this.enemyEntity)
      return;

    this.state = {
      turn: 'player',
      entities: { player: this.playerEntity, enemy: this.enemyEntity },
    };

    this.inCombat = true;

    this.combatStarted$.next({
      player: this.playerEntity,
      enemy: this.enemyEntity,
      gridSize: { cols: 6, rows: 8 },
    });

    this.turnChanged$.next('player');
  }

  moveEntity(id: string, x: number, y: number): void {
    if (!this.state) return;
    const entity = Object.values(this.state.entities).find(e => e.id === id);
    if (!entity) return;

    entity.position = { x, y };
    entity.actionsRemaining = Math.max(0, entity.actionsRemaining - 1);

    this.entityMoved$.next({ id, x, y });

    this.checkEndOfTurn();
  }

  attackEntity(attackerId: string, targetId: string) {
    if (!this.state) return;

    const attacker = Object.values(this.state.entities).find(e => e.id === attackerId);
    const target   = Object.values(this.state.entities).find(e => e.id === targetId);
    if (!attacker || !target) return;

    // adjacent check
    const dx = Math.abs(attacker.position.x - target.position.x);
    const dy = Math.abs(attacker.position.y - target.position.y);
    if (dx + dy !== 1) {
      console.log('❌ Pas à portée');
      return;
    }

    // Simple damage (TODO use Effects and roll)
    const raw = Math.max(1, attacker.attackBonus - target.defenseBonus);
    const variance = Math.floor(Math.random() * 3) - 1; // -1 / 0 / +1
    const damage = Math.max(1, raw + variance);

    target.hp = Math.max(0, target.hp - damage);
    console.log(`⚔️ ${attacker.name} inflige ${damage} dégâts à ${target.name}`);

    this.attackPerformed$.next({ attacker: attacker.id, target: target.id, damage });

    if (target.hp <= 0) {
      const winner = attacker.isPlayer ? 'player' : 'enemy';
      this.endCombat(winner);
      return;
    }

    attacker.actionsRemaining = Math.max(0, attacker.actionsRemaining - 1);
    this.checkEndOfTurn();
  }


  private checkEndOfTurn(): void {
    if (!this.state) return;
    const active = this.state.turn === 'player' ? this.state.entities.player : this.state.entities.enemy;
    if (active.actionsRemaining <= 0) {
      this.endTurn();
    }
  }

  public endTurn(): void {
    if (!this.state) return;
    const nextTurn: Turn = this.state.turn === 'player' ? 'enemy' : 'player';
    this.state.turn = nextTurn;

    const active = this.state.entities[nextTurn];
    active.actionsRemaining = 2;

    this.turnChanged$.next(nextTurn);
    if (nextTurn === 'enemy') {
      this.enemyTurn();
    }
  }

  private enemyTurn() {
    if (!this.state) return;
    const { player, enemy } = this.state.entities;
    const dx = Math.abs(player.position.x - enemy.position.x);
    const dy = Math.abs(player.position.y - enemy.position.y);

    if (dx + dy === 1) {
      // attaque auto
      this.attackEntity('enemy', 'player');
    } else {
      console.log('👹 Ennemi ne peut pas attaquer (pas à portée)');
    }

    this.endTurn();
  }

  endCombat(winner: 'player' | 'enemy'): void {
    console.log('End Combat')
    if (!this.state) return;
    const result: CombatResult = {
      winner,
      xpGained: winner === 'player' ? this.state.entities.enemy.level * 10 : 0,
      goldGained: winner === 'player' ? Math.floor(5 + Math.random() * 6) : 0,
    };

    if (winner === 'player') {
      this.characterService.addXP(result.xpGained);
      this.characterService.gainGold(result.goldGained);
    }

    this.inCombat = false;
    this.state = null;
    this.combatEnded$.next(result);
  }

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
      icon: CHARACTER_ASSETS[character.gender][character.archetype]
    };
  }

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

  getPlayerEntity(): CombatEntity | undefined {
    return this.playerEntity;
  }

  getEnemyEntity(): CombatEntity | undefined {
    return this.enemyEntity;
  }

  reset(): void {
    this.state = null;
    this.inCombat = false;
  }
}
