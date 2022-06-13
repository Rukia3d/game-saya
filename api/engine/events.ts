import { elements, materials } from "../db/testDB";
import { addExperience, rewardPlayer, openNextLevel } from "./actions";
import { findEnergyPrice, foundStartLevelToWin } from "./helpers";

import {
  currentState,
  ICreatePlayerEventId,
  IMaterial,
  IPlayer,
  IStartLevelEvent,
  IWinLevelEventTimed,
} from "./types";

export const eventCreatePlayer = (
  event: ICreatePlayerEventId,
  player: IPlayer
): IPlayer => {
  return {
    ...player,
    id: event.playerId,
    name: event.playerName,
    maxEnergy: 50,
    energy: 50,
    elements: [JSON.parse(JSON.stringify(elements[0]))],
    materials: JSON.parse(JSON.stringify(materials)).map((m: IMaterial) => {
      return { ...m, quantity: 0 };
    }),
  };
};

export const eventStartLevel = (
  event: IStartLevelEvent,
  player: IPlayer
): IPlayer => {
  const energyPrice = findEnergyPrice(
    event.elementId,
    event.mode,
    event.levelId
  );
  const state = {
    state: "PLAY" as currentState,
    level: {
      elementId: event.elementId,
      mode: event.mode,
      levelId: event.elementId,
    },
  };
  return {
    ...player,
    energy: player.energy - energyPrice,
    currentState: state,
  };
};

export const eventWinLevel = (
  event: IWinLevelEventTimed,
  player: IPlayer
): IPlayer => {
  let newMaterials = player.materials;
  let newElements = player.elements;
  let newExperience = player.exprience;

  if (
    event.mode === "story" &&
    foundStartLevelToWin(event, player.currentState)
  ) {
    newExperience = addExperience(event, player.exprience, player.elements);
    newMaterials = rewardPlayer(event, player.materials, player.elements);
    newElements = openNextLevel(event, player.elements);
  }

  return {
    ...player,
    materials: newMaterials,
    elements: newElements,
    exprience: newExperience,
    currentState: { state: "MAIN" },
  };
};
