import { arcanas, materials } from "../db/testDBPlayer";
import { spellPrices, spells, spellUpdates } from "../db/testDBSpells";
import {
  addExperience,
  rewardPlayer,
  openNextLevel,
  removeMaterials,
} from "./actions";
import { findEnergyPrice } from "./helpers";

import {
  currentState,
  gameMode,
  ICreatePlayerEventId,
  IMaterial,
  IOpenSpellEvent,
  IPlayer,
  ISpell,
  ISpellClosed,
  ISpellOpen,
  ISpellPrice,
  ISpellUpdate,
  IStartEndlessEvent,
  IStartLevelEvent,
  IUpdateSpellEvent,
  IWinLevelEventTimed,
} from "./types";

export const createPlayer = (
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
    arcanas: [JSON.parse(JSON.stringify(arcanas[0]))],
    materials: JSON.parse(JSON.stringify(materials)).map((m: IMaterial) => {
      return { ...m, quantity: 0 };
    }),
  };
};

export const startLevel = (
  event: IStartLevelEvent,
  player: IPlayer
): IPlayer => {
  let energyPrice = findEnergyPrice(event.arcanaId, "story", event.levelId);
  const firstTime =
    player.arcanas[event.arcanaId].stories[event.levelId].state !== "complete";
  if (
    event.arcanaId === 0 &&
    event.levelId < 2 &&
    player.arcanas &&
    firstTime
  ) {
    energyPrice = 0;
  }
  const state = {
    state: "PLAY" as currentState,
    level: {
      arcanaId: event.arcanaId,
      mode: "story" as gameMode,
      levelId: event.levelId,
    },
  };
  return {
    ...player,
    energy: player.energy - energyPrice,
    currentState: state,
  };
};

export const startEndless = (
  event: IStartEndlessEvent,
  player: IPlayer
): IPlayer => {
  // This assumes there are only 2 endless types
  let energyPrice = findEnergyPrice(event.arcanaId, event.mode);
  const state = {
    state: "PLAY" as currentState,
    level: {
      arcanaId: event.arcanaId,
      mode: event.mode as gameMode,
    },
  };
  return {
    ...player,
    energy: player.energy - energyPrice,
    currentState: state,
  };
};

export const winLevel = (
  event: IWinLevelEventTimed,
  player: IPlayer
): IPlayer => {
  const newMaterials = rewardPlayer(event, player.materials, player.arcanas);
  // need to add experience before we open the next level
  const newExperience = addExperience(event, player.exprience, player.arcanas);

  return {
    ...player,
    materials: newMaterials.all,
    arcanas: openNextLevel(event, player.arcanas),
    exprience: newExperience,
    // TODO Check if this is correct
    currentState: { state: "WINMATERIAL", materials: newMaterials.new },
  };
};

export const openSpell = (event: IOpenSpellEvent, player: IPlayer): IPlayer => {
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.arcanaId == event.arcanaId && s.id == event.spellId
  );
  if (!newPlayerSpells[indexToChange].price) {
    throw new Error("Spell to open doesn't have a price");
  }
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
      arcanaId: newPlayerSpells[indexToChange].arcanaId,
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
};

export const updateSpell = (
  event: IUpdateSpellEvent,
  player: IPlayer
): IPlayer => {
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.arcanaId == event.arcanaId && s.id == event.spellId
  );
  if (!newPlayerSpells[indexToChange].updatePrice) {
    throw new Error("Spell to open doesn't have a price");
  }
  if (!newPlayerSpells[indexToChange].requiredStrength) {
    throw new Error("Spell to open doesn't have a required strength");
  }
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
};
