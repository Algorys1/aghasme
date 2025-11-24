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

export interface TileContainer extends Container {
  lootIcon?: Sprite;
}

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

export function createTile(options: TileOptions): TileContainer {
  const { x, y, size, terrain, container, textures, onClick, variantKey } = options;

  const tileContainer = new Container();

  const key = variantKey ?? `${terrain}-1`;
  const texture = textures[key];

  const base = new Sprite(texture);
  base.anchor.set(0.5);

  // IMPORTANT : scale based on 768×768
  const scale = (size * 2) / 768;
  base.scale.set(scale);

  tileContainer.x = x;
  tileContainer.y = y;

  tileContainer.addChild(base);

  // Click
  if (onClick) {
    tileContainer.eventMode = 'static';
    tileContainer.cursor = 'pointer';
    tileContainer.on('pointerdown', onClick);
  }

  (tileContainer as any).base = base;
  (tileContainer as any).variantKey = key;

  container.addChild(tileContainer);
  return tileContainer;
}

