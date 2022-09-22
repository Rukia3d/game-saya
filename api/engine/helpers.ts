import seedrandom from "seedrandom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { arcanas } from "../db/testDBArcanas";
import {
  gameMode,
  ICurrentState,
  IArcana,
  IMaterialQuant,
  IPlayer,
  IStory,
  IEvent,
  IAllowedRewards,
  IMissCheckpointEvent,
  IWinLevelEvent,
  IPassCheckpointEvent,
  IServerArenaStartEvent,
} from "./types";
dayjs.extend(relativeTime);

export const generateSeed = (
  event: IWinLevelEvent | IMissCheckpointEvent,
  id: number
) => {
  const phrase = seedrandom(event.eventId + event.arcanaId + event.mode + id);
  return phrase;
};

export const generateArenaRandom = (
  event: IServerArenaStartEvent,
  mode: string,
  upTo: number,
  index: number
) => {
  const seed = seedrandom(
    event.eventId + mode + event.start + event.end + index
  );
  const res = Math.round(seed() * upTo);
  return res;
};

export const generateRandom = (
  event: IWinLevelEvent | IMissCheckpointEvent,
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

export const findLevelIndex = (event: IWinLevelEvent, arcanas: IArcana[]) => {
  const charIndex = arcanas.findIndex((c: IArcana) => c.id === event.arcanaId);
  if (charIndex === -1) throw new Error(`No character ${event.arcanaId} found`);
  const levelIndex = arcanas[charIndex].stories.findIndex(
    (s: IStory) => s.id === event.levelId
  );
  if (levelIndex === -1) throw new Error(`No level ${event.levelId} found`);
  return [charIndex, levelIndex];
};

export const findLevel = (
  event: IWinLevelEvent | IMissCheckpointEvent | IPassCheckpointEvent,
  arcanas: IArcana[]
): IStory | IEvent => {
  switch (event.type) {
    case "WINLEVEL":
      return findLevelForStory(event, arcanas);
    case "PASSCHECKPOINT":
      return findLevelForEndless(event, arcanas);
    case "MISSCHECKPOINT":
      return findLevelForEndless(event, arcanas);
  }
};

export const findLevelForStory = (
  event: IWinLevelEvent,
  arcanas: IArcana[]
): IStory => {
  const [charIndex, levelIndex] = findLevelIndex(event, arcanas);
  const level = arcanas[charIndex].stories[levelIndex];
  return level;
};

export const findLevelForEndless = (
  event: IMissCheckpointEvent | IPassCheckpointEvent,
  arcanas: IArcana[]
): IEvent => {
  const eventIndex = event.mode === "run" ? 0 : 1;
  const level = arcanas[event.arcanaId].currentEvents[eventIndex];
  return level;
};

const correctStateForWin = (
  event: {
    arcanaId: number;
    mode: gameMode;
    levelId: number;
  },
  currentState: ICurrentState
) => {
  return (
    event.levelId === currentState.level?.level &&
    event.arcanaId === currentState.level?.arcana &&
    event.mode === currentState.level?.mode
  );
};

const correctStateForArena = (
  arena: {
    mode: gameMode;
    index: number;
  },
  currentState: ICurrentState
) => {
  return (
    arena.mode === currentState.arena?.mode &&
    arena.index === currentState.arena?.index
  );
};

export const foundStartLevelToWin = (
  currentState: ICurrentState,
  event: {
    arcanaId: number;
    mode: gameMode;
    levelId: number;
  }
) => {
  if ("level" in currentState) {
    return correctStateForWin(event, currentState);
  } else {
    throw new Error("Incorrect state: can't finish level you haven't started");
  }
};

export const foundArenaStartEvent = (
  currentState: ICurrentState,
  event: {
    mode: gameMode;
    index: number;
  }
) => {
  if ("arena" in currentState) {
    return correctStateForArena(event, currentState);
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
    arcanaId: number;
    mode: gameMode;
    checkpoint: number;
  }
) => {
  const last = findLastCheckpoint(player, data.mode, data.arcanaId) || 0;
  return data.checkpoint === last + 1;
};

export const enoughEnergyToPlay = (
  player: IPlayer,
  data: {
    arcanaId: number;
    mode: gameMode;
    levelId?: number;
  }
) => {
  let energyPrice = 0;
  if (data.mode === "story" && ensure(data.levelId) >= 0) {
    energyPrice = findEnergyPrice(data.arcanaId, data.mode, data.levelId);
    const firstTime =
      player.arcanas[data.arcanaId].stories[ensure(data.levelId)].state !==
      "complete";
    if (
      data.arcanaId === 0 &&
      ensure(data.levelId) < 2 &&
      player.arcanas &&
      firstTime
    ) {
      energyPrice = 0;
    }
  }
  if (data.mode === "run" || "fight") {
    energyPrice = findEnergyPrice(data.arcanaId, data.mode, data.levelId);
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

export const calculateResult = (created: number, resultTime: number) => {
  let diffDate = dayjs(resultTime).diff(dayjs(created), "milliseconds");
  return diffDate;
};

export const allowParticipation = (created: number, resultTime: number) => {
  let diffDate = dayjs(created).diff(resultTime, "second");
  let diffMins = Math.floor((diffDate / 60) % 60);
  let diffHrs = Math.floor(diffDate / 3600);
  let block = true;
  if (diffHrs > 0) block = false;
  if (diffMins >= 5) block = false;
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
