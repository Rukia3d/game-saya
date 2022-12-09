import {
  IMissCheckpointEvent,
  IPlayer,
  IWinLevelEvent,
  IChapter,
  IInventoryQuant,
  IAdventure,
} from "./types";
import { INDEXOFEXPERIENCE } from "../config";

export const rewardPlayer = (
  event: IWinLevelEvent | IMissCheckpointEvent,
  player: IPlayer
): { all: IInventoryQuant[]; new: IInventoryQuant[] } => {
  if (event.type === "WINLEVEL") {
    const chapter: IChapter =
      player.adventures[event.adventureId].stories[event.storyId].chapters[
        event.chapterId
      ];
    const allowedRewards: IInventoryQuant[] =
      chapter.state === "complete"
        ? chapter.staticRewards
        : chapter.firstTimeRewards;
    const newOnly: IInventoryQuant[] = [];
    // Update materials
    allowedRewards.forEach((r: IInventoryQuant) => {
      player.materials[r.id].quantity =
        player.materials[r.id].quantity + r.quantity;
      newOnly.push({ ...player.materials[r.id], quantity: r.quantity });
    });
    return { all: player.materials, new: newOnly };
  }
  // TODO Update to work with Miss Checkpoint
  return { all: [], new: [] };
};

export const openNextLevel = (
  event: IWinLevelEvent,
  adventures: IAdventure[]
): IAdventure[] => {
  const newAdventures = JSON.parse(JSON.stringify(adventures));
  const currentChapters =
    newAdventures[event.adventureId].stories[event.storyId].chapters;

  if (currentChapters[event.chapterId].id < currentChapters.length) {
    // If next closed it becomes open
    if (currentChapters[event.chapterId + 1].state === "closed") {
      newAdventures[event.adventureId].stories[event.storyId].chapters[
        event.chapterId + 1
      ].state = "open";
    }
    // If this open becomes complete
    if (currentChapters[event.chapterId].state === "open")
      newAdventures[event.adventureId].stories[event.storyId].chapters[
        event.chapterId
      ].state = "complete";
  }

  return newAdventures;
};

/*
export const addExperience = (
  event: IWinLevelEvent | IPassCheckpointEvent,
  player: IPlayer
): number => {
  const level = findLevel(event, player.elements[event.elementId]);
  if ("state" in level && level.state === "open") {
    return player.exprience + level.experience;
  }
  if (event.mode === "run" || event.mode === "fight") {
    // if it is the first time the last checkpoint will return -1
    const last = findLastCheckpoint(
      player,
      event.mode,
      event.elementId,
      event.adventureId
    );
    return player.exprience + (last <= 0 ? 1 : last) * 10;
  }
  return player.exprience;
};

/*
export const removeMaterials = (
  materials: IMaterialQuant[],
  price: IMaterialQuant[]
): IMaterialQuant[] => {
  price.forEach((p: IMaterialQuant) => {
    const materialIndex = materials.findIndex(
      (m: IMaterialQuant) => m.id === p.id
    );
    materials[materialIndex].quantity =
      materials[materialIndex].quantity - p.quantity;
  });
  return materials;
};

export const updateRewardPool = (
  event: IArenaEvent,
  stake: IMaterialQuant[]
): IArenaEvent => {
  const newEvent = JSON.parse(JSON.stringify(event));
  stake.forEach((s: IMaterialQuant) => {
    const materialIndex = newEvent.rewardPool.findIndex(
      (m: IMaterialQuant) => m.id === s.id
    );
    if (materialIndex >= 0) {
      newEvent.rewardPool[materialIndex].quantity =
        newEvent.rewardPool[materialIndex].quantity + s.quantity;
    } else {
      newEvent.rewardPool.push(s);
    }
  });
  return newEvent;
};

export const updateArenaResults = (
  event: IArenaEvent,
  timeInSec: number,
  player: IPlayer
) => {
  const newEvent: IArenaEvent = JSON.parse(JSON.stringify(event));
  const previousResult = newEvent.results.find(
    (r: IArenaResult) =>
      r.playerId === player.id && r.playerName === player.name
  );

  if (!previousResult) {
    newEvent.results.push({
      playerName: player.name,
      playerId: player.id,
      time: timeInSec,
    });
  }

  if (previousResult && previousResult.time < timeInSec) {
    const index = newEvent.results.indexOf(previousResult);
    newEvent.results[index].time = timeInSec;
  }

  newEvent.results = newEvent.results.sort((a, b) => a.time - b.time);
  return newEvent;
};

export const listingToPlayer = (
  spells: (ISpellOpen | ISpellClosed | ISpell)[],
  listings: ISpellListing[],
  indexToRemove: number
) => {
  const newPlayerSpells = JSON.parse(JSON.stringify(spells));
  const newListings: ISpellListing[] = JSON.parse(JSON.stringify(listings));
  newPlayerSpells.push(newListings[indexToRemove].spell);
  newListings.splice(indexToRemove, 1);
  return [newPlayerSpells, newListings];
};
*/
