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
export type AllTerrains = Terrain | 'fog';

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

function getWeightedRandom<T extends string>(choices: { value: T; weight: number }[]): T {
  const total = choices.reduce((sum, c) => sum + c.weight, 0);
  const roll = Math.random() * total;
  let acc = 0;
  for (const c of choices) {
    acc += c.weight;
    if (roll <= acc) return c.value;
  }
  return choices[choices.length - 1].value;
}

function pickVariantKey(terrain: Terrain): string {
  const weights = [
    { suffix: 1, weight: 50 },
    { suffix: 2, weight: 25 },
    { suffix: 3, weight: 15 },
    { suffix: 4, weight: 10 },
  ];

  const maxVariants: Record<Terrain, number> = {
    plain: 4,
    forest: 4,
    desert: 4,
    mountain: 4,
    volcano: 4,
    jungle: 4,
    swamp: 4,
    sea: 4,
  };

  const count = maxVariants[terrain] ?? 1;
  const filtered = weights.filter(w => w.suffix <= count);

  const choices = filtered.map(w => ({
    value: `${terrain}-${w.suffix}`,
    weight: w.weight,
  }));

  return getWeightedRandom(choices);
}

export function createTile(options: TileOptions): Container {
  const { x, y, size, terrain, container, textures, onClick } = options;
  const tileContainer = new Container();

  const variantKey = options.variantKey ?? pickVariantKey(terrain);
  const texture = textures[variantKey] || textures['plain-1'];

  const base = new Sprite(texture);
  base.width = size * 2;
  base.height = size * 2;
  base.x = -size;
  base.y = -size;

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

  (tileContainer as any).base = base;
  (tileContainer as any).fog = fog;
  (tileContainer as any).variantKey = variantKey;

  container.addChild(tileContainer);
  return tileContainer;
}
