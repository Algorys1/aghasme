import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private characterService: PlayerService,
    private combatService: CombatService
  ) {}

  ngOnInit(): void {
    this.player = this.characterService.getCharacter();
    this.generateBoard();
  }

  private generateBoard(): void {
    this.grid = [];

    for (let y = 0; y < this.gridSize; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < this.gridSize; x++) {
        const isEdge = (x === 0 || x === this.gridSize - 1);
        const blocked = !isEdge && Math.random() < 0.15; // ~15% of blocked tiles

        row.push({
          x,
          y,
          type: blocked ? 'block' : 'empty',
          defenseBonus: blocked ? 2 : 0,
        });
      }
      this.grid.push(row);
    }

    const playerY = Math.floor(this.gridSize / 2);
    const enemyY = playerY;
    this.grid[playerY][1].hasPlayer = true;
    this.grid[enemyY][this.gridSize - 2].hasEnemy = true;

    this.grid[playerY][1].type = 'empty';
    this.grid[enemyY][this.gridSize - 2].type = 'empty';
  }

  onCellClick(cell: Cell): void {
    console.log(`Clicked cell (${cell.x},${cell.y})`, cell);
  }

  isWalkable(cell: Cell): boolean {
    return cell.type === 'empty' && !cell.hasEnemy && !cell.hasPlayer;
  }
}
