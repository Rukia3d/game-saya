import seedrandom from "seedrandom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  gameMode,
  ICurrentState,
  IPlayer,
  IStory,
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
  IAdventure,
  IInventoryQuant,
} from "./types";
import { INDEXOFENERGY } from "../config";
dayjs.extend(relativeTime);

export const generateSeed = (
  event: IWinLevelEvent | IMissCheckpointEvent,
  id: number
) => {
  const phrase = seedrandom(event.eventId + id + "");
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
  const res = game.players.find((p: IPlayer) => p.id === playerId);
  if (!res) throw new Error(`Can't find player based on ID ${playerId}`);
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
  reward: IInventoryQuant[],
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

export const updatePlayerEnergy = (player: IPlayer, energy: number) => {
  player.materials[INDEXOFENERGY].quantity =
    player.materials[INDEXOFENERGY].quantity - energy;
  return player;
};

export const energyPriceForStory = (
  player: IPlayer,
  adventures: IAdventure[],
  adventureId: number,
  storyId: number,
  chapterId: number
) => {
  const price =
    adventures[adventureId].stories[storyId].chapters[chapterId].energy;
  return price;
};

export const enoughEnergyToPlay = (
  player: IPlayer,
  data: {
    chapterId: number;
    adventureId: number;
    storyId: number;
  }
) => {
  const chapter =
    player.adventures[data.adventureId].stories[data.storyId].chapters[
      data.chapterId
    ];
  return player.materials[INDEXOFENERGY].quantity - chapter.energy >= 0;
};

export const findStartLevel = (
  player: IPlayer,
  adventure: number,
  story: number,
  chapter: number
) => {
  if (player.currentState.story) {
    const adventureId = player.currentState.story.adventureId;
    const storyId = player.currentState.story.storyId;
    const chapterId = player.currentState.story.chapterId;
    const level =
      player.adventures[adventureId].stories[storyId].chapters[chapterId];
    if (
      level &&
      adventureId === adventure &&
      storyId === story &&
      chapterId === chapter
    )
      return player.currentState.story;
    else throw new Error("Can't find start level");
  } else throw new Error("Can't find start level");
};

/*
export const findLevel = (
  event: IWinLevelEvent | IMissCheckpointEvent | IPassCheckpointEvent,
  adventure: IAdventure
): IStory | IEndless => {
  switch (event.type) {
    case "WINLEVEL":
      return element.adventures[event.adventureId].stories[event.storyId];
    case "PASSCHECKPOINT":
      return element.endless[event.adventureId];
    // case "MISSCHECKPOINT":
    //   return findLevelForEndless(event, arcanas);
  }
  throw new Error("Can't find level");
};

export const generateRandom = (
  event: IWinLevelEvent | IMissCheckpointEvent,
  level: IStory | IEndless,
  reward: IAllowedRewards
) => {
  const addition = "storyId" in event ? event.storyId : 0;
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

export const findLastCheckpoint = (
  player: IPlayer,
  mode: gameMode,
  elementId: number,
  adventureId: number
) => {
  if (mode !== "run" && mode !== "fight") {
    throw new Error("Unknown game mode");
  }
  const lastCheckpoint =
    player.elements[elementId].endless[adventureId].checkpoint;
  if (lastCheckpoint === null) {
    return -1;
  }
  return lastCheckpoint;
};

/*
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
