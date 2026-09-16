import type { Rng } from "./rng";

export function amplitudeFactor(amplitude: number): number {
  if (amplitude <= 0) return 0;
  if (amplitude === 1) return 0.5;
  return amplitude - 1;
}

export function binomial(rng: Rng): number {
  let s = 0;
  for (let i = 0; i < 12; i++) s += rng.next();
  return s - 6;
}

export function varyNumber(n: number, amplitude: number, rng: Rng): number {
  const f = amplitudeFactor(amplitude);
  if (f === 0) return n;
  return n + Math.round(f * binomial(rng));
}

export function productionAmplitude(difficulty: "beginner" | "standard" | "tournament"): number {
  if (difficulty === "beginner") return 0;
  if (difficulty === "standard") return 1;
  return 2;
}
