import { findLastCheckpoint, findLevel, generateRandom } from "./helpers";
import {
  IMaterialQuant,
  IAllowedRewards,
  IMissCheckpointEvent,
  IPlayer,
  IArenaEvent,
  IWinLevelEvent,
  IPassCheckpointEvent,
  IArenaResult,
  IElement,
} from "./types";

export const rewardPlayer = (
  event: IWinLevelEvent | IMissCheckpointEvent,
  materials: IMaterialQuant[],
  element: IElement
): { all: IMaterialQuant[]; new: IMaterialQuant[] } => {
  const level = findLevel(event, element);
  const newOnly: IMaterialQuant[] = [];
  level.allowedRewards.forEach((r: IAllowedRewards) => {
    const rand = generateRandom(event, level, r);
    materials[r.material.id].quantity =
      materials[r.material.id].quantity + rand;
    newOnly.push({ ...materials[r.material.id], quantity: rand });
  });
  return { all: materials, new: newOnly };
};

export const openNextLevel = (
  event: IWinLevelEvent,
  elements: IElement[]
): IElement[] => {
  const newElements = JSON.parse(JSON.stringify(elements));
  const currentStories =
    newElements[event.elementId].adventures[event.adventureId].stories;

  if (currentStories[event.storyId].id < currentStories.length) {
    // If next closed it becomes open
    if (currentStories[event.storyId + 1].state === "closed") {
      newElements[event.elementId].adventures[event.adventureId].stories[
        event.storyId + 1
      ].state = "open";
    }
    // If this open becomes complete
    if (currentStories[event.storyId].state === "open")
      newElements[event.elementId].adventures[event.adventureId].stories[
        event.storyId
      ].state = "complete";
  }

  return newElements;
};

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
