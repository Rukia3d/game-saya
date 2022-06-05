import seedrandom from "seedrandom";
import {
  IMaterialOwned,
  ICharacter,
  IAllowedRewards,
  IStory,
  IWinLevelEventTimed,
} from "./types";

const findLevelIndex = (
  event: IWinLevelEventTimed,
  characters: ICharacter[]
) => {
  const charIndex = characters.findIndex(
    (c: ICharacter) => c.id === event.characterId
  );
  if (charIndex === -1)
    throw new Error(`No character ${event.characterId} found`);
  const levelIndex = characters[charIndex].stories.findIndex(
    (s: IStory) => s.id === event.levelId
  );
  if (levelIndex === -1) throw new Error(`No level ${event.levelId} found`);
  return [charIndex, levelIndex];
};

export const rewardPlayer = (
  event: IWinLevelEventTimed,
  materials: IMaterialOwned[],
  characters: ICharacter[]
): IMaterialOwned[] => {
  const [charIndex, levelIndex] = findLevelIndex(event, characters);
  const level = characters[charIndex].stories[levelIndex];
  console.log("materials before", materials);
  level.allowedRewards.forEach((r: IAllowedRewards) => {
    const rng = seedrandom(
      event.characterId + event.mode + event.eventId + event.time
    );
    let rand = Math.round(rng() * r.upTo);
    if (level.state === "open") {
      rand = rand * 2;
    }
    materials[r.id].quantity = materials[r.id].quantity + rand;
  });
  console.log("materials after", materials);
  return materials;
};

export const openNextLevel = (
  event: IWinLevelEventTimed,
  characters: ICharacter[]
): ICharacter[] => {
  const [charIndex, levelIndex] = findLevelIndex(event, characters);
  if (levelIndex < characters[charIndex].stories.length) {
    characters[charIndex].stories[event.levelId + 1].state = "open";
  }
  characters[charIndex].stories[event.levelId].state = "complete";
  return characters;
};

export const addExperience = (
  event: IWinLevelEventTimed,
  exp: number,
  characters: ICharacter[]
): number => {
  const [charIndex, levelIndex] = findLevelIndex(event, characters);
  const level = characters[charIndex].stories[levelIndex];
  if (level.state === "open") {
    return exp + level.experience;
  }
  return exp;
};
