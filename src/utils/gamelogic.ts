import { STORIES_PER_PANEL } from "../Stories/Stories";
import { findCharacter, findUpdate } from "./helpers";
import { givePlayerResources } from "./resourceLogic";
import {
  Adventure,
  Hero,
  CharacterNPC,
  Enemy,
  FightState,
  GameState,
  Player,
  Resource,
  Spell,
  Story,
  StoryAction,
  SpellUpdate,
} from "./types";

export const changeCardsInDeck = (playerCards: Spell[], s: Spell) => {
  const playerCard = playerCards.find((c: Spell) => s.id === c.id);
  if (!playerCard) {
    throw new Error(
      "Can't find the card you're trying to select in player's cards"
    );
  }
  const cardIndex = playerCards.indexOf(playerCard);
  const currentlySelected = playerCards.filter((c: Spell) => c.selected);

  if (currentlySelected.length >= 15) {
    const firstSelectedIndex = playerCards.indexOf(currentlySelected[0]);
    playerCards[firstSelectedIndex] = {
      ...playerCards[firstSelectedIndex],
      selected: false,
    };
  }
  playerCards[cardIndex] = { ...s, selected: !s.selected };
  return playerCards;
};

export const generateDeck = (
  characters: Hero[],
  playerCards: Spell[]
): Spell[] => {
  const heroSpells: Spell[] = [];
  playerCards.forEach((c: Spell) => {
    //    if (!c.selected) return;
    heroSpells.push({
      id: c.id,
      image: c.image,
      name: c.name,
      mana: c.mana,
      strength: c.strength,
      element: c.element,
      owner: "hero",
      selected: c.selected,
      type: c.type,
      level: c.level,
      description: c.description,
      updates: c.updates,
    });
  });
  return heroSpells;
};

export const generateEnemyDeck = (enemy: Enemy): Spell[] => {
  const enemySpells: Spell[] = [];
  enemy.spells.forEach((c: Spell) => {
    enemySpells.push({
      id: c.id,
      image: c.image,
      name: c.name,
      mana: c.mana,
      strength: c.strength,
      element: c.element,
      owner: "enemy",
      selected: true,
      type: c.type,
      level: c.level,
      description: c.description,
      updates: c.updates,
    });
  });
  return enemySpells.splice(0, enemy.life);
};

export const updateHeroDeck = (fightState: FightState, heroCard: Spell) => {
  let newDeck = fightState.heroDeck;
  let newDrop = fightState.heroDrop;
  if (fightState.heroDeck.length <= 0) {
    newDeck = newDrop;
    newDrop = [heroCard];
  } else {
    newDrop.push(heroCard);
  }
  return [newDeck, newDrop];
};

