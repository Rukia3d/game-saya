import seedrandom from "seedrandom";
import {
  IMaterialOwned,
  IElement,
  IAllowedRewards,
  IStory,
  IWinLevelEventTimed,
} from "./types";

const findLevelIndex = (event: IWinLevelEventTimed, elements: IElement[]) => {
  const charIndex = elements.findIndex(
    (c: IElement) => c.id === event.elementId
  );
  if (charIndex === -1)
    throw new Error(`No character ${event.elementId} found`);
  const levelIndex = elements[charIndex].stories.findIndex(
    (s: IStory) => s.id === event.levelId
  );
  if (levelIndex === -1) throw new Error(`No level ${event.levelId} found`);
  return [charIndex, levelIndex];
};

export const rewardPlayer = (
  event: IWinLevelEventTimed,
  materials: IMaterialOwned[],
  elements: IElement[]
): IMaterialOwned[] => {
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
