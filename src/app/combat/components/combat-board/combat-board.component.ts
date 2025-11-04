import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CombatService } from '../../services/combat.service';
import { CombatInitPayload } from '../../models/combat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-combat-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './combat-board.component.html',
  styleUrls: ['./combat-board.component.scss']
})
export class CombatBoardComponent implements OnInit {
  @ViewChild('boardCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  gridCols = 6;
  gridRows = 8;
  tileSize = 48;

  playerPos = { x: 1, y: 4 };
  enemyPos = { x: 4, y: 4 };

  constructor(private combatService: CombatService) {}

  ngOnInit() {
    this.combatService.combatStarted$.subscribe(data => this.initBoard(data));
    this.combatService.entityMoved$.subscribe(m => this.animateMove(m.id, m.x, m.y));
  }

  private initBoard(data: CombatInitPayload) {
    const canvas = this.canvasRef.nativeElement;
    this.gridCols = data.gridSize.cols;
    this.gridRows = data.gridSize.rows;
    canvas.width = this.gridCols * this.tileSize;
    canvas.height = this.gridRows * this.tileSize;

    this.ctx = canvas.getContext('2d')!;
    this.render();
  }

  private render() {
    if (!this.ctx) return;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    // grille simple
    ctx.strokeStyle = '#444';
    for (let x = 0; x < this.gridCols; x++) {
      for (let y = 0; y < this.gridRows; y++) {
        ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
      }
    }

    // joueur
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(this.playerPos.x * this.tileSize + 8, this.playerPos.y * this.tileSize + 8, 32, 32);

    // ennemi
    ctx.fillStyle = '#f44336';
    ctx.fillRect(this.enemyPos.x * this.tileSize + 8, this.enemyPos.y * this.tileSize + 8, 32, 32);
  }

  private animateMove(id: string, x: number, y: number) {
    if (id === 'player') this.playerPos = { x, y };
    if (id === 'enemy') this.enemyPos = { x, y };
    this.render();
  }
}
