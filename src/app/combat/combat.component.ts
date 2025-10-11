import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CombatService } from '../services/combat.service';
import { PlayerService } from '../services/player.service';
import { Enemy } from '../models/enemy.model';
import { Character } from '../models/character.model';
import { CombatBoardComponent } from "../combat-board/combat-board.component";

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
  imports: [CombatBoardComponent],
})
export class CombatComponent implements OnInit {
  enemy: Enemy | null = null;
  player: Character | null = null;
  playerImage: string = '';
  log: any[] = [];
  log_number: number = 0;

  @Output() closed = new EventEmitter<void>();

  constructor(private combat: CombatService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.player = this.playerService.getCharacter();
    this.playerImage = this.playerService.portrait;
    this.enemy = this.combat.getEnemy();
    if (this.enemy) this.pushLog(`A ${this.enemy.name} appears!`);
  }

  private pushLog(msg: string) {
    this.log_number += 1;
    this.log.push({msg: msg, id: this.log_number});
  }

  playerAttack() {
    const dmg = this.combat.playerAttack();
    this.pushLog(`You deal ${dmg} damage.`);
    if (!this.combat.isInCombat()) {
      const res = this.combat.getLastResult();
      this.pushLog(`Combat over. Winner: ${res?.winner}. +${res?.xpGained} XP, +${res?.goldGained} gold.`);
    }
  }

  enemyAttack() {
    const dmg = this.combat.enemyAttack();
    this.pushLog(`Enemy deals ${dmg} damage.`);
    if (!this.combat.isInCombat()) {
      const res = this.combat.getLastResult();
      this.pushLog(`Combat over. Winner: ${res?.winner}. +${res?.xpGained} XP, +${res?.goldGained} gold.`);
    }
  }

  get inCombat() { return this.combat.isInCombat(); }

  close() { this.closed.emit(); }
}
