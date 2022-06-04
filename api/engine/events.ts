import seedrandom from "seedrandom";
import { ICreatePlayerEvent, IStartLevelEvent, IWinLevelEvent } from "./testDB";
import {
  elementName,
  IAllowedRewards,
  ICharacter,
  IMaterial,
  IMaterialOwned,
  IPlayer,
  IStory,
} from "./types";

const materials: IMaterial[] = [
  { id: 0, name: "Coin" },
  { id: 1, name: "Black Soul Stone" },
  { id: 2, name: "White Soul Stone" },
  { id: 3, name: "Air essence" },
  { id: 4, name: "Fire essence" },
  { id: 5, name: "Metal essence" },
  { id: 6, name: "Stone essence" },
  { id: 7, name: "Water essence" },
];

const characters: ICharacter[] = [
  {
    element: "air" as elementName,
    id: 0,
    name: "Saya",
    stories: [
      {
        id: 0,
        level: "",
        name: "air story0",
        state: "open",
        allowedRewards: [
          { id: 0, upTo: 10 },
          { id: 3, upTo: 3 },
        ],
        experience: 10,
      },
      {
        id: 1,
        level: "",
        name: "air story1",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        experience: 10,
      },
      {
        id: 2,
        level: "",
        name: "air story2",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        experience: 10,
      },
    ],
    legend: ["Saya story line 1", "Saya story line 2"],
    currentQuests: [],
    currentTournament: { id: 0, level: "" },
    currentTower: { id: 0, level: "" },
  },
  {
    element: "fire" as elementName,
    id: 1,
    name: "Nell",
    stories: [
      {
        id: 0,
        level: "",
        name: "fire some0",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        experience: 10,
      },
      {
        id: 1,
        level: "",
        name: "fire some1",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        experience: 10,
      },
    ],
    legend: ["Nell story line 1", "Nell story line 2"],
    currentQuests: [],
    currentTournament: { id: 0, level: "" },
    currentTower: { id: 0, level: "" },
  },
];

type ICreatePlayerEventId = ICreatePlayerEvent & { playerId: number };
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
    characters: [characters[0]],
    materials: materials.map((m: IMaterial) => {
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

const findCorrectLevelIndex = (event: IWinLevelEventTimed) => {
  const charIndex = characters.findIndex(
    (c: ICharacter) => c.id === event.characterId
  );
  if (charIndex === -1) throw new Error("No character found");
  const levelIndex = characters[charIndex].stories.findIndex(
    (s: IStory) => s.id === event.levelId
  );
  if (levelIndex === -1) throw new Error("No level found");
  return [charIndex, levelIndex];
};

const rewardPlayer = (
  event: IWinLevelEventTimed,
  materials: IMaterialOwned[],
  characters: ICharacter[]
): IMaterialOwned[] => {
  const [charIndex, levelIndex] = findCorrectLevelIndex(event);
  const level = characters[charIndex].stories[levelIndex];

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

  return materials;
};

const openNextLevel = (
  event: IWinLevelEventTimed,
  characters: ICharacter[]
): ICharacter[] => {
  const [charIndex, levelIndex] = findCorrectLevelIndex(event);
  if (levelIndex < characters[charIndex].stories.length) {
    characters[charIndex].stories[event.eventId + 1].state = "open";
  }
  characters[charIndex].stories[event.eventId].state = "complete";
  return characters;
};

const addExperience = (
  event: IWinLevelEventTimed,
  exp: number,
  characters: ICharacter[]
): number => {
  const [charIndex, levelIndex] = findCorrectLevelIndex(event);
  const level = characters[charIndex].stories[levelIndex];
  if (level.state === "open") {
    return exp + level.experience;
  }
  return exp;
};

type IWinLevelEventTimed = IWinLevelEvent & { time: Date };
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
