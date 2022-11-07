import seedrandom from "seedrandom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  gameMode,
  ICurrentState,
  IMaterialQuant,
  IPlayer,
  IStory,
  IAllowedRewards,
  IMissCheckpointEvent,
  IWinLevelEvent,
  IPassCheckpointEvent,
  IServerArenaStartEvent,
  IGame,
  IArenaResult,
  IArenaResultPool,
  IArena,
  IArenaEvent,
  IEndless,
  IElement,
} from "./types";
import { elementAdventure } from "../db/testDBData";
dayjs.extend(relativeTime);

export const generateSeed = (
  event: IWinLevelEvent | IMissCheckpointEvent,
  id: number
) => {
  const phrase = seedrandom(event.eventId + event.elementId + event.mode + id);
  return phrase;
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

export const findPlayer = (game: IGame, playerId: number) => {
  const res = game.players.find((p: IPlayer) => p.id == playerId);
  if (!res) throw new Error("Can't find player based on ID");
  return res;
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

export const rewardArenaPlayer = (
  player: IPlayer,
  reward: IMaterialQuant[],
  place: number
) => {
  const newPlayer: IPlayer = JSON.parse(JSON.stringify(player));
  const newId = newPlayer.claims.length;
  newPlayer.claims.push({
    id: newId,
    prize: reward,
    claimed: false,
  });
  newPlayer.messages.push({
    text: `Claim arena reward! Congratulations on winning ${place} place reward at Arena`,
    read: false,
    claimId: newId,
  });
  return newPlayer;
};

export const replacePlayer = (
  allPlayers: IPlayer[],
  newPlayer: IPlayer
): IPlayer[] => {
  const newPlayers: IPlayer[] = JSON.parse(JSON.stringify(allPlayers));
  const indexOfNewPlayer = allPlayers.findIndex(
    (p: IPlayer) => p.id === newPlayer.id
  );
  if (indexOfNewPlayer === -1) {
    throw new Error("Can't find player to update");
  }
  newPlayers[indexOfNewPlayer] = newPlayer;
  return newPlayers;
};

export const rewardArenaPlayers = (
  game: IGame,
  result: IArenaResult[][],
  reward: IArenaResultPool[]
): IPlayer[] => {
  let newPlayers: IPlayer[] = JSON.parse(JSON.stringify(game.players));
  for (let i = 0; i < 3; i++) {
    result[i].forEach((r: IArenaResult) => {
      const player = findPlayer(game, r.playerId);
      const newPlayer = rewardArenaPlayer(player, reward[i].reward, i);
      newPlayers = replacePlayer(newPlayers, newPlayer);
    });
  }
  return newPlayers;
};

export const findEnergyPrice = (
  elementId: number,
  adventureId: number,
  mode: gameMode,
  levelId?: number
) => {
  if (mode === "story" && levelId !== undefined) {
    return elementAdventure[elementId].adventures[adventureId].stories[levelId]
      .energy;
  }
  if (mode === "quest" && levelId !== undefined) {
    return elementAdventure[elementId].quests[adventureId].stories[levelId]
      .energy;
  }
  if (mode === "run" || mode === "fight") {
    return elementAdventure[elementId].endless[adventureId].energy;
  }
  throw new Error(`Unknown mode ${mode}`);
};

export const energyPriceForStory = (
  player: IPlayer,
  elementId: number,
  adventureId: number,
  mode: gameMode,
  storyId?: number
) => {
  let energyPrice = findEnergyPrice(elementId, adventureId, "story", storyId);
  const firstTime =
    player.elements[elementId].adventures[adventureId].stories[ensure(storyId)]
      .state !== "complete";
  if (
    elementId === 0 &&
    adventureId === 0 &&
    ensure(storyId) < 2 &&
    player.elements &&
    firstTime
  ) {
    energyPrice = 0;
  }
  return energyPrice;
};

export const enoughEnergyToPlay = (
  player: IPlayer,
  data: {
    elementId: number;
    adventureId: number;
    mode: gameMode;
    storyId?: number;
  }
) => {
  let energyPrice = 0;
  if (
    (data.mode === "story" || data.mode === "quest") &&
    ensure(data.storyId) >= 0
  ) {
    energyPrice = energyPriceForStory(
      player,
      data.elementId,
      data.adventureId,
      data.mode,
      data.storyId
    );
  }
  if (data.mode === "run" || "fight") {
    energyPrice = findEnergyPrice(
      data.elementId,
      data.adventureId,
      data.mode,
      data.storyId
    );
  }
  return player.energy - energyPrice >= 0;
};

/*
export const generateRandom = (
  event: IWinLevelEvent | IMissCheckpointEvent,
  level: IStory | IEndless,
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


export const findLevelIndex = (event: IWinLevelEvent, elements: IElement[]) => {
  const charIndex = elements.findIndex(
    (c: IEndless) => c.id === event.elementId
  );
  if (charIndex === -1)
    throw new Error(`No character ${event.elementId} found`);
  const levelIndex = arcanas[charIndex].stories.findIndex(
    (s: IStory) => s.id === event.levelId
  );
  if (levelIndex === -1) throw new Error(`No level ${event.levelId} found`);
  return [charIndex, levelIndex];
};

export const findLevel = (
  event: IWinLevelEvent | IMissCheckpointEvent | IPassCheckpointEvent,
  arcanas: IArcana[]
): IStory | IEndless => {
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
): IEndless => {
  const eventIndex = event.mode === "run" ? 0 : 1;
  const level = arcanas[event.elementId].currentEvents[eventIndex];
  return level;
};

const correctStateForWin = (
  event: {
    elementId: number;
    mode: gameMode;
    levelId: number;
  },
  currentState: ICurrentState
) => {
  return (
    event.levelId === currentState.level?.level &&
    event.elementId === currentState.level?.arcana &&
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
    elementId: number;
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
    elementId: number;
    mode: gameMode;
    checkpoint: number;
  }
) => {
  const last = findLastCheckpoint(player, data.mode, data.elementId) || 0;
  return data.checkpoint === last + 1;
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

export const findEventArena = (
  game: IGame,
  mode: gameMode,
  index: number
): [IArena, IArenaEvent] => {
  const newArena: IArena =
    mode === "run" ? game.server.arenaRun : game.server.arenaFight;
  const arenaEvent: IArenaEvent =
    mode === "run"
      ? game.server.arenaRun.events[index]
      : game.server.arenaFight.events[index];
  return [newArena, arenaEvent];
};

export const findListing = (listings: ISpellListing[], listingId: number) => {
  const listing = listings.find(
    (s: ISpellListing) => s.listingId === listingId
  );
  return listing;
};
*/
