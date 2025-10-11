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

  @Output() closed = new EventEmitter<void>();

  constructor(private combat: CombatService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.player = this.playerService.getCharacter();
    this.playerImage = this.playerService.portrait;
    this.enemy = this.combat.getEnemy();
  }

  onCombatEnded(_winner: 'player' | 'enemy') {
    this.close();
  }

  close() { this.closed.emit(); }
}
