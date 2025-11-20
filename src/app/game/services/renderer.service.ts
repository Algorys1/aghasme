import { Injectable } from '@angular/core';
import { Application, Container, Sprite, Texture, Assets, Ticker } from 'pixi.js';
import { OVERLAY_ICONS } from '../../overlays/models/overlays.model';
import { Archetype, CHARACTER_ASSETS } from '../../character/models/character.model';

@Injectable({ providedIn: 'root' })
export class RendererService {
  private app!: Application;
  private mapContainer!: Container;

  private tileTextures: Record<string, Texture> = {};
  private overlayTextures: Record<string, Texture> = {};
  private playerTexture?: Texture;

  /** Camera / zoom state */
  private zoom = 1;
  private readonly MIN_ZOOM = 0.6;
  private readonly MAX_ZOOM = 1.05;
  private panOffset = { x: 0, y: 0 };

  private lastCameraTarget = { q: 0, r: 0, size: 80 };

  get container(): Container {
    return this.mapContainer;
  }

  get textures(): Record<string, Texture> {
    return this.tileTextures;
  }

  get currentZoom(): number {
    return this.zoom;
  }

  /** Boot Pixi Application */
  async init(canvas: HTMLCanvasElement): Promise<void> {
    if (this.app) {
      this.app.destroy(true, { children: true, texture: false, context: true });
    }

    this.app = new Application();
    await this.app.init({
      resizeTo: canvas.parentElement!,
      backgroundAlpha: 0,
      canvas,
    });

    this.mapContainer = new Container();

    this.mapContainer.scale.set(this.zoom);
    this.mapContainer.x = 0;
    this.mapContainer.y = 0;

    this.app.stage.addChild(this.mapContainer);

    window.addEventListener('resize', () =>
      this.centerCamera(this.lastCameraTarget.q, this.lastCameraTarget.r, this.lastCameraTarget.size)
    );
  }

  async loadTileTextures(): Promise<void> {
    this.tileTextures = {}; // reset complet

    const terrains = [
      'plain', 'forest', 'desert', 'mountain',
      'volcano', 'sea', 'jungle', 'swamp'
    ];

    for (const terrain of terrains) {
      const variantIndex = 1;
      const path = `assets/tiles/${terrain}-${variantIndex}.png`;
      const tex = await Assets.load(path);
      this.tileTextures[`${terrain}-${variantIndex}`] = tex;
    }

    console.log(`🧩 ${Object.keys(this.tileTextures).length} tile textures loaded.`);
  }

  async loadOverlayTextures(): Promise<void> {
    this.overlayTextures = {};
    for (const [key, icon] of Object.entries(OVERLAY_ICONS)) {
      if (!icon) continue;
      try {
        this.overlayTextures[key] = await Assets.load(icon);
      } catch {
        console.warn(`⚠️ Could not load overlay "${key}" (${icon})`);
      }
    }
    console.log(`🧿 ${Object.keys(this.overlayTextures).length} overlay textures loaded.`);
  }

  async loadPlayerTexture(gender: string, archetype: Archetype): Promise<Texture> {
    const path = CHARACTER_ASSETS[gender][archetype];
    if (!path) throw new Error(`No asset for archetype "${archetype}"`);
    this.playerTexture = await Assets.load(path);
    return this.playerTexture;
  }

  createOverlaySprite(kind: string, x: number, y: number, size: number): Sprite | null {
    const tex = this.overlayTextures[kind];
    if (!tex) return null;
    const s = new Sprite(tex);
    s.anchor.set(0.5);
    s.x = x;
    s.y = y;
    s.width = size * 1.3;
    s.height = size * 1.3;
    this.mapContainer.addChild(s);
    return s;
  }

  createPlayerSprite(size: number): Sprite {
    if (!this.playerTexture) throw new Error('Player texture not loaded');
    const s = new Sprite(this.playerTexture);
    s.anchor.set(0.5);
    s.width = size * 1.2;
    s.height = size * 1.2;
    this.mapContainer.addChild(s);
    return s;
  }

  // Tiles flip
  animateTileReveal(tile: Container, durationMs = 220): void {
    if (!this.app) {
      tile.visible = true;
      tile.scale.x = 1;
      return;
    }

    const ticker = this.app.ticker;

    tile.visible = true;
    tile.scale.x = 0;

    let elapsedMs = 0;

    const update = (t: Ticker) => {
      elapsedMs += t.deltaMS;
      const progress = Math.min(1, elapsedMs / durationMs);

      tile.scale.x = progress;

      if (progress >= 1) {
        tile.scale.x = 1;
        ticker.remove(update);
      }
    };

    ticker.add(update);
  }

  centerCamera(q = 0, r = 0, size = 80): void {
    if (!this.app || !this.mapContainer) return;

    // Memorize last target
    this.lastCameraTarget = { q, r, size };

    // "World" coordinates of the tile's center
    const worldX = size * Math.sqrt(3) * (q + r / 2);
    const worldY = size * 1.5 * r;

    // Applying zoom and pan to center the tile on the screen
    this.mapContainer.x = this.app.screen.width / 2 - worldX * this.zoom + this.panOffset.x;
    this.mapContainer.y = this.app.screen.height / 2 - worldY * this.zoom + this.panOffset.y;
  }

  setZoom(zoom: number): void {
    this.zoom = Math.min(this.MAX_ZOOM, Math.max(this.MIN_ZOOM, zoom));

    if (!this.mapContainer || !this.app) return;

    this.mapContainer.scale.set(this.zoom);

    const { q, r, size } = this.lastCameraTarget;
    this.centerCamera(q, r, size);
  }

  zoomBy(delta: number): void {
    this.setZoom(this.zoom + delta);
  }

  panBy(dx: number, dy: number): void {
    this.panOffset.x += dx;
    this.panOffset.y += dy;

    if (!this.app || !this.mapContainer) return;

    const { q, r, size } = this.lastCameraTarget;
    this.centerCamera(q, r, size);
  }

  resetPan(): void {
    this.panOffset = { x: 0, y: 0 };
    const { q, r, size } = this.lastCameraTarget;
    this.centerCamera(q, r, size);
  }

  clear(): void {
    if (!this.app) return;
    this.app.destroy(true, { children: true, texture: false, context: true });
    this.tileTextures = {};
    this.overlayTextures = {};
    this.playerTexture = undefined;

    // reset camera state
    this.zoom = 1;
    this.panOffset = { x: 0, y: 0 };
    this.lastCameraTarget = { q: 0, r: 0, size: 80 };
  }
}
