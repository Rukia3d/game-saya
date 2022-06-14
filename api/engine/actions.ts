import seedrandom from "seedrandom";
import { findLevelIndex } from "./helpers";
import {
  IMaterialQuant,
  IElement,
  IAllowedRewards,
  IWinLevelEventTimed,
} from "./types";

export const rewardPlayer = (
  event: IWinLevelEventTimed,
  materials: IMaterialQuant[],
  elements: IElement[]
): IMaterialQuant[] => {
  const [charIndex, levelIndex] = findLevelIndex(event, elements);
  const level = elements[charIndex].stories[levelIndex];
  level.allowedRewards.forEach((r: IAllowedRewards) => {
    const rng = seedrandom(
      event.eventId + event.elementId + event.mode + event.levelId
    );
    let rand = Math.round(rng() * r.upTo);
    if (level.state === "open") {
      rand = rand * 2;
    }
    materials[r.id].quantity = materials[r.id].quantity + rand;
  });
  return materials;
};

export const openNextLevel = (
  event: IWinLevelEventTimed,
  elements: IElement[]
): IElement[] => {
  const [charIndex, levelIndex] = findLevelIndex(event, elements);
  if (levelIndex < elements[charIndex].stories.length) {
    elements[charIndex].stories[event.levelId + 1].state = "open";
  }
  elements[charIndex].stories[event.levelId].state = "complete";
  return elements;
};

export const addExperience = (
  event: IWinLevelEventTimed,
  exp: number,
  elements: IElement[]
): number => {
  const [charIndex, levelIndex] = findLevelIndex(event, elements);
  const level = elements[charIndex].stories[levelIndex];
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