export const enemyToNumber = (enemy: Enemy) => {
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

const givePlayerExperience = (player: Player, enemy: Enemy): Player => {
  const newExp = player.data.experience + enemyToNumber(enemy) * 5;
  const newData = { ...player.data, experience: newExp };
  return {
    ...player,
    data: newData,
  };
};

export const updateWinPlayer = (
  player: Player,
  enemy: Enemy,
  resources: Resource[]
): Player => {
  const updatedPlayerData: Player = givePlayerExperience(player, enemy);

  return {
    ...updatedPlayerData,
    resources: givePlayerResources(player, resources),
  };
};

const updatePlayerNpcs = (
  npcs: CharacterNPC[],
  allNpcs: Hero[],
  action: StoryAction
): CharacterNPC[] => {
  const npc = npcs.find((n: CharacterNPC) => action.id === n.id);
  if (action.data === undefined) {
    throw new Error("NPC dialogue data to change is invalid");
  }
  if (!npc) {
    const npcToAdd = allNpcs.find((n: Hero) => action.id === n.id);
    if (!npcToAdd) {
      throw new Error("Can't find npc to add to the Intro screen");
    }
    const newNpc = { ...npcToAdd, dial: action.data };
    npcs.push(newNpc);
  } else {
    const i = npcs.indexOf(npc);
    if (action.data === "remove") {
      npcs.splice(i, 1);
    } else {
      npcs[i] = { ...npcs[i], dial: action.data };
    }
  }

  return npcs;
};

const updatePlayerStory = (
  adventures: Adventure[],
  action: StoryAction
): Adventure[] => {
  const adventuresection = adventures.find(
    (a: Adventure) => action.id === a.id
  );
  if (!adventuresection || !adventuresection.stories || !action.data)
    throw new Error("No adventure to change");
  const [x, y] = findStoryToUpdate(adventuresection, action.data);
  if (x > STORIES_PER_PANEL) {
    throw new Error(
      "WIP - add next panel from adventures to user story in adventures"
    );
  }
  const n = adventures.indexOf(adventuresection);
  if (!adventures[n].stories) throw new Error("No adventure to change");
  //@ts-ignore
  adventures[n].stories[x].stories[y].open = true;
  return adventures;
};

const updatePlayerAdventures = (
  adventures: Adventure[],
  action: StoryAction
): Adventure[] => {
  const adventure = adventures.find((a: Adventure) => action.id === a.id);
  if (!adventure) throw new Error("No adventure to change");
  const j = adventures.indexOf(adventure);
  adventures[j] = { ...adventures[j], open: true };
  return adventures;
};

const updatePlayerHeroes = (
  heroes: Hero[],
  spells: Spell[],
  allHeroes: Hero[],
  allSpells: Spell[],
  action: StoryAction
): [Hero[], Spell[]] => {
  console.log("updatePlayerHeroes");
  let newHeroes: Hero[] = heroes;
  let newSpells: Spell[] = spells;
  const hero = findCharacter(allHeroes, action.id);
  const res = heroes.indexOf(hero);
  if (res !== -1) {
    console.warn(`Trying to add the same ${action.id} hero again`);
  } else {
    newHeroes.push(hero);
    newSpells = updatePlayerCards(spells, allSpells, action);
  }
  return [newHeroes, newSpells];
};

const updatePlayerCards = (
  spells: Spell[],
  allSpells: Spell[],
  action: StoryAction
) => {
  const spellsToAdd = allSpells.filter((s: Spell) => s.element === action.data);
  return spells.concat(spellsToAdd);
};

const updatePlayerSpellUpdates = (
  updates: SpellUpdate[],
  allUpdates: SpellUpdate[],
  action: StoryAction
) => {
  console.log("updatePlayerSpellUpdates");
  if (!action.data) {
    throw new Error("No update Id for the spell Update addition");
  }
  const update = findUpdate(allUpdates, action.data);
  const res = updates.indexOf(update);
  if (res !== -1) {
    console.warn(`Trying to add the same ${action.data} update again`);
  } else {
    updates.push(update);
  }
  return updates;
};

const findStoryToUpdate = (
  adventuresection: Adventure,
  id: string
): number[] => {
  if (!adventuresection.stories)
    throw new Error("No stories in this adventure");
  let res: number | null = null;
  let storyGroup = 0;
  for (
    storyGroup = 0;
    storyGroup < adventuresection.stories.length;
    storyGroup++
  ) {
    const currentSG = adventuresection.stories[storyGroup];
    res = currentSG.stories.findIndex((s: Story) => s.id === id);
    if (res >= 0) break;
  }
  if (res == null || res === -1)
    throw new Error(`No story to update "${id}" has index ${res}`);
  return [storyGroup, res];
};

export const finishStory = (
  game: GameState,
  actions: StoryAction[]
): Player => {
  //actions.map((a: StoryAction) => console.log("Action", a));
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

export const updatePlayerSpell = (
  p: Player,
  s: Spell,
  u: SpellUpdate
): Player => {
  const spellToUpdateIndex = p.spells.indexOf(s);
  p.spells[spellToUpdateIndex].updates.push(u);
  return p;
};
