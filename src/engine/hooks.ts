import type { GameState, Good, Stance } from "./types";

export interface EngineHooks {
  onRoundStart?(state: GameState): void;
  onPhaseChange?(state: GameState, from: GameState["phase"], to: GameState["phase"]): void;
  modifyTurnTimePtu?(base: number, state: GameState, playerId: number): number;
  extraAuctionGoods?(state: GameState): Good[];
  onScore?(state: GameState, playerId: number, total: number): number;
  sellingLandPauseBtu?(state: GameState): number;
  cpuLandAuctionTick?(state: GameState): void;
  cpuGoodsDeclare?(state: GameState, good: Good): Stance[] | void;
  cpuGoodsAuctionTick?(state: GameState): void;
}

export const defaultHooks: EngineHooks = {};
