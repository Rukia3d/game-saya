import seedrandom from "seedrandom";
import { findLevelIndex } from "./helpers";
import {
  IMaterialQuant,
  IArcana,
  IAllowedRewards,
  IWinLevelEventTimed,
} from "./types";

export const rewardPlayer = (
  event: IWinLevelEventTimed,
  materials: IMaterialQuant[],
  arcanas: IArcana[]
): { all: IMaterialQuant[]; new: IMaterialQuant[] } => {
  const [charIndex, levelIndex] = findLevelIndex(event, arcanas);
  const level = arcanas[charIndex].stories[levelIndex];
  const newOnly: IMaterialQuant[] = [];
  level.allowedRewards.forEach((r: IAllowedRewards) => {
    const rng = seedrandom(
      event.eventId + event.arcanaId + event.mode + event.levelId
    );
    let rand = Math.round(rng() * r.upTo);
    if (level.state === "open") {
      rand = rand * 2;
    }
    materials[r.id].quantity = materials[r.id].quantity + rand;
    newOnly.push(materials[r.id]);
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
  event: IWinLevelEventTimed,
  exp: number,
  arcanas: IArcana[]
): number => {
  const [charIndex, levelIndex] = findLevelIndex(event, arcanas);
  const level = arcanas[charIndex].stories[levelIndex];
  if (level.state === "open") {
    return exp + level.experience;
  }
  return exp;
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
