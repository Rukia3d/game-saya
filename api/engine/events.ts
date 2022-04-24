import seedrandom from "seedrandom";
import { IResource, IStory } from "../storage/types";
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
  IPlayerAdventure,
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
  newPlayer.spells = selectSpells(newPlayer.spells, [0, 1, 3, 4, 5], 5);
  newPlayer.resources = addResources(
    newPlayer.resources,
    gameData.resources,
    initResources
  );
  return newPlayer;
};

const getHash = (input: string) => {
  let hash = 0,
    len = input.length;
  for (var i = 0; i < len; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  return hash;
};

const generateLoot = (seed: string, resources: IResource[]) => {
  //generate loot based on event creation date
  if (resources.length !== 10)
    throw new Error(`Can't generate reward, requires 10 resources options`);

  console.log("generate loot imput", seed);
  const rng = seedrandom(seed);
  const items: number[] = [];
  for (let i = 0; i < 3; i++) {
    let rand = Math.round(rng() * 9);
    while (items.indexOf(rand) !== -1) {
      rand = Math.round(rng() * 9);
    }
    items.push(rand);
  }
  console.log("items", items);
  const generated = [];
  for (let i = 0; i < items.length; i++) {
    const resource = resources[items[i]];
    generated[i] = {
      resource_id: resource.id,
      quantity: Math.round(rng() * 8) + 1,
    };
  }
  console.log("generated reward", generated);
  return generated;
};

export const finishStoryEvent = async (
  gameData: IGameData,
  player: IEventPlayer,
  event: IPFinishStoryEvent
): Promise<IEventPlayer> => {
  let newPlayer = player;
  console.log("finishStoryEvent");
  const story = player.adventures
    ?.find((a: IPlayerAdventure) => a.id === event.adventure_id)
    ?.stories?.find((s: IStory) => s.id === event.story_id);

  if (!story) {
    throw new Error(
      `Can't apply finish story event, can't find story ${event.story_id} in adventure ${event.adventure_id}`
    );
  }
  if (story.type === "fight") {
    console.log("applying a fight result");
    const common = gameData.resources.filter(
      (r: IResource) => r.commonality === 10 && r.school.id < 5
    );
    console.log("common", common.length);
    const loot = generateLoot(
      `${event.id}${event.player_id}${event.adventure_id}${event.story_id}`,
      common
    );
    console.log("loot", loot);
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
      newPlayer.adventures = openStory(
        newPlayer.adventures,
        event.adventure_id,
        event.story_id + 1
      );
      break;
    case 1:
      newPlayer.heroes = addHero(newPlayer.heroes, gameData.heroes, 1);
      newPlayer.spells = addSpells(
        newPlayer.spells,
        gameData.spells,
        [10, 10, 10, 11, 11, 12]
      );
      newPlayer.adventures = openStory(
        newPlayer.adventures,
        event.adventure_id,
        story.next_id ? story.next_id : 1
      );
      break;
    default:
      newPlayer.adventures = openStory(
        newPlayer.adventures,
        event.adventure_id,
        event.story_id + 1
      );
  }
  return newPlayer;
};
