import { Injectable } from '@angular/core';
import { Application, Container, Graphics, Assets, Texture, Sprite } from 'pixi.js';
import { createTile, Terrain, AllTerrains } from '../factories/tile.factory';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private app!: Application;
  private mapContainer!: Container;
  private tiles: Record<string, { gfx: Container; terrain: Terrain; discovered: boolean }> = {};  private size = 80;

  private player!: Sprite;
  private playerPos = { q: 0, r: 0 };

  private terrains: Terrain[] = ['plain', 'forest', 'desert', 'mountain', 'water'];

  private textures: Record<AllTerrains | 'player', Texture> = {} as any;

  getApp() {
    return this.app;
  }

  private async loadTextures() {
    this.textures = {
      plain: await Assets.load('assets/tiles/plain.png'),
      forest: await Assets.load('assets/tiles/forest.png'),
      desert: await Assets.load('assets/tiles/desert.png'),
      mountain: await Assets.load('assets/tiles/mountain.png'),
      water: await Assets.load('assets/tiles/water.png'),
      fog: await Assets.load('assets/tiles/fog.png'),
      player: await Assets.load("assets/tiles/hero.png")
    };
  }

  async initMap(canvasId: string, mapRadius: number): Promise<void> {
    await this.loadTextures();

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (!canvas) throw new Error('Canvas introuvable !');

    this.app = new Application();
    await this.app.init({
      resizeTo: canvas.parentElement!, // Pixi s'adapte à la taille du conteneur
      backgroundColor: 0x111111,
      canvas
    });

    this.mapContainer = new Container();
    this.app.stage.addChild(this.mapContainer);

    this.buildMap(mapRadius);

    this.player = new Sprite();
    this.mapContainer.addChild(this.player);
    this.drawPlayer();

    this.centerCamera();
    this.updateVisibility();

    // Quand on redimensionne la fenêtre → on recentre
    window.addEventListener("resize", () => {
      this.centerCamera();
    });
  }

  private hexToPixel(q: number, r: number) {
    const x = this.size * Math.sqrt(3) * (q + r / 2);
    const y = this.size * 1.5 * r;
    return { x, y };
  }

  private randomTerrain(): Terrain {
    const index = Math.floor(Math.random() * this.terrains.length);
    return this.terrains[index];
  }

  private buildMap(mapRadius: number) {
    const N = mapRadius;
    for (let q = -N; q <= N; q++) {
      for (let r = -N; r <= N; r++) {
        const s = -q - r;
        if (Math.abs(q) <= N && Math.abs(r) <= N && Math.abs(s) <= N) {
          const { x, y } = this.hexToPixel(q, r);
          const terrain = this.randomTerrain();

          const tile = createTile({
            x, y,
            size: this.size,
            terrain,
            container: this.mapContainer,
            textures: this.textures,
            onClick: () => this.movePlayer(q, r)
          });

          this.tiles[`${q},${r}`] = { gfx: tile, terrain, discovered: false };
        }
      }
    }
  }

  private drawPlayer() {
    // Si le joueur existe déjà, on le supprime
    if (this.player) {
      this.mapContainer.removeChild(this.player);
    }

    const { x, y } = this.hexToPixel(this.playerPos.q, this.playerPos.r);

    // On crée le sprite avec la texture
    const sprite = new Sprite(this.textures.player);
    sprite.anchor.set(0.5); // centre l'image sur le point
    sprite.x = x;
    sprite.y = y;
    sprite.width = this.size * 1.5;
    sprite.height = this.size * 1.5;

    this.mapContainer.addChild(sprite);
    this.player = sprite; // le joueur est maintenant un sprite
  }


  private movePlayer(q: number, r: number) {
    const neighbors = [
      [1, 0], [1, -1], [0, -1],
      [-1, 0], [-1, 1], [0, 1]
    ];
    for (const [dq, dr] of neighbors) {
      if (this.playerPos.q + dq === q && this.playerPos.r + dr === r) {
        this.playerPos = { q, r };
        this.drawPlayer();
        this.centerCamera();
        this.updateVisibility();
        return;
      }
    }
  }

  private centerCamera(animated = true) {
    const { x, y } = this.hexToPixel(this.playerPos.q, this.playerPos.r);
    const targetX = this.app.screen.width / 2 - x;
    const targetY = this.app.screen.height / 2 - y;

    if (!animated) {
      this.mapContainer.x = targetX;
      this.mapContainer.y = targetY;
      return;
    }

    // Animation simple
    const startX = this.mapContainer.x;
    const startY = this.mapContainer.y;
    const duration = 300; // ms
    const startTime = performance.now();

    const animate = (time: number) => {
      const t = Math.min((time - startTime) / duration, 1);
      this.mapContainer.x = startX + (targetX - startX) * t;
      this.mapContainer.y = startY + (targetY - startY) * t;
      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }


  private updateVisibility() {
    for (const key in this.tiles) {
      const [q, r] = key.split(',').map(Number);
      const dist = this.hexDistance(this.playerPos, { q, r });
      const tileData = this.tiles[key];
      const tile = tileData.gfx as any;

      // Si on est assez proche, on découvre la tuile
      if (dist <= 1) {
        tile.fog.visible = false;
        tileData.discovered = true;
      } 
      // Sinon, si elle n'a jamais été découverte, on garde le brouillard
      else if (!tileData.discovered) {
        tile.fog.visible = true;
      }
    }
  }

  private hexDistance(a: { q: number, r: number }, b: { q: number, r: number }) {
    return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
  }
}
