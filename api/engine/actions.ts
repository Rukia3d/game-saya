import seedrandom from "seedrandom";
import {
  findLastCheckpoint,
  findLevelForEndless,
  findLevelForStory,
  findLevelIndex,
  generateRandom,
} from "./helpers";
import {
  IMaterialQuant,
  IArcana,
  IAllowedRewards,
  IWinLevelEventTimed,
  IMissCheckpointEvent,
  IPlayer,
  IArenaEvent,
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
    const rand = generateRandom(event, level, r);
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
  if (event.mode === "run" || event.mode === "fight") {
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

export const updateRewardPool = (
  event: IArenaEvent,
  stake: IMaterialQuant[]
) => {
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
