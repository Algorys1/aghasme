import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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

interface CombatLogEntry {
  id: string;
  msg: string;
  type: 'info' | 'player' | 'enemy' | 'action';
}

@Component({
  selector: 'app-combat-board',
  templateUrl: './combat-board.component.html',
  styleUrls: ['./combat-board.component.scss']
})
export class CombatBoardComponent implements OnInit, OnDestroy {
  @Input() enemy!: Enemy;
  private subs: Subscription[] = [];

  gridSize = 7;
  grid: Cell[][] = [];

  player: Character | null = null;
  playerPos = { x: 1, y: Math.floor(this.gridSize / 2) };
  enemyPos = { x: this.gridSize - 2, y: Math.floor(this.gridSize / 2) };

  currentTurn: 'player' | 'enemy' = 'player';
  turnOverlay: string | null = null;
  actionsRemaining = 2;
  showResultOverlay = false;
  combatResult: { winner: 'player' | 'enemy'; xp: number; gold: number } | null = null;  

  log: CombatLogEntry[] = [];

  @Output() combatEnded = new EventEmitter<'player' | 'enemy'>();

  constructor(
    public playerService: PlayerService,
    private combatService: CombatService
  ) {}

  ngOnInit(): void {
    this.player = this.playerService.getCharacter();
    this.generateBoard();
    if (this.enemy) this.addLog(`A ${this.enemy.name} appears!`, 'info');
    this.showTurnOverlay('Your Turn');

    this.subs.push(
      this.combatService.combatEnded$.subscribe(winner => this.handleCombatEnd(winner))
    );
    
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
      this.addLog(`🧝 You move to (${cell.x}, ${cell.y}).`);
      return;
    }

    // Attack if ennemy reachable
    const dist = Math.abs(cell.x - this.playerPos.x) + Math.abs(cell.y - this.playerPos.y);
    if (cell.hasEnemy && dist === 1) {
      const dmg = this.combatService.playerAttack();
      this.addLog(`⚔️ You hit ${this.enemy.name} for ${dmg} damage!`);
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
    if (this.actionsRemaining <= 0) return;
    this.actionsRemaining--;
    if (this.actionsRemaining <= 0) {
      this.endTurn();
    } else {
      this.updateWalkableCells();
    }
  }

  private endTurn(): void {
    // séparation visuelle dans le log
    this.addLog('──────────────────────────────', 'info');
  
    if (this.currentTurn === 'player') {
      this.currentTurn = 'enemy';
      this.actionsRemaining = 2;
      this.addLog('👹 Enemy turn begins...', 'enemy');
      this.showTurnOverlay('Enemy Turn');
      this.enemyTurn();
    } else {
      this.currentTurn = 'player';
      this.actionsRemaining = 2;
      this.addLog('🧝 Your turn begins.', 'player');
      this.showTurnOverlay('Your Turn');
      this.updateWalkableCells();
    }
  }

  private async enemyTurn(): Promise<void> {
    while (this.currentTurn === 'enemy' && this.actionsRemaining > 0) {
      const dist = Math.abs(this.enemyPos.x - this.playerPos.x) + Math.abs(this.enemyPos.y - this.playerPos.y);

      if (dist === 1) {
        const dmg = this.combatService.enemyAttack();
        this.addLog(`💢 ${this.enemy.name} hits you for ${dmg} damage!`);
        this.actionsRemaining--;
      } else {
        this.moveEnemyTowardPlayer();
        this.actionsRemaining--;
        this.addLog(`👣 ${this.enemy.name} moves closer.`);
      }

      await this.delay(500);
    }

    this.endTurn();
  }

  private showTurnOverlay(text: string) {
    this.turnOverlay = text;
    setTimeout(() => (this.turnOverlay = null), 1200);
  }

  private handleCombatEnd(winner: 'player' | 'enemy'): void {
    const result = this.combatService.getLastResult();
    this.combatResult = result
      ? { winner: result.winner, xp: result.xpGained, gold: result.goldGained }
      : { winner, xp: 0, gold: 0 };
  
    this.showResultOverlay = true;
    this.showTurnOverlay("");
  
    const msg =
      winner === 'player'
        ? `🏁 Victory! You defeated ${this.enemy.name}.`
        : `💀 Defeat... ${this.enemy.name} was too strong.`;
    this.addLog(msg, 'info');
  }

  closeResultOverlay(): void {
    this.showResultOverlay = false;
    this.combatEnded.emit(this.combatResult?.winner ?? 'player');
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
  
  private addLog(msg: string, type: 'info' | 'player' | 'enemy' | 'action' = 'info'): void {
    const entry: CombatLogEntry = { id: crypto.randomUUID(), msg, type };
    this.log.unshift(entry); // affichage inversé (nouveaux en haut)
    setTimeout(() => this.scrollLogToTop(), 50);
  }
  
  private scrollLogToTop(): void {
    const container = document.querySelector('.log-box .entries');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }  
}
