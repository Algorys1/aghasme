// src/app/services/renderer.service.ts
import { Injectable } from '@angular/core';
import { Application, Container, Sprite, Texture, Assets } from 'pixi.js';
import { OVERLAY_MANIFEST } from '../models/overlays';
import { Archetype, CHARACTER_ASSETS } from '../models/character.model';

@Injectable({ providedIn: 'root' })
export class RendererService {
  private app!: Application;
  private mapContainer!: Container;

  private tileTextures: Record<string, Texture> = {};
  private overlayTextures: Record<string, Texture> = {};
  private playerTexture?: Texture;

  private initialized = false;

  get container(): Container {
    return this.mapContainer;
  }

  get application(): Application {
    return this.app;
  }

  get ready(): boolean {
    return this.initialized;
  }

  get textures(): Record<string, Texture>{
    return this.tileTextures;
  }

  /** Boot Pixi Application */
  async init(canvas: HTMLCanvasElement): Promise<void> {
    if (this.app) {
      console.log('♻️ Reboot Pixi instance');
      this.app.destroy(true, { children: true, texture: false, context: true });
    }

    this.app = new Application();
    await this.app.init({
      resizeTo: canvas.parentElement!,
      backgroundColor: 0x111111,
      canvas
    });

    this.mapContainer = new Container();
    this.app.stage.addChild(this.mapContainer);
    this.initialized = true;

    window.addEventListener('resize', () => this.centerCamera());
  }

  /** Load terrain tiles */
  async loadTileTextures(): Promise<void> {
    if (Object.keys(this.tileTextures).length > 0) return;

    const manifest = await fetch('assets/tiles/tiles.json').then(res => res.json());
    for (const [key, path] of Object.entries(manifest)) {
      this.tileTextures[key] = await Assets.load(path as string);
    }
    console.log(`🧩 ${Object.keys(this.tileTextures).length} tile textures loaded.`);
  }

  /** Load overlay icons from manifest */
  async loadOverlayTextures(): Promise<void> {
    if (Object.keys(this.overlayTextures).length > 0) return;

    for (const [key, info] of Object.entries(OVERLAY_MANIFEST)) {
      if (!info.icon) continue;
      try {
        this.overlayTextures[key] = await Assets.load(info.icon);
      } catch {
        const fallback = `assets/overlays/${key}.png`;
        try {
          this.overlayTextures[key] = await Assets.load(fallback);
          console.warn(`⚠️ Missing ${info.icon}, used fallback ${fallback}`);
        } catch {
          console.warn(`⚠️ Could not load overlay "${key}" (${info.icon})`);
        }
      }
    }
    console.log(`🧿 ${Object.keys(this.overlayTextures).length} overlay textures loaded.`);
  }

  /** Load player texture from archetype */
  async loadPlayerTexture(archetype: Archetype): Promise<Texture> {
    const path = CHARACTER_ASSETS[archetype]; // ✅ maintenant reconnu comme une clé valide
    if (!path) throw new Error(`No asset for archetype "${archetype}"`);
  
    if (Assets.cache.has(path)) {
      console.log('♻️ Unload previous player texture:', path);
      await Assets.unload(path);
    }
  
    this.playerTexture = await Assets.load(path);
    return this.playerTexture;
  }  

  /** Create a tile sprite (used by createTile) */
  getTileTexture(key: string): Texture {
    return this.tileTextures[key];
  }

  /** Create an overlay sprite */
  createOverlaySprite(kind: string, x: number, y: number, size: number): Sprite | null {
    const tex = this.overlayTextures[kind];
    if (!tex) return null;
    const s = new Sprite(tex);
    s.anchor.set(0.5);
    s.x = x;
    s.y = y;
    s.width = size * 0.8;
    s.height = size * 0.8;
    this.mapContainer.addChild(s);
    return s;
  }

  /** Create the player sprite */
  createPlayerSprite(size: number): Sprite {
    if (!this.playerTexture) throw new Error('Player texture not loaded');
    const s = new Sprite(this.playerTexture);
    s.anchor.set(0.5);
    s.width = size * 1.2;
    s.height = size * 1.2;
    this.mapContainer.addChild(s);
    return s;
  }

  /** Camera centering */
  centerCamera(q: number = 0, r: number = 0, size = 80): void {
    if (!this.app || !this.mapContainer) return;
    const x = size * Math.sqrt(3) * (q + r / 2);
    const y = size * 1.5 * r;
    const targetX = this.app.screen.width / 2 - x;
    const targetY = this.app.screen.height / 2 - y;
    this.mapContainer.x = targetX;
    this.mapContainer.y = targetY;
  }

  /** Cleanup */
  clear(): void {
    if (!this.app) return;

    try {
      console.log('🧹 Destroying Pixi renderer...');
      this.app.destroy(true, { children: true, texture: false, context: true });
    } catch (e) {
      console.warn('⚠️ Error while destroying Pixi:', e);
    }

    this.tileTextures = {};
    this.overlayTextures = {};
    this.playerTexture = undefined;
    this.initialized = false;
  }
}
