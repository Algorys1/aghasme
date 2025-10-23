import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CombatService } from '../services/combat.service';
import { Enemy } from '../models/enemy.model';
import { PlayerService } from '../services/player.service';
import { Character } from '../models/character.model';
import { CommonModule } from '@angular/common';

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
  styleUrls: ['./combat-board.component.scss'],
  imports: [CommonModule]
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

  private moveEnemyTo(x: number, y: number): void {
    const oldCell = this.grid[this.enemyPos.y][this.enemyPos.x];
    const newCell = this.grid[y][x];
    if (!newCell || newCell.type === 'block' || newCell.hasPlayer) return;

    oldCell.hasEnemy = false;
    newCell.hasEnemy = true;
    this.enemyPos = { x, y };
  }

  private moveEnemyAwayFromPlayer(): void {
    const dx = Math.sign(this.enemyPos.x - this.playerPos.x);
    const dy = Math.sign(this.enemyPos.y - this.playerPos.y);
    const nx = this.enemyPos.x + dx;
    const ny = this.enemyPos.y + dy;

    if (nx < 0 || ny < 0 || nx >= this.gridSize || ny >= this.gridSize) return;
    const target = this.grid[ny][nx];
    if (target && target.type === 'empty' && !target.hasPlayer && !target.hasEnemy) {
      this.moveEnemyTo(nx, ny);
    }
  }

  private findPath(start: {x: number, y: number}, target: {x: number, y: number}): {x: number, y: number}[] | null {
    const queue = [{ ...start, path: [] as {x: number, y: number}[] }];
    const visited = new Set<string>();
    const key = (x: number, y: number) => `${x},${y}`;
    visited.add(key(start.x, start.y));

    const dirs = [
      { x: 1, y: 0 }, { x: -1, y: 0 },
      { x: 0, y: 1 }, { x: 0, y: -1 }
    ];

    while (queue.length) {
      const node = queue.shift()!;
      if (node.x === target.x && node.y === target.y) return node.path;

      for (const d of dirs) {
        const nx = node.x + d.x;
        const ny = node.y + d.y;
        if (nx < 0 || ny < 0 || nx >= this.gridSize || ny >= this.gridSize) continue;
        const cell = this.grid[ny][nx];
        if (!cell || cell.type === 'block' || cell.hasEnemy) continue;

        const k = key(nx, ny);
        if (visited.has(k)) continue;
        visited.add(k);
        queue.push({ x: nx, y: ny, path: [...node.path, { x: nx, y: ny }] });
      }
    }
    return null;
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

  public endTurn(): void {
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

      // defensive behavior
      const enemyHpRatio = this.enemy.hp / (this.enemy.level * 10 + 20);
      if (enemyHpRatio <= 0.25 && Math.random() < 0.3) {
        this.addLog(`${this.enemy.name} looks hurt and backs away!`, 'enemy');
        this.moveEnemyAwayFromPlayer();
        this.actionsRemaining--;
        await this.delay(500);
        continue;
      }

      // Attack if besides player
      if (dist === 1) {
        const dmg = this.combatService.enemyAttack();
        this.addLog(`💢 ${this.enemy.name} hits you for ${dmg} damage!`, 'enemy');
        this.actionsRemaining--;
      }
      // Move towards player
      else {
        const path = this.findPath(this.enemyPos, this.playerPos);
        if (path && path.length > 0) {
          const next = path[0];
          this.moveEnemyTo(next.x, next.y);
          this.addLog(`👣 ${this.enemy.name} advances carefully.`, 'enemy');
        } else {
          this.addLog(`${this.enemy.name} hesitates, searching for a path...`, 'enemy');
        }
        this.actionsRemaining--;
      }

      await this.delay(900);
    }
    if (!this.enemy || this.enemy.hp <= 0 || !this.player || this.player.hp <= 0) return;
    this.endTurn();
  }

  private showTurnOverlay(text: string | null) {
    this.turnOverlay = text;
    setTimeout(() => (this.turnOverlay = null), 1200);
  }

  private handleCombatEnd(winner: 'player' | 'enemy'): void {
    const result = this.combatService.getLastResult();
    this.combatResult = result
      ? { winner: result.winner, xp: result.xpGained, gold: result.goldGained }
      : { winner, xp: 0, gold: 0 };

    this.showResultOverlay = true;
    this.showTurnOverlay(null);

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
    this.log.push(entry); // ➕ on ajoute en bas, pas en haut
    setTimeout(() => this.scrollLogToBottom(), 50);
  }

  private scrollLogToBottom(): void {
    const container = document.querySelector('.log-box .entries');
    if (container) container.scrollTop = container.scrollHeight;
  }

  private scrollLogToTop(): void {
    const container = document.querySelector('.log-box .entries');
    if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
