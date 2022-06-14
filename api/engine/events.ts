import { elements, materials, spells } from "../db/testDB";
import {
  addExperience,
  rewardPlayer,
  openNextLevel,
  removeMaterials,
} from "./actions";
import { canBuySpell, findEnergyPrice, foundStartLevelToWin } from "./helpers";

import {
  currentState,
  ICreatePlayerEventId,
  IMaterial,
  IOpenSpellEvent,
  IPlayer,
  ISpell,
  ISpellClosed,
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
  let energyPrice = findEnergyPrice(event.elementId, event.mode, event.levelId);
  if (event.mode === "story" && event.elementId === 0 && event.levelId < 2) {
    energyPrice = 0;
  }
  const state = {
    state: "PLAY" as currentState,
    level: {
      elementId: event.elementId,
      mode: event.mode,
      levelId: event.levelId,
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

export const eventOpenSpell = (
  event: IOpenSpellEvent,
  player: IPlayer
): IPlayer => {
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));

  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpell | ISpellClosed) =>
      s.elementId == event.elementId && s.id == event.spellId
  );
  if (
    newPlayerSpells[indexToChange].price &&
    canBuySpell(player.materials, newPlayerSpells[indexToChange].price)
  ) {
    let newMaterials = removeMaterials(
      JSON.parse(JSON.stringify(player.materials)),
      newPlayerSpells[indexToChange].price
    );

    newPlayerSpells[indexToChange] = {
      id: newPlayerSpells[indexToChange].id,
      elementId: newPlayerSpells[indexToChange].elementId,
      enemy: newPlayerSpells[indexToChange].enemy,
      strength: newPlayerSpells[indexToChange].strength,
      symbol: newPlayerSpells[indexToChange].symbol,
      state: newPlayerSpells[indexToChange].state,
      name: newPlayerSpells[indexToChange].name,
    };
    return { ...player, materials: newMaterials, spells: newPlayerSpells };
  } else {
    throw new Error("Spell to open doesn't have a price");
  }
};
