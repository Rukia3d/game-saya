import { arcanas } from "../db/testDBPlayer";
import {
  gameMode,
  ICurrentState,
  IArcana,
  IMaterialQuant,
  IPlayer,
  IStory,
  IWinLevelEventTimed,
  IMissCheckpointEvent,
  IEvent,
} from "./types";

export const findEnergyPrice = (
  arcana: number,
  mode: string,
  level?: number
) => {
  if (mode === "story" && level !== undefined) {
    return arcanas[arcana].stories[level].energy;
  }
  if (mode === "tournament") {
    return arcanas[arcana].currentEvents[0].energy;
  }
  if (mode === "tower") {
    return arcanas[arcana].currentEvents[1].energy;
  }
  throw new Error(`Unknown mode ${mode}`);
};

export const findLevelIndex = (
  event: IWinLevelEventTimed,
  arcanas: IArcana[]
) => {
  const charIndex = arcanas.findIndex((c: IArcana) => c.id === event.arcanaId);
  if (charIndex === -1) throw new Error(`No character ${event.arcanaId} found`);
  const levelIndex = arcanas[charIndex].stories.findIndex(
    (s: IStory) => s.id === event.levelId
  );
  if (levelIndex === -1) throw new Error(`No level ${event.levelId} found`);
  return [charIndex, levelIndex];
};

export const findLevelForStory = (
  event: IWinLevelEventTimed,
  arcanas: IArcana[]
): IStory => {
  const [charIndex, levelIndex] = findLevelIndex(event, arcanas);
  const level = arcanas[charIndex].stories[levelIndex];
  return level;
};

export const findLevelForEndless = (
  event: IMissCheckpointEvent,
  arcanas: IArcana[]
): IEvent => {
  const eventIndex = event.mode === "tournament" ? 0 : 1;
  const level = arcanas[event.arcanaId].currentEvents[eventIndex];
  return level;
};

const correctStateForWin = (
  event: {
    arcana: number;
    mode: gameMode;
    level: number;
  },
  currentState: ICurrentState
) => {
  return (
    event.level === currentState.level?.level &&
    event.arcana === currentState.level?.arcana &&
    event.mode === currentState.level?.mode
  );
};
export const foundStartLevelToWin = (
  currentState: ICurrentState,
  event: {
    arcana: number;
    mode: gameMode;
    level: number;
  }
) => {
  if ("level" in currentState) {
    return correctStateForWin(event, currentState);
  } else {
    throw new Error("Incorrect state: can't finish level you haven't started");
  }
};

export const findLastCheckpoint = (
  player: IPlayer,
  mode: gameMode,
  arcana: number
) => {
  if (mode !== "tournament" && mode !== "tower") {
    throw new Error("Unknown game mode");
  }
  const eventIndex = mode === "tournament" ? 0 : 1;
  const lastCheckpoint =
    player.arcanas[arcana].currentEvents[eventIndex].checkpoint;
  if (lastCheckpoint === null) {
    return -1;
  }
  return lastCheckpoint;
};

export const correctCheckpoint = (
  player: IPlayer,
  data: {
    arcana: number;
    mode: gameMode;
    checkpoint: number;
  }
) => {
  const last = findLastCheckpoint(player, data.mode, data.arcana) || 0;
  return data.checkpoint === last + 1;
};

export const enoughEnergyToPlay = (
  player: IPlayer,
  data: {
    arcana: number;
    mode: gameMode;
    level?: number;
  }
) => {
  let energyPrice = 0;
  if (data.mode === "story" && data.level) {
    energyPrice = findEnergyPrice(data.arcana, data.mode, data.level);
    const firstTime =
      player.arcanas[data.arcana].stories[data.level].state !== "complete";
    if (data.arcana === 0 && data.level < 2 && player.arcanas && firstTime) {
      energyPrice = 0;
    }
  }
  if (data.mode === "tournament" || "tower") {
    energyPrice = findEnergyPrice(data.arcana, data.mode, data.level);
  }
  return player.energy - energyPrice >= 0;
};

export const canBuySpell = (
  materials: IMaterialQuant[],
  price: IMaterialQuant[]
): boolean => {
  let canBuy = true;
  price.forEach((p: IMaterialQuant) => {
    const material = materials.find((m: IMaterialQuant) => m.id === p.id);
    if (!material)
      throw new Error("Price of an item contains non-existant material");
    if (p.quantity > material.quantity) {
      canBuy = false;
    }
  });

  return canBuy;
};

export const canUpdateSpell = (
  requiredStrength: number,
  strength: number
): boolean => {
  return requiredStrength === strength;
};

export function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}
