import seedrandom from "seedrandom";
import {
  findLastCheckpoint,
  findLevelForEndless,
  findLevelForStory,
  findLevelIndex,
} from "./helpers";
import {
  IMaterialQuant,
  IArcana,
  IAllowedRewards,
  IWinLevelEventTimed,
  IMissCheckpointEvent,
  IPlayer,
} from "./types";

export const rewardPlayer = (
  event: IWinLevelEventTimed | IMissCheckpointEvent,
  materials: IMaterialQuant[],
  arcanas: IArcana[]
): { all: IMaterialQuant[]; new: IMaterialQuant[] } => {
  const level =
    "time" in event
      ? findLevelForStory(event, arcanas)
      : findLevelForEndless(event, arcanas);
  const newOnly: IMaterialQuant[] = [];
  level.allowedRewards.forEach((r: IAllowedRewards) => {
    const addition = "levelId" in event ? event.levelId : 0;
    const rng = seedrandom(
      event.eventId + event.arcanaId + event.mode + addition
    );
    // rand shouldn't be 0 unless specified that's the case
    let rand = Math.round(rng() * r.upTo) + 1;
    // Story levels for the first time give double rewards
    if ("state" in level && level.state === "open") {
      rand = rand * 2;
    }
    // Tournaments and Tower won't reward for fail before reaching any checkpoint
    if ("checkpoint" in level && level.checkpoint === null) {
      rand = 0;
    }
    materials[r.id].quantity = materials[r.id].quantity + rand;
    newOnly.push({ ...materials[r.id], quantity: rand });
  });
  return { all: materials, new: newOnly };
};

export const openNextLevel = (
  event: IWinLevelEventTimed,
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
  event: IWinLevelEventTimed | IMissCheckpointEvent,
  player: IPlayer
): number => {
  const level =
    "time" in event
      ? findLevelForStory(event, player.arcanas)
      : findLevelForEndless(event, player.arcanas);
  if ("state" in level && level.state === "open") {
    return player.exprience + level.experience;
  }
  if (event.mode === "tournament" || event.mode === "tower") {
    // if it is the first time the last checkpoint will return -1
    const last = findLastCheckpoint(player, event.mode, event.arcanaId);
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
