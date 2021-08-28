import { STORIES_PER_PANEL } from "../Main/Stories";
import { givePlayerResources } from "./resourceLogic";
import {
  Adventure,
  Character,
  CharacterNPC,
  Enemy,
  FightState,
  ForgeEffect,
  ForgeReq,
  GameState,
  Player,
  Resource,
  resourceType,
  Spell,
  Story,
  StoryAction,
  StoryGroup,
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
  characters: string[],
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
      effects: c.effects,
      strength: c.strength,
      element: c.element,
      owner: "hero",
      selected: c.selected,
      type: c.type,
      level: c.level,
      description: c.description,
    });
  });
  return heroSpells;
};

export const generateEnemyDeck = (enemy: Enemy): Spell[] => {
  const enemySpells: Spell[] = [];
  enemy.cards.forEach((c: Spell) => {
    enemySpells.push({
      id: c.id,
      image: c.image,
      name: c.name,
      mana: c.mana,
      effects: c.effects,
      strength: c.strength,
      element: c.element,
      owner: "enemy",
      selected: true,
      type: c.type,
      level: c.level,
      description: c.description,
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

const updateCardParameter = (spell: Spell, effect: ForgeEffect): Spell => {
  spell[effect.parameter] = spell[effect.parameter] + effect.change;
  return spell;
};

const findUpdateEffect = (forgeEffects: ForgeEffect[], effect: string) => {
  const updateEffect = forgeEffects.find((f: ForgeEffect) => f.id === effect);
  if (!updateEffect) {
    throw new Error(`Can't find update effect ${effect}`);
  }
  return updateEffect;
};
export const updatedCards = (
  forgeEffects: ForgeEffect[],
  s: Spell,
  req: ForgeReq,
  all: Spell[]
): Spell[] => {
  const index = all.indexOf(s);
  if (index === -1) throw new Error(`Can't find spell ${s.id} to update`);
  const updateEffect = findUpdateEffect(forgeEffects, req.effect);
  const newCard = updateCardParameter(s, updateEffect);
  newCard.level = newCard.level + 1;
  all[index] = newCard;
  return all;
};

const raiseUpdate = (
  resouceData: Resource[],
  s: [resourceType, number]
): [resourceType, number] => {
  const multiplier: Resource | null =
    resouceData.find((r: Resource) => r.id === s[0]) || null;
  if (!multiplier) throw new Error(`Can't find multiplier for ${s[0]}`);
  const res: [resourceType, number] = [s[0], s[1] * multiplier.commonality];
  return res;
};

export const cardUpdateRaise = (
  resouceData: Resource[],
  type: string,
  cardUpdates: ForgeReq[]
): ForgeReq[] => {
  const toUpdate = cardUpdates.find((f: ForgeReq) => f.itemType === type);
  if (!toUpdate) throw new Error(`Can't find spell type ${type} to update`);
  const index = cardUpdates.indexOf(toUpdate);
  const newUpdates: [resourceType, number][] = toUpdate.updates.map(
    (s: [resourceType, number]) => raiseUpdate(resouceData, s)
  );
  cardUpdates[index] = { ...toUpdate, updates: newUpdates };
  return cardUpdates;
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
  allNpcs: Character[],
  action: StoryAction
): CharacterNPC[] => {
  const npc = npcs.find((n: CharacterNPC) => action.id === n.id);
  if (action.data === undefined) {
    throw new Error("NPC dialogue data to change is invalid");
  }
  if (!npc) {
    const npcToAdd = allNpcs.find((n: Character) => action.id === n.id);
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
  heroes: Character[],
  allHeroes: Character[],
  action: StoryAction
) => {
  const hero = allHeroes.find((h: Character) => action.id === h.id);
  if (!hero || heroes.indexOf(hero) !== -1) {
    throw new Error(`Can't add a hero ${action.id}`);
  }
  heroes.push(hero);
  return heroes;
};

const updatePlayerCards = (
  spells: Spell[],
  allSpells: Spell[],
  action: StoryAction
) => {
  const spellsToAdd = allSpells.filter((s: Spell) => s.element === action.data);
  const newSpells = spells.concat(spellsToAdd);
  return newSpells;
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
  if (res == null || res === -1) throw new Error(`No story to update ${res}`);
  return [storyGroup, res];
};

export const finishStory = (
  game: GameState,
  actions: StoryAction[]
): Player => {
  actions.map((a: StoryAction) => console.log("Action", a));
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
        player.heroes = updatePlayerHeroes(player.heroes, game.heroes, action);
        player.cards = updatePlayerCards(player.cards, game.cards, action);
        break;
      default:
        throw new Error("Unknown action is called in finishing story");
    }
  }
  return player;
};
