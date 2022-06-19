import { elements } from "../db/testDBPlayer";
import {
  ICurrentState,
  IElement,
  IMaterialQuant,
  IStory,
  IWinLevelEventTimed,
} from "./types";

export const findEnergyPrice = (
  element: number,
  mode: string,
  level: number
) => {
  if (mode === "story") {
    return elements[element].stories[level].energy;
  }
  throw new Error("Unknown mode");
};

export const findLevelIndex = (
  event: IWinLevelEventTimed,
  elements: IElement[]
) => {
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

const correctStateForWin = (
  event: IWinLevelEventTimed,
  currentState: ICurrentState
) => {
  return (
    event.mode === currentState.level?.mode &&
    event.levelId === currentState.level?.levelId &&
    event.elementId === currentState.level?.elementId
  );
};
export const foundStartLevelToWin = (
  event: IWinLevelEventTimed,
  currentState: ICurrentState
) => {
  if ("level" in currentState) {
    return correctStateForWin(event, currentState);
  } else {
    throw new Error("Incorrect state: can't finish level you haven't started");
  }
};

export const canBuySpell = (
  materials: IMaterialQuant[],
  price: IMaterialQuant[]
): boolean => {
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

export const canUpdateSpell = (
  requiredStrength: number,
  strength: number
): boolean => {
  return requiredStrength === strength;
};
