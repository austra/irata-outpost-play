"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { IrataGame } from "@/engine/game";
import type { GameState } from "@/engine/types";

const game = new IrataGame();

export function getGame() {
  return game;
}

export function useGame(): GameState {
  return useSyncExternalStore(
    (onStoreChange) => game.subscribe(onStoreChange),
    () => game.getState(),
    () => game.getState(),
  );
}

export function useGameLoop() {
  const raf = useRef<number>(0);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    const loop = (t: number) => {
      game.tick(t - last);
      last = t;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);
  return { running, setRunning };
}
