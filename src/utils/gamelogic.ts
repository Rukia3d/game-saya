import { STORIES_PER_PANEL } from "../Stories/Stories";
import { findCharacter, findUpdate } from "./helpers";
import { givePlayerResources } from "./resourceLogic";
import {
  IAdventure,
  IHero,
  INPC,
  IEnemy,
  GameState,
  Player,
  IResource,
  ISpell,
  IStory,
  ISpellUpdate,
  IStoryAction,
} from "./types";

export const enemyToNumber = (enemy: IEnemy) => {
  switch (enemy.experience) {
    case "apprentice":
      return 6;
    case "practitioner":
      return 7;
    case "master":
      return 8;
    case "grandmaster":
      return 9;
    default:
      return 5;
  }
};

export const updateLostPlayer = (player: Player) => {
  return {
    ...player,
    mana: player.data.mana - 1,
  };
};

const givePlayerExperience = (player: Player, enemy: IEnemy): Player => {
  const newExp = player.data.experience + enemyToNumber(enemy) * 5;
  const newData = { ...player.data, experience: newExp };
  return {
    ...player,
    data: newData,
  };
};

export const updateWinPlayer = (
  player: Player,
  enemy: IEnemy,
  resources: IResource[]
): Player => {
  const updatedPlayerData: Player = givePlayerExperience(player, enemy);

  return {
    ...updatedPlayerData,
    resources: givePlayerResources(player, resources),
  };
};

const updatePlayerNpcs = (
  npcs: INPC[],
  allNpcs: IHero[],
  action: IStoryAction
): INPC[] => {
  const newnpcs = npcs;
  const npc = newnpcs.find((n: INPC) => action.id === n.id);
  if (action.data === undefined) {
    throw new Error("NPC dialogue data to change is invalid");
  }
  if (!npc) {
    const npcToAdd = allNpcs.find((n: IHero) => action.id === n.id);
    if (!npcToAdd) {
      throw new Error("Can't find npc to add to the Intro screen");
    }
    const newNpc = { ...npcToAdd, dial: action.data };
    newnpcs.push(newNpc);
  } else {
    const i = newnpcs.indexOf(npc);
    if (action.data === "remove") {
      newnpcs.splice(i, 1);
    } else {
      newnpcs[i] = { ...newnpcs[i], dial: action.data };
    }
  }
  return newnpcs;
};

const updatePlayerStory = (
  adventures: IAdventure[],
  action: IStoryAction
): IAdventure[] => {
  const newAdventures = adventures;
  const adventuresection = newAdventures.find(
    (a: IAdventure) => action.id === a.id
  );
  if (!adventuresection || !adventuresection.storyGroups || !action.data)
    throw new Error("No adventure to change");
  const [x, y] = findStoryToUpdate(adventuresection, action.data);
  if (x > STORIES_PER_PANEL) {
    throw new Error(
      "WIP - add next panel from adventures to user story in adventures"
    );
  }
  const n = newAdventures.indexOf(adventuresection);
  if (!newAdventures[n].storyGroups) throw new Error("No adventure to change");
  //@ts-ignore
  newAdventures[n].storyGroups[x].stories[y].open = true;
  return newAdventures;
};

const updatePlayerAdventures = (
  adventures: IAdventure[],
  action: IStoryAction
): IAdventure[] => {
  const adventure = adventures.find((a: IAdventure) => action.id === a.id);
  if (!adventure) throw new Error("No adventure to change");
  const j = adventures.indexOf(adventure);
  adventures[j] = { ...adventures[j], open: true };
  return adventures;
};

const updatePlayerHeroes = (
  heroes: IHero[],
  spells: ISpell[],
  allHeroes: IHero[],
  allSpells: ISpell[],
  action: IStoryAction
): [IHero[], ISpell[]] => {
  let newHeroes: IHero[] = heroes;
  let newSpells: ISpell[] = spells;
  const hero = findCharacter(allHeroes, action.id);
  const alreadyExists = newHeroes.filter((h: IHero) => h.id === hero.id);
  if (alreadyExists.length > 0) {
    console.warn(`Trying to add the same ${action.id} hero again`);
  } else {
    newHeroes.push(hero);
    const before = newSpells.length;
    newSpells = updatePlayerCards(spells, allSpells, action);
    const after = newSpells.length;
    const newNumber = after - before;
    if (newNumber !== 6) {
      throw new Error("Hero to add had less than 6 spells to add");
    }
  }
  return [newHeroes, newSpells];
};

const updatePlayerCards = (
  spells: ISpell[],
  allSpells: ISpell[],
  action: IStoryAction
) => {
  const spellsToAdd = allSpells.filter(
    (s: ISpell) => s.element === action.data
  );
  return spells.concat(spellsToAdd);
};

const updatePlayerSpellUpdates = (
  updates: ISpellUpdate[],
  allUpdates: ISpellUpdate[],
  action: IStoryAction
) => {
  if (!action.data) {
    throw new Error("No update Id for the spell Update addition");
  }
  const newUpdates: ISpellUpdate[] = updates;
  const update: ISpellUpdate = findUpdate(allUpdates, action.data);
  const alreadyExists = newUpdates.filter(
    (h: ISpellUpdate) => h.id === update.id
  );
  if (alreadyExists.length > 0) {
    console.warn(`Trying to add the same ${action.data} update again`);
  } else {
    newUpdates.push(update);
  }
  return newUpdates;
};

const findStoryToUpdate = (
  adventuresection: IAdventure,
  id: string
): number[] => {
  if (!adventuresection.storyGroups)
    throw new Error("No stories in this adventure");
  let res: number | null = null;
  let storyGroup = 0;
  for (
    storyGroup = 0;
    storyGroup < adventuresection.storyGroups.length;
    storyGroup++
  ) {
    const currentSG = adventuresection.storyGroups[storyGroup];
    res = currentSG.stories.findIndex((s: IStory) => s.id === id);
    if (res >= 0) break;
  }
  if (res == null || res === -1)
    throw new Error(`No story to update "${id}" has index ${res}`);
  return [storyGroup, res];
};

export const finishStory = (game: GameState, story: IStory): Player => {
  const actions = story.action;
  //actions.map((a: IStoryAction) => console.log("Action", a));
  let player = game.player;
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    switch (action.type) {
      case "addNpc":
        player.npcs = updatePlayerNpcs(player.npcs, game.npcs, action);
        break;
      case "setAdventure":
        player.adventures = updatePlayerAdventures(player.adventures, action);
        break;
      case "openStory":
        player.adventures = updatePlayerStory(player.adventures, action);
        break;
      case "addHero":
        const [newHeroes, newSpells] = updatePlayerHeroes(
          player.heroes,
          player.spells,
          game.heroes,
          game.spells,
          action
        );
        player.heroes = newHeroes;
        player.spells = newSpells;
        break;
      case "addUpdate":
        player.spellUpdates = updatePlayerSpellUpdates(
          player.spellUpdates,
          game.spellUpdates,
          action
        );
        break;
      default:
        throw new Error("Unknown action is called in finishing story");
    }
  }
  return player;
};

export const finishFight = (
  gameState: GameState,
  story: IStory,
  result: string,
  enemy?: IEnemy,
  rewards?: IResource[]
): Player => {
  const player = finishStory(gameState, story);
  if (result === "Won" && enemy && rewards) {
    return updateWinPlayer(player, enemy, rewards);
  } else {
    return updateLostPlayer(gameState.player);
  }
};
