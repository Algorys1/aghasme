import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombatService } from '../services/combat.service';
import { CombatEntity, CombatResult } from '../models/combat.model';
import { CombatBoardComponent } from './combat-board/combat-board.component';
import { DiceRollComponent } from '../../game/components/dice-roll/dice-roll.component';

@Component({
  selector: 'app-combat',
  standalone: true,
  imports: [CommonModule, CombatBoardComponent, DiceRollComponent],
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {
  player?: CombatEntity;
  enemy?: CombatEntity;
  currentTurn: 'player' | 'enemy' = 'player';
  result?: CombatResult;

  pendingAttack: { attacker: string; target: string } | null = null;

  @Output() closed = new EventEmitter<void>();

  constructor(private combatService: CombatService) {}

  ngOnInit() {
    this.combatService.combatStarted$.subscribe(({ player, enemy }) => {
      this.player = player;
      this.enemy = enemy;
    });

    this.combatService.turnChanged$.subscribe(turn => this.currentTurn = turn);

    this.combatService.combatEnded$.subscribe(result => {
      this.result = result;
    });
    this.combatService.attackRequested$.subscribe(req => {
      this.pendingAttack = req;
    });
  }

  onEndTurn() {
    this.combatService.endTurn();
  }

  onDiceResult(result: any) {
    if (!this.pendingAttack) return;

    const { attacker, target } = this.pendingAttack;
    this.pendingAttack = null;

    this.combatService.resolvePlayerAttack(attacker, target, result);
  }

  onResultOk() {
    this.closed.emit();
  }

  onQuit() {
    this.combatService.endCombat('player');
  }

  get isPlayerTurn(): boolean {
    return this.currentTurn === 'player';
  }
}
