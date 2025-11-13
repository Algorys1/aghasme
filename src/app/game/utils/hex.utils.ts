export interface HexCoord { q: number; r: number; }

export function hexKey(q: number, r: number): string {
  return `${q},${r}`;
}

export function hexFromKey(key: string): HexCoord {
  const [q, r] = key.split(',').map(Number);
  return { q, r };
}

export function hexDistance(a: HexCoord, b: HexCoord): number {
  return (
    (Math.abs(a.q - b.q) +
     Math.abs(a.q + a.r - b.q - b.r) +
     Math.abs(a.r - b.r)) / 2
  );
}

export function hexNeighbors(q: number, r: number): HexCoord[] {
  const dirs = [
    { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
    { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 },
  ];
  return dirs.map(d => ({ q: q + d.q, r: r + d.r }));
}

export function hexNeighborsInBounds(
  q: number,
  r: number,
  radius: number
): HexCoord[] {
  return hexNeighbors(q, r).filter(p => hexInBounds(p.q, p.r, radius));
}

export function hexInBounds(q: number, r: number, radius: number): boolean {
  const s = -q - r;
  return (
    Math.abs(q) <= radius &&
    Math.abs(r) <= radius &&
    Math.abs(s) <= radius
  );
}
