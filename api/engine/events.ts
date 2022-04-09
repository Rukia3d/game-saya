import { IResource } from "../storage/types";
import {
  addHero,
  selectHeroes,
  openAdventure,
  openStory,
  updateNPCs,
  addSpells,
  selectSpells,
  addResources,
} from "./actions";
import {
  IGameData,
  IEventPlayer,
  IUserEvent,
  IPFinishStoryEvent,
} from "./types";

export const createUserEvent = async (
  gameData: IGameData,
  player: IEventPlayer,
  event: IUserEvent
): Promise<IEventPlayer> => {
  console.log("createUserEvent");
  let newPlayer = player;
  const initNPC = { npc_id: 0, dialogue_id: 6 };
  const initResources = [
    { resource_id: 8, quantity: 5 },
    { resource_id: 9, quantity: 5 },
    { resource_id: 5, quantity: 3 },
  ];
  const initHero = 0;
  const initAdv = 0;
  newPlayer.player.created_at = new Date(event.created_at);
  newPlayer.player.updated_at = new Date();
  newPlayer.player.id = event.player_id;
  newPlayer.player.life = 10;
  newPlayer.player.maxlife = 10;
  newPlayer.player.mana = 10;
  newPlayer.player.maxmana = 10;
  newPlayer.player.rank = 1;

  newPlayer.heroes = addHero(newPlayer.heroes, gameData.heroes, initHero);
  newPlayer.heroes = selectHeroes(newPlayer.heroes, [initHero], 1);
  newPlayer.adventures = openAdventure(
    newPlayer.adventures,
    gameData.adventures,
    initAdv
  );
  newPlayer.adventures = openStory(newPlayer.adventures, initAdv, 0);
  newPlayer.npcs = updateNPCs(
    newPlayer.npcs,
    gameData.characters,
    gameData.dialogues,
    [initNPC]
  );
  newPlayer.spells = addSpells(
    newPlayer.spells,
    gameData.spells,
    [7, 7, 7, 8, 8, 9]
  );
  newPlayer.spells = selectSpells(newPlayer.spells, [0, 1, 2, 3, 4, 5], 6);
  newPlayer.resources = addResources(
    newPlayer.resources,
    gameData.resources,
    initResources
  );
  return newPlayer;
};

const getHash = (input: string) => {
  var hash = 0,
    len = input.length;
  for (var i = 0; i < len; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  return hash;
};

const generateLoot = (input: Date, resources: IResource[]) => {
  //generate loot based on event creation date
  if (resources.length !== 10)
    throw new Error(`Can't generate reward, requires 10 resources options`);
  const hash = getHash(`${input}`)
    .toString()
    .match(/.{1,2}/g)
    ?.slice(0, 3);
  if (!hash)
    throw new Error(`Can't generate hash for rewards from event creation date`);
  const generated = [];
  for (let i = 0; i < hash?.length; i++) {
    const resource = resources[parseInt(hash[i][0])];
    generated[i] = {
      resource_id: resource.id,
      quantity: parseInt(hash[i][1]) == 0 ? 1 : parseInt(hash[i][1]),
    };
  }
  console.log("hash", hash);
  console.log("generated reward", generated);
  return generated;
};

export const finishStory = async (
  gameData: IGameData,
  player: IEventPlayer,
  event: IPFinishStoryEvent
): Promise<IEventPlayer> => {
  let newPlayer = player;
  console.log("finishStoryEvent");
  if (event.story_type === "fight") {
    console.log("fight event", event);
    const veryCommon = gameData.resources.filter(
      (r: IResource) => r.commonality == 10 && r.school.id < 5
    );
    const loot = generateLoot(event.created_at, veryCommon);
    player.resources = addResources(player.resources, gameData.resources, loot);
  }
  switch (event.story_id) {
    case 0:
      newPlayer.npcs = updateNPCs(
        newPlayer.npcs,
        gameData.characters,
        gameData.dialogues,
        [
          { npc_id: 0, dialogue_id: null },
          { npc_id: 6, dialogue_id: 7 },
        ]
      );
      newPlayer.heroes = addHero(newPlayer.heroes, gameData.heroes, 1);
      newPlayer.spells = addSpells(
        newPlayer.spells,
        gameData.spells,
        [10, 10, 10, 11, 11, 12]
      );
      break;
    default:
      newPlayer.adventures = openStory(
        newPlayer.adventures,
        event.adventure_id,
        event.story_id
      );
  }
  return newPlayer;
};
