import { Container, Sprite, Texture } from 'pixi.js';

export type Terrain = 'plain' | 'forest' | 'desert' | 'mountain' | 'water';
export type AllTerrains = Terrain | 'fog';

export interface TileOptions {
  x: number;
  y: number;
  size: number;
  terrain: Terrain;
  container: Container;
  textures: Record<AllTerrains, Texture>;
  onClick?: () => void;
}

export function createTile(options: TileOptions): Container {
  const { x, y, size, terrain, container, textures, onClick } = options;

  const tileContainer = new Container();

  // Sprite de la tuile
  const base = new Sprite(textures[terrain]);
  base.width = size * 2;
  base.height = size * 2;
  base.x = -size;
  base.y = -size;

  // Sprite du brouillard
  const fog = new Sprite(textures['fog']);
  fog.width = size * 2;
  fog.height = size * 2;
  fog.x = -size;
  fog.y = -size;

  tileContainer.x = x;
  tileContainer.y = y;
  tileContainer.addChild(base);
  tileContainer.addChild(fog);

  if (onClick) {
    tileContainer.interactive = true;
    tileContainer.cursor = 'pointer';
    tileContainer.on('pointerdown', onClick);
  }

  // On stocke les sprites pour pouvoir les manipuler plus tard
  (tileContainer as any).base = base;
  (tileContainer as any).fog = fog;

  container.addChild(tileContainer);
  return tileContainer;
}
