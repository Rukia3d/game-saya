import { givePlayerResources } from "./resourceLogic";
import {
  Enemy,
  FightState,
  ForgeEffect,
  ForgeReq,
  Player,
  Resource,
  Spell,
} from "./types";
const forgeData = require("../data/forge.json");
const resouceData = require("../data/rewards.json");

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
    if (!c.selected) return;
    heroSpells.push({
      id: c.id,
      image: c.image,
      name: c.name,
      mana: c.mana,
      trump: c.trump,
      effect: c.effect,
      strength: c.strength,
      character: c.character,
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
      trump: c.trump,
      effect: c.effect,
      strength: c.strength,
      character: c.character,
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
    mana: player.mana - 1,
  };
};

const givePlayerExperience = (player: Player, enemy: Enemy) => {
  return {
    ...player,
    experience: player.experience + enemyToNumber(enemy) * 5,
  };
};

const updateCardParameter = (spell: Spell, effect: ForgeEffect): Spell => {
  spell[effect.parameter] = spell[effect.parameter] + effect.change;
  return spell;
};

const findUpdateEffect = (effect: string) => {
  const updateEffect = forgeData.find((f: ForgeEffect) => f.id === effect);
  if (!updateEffect) {
    throw new Error(`Can't find update effect ${effect}`);
  }
  return updateEffect;
};
export const updatedCards = (
  s: Spell,
  req: ForgeReq,
  all: Spell[]
): Spell[] => {
  const index = all.indexOf(s);
  if (index === -1) throw new Error(`Can't find spell ${s.id} to update`);
  const updateEffect = findUpdateEffect(req.effect);
  const newCard = updateCardParameter(s, updateEffect);

  all[index] = newCard;
  return all;
};

const raiseUpdate = (s: [string, number]): [string, number] => {
  const multiplier = resouceData.resources.find((r: Resource) => r.id === s[0]);
  if (!multiplier) throw new Error(`Can't find multiplier for ${s[0]}`);
  return [s[0], s[1] * multiplier];
};

export const cardUpdateRaise = (
  type: string,
  cardUpdates: ForgeReq[]
): ForgeReq[] => {
  const toUpdate = cardUpdates.find((f: ForgeReq) => f.itemType === type);
  if (!toUpdate) throw new Error(`Can't find spell type ${type} to update`);
  const index = cardUpdates.indexOf(toUpdate);
  const newUpdates = toUpdate.updates.map((s: [string, number]) =>
    raiseUpdate(s)
  );
  cardUpdates[index] = { ...toUpdate, updates: newUpdates };
  return cardUpdates;
};

export const updateWinPlayer = (
  player: Player,
  enemy: Enemy,
  resources: Resource[]
) => {
  const updatedPlayer = givePlayerExperience(player, enemy);
  return {
    ...updatedPlayer,
    resources: givePlayerResources(player, resources),
  };
};
