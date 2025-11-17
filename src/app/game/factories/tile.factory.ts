import { Container, Sprite, Texture } from 'pixi.js';

export type Terrain =
  | 'plain'
  | 'forest'
  | 'desert'
  | 'mountain'
  | 'volcano'
  | 'sea'
  | 'jungle'
  | 'swamp';

export interface TileOptions {
  x: number;
  y: number;
  size: number;
  terrain: Terrain;
  container: Container;
  textures: Record<string, Texture>;
  onClick?: () => void;
  variantKey?: string;
}

export function createTile(options: TileOptions): Container {
  const { x, y, size, terrain, container, textures, onClick, variantKey } = options;
  const tileContainer = new Container();

  const key = variantKey ?? `${terrain}-1`;
  const texture = textures[key] || textures['plain-1'];

  const base = new Sprite(texture);
  base.width = size * 2;
  base.height = size * 2;
  base.x = -size;
  base.y = -size;

  tileContainer.x = x;
  tileContainer.y = y;
  tileContainer.addChild(base);

  if (onClick) {
    tileContainer.interactive = true;
    tileContainer.cursor = 'pointer';
    tileContainer.on('pointerdown', onClick);
  }

  (tileContainer as any).base = base;
  (tileContainer as any).variantKey = key;

  container.addChild(tileContainer);
  return tileContainer;
}
