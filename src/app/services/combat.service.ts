import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { Enemy } from '../models/enemy.model';

export type CombatTurn = 'player' | 'enemy' | 'none';
export interface CombatResult {
  winner: 'player' | 'enemy';
  xpGained: number;
  goldGained: number;
}

@Injectable({ providedIn: 'root' })
export class CombatService {
  private enemy: Enemy | null = null;
  private turn: CombatTurn = 'none';
  private inCombat = false;
  private lastResult: CombatResult | null = null;

  constructor(private playerService: PlayerService) {}

  startCombat(enemy: Enemy): void {
    // ✅ On force TypeScript à savoir que l'ennemi est bien défini
    this.enemy = enemy;
    this.inCombat = true;
    this.lastResult = null;
    this.turn = Math.random() < 0.5 ? 'player' : 'enemy';
  }

  getEnemy(): Enemy | null { return this.enemy; }
  getTurn(): CombatTurn { return this.turn; }
  isInCombat(): boolean { return this.inCombat; }
  getLastResult(): CombatResult | null { return this.lastResult; }

  playerAttack(): number {
    const player = this.playerService.getCharacter();
    // ✅ Si le joueur ou l'ennemi n'existe pas, on sort immédiatement
    if (!player || !this.enemy || this.turn !== 'player') return 0;

    const enemy = this.enemy; // TS le sait non-null ici

    const damage = this.computeDamage(player.attack ?? 0, enemy.defense ?? 0);
    enemy.hp = Math.max(0, enemy.hp - damage);

    if (enemy.hp === 0) {
      this.finish('player');
    } else {
      this.turn = 'enemy';
    }

    return damage;
  }

  enemyAttack(): number {
    const player = this.playerService.getCharacter();
    if (!player || !this.enemy || this.turn !== 'enemy') return 0;

    const enemy = this.enemy;

    const damage = this.computeDamage(enemy.attack ?? 0, player.defense ?? 0);
    player.hp = Math.max(0, player.hp - damage);

    if (player.hp === 0) {
      this.finish('enemy');
    } else {
      this.turn = 'player';
    }

    return damage;
  }

  private computeDamage(attack: number, defense: number): number {
    const base = attack - defense / 2;
    const variance = Math.random() * 4 - 2; // +/- 2
    return Math.max(1, Math.round(base + variance));
  }

  private finish(winner: 'player' | 'enemy') {
    const player = this.playerService.getCharacter();
    if (!player) return; // ✅ sécurité

    let xp = 0, gold = 0;

    if (winner === 'player' && this.enemy) {
      xp = this.enemy.level * 10;
      gold = Math.floor(5 + Math.random() * 6);
      this.playerService.gainXP(xp);
      this.playerService.gainGold(gold);
    }

    this.inCombat = false;
    this.turn = 'none';
    this.lastResult = { winner, xpGained: xp, goldGained: gold };
    this.enemy = null;
  }

  reset(): void {
    this.inCombat = false;
    this.turn = 'none';
    this.enemy = null;
    this.lastResult = null;
  }
}
