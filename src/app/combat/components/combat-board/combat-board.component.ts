import {
  Application,
  Container,
  Graphics,
  Rectangle,
  FederatedPointerEvent,
} from 'pixi.js';
import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombatService } from '../../services/combat.service';
import { CombatInitPayload } from '../../models/combat.model';

@Component({
  selector: 'app-combat-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './combat-board.component.html',
  styleUrls: ['./combat-board.component.scss'],
})
export class CombatBoardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pixiContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  app?: Application;
  gridContainer = new Container();
  entityContainer = new Container();

  gridCols = 6;
  gridRows = 8;
  tileSize = 48;

  playerGraphic?: Graphics;
  enemyGraphic?: Graphics;

  constructor(private combatService: CombatService) {}

  ngOnInit() {
    this.combatService.entityMoved$.subscribe(({ id, x, y }) => {
      this.updateEntityPosition(id, x, y);
    });
  }

  async ngAfterViewInit() {
    await this.initPixi();
    this.combatService.combatStarted$.subscribe(
      (payload) => this.buildBoard(payload)
    );
  }

  ngOnDestroy() {
    this.app?.destroy(true, { children: true });
  }

  private async initPixi() {
    this.app = new Application();
    await this.app.init({
      width: this.gridCols * this.tileSize,
      height: this.gridRows * this.tileSize,
      backgroundAlpha: 0,
      antialias: true,
    });

    this.containerRef.nativeElement.appendChild(this.app.canvas);

    this.app.stage.addChild(this.gridContainer);
    this.app.stage.addChild(this.entityContainer);

    this.app.stage.eventMode = 'static';
    this.app.stage.hitArea = this.app.screen;
    this.app.stage.on('pointerdown', (e: FederatedPointerEvent) => this.handlePointer(e));
  }

  private buildBoard(data: CombatInitPayload) {
    this.gridCols = data.gridSize.cols;
    this.gridRows = data.gridSize.rows;

    const w = this.gridCols * this.tileSize;
    const h = this.gridRows * this.tileSize;
    this.app!.renderer.resize(w, h);
    this.app!.stage.hitArea = new Rectangle(0, 0, w, h);

    this.drawGrid();

    this.playerGraphic = this.createDisc(0x4caf50);
    this.enemyGraphic  = this.createDisc(0xf44336);
    this.entityContainer.addChild(this.playerGraphic, this.enemyGraphic);

    this.updateEntityPosition('player', data.player.position.x, data.player.position.y);
    this.updateEntityPosition('enemy',  data.enemy.position.x,  data.enemy.position.y);
  }

  private drawGrid() {
    this.gridContainer.removeChildren();

    const g = new Graphics();

    for (let x = 0; x <= this.gridCols; x++) {
      const px = x * this.tileSize;
      g.moveTo(px, 0).lineTo(px, this.gridRows * this.tileSize);
    }
    for (let y = 0; y <= this.gridRows; y++) {
      const py = y * this.tileSize;
      g.moveTo(0, py).lineTo(this.gridCols * this.tileSize, py);
    }

    g.stroke({ width: 1, color: 0x555555, alpha: 1 });
    this.gridContainer.addChild(g);
  }

  private createDisc(color: number): Graphics {
    const r = this.tileSize * 0.35;
    const g = new Graphics();
    g.circle(0, 0, r).fill({ color });
    g.eventMode = 'none';
    return g;
  }

  private updateEntityPosition(id: string, x: number, y: number) {
    const target = id === 'player' ? this.playerGraphic : this.enemyGraphic;
    if (!target) return;
    target.x = x * this.tileSize + this.tileSize / 2;
    target.y = y * this.tileSize + this.tileSize / 2;
  }

  private handlePointer(e: FederatedPointerEvent) {
    if (!this.app) return;

    const pos = e.global;
    const tileX = Math.floor(pos.x / this.tileSize);
    const tileY = Math.floor(pos.y / this.tileSize);

    if (tileX < 0 || tileY < 0 || tileX >= this.gridCols || tileY >= this.gridRows) return;

    const player = this.combatService.getPlayerEntity();
    if (!player) return;

    const dx = Math.abs(tileX - player.position.x);
    const dy = Math.abs(tileY - player.position.y);

    // No Diagonal and same case
    if (dx * dy !== 0 || (dx + dy) === 0) {
      return;
    }

    this.combatService.moveEntity('player', tileX, tileY);
  }
}
