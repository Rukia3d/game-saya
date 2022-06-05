import { characters, materials } from "../db/testDB";
import { addExperience, rewardPlayer, openNextLevel } from "./actions";
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
    characters: [JSON.parse(JSON.stringify(characters[0]))],
    materials: JSON.parse(JSON.stringify(materials)).map((m: IMaterial) => {
      return { ...m, quantity: 0 };
    }),
  };
};

export const eventStartLevel = (
  event: IStartLevelEvent,
  player: IPlayer
): IPlayer => {
  return { ...player, energy: player.energy - event.energyPrice };
};

export const eventWinLevel = (
  event: IWinLevelEventTimed,
  player: IPlayer
): IPlayer => {
  let newMaterials = player.materials;
  let newCharacters = player.characters;
  let newExperience = player.exprience;

  if (event.mode === "story") {
    newExperience = addExperience(event, player.exprience, player.characters);
    newMaterials = rewardPlayer(event, player.materials, player.characters);
    newCharacters = openNextLevel(event, player.characters);
  }

  return {
    ...player,
    materials: newMaterials,
    characters: newCharacters,
    exprience: newExperience,
  };
};
