import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { Enemy } from '../models/enemy.model';
import { Subject } from 'rxjs';

export interface CombatResult {
  winner: 'player' | 'enemy';
  xpGained: number;
  goldGained: number;
}

@Injectable({ providedIn: 'root' })
export class CombatService {
  private enemy: Enemy | null = null;
  private lastResult: CombatResult | null = null;
  private inCombat = false;

  public combatEnded$ = new Subject<'player' | 'enemy'>();

  constructor(private playerService: PlayerService) {}

  startCombat(enemy: Enemy): void {
    this.enemy = enemy;
    this.inCombat = true;
    this.lastResult = null;
  }

  getEnemy(): Enemy | null { return this.enemy; }
  isInCombat(): boolean { return this.inCombat; }
  getLastResult(): CombatResult | null { return this.lastResult; }

  playerAttack(): number {
    const player = this.playerService.getCharacter();
    if (!player || !this.enemy) return 0;

    const damage = this.computeDamage(player.attack ?? 0, this.enemy.defense ?? 0);
    this.enemy.hp = Math.max(0, this.enemy.hp - damage);

    if (this.enemy.hp === 0) {
      this.finish('player');
    }
    return damage;
  }

  enemyAttack(): number {
    const player = this.playerService.getCharacter();
    if (!player || !this.enemy) return 0;

    const damage = this.computeDamage(this.enemy.attack ?? 0, player.defense ?? 0);
    player.hp = Math.max(0, player.hp - damage);

    if (player.hp === 0) {
      this.finish('enemy');
    }
    return damage;
  }

  private computeDamage(attack: number, defense: number): number {
    const roll = this.rollD20();
  
    if (roll === 1) { 
      console.log('💀 Critical failure!');
      return 0; 
    }
    if (roll === 20) { 
      console.log('🔥 Critical hit!');
      return Math.max(1, (attack * 1.5) - defense);
    }    
    if (roll > attack) {
      console.log(`❌ Attack failed (roll ${roll} > attack ${attack})`);
      return 0;
    }
  
    const baseDamage = Math.max(1, attack - defense);
    const variance = Math.random() * 2 - 1;
    const final = Math.max(1, Math.round(baseDamage + variance));
  
    console.log(`🎯 Hit! Roll ${roll} <= attack ${attack}, damage ${final}`);
    return final;
  }  

  private finish(winner: 'player' | 'enemy') {
    const player = this.playerService.getCharacter();
    if (!player || !this.enemy) return;

    let xp = 0, gold = 0;
    if (winner === 'player') {
      xp = this.enemy.level * 10;
      gold = Math.floor(5 + Math.random() * 6);
      this.playerService.gainXP(xp);
      this.playerService.gainGold(gold);
    }

    this.inCombat = false;
    this.lastResult = { winner, xpGained: xp, goldGained: gold };
    this.combatEnded$.next(winner);

    this.enemy = null;
  }

  private rollD20(): number {
    return Math.floor(Math.random() * 20) + 1;
  }  

  reset(): void {
    this.inCombat = false;
    this.enemy = null;
    this.lastResult = null;
  }
}
