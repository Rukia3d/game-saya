import {
  findLastCheckpoint,
  findLevel,
  findLevelIndex,
  generateRandom,
} from "./helpers";
import {
  IMaterialQuant,
  IArcana,
  IAllowedRewards,
  IMissCheckpointEvent,
  IPlayer,
  IArenaEvent,
  IWinLevelEvent,
  IPassCheckpointEvent,
  IArenaResult,
  ISpellListing,
  ISpell,
  ISpellClosed,
  ISpellOpen,
} from "./types";

export const rewardPlayer = (
  event: IWinLevelEvent | IMissCheckpointEvent,
  materials: IMaterialQuant[],
  arcanas: IArcana[]
): { all: IMaterialQuant[]; new: IMaterialQuant[] } => {
  const level = findLevel(event, arcanas);
  const newOnly: IMaterialQuant[] = [];
  level.allowedRewards.forEach((r: IAllowedRewards) => {
    const rand = generateRandom(event, level, r);
    materials[r.id].quantity = materials[r.id].quantity + rand;
    newOnly.push({ ...materials[r.id], quantity: rand });
  });
  return { all: materials, new: newOnly };
};

export const openNextLevel = (
  event: IWinLevelEvent,
  arcanas: IArcana[]
): IArcana[] => {
  const [charIndex, levelIndex] = findLevelIndex(event, arcanas);
  if (levelIndex < arcanas[charIndex].stories.length) {
    arcanas[charIndex].stories[event.levelId + 1].state = "open";
  }
  arcanas[charIndex].stories[event.levelId].state = "complete";
  return arcanas;
};

export const addExperience = (
  event: IWinLevelEvent | IPassCheckpointEvent,
  player: IPlayer
): number => {
  const level = findLevel(event, player.arcanas);
  if ("state" in level && level.state === "open") {
    return player.exprience + level.experience;
  }
  if (event.mode === "run" || event.mode === "fight") {
    // if it is the first time the last checkpoint will return -1
    const last = findLastCheckpoint(player, event.mode, event.elementId);
    return player.exprience + (last <= 0 ? 1 : last) * 10;
  }
  return player.exprience;
};

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
