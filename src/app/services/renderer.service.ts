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

  get textures(): Record<string, Texture> {
    return this.tileTextures;
  }

  /** Boot Pixi Application */
  async init(canvas: HTMLCanvasElement): Promise<void> {
    if (this.app) {
      this.app.destroy(true, { children: true, texture: false, context: true });
    }

    this.app = new Application();
    await this.app.init({
      resizeTo: canvas.parentElement!,
      backgroundColor: 0x111111,
      canvas,
    });

    this.mapContainer = new Container();
    this.app.stage.addChild(this.mapContainer);
    this.initialized = true;

    window.addEventListener('resize', () => this.centerCamera());
  }

  /** 🔥 Nouvelle version clean : auto-chargement des variantes terrain-n.png */
  async loadTileTextures(): Promise<void> {
    this.tileTextures = {}; // reset complet

    const terrains = [
      'plain', 'forest', 'desert', 'mountain',
      'volcano', 'sea', 'jungle', 'swamp', 'fog'
    ];

    const fallback = 'assets/tiles/plain-1.png';

    for (const terrain of terrains) {
      let variantIndex = 1;
      let foundAny = false;

      while (true) {
        const path = `assets/tiles/${terrain}-${variantIndex}.png`;
        try {
          const tex = await Assets.load(path);
          this.tileTextures[`${terrain}-${variantIndex}`] = tex;
          foundAny = true;
          variantIndex++;
        } catch {
          break;
        }
      }

      if (!foundAny) {
        console.warn(`⚠️ No variants found for ${terrain}, using fallback plain-1.png`);
        const tex = await Assets.load(fallback);
        this.tileTextures[`${terrain}-1`] = tex;
      }
    }

    const fogKey = Object.keys(this.tileTextures).find(k => k.startsWith('fog-'));
    if (fogKey) {
      this.tileTextures['fog'] = this.tileTextures[fogKey];
    } else {
      console.warn('⚠️ Missing fog texture, using plain-1 as fallback.');
      this.tileTextures['fog'] = this.tileTextures['plain-1'];
    }

    console.log(`🧩 ${Object.keys(this.tileTextures).length} tile textures loaded.`);
  }

  /** Overlays (inchangé) */
  async loadOverlayTextures(): Promise<void> {
    this.overlayTextures = {};
    for (const [key, info] of Object.entries(OVERLAY_MANIFEST)) {
      if (!info.icon) continue;
      try {
        this.overlayTextures[key] = await Assets.load(info.icon);
      } catch {
        console.warn(`⚠️ Could not load overlay "${key}" (${info.icon})`);
      }
    }
    console.log(`🧿 ${Object.keys(this.overlayTextures).length} overlay textures loaded.`);
  }

  /** Player */
  async loadPlayerTexture(archetype: Archetype): Promise<Texture> {
    const path = CHARACTER_ASSETS[archetype];
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
    s.width = size * 0.8;
    s.height = size * 0.8;
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

  centerCamera(q = 0, r = 0, size = 80): void {
    if (!this.app || !this.mapContainer) return;
    const x = size * Math.sqrt(3) * (q + r / 2);
    const y = size * 1.5 * r;
    this.mapContainer.x = this.app.screen.width / 2 - x;
    this.mapContainer.y = this.app.screen.height / 2 - y;
  }

  clear(): void {
    if (!this.app) return;
    this.app.destroy(true, { children: true, texture: false, context: true });
    this.tileTextures = {};
    this.overlayTextures = {};
    this.playerTexture = undefined;
    this.initialized = false;
  }
}
