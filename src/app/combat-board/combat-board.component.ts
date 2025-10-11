import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CombatService } from '../services/combat.service';
import { Enemy } from '../models/enemy.model';
import { PlayerService } from '../services/player.service';
import { Character } from '../models/character.model';

interface Cell {
  x: number;
  y: number;
  type: 'empty' | 'block';
  hasPlayer?: boolean;
  hasEnemy?: boolean;
  defenseBonus?: number;
  walkable?: boolean;
  selected?: boolean;
}

@Component({
  selector: 'app-combat-board',
  templateUrl: './combat-board.component.html',
  styleUrls: ['./combat-board.component.scss']
})
export class CombatBoardComponent implements OnInit {
  @Input() enemy!: Enemy;

  gridSize = 7;
  grid: Cell[][] = [];

  player: Character | null = null;
  playerPos = { x: 1, y: Math.floor(this.gridSize / 2) };
  enemyPos = { x: this.gridSize - 2, y: Math.floor(this.gridSize / 2) };

  currentTurn: 'player' | 'enemy' = 'player';
  actionsRemaining = 2;

  @Output() combatEnded = new EventEmitter<'player' | 'enemy'>();

  constructor(
    private characterService: PlayerService,
    private combatService: CombatService
  ) {}

  ngOnInit(): void {
    this.player = this.characterService.getCharacter();
    this.generateBoard();

    this.combatService.combatEnded$.subscribe(winner => {
      console.log(`🏁 Combat terminé (${winner} wins)`);
      this.handleCombatEnd(winner);
    });
  }

  // === BOARD GENERATION ============================================
  private generateBoard(): void {
    this.grid = [];

    for (let y = 0; y < this.gridSize; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < this.gridSize; x++) {
        const isEdge = (x === 0 || x === this.gridSize - 1);
        const blocked = !isEdge && Math.random() < 0.15; // ~15% blocked

        row.push({
          x,
          y,
          type: blocked ? 'block' : 'empty',
          defenseBonus: blocked ? 2 : 0,
        });
      }
      this.grid.push(row);
    }

    const midY = Math.floor(this.gridSize / 2);
    this.grid[midY][1].hasPlayer = true;
    this.grid[midY][this.gridSize - 2].hasEnemy = true;

    this.grid[midY][1].type = 'empty';
    this.grid[midY][this.gridSize - 2].type = 'empty';

    this.updateWalkableCells();
  }

  // === INTERACTIONS ======================================================
  onCellClick(cell: Cell): void {
    if (this.currentTurn !== 'player' || this.actionsRemaining <= 0) return;

    // Move
    if (cell.walkable && !cell.hasEnemy) {
      this.movePlayer(cell);
      this.consumeAction();
      return;
    }

    // Attack if ennemy reachable
    const dist = Math.abs(cell.x - this.playerPos.x) + Math.abs(cell.y - this.playerPos.y);
    if (cell.hasEnemy && dist === 1) {
      const dmg = this.combatService.playerAttack();
      console.log(`⚔️ You hit ${this.enemy.name} for ${dmg} damage!`);
      this.consumeAction();
      return;
    }
  }

  // === MOVES ======================================================
  private movePlayer(target: Cell): void {
    this.grid[this.playerPos.y][this.playerPos.x].hasPlayer = false;
    this.playerPos = { x: target.x, y: target.y };
    target.hasPlayer = true;
    this.updateWalkableCells();
  }

  private moveEnemyTowardPlayer(): void {
    const enemyCell = this.grid[this.enemyPos.y][this.enemyPos.x];
    const dx = Math.sign(this.playerPos.x - this.enemyPos.x);
    const dy = Math.sign(this.playerPos.y - this.enemyPos.y);
    const nextX = this.enemyPos.x + dx;
    const nextY = this.enemyPos.y + dy;

    const target = this.grid[nextY]?.[nextX];
    if (!target || target.type === 'block' || target.hasPlayer) return;

    enemyCell.hasEnemy = false;
    target.hasEnemy = true;
    this.enemyPos = { x: nextX, y: nextY };
  }

  // === TURN MANAGMENT ================================================
  private consumeAction(): void {
    this.actionsRemaining--;
    if (this.actionsRemaining <= 0) {
      this.endTurn();
    } else {
      this.updateWalkableCells();
    }
  }

  private endTurn(): void {
    if (this.currentTurn === 'player') {
      this.currentTurn = 'enemy';
      this.actionsRemaining = 2;
      console.log('👹 Enemy turn begins');
      this.enemyTurn();
    } else {
      this.currentTurn = 'player';
      this.actionsRemaining = 2;
      console.log('🧝 Player turn begins');
      this.updateWalkableCells();
    }
  }

  private async enemyTurn(): Promise<void> {
    while (this.currentTurn === 'enemy' && this.actionsRemaining > 0) {
      const dist = Math.abs(this.enemyPos.x - this.playerPos.x) + Math.abs(this.enemyPos.y - this.playerPos.y);

      if (dist === 1) {
        const dmg = this.combatService.enemyAttack();
        console.log(`💢 ${this.enemy.name} hits you for ${dmg} damage!`);
        this.actionsRemaining--;
      } else {
        this.moveEnemyTowardPlayer();
        this.actionsRemaining--;
      }

      await this.delay(500);
    }

    this.endTurn();
  }

  // === TOOLS ======================================================
  private isWalkable(cell: Cell): boolean {
    return cell.type === 'empty' && !cell.hasEnemy && !cell.hasPlayer;
  }

  private updateWalkableCells(): void {
    const range = 2;
    for (const row of this.grid) {
      for (const cell of row) {
        const dist = Math.abs(cell.x - this.playerPos.x) + Math.abs(cell.y - this.playerPos.y);
        cell.walkable = dist <= range && this.isWalkable(cell);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private handleCombatEnd(winner: 'player' | 'enemy'): void {
    if (winner === 'player') {
      console.log('🎉 Vous avez gagné !');
    } else {
      console.log('💀 Vous avez perdu...');
    }
    this.combatEnded.emit(winner);
  }
}
