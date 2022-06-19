import e from "express";
import { elements, materials } from "../db/testDBPlayer";
import { spellPrices, spells, spellUpdates } from "../db/testDBSpells";
import {
  addExperience,
  rewardPlayer,
  openNextLevel,
  removeMaterials,
} from "./actions";
import {
  canBuySpell,
  canUpdateSpell,
  findEnergyPrice,
  foundStartLevelToWin,
} from "./helpers";

import {
  currentState,
  ICreatePlayerEventId,
  IMaterial,
  IOpenSpellEvent,
  IPlayer,
  ISpell,
  ISpellClosed,
  ISpellOpen,
  ISpellPrice,
  ISpellUpdate,
  IStartLevelEvent,
  IUpdateSpellEvent,
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
    spells: spells.map((s: ISpell) => {
      const price = spellPrices.find((p: ISpellPrice) => p.spellId == s.id);
      if (!price) throw new Error("Can't find a price for a spell");
      return { ...s, price: price.price };
    }),
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
  const firstTime =
    player.elements[event.elementId].stories[event.levelId].state !==
    "complete";
  if (
    event.mode === "story" &&
    event.elementId === 0 &&
    event.levelId < 2 &&
    player.elements &&
    firstTime
  ) {
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
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.elementId == event.elementId && s.id == event.spellId
  );
  if (!newPlayerSpells[indexToChange].price) {
    throw new Error("Spell to open doesn't have a price");
  }
  if (canBuySpell(player.materials, newPlayerSpells[indexToChange].price)) {
    let newMaterials = removeMaterials(
      JSON.parse(JSON.stringify(player.materials)),
      newPlayerSpells[indexToChange].price
    );

    // Open spell should have an update
    let nextUpdate = spellUpdates.find(
      (u: ISpellUpdate) =>
        u.spellId == newPlayerSpells[indexToChange].id &&
        u.requiredStrength == newPlayerSpells[indexToChange].strength
    );

    if (nextUpdate) {
      newPlayerSpells[indexToChange] = {
        id: newPlayerSpells[indexToChange].id,
        elementId: newPlayerSpells[indexToChange].elementId,
        enemy: newPlayerSpells[indexToChange].enemy,
        strength: newPlayerSpells[indexToChange].strength,
        symbol: newPlayerSpells[indexToChange].symbol,
        state: "open",
        name: newPlayerSpells[indexToChange].name,
        updatePrice: nextUpdate.updatePrice,
        requiredStrength: nextUpdate.requiredStrength,
      };
    } else {
      console.warn(`Spell number${indexToChange} doesn't have updates in DB`);
    }
    return {
      ...player,
      materials: newMaterials,
      spells: newPlayerSpells,
      currentState: { state: "SPELLS" },
    };
  } else {
    console.warn("Not enough materials to buy a spell");
    return { ...player, currentState: { state: "SPELLS" } };
  }
};

export const eventUpdateSpell = (
  event: IUpdateSpellEvent,
  player: IPlayer
): IPlayer => {
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.elementId == event.elementId && s.id == event.spellId
  );
  if (!newPlayerSpells[indexToChange].updatePrice) {
    throw new Error("Spell to open doesn't have a price");
  }
  if (!newPlayerSpells[indexToChange].requiredStrength) {
    throw new Error("Spell to open doesn't have a required strength");
  }
  if (
    canBuySpell(player.materials, newPlayerSpells[indexToChange].updatePrice) &&
    canUpdateSpell(
      newPlayerSpells[indexToChange].requiredStrength,
      newPlayerSpells[indexToChange].strength
    )
  ) {
    let newMaterials = removeMaterials(
      JSON.parse(JSON.stringify(player.materials)),
      newPlayerSpells[indexToChange].updatePrice
    );

    let nextUpdate = spellUpdates.find(
      (u: ISpellUpdate) =>
        u.spellId == newPlayerSpells[indexToChange].id &&
        u.requiredStrength == newPlayerSpells[indexToChange].strength + 1
    );

    if (nextUpdate) {
      newPlayerSpells[indexToChange] = {
        ...newPlayerSpells[indexToChange],
        strength: newPlayerSpells[indexToChange].strength + 1,
        updatePrice: nextUpdate.updatePrice,
        requiredStrength: nextUpdate.requiredStrength,
      };
    } else {
      console.warn(`Spell number${indexToChange} doesn't have updates in DB`);
    }
    return {
      ...player,
      materials: newMaterials,
      spells: newPlayerSpells,
      currentState: { state: "SPELLS" },
    };
  } else {
    console.warn("This spell can not be updated");
    return { ...player, currentState: { state: "SPELLS" } };
  }
};
