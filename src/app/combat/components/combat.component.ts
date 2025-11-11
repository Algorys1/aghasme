import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombatService } from '../services/combat.service';
import { CombatEntity, CombatResult } from '../models/combat.model';
import { CombatBoardComponent } from './combat-board/combat-board.component';

@Component({
  selector: 'app-combat',
  standalone: true,
  imports: [CommonModule, CombatBoardComponent],
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {
  player?: CombatEntity;
  enemy?: CombatEntity;
  currentTurn: 'player' | 'enemy' = 'player';
  result?: CombatResult;

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
  }

  onEndTurn() {
    this.combatService.endTurn();
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
