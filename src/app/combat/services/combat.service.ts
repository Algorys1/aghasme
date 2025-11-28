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
  public attackRequested$ = new Subject<{ attacker: string; target: string }>();
  public preCombatStarted$ = new Subject<{ player: CombatEntity; enemy: CombatEntity }>();
  public combatStarted$ = new ReplaySubject<CombatInitPayload>(1);
  public turnChanged$ = new Subject<Turn>();
  public combatEnded$ = new Subject<CombatResult>();
  public entityMoved$ = new Subject<{ id: string; x: number; y: number }>();

  private readonly BASE_DEFENSE = 8;

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

  requestPlayerAttack(attackerId: string, targetId: string) {
    if (!this.state) return;
    this.attackRequested$.next({ attacker: attackerId, target: targetId });
  }

  attackEntity(attackerId: string, targetId: string) {
    if (!this.state) return;

    const attacker = Object.values(this.state.entities).find(e => e.id === attackerId);
    const target   = Object.values(this.state.entities).find(e => e.id === targetId);
    if (!attacker || !target) return;

    // adjacency check
    const dx = Math.abs(attacker.position.x - target.position.x);
    const dy = Math.abs(attacker.position.y - target.position.y);
    if (dx + dy !== 1) {
      console.log('❌ Not in melee range');
      return;
    }

    // --- OFFICIAL MELEE ATTACK ---
    const d20 = Math.floor(Math.random() * 20) + 1;

    // Critical fail
    if (d20 === 1) {
      console.log('💥 Critical FAIL!');
      attacker.actionsRemaining = Math.max(0, attacker.actionsRemaining - 1);
      this.checkEndOfTurn();
      return;
    }

    const attackRoll = this.getMeleeAttackRoll(attacker, d20);
    const targetDefense = this.getPhysicalDefense(target);

    console.log(`🎲 d20=${d20} → AttackRoll=${attackRoll} vs Defense=${targetDefense}`);

    if (d20 === 20 || attackRoll >= targetDefense) {
      // HIT
      let damage = this.computeMeleeDamage(attacker);

      // Critical success doubles damage
      if (d20 === 20) {
        damage *= 2;
        console.log('💥 Critical HIT x2');
      }

      const final = this.applyPhysicalDamage(target, damage);

      console.log(`⚔️ ${attacker.name} deals ${final} damage to ${target.name}`);

      this.attackPerformed$.next({ attacker: attacker.id, target: target.id, damage: final });

      if (target.hp <= 0) {
        const winner = attacker.isPlayer ? 'player' : 'enemy';
        this.endCombat(winner);
        return;
      }

    } else {
      console.log(`🛡 MISS! (roll ${attackRoll} < defense ${targetDefense})`);
    }

    // consume action
    attacker.actionsRemaining = Math.max(0, attacker.actionsRemaining - 1);
    this.checkEndOfTurn();
  }

  resolvePlayerAttack(attackerId: string, targetId: string, roll: { orb: string; value: number; verdict: string }) {
    if (!this.state) return;

    const attacker = Object.values(this.state.entities).find(e => e.id === attackerId);
    const target   = Object.values(this.state.entities).find(e => e.id === targetId);
    if (!attacker || !target) return;

    // --- CRITICAL FAIL ---
    if (roll.verdict === 'criticalFail') {
      console.log('💥 Critical FAIL!');
      attacker.actionsRemaining = Math.max(0, attacker.actionsRemaining - 1);
      this.checkEndOfTurn();
      return;
    }

    // attack roll based on orb
    const d20 = roll.value;

    const attackRoll = this.getMeleeAttackRoll(attacker, d20);
    const targetDefense = this.getPhysicalDefense(target);

    console.log(`🎲 Player roll = ${d20} → attackRoll=${attackRoll} vs defense=${targetDefense}`);

    // --- HIT ---
    if (roll.verdict === 'criticalSuccess' || attackRoll >= targetDefense) {
      let rawDamage = this.computeMeleeDamage(attacker);

      if (roll.verdict === 'criticalSuccess') {
        rawDamage *= 2;
        console.log('💥 Critical HIT x2');
      }

      const final = this.applyPhysicalDamage(target, rawDamage);
      console.log(`⚔️ Player deals ${final} damage to ${target.name}`);

      this.attackPerformed$.next({ attacker: attacker.id, target: target.id, damage: final });

      if (target.hp <= 0) {
        this.endCombat('player');
        return;
      }

    } else {
      console.log(`🛡 MISS!`);
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

  private getOrbMod(value: number): number {
    if (value <= 6) return -2;
    if (value <= 9) return -1;
    if (value <= 12) return 0;
    if (value <= 15) return +1;
    if (value <= 19) return +2;
    return +3;
  }

  /** Defense against melee and ranged */
  private getPhysicalDefense(entity: CombatEntity): number {
    const naturalMod = this.getOrbMod(entity.orbs.natural);
    return this.BASE_DEFENSE + entity.defenseBonus + naturalMod;
  }

  /** Attack roll (MELEE — uses Bestial) */
  private getMeleeAttackRoll(attacker: CombatEntity, d20: number): number {
    const bestialMod = this.getOrbMod(attacker.orbs.bestial);
    return d20 + attacker.attackBonus + bestialMod;
  }

  /** Attack roll (RANGED — uses Mechanic) */
  private getRangedAttackRoll(attacker: CombatEntity, d20: number): number {
    const mechanicMod = this.getOrbMod(attacker.orbs.mechanic);
    return d20 + attacker.attackBonus + mechanicMod;
  }

  /** Computes melee physical damage (1d3 + bestial mod) */
  private computeMeleeDamage(attacker: CombatEntity): number {
    const base = Math.floor(Math.random() * 3) + 1; // 1d3
    const bestialMod = this.getOrbMod(attacker.orbs.bestial);
    return base + bestialMod;
  }

  /** Applies final damage after Natural reduction */
  private applyPhysicalDamage(target: CombatEntity, rawDamage: number): number {
    const naturalMod = this.getOrbMod(target.orbs.natural);
    const final = Math.max(1, rawDamage - naturalMod);
    target.hp = Math.max(0, target.hp - final);
    return final;
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
