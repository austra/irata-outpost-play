/** Tiny deterministic RNG (mulberry32). Serialized via seed + call count. */
export class Rng {
  private state: number;
  count = 0;

  constructor(seed: number, count = 0) {
    this.state = seed >>> 0;
    for (let i = 0; i < count; i++) this.next();
    this.count = count;
  }

  next(): number {
    this.count += 1;
    this.state = (this.state + 0x6d2b79f5) >>> 0;
    let t = this.state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  int(maxExclusive: number): number {
    return Math.floor(this.next() * maxExclusive);
  }

  intInclusive(min: number, max: number): number {
    return min + this.int(max - min + 1);
  }

  pick<T>(items: T[]): T {
    return items[this.int(items.length)]!;
  }

  chance(p: number): boolean {
    return this.next() < p;
  }

  clone(): Rng {
    return new Rng(this.state, 0);
  }
}

export function randomSeed(): number {
  return (Math.floor(Math.random() * 0xffffffff) ^ Date.now()) >>> 0;
}
