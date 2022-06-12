import { elements, materials } from "../db/testDB";
import { addExperience, rewardPlayer, openNextLevel } from "./actions";
import { findEnergyPrice } from "./helpers";

import {
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
  return { ...player, energy: player.energy - energyPrice };
};

export const eventWinLevel = (
  event: IWinLevelEventTimed,
  player: IPlayer
): IPlayer => {
  let newMaterials = player.materials;
  let newElements = player.elements;
  let newExperience = player.exprience;

  if (event.mode === "story") {
    newExperience = addExperience(event, player.exprience, player.elements);
    newMaterials = rewardPlayer(event, player.materials, player.elements);
    newElements = openNextLevel(event, player.elements);
  }

  return {
    ...player,
    materials: newMaterials,
    elements: newElements,
    exprience: newExperience,
  };
};
