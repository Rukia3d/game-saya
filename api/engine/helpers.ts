import seedrandom from "seedrandom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { arcanas } from "../db/testDBArcanes";
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
  IAllowedRewards,
  IArena,
} from "./types";
dayjs.extend(relativeTime);

export const generateSeed = (
  event: IWinLevelEventTimed | IMissCheckpointEvent,
  id: number
) => {
  const phrase = seedrandom(event.eventId + event.arcanaId + event.mode + id);
  return phrase;
};

export const generateRandom = (
  event: IWinLevelEventTimed | IMissCheckpointEvent,
  level: IStory | IEvent,
  reward: IAllowedRewards
) => {
  const addition = "levelId" in event ? event.levelId : 0;
  const seed = generateSeed(event, addition);
  // rand shouldn't be 0 unless specified that's the case
  let rand = Math.round(seed() * reward.upTo) + 1;
  // Story levels for the first time give double rewards
  if ("state" in level && level.state === "open") {
    rand = rand * 2;
  }
  // Tournaments and Tower won't reward for fail before reaching any checkpoint
  if ("checkpoint" in level && level.checkpoint === null) {
    rand = 0;
  }
  return rand;
};

export const findEnergyPrice = (
  arcana: number,
  mode: gameMode,
  level?: number
) => {
  if (mode === "story" && level !== undefined) {
    return arcanas[arcana].stories[level].energy;
  }
  if (mode === "run") {
    return arcanas[arcana].currentEvents[0].energy;
  }
  if (mode === "fight") {
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
  const eventIndex = event.mode === "run" ? 0 : 1;
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
  if (mode !== "run" && mode !== "fight") {
    throw new Error("Unknown game mode");
  }
  const eventIndex = mode === "run" ? 0 : 1;
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
  if (data.mode === "story" && ensure(data.level) >= 0) {
    energyPrice = findEnergyPrice(data.arcana, data.mode, data.level);
    console.log("energyPrice", energyPrice);
    const firstTime =
      player.arcanas[data.arcana].stories[ensure(data.level)].state !==
      "complete";
    if (
      data.arcana === 0 &&
      ensure(data.level) < 2 &&
      player.arcanas &&
      firstTime
    ) {
      energyPrice = 0;
    }
  }
  if (data.mode === "run" || "fight") {
    energyPrice = findEnergyPrice(data.arcana, data.mode, data.level);
  }
  return player.energy - energyPrice >= 0;
};

export const enoughToPay = (
  materials: IMaterialQuant[],
  price: IMaterialQuant[]
) => {
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

export const allowParticipation = (created: Date, resultTime: number) => {
  let diffDate = dayjs(created).diff(resultTime, "second");
  let diffMins = Math.floor((diffDate / 60) % 60);
  let diffHrs = Math.floor(diffDate / 3600);
  let block = true;
  if (diffHrs > 0) block = false;
  if (diffMins >= 5) block = false;
  console.log("allow participation", block);
  return block;
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
