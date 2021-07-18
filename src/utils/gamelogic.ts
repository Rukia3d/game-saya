import { removeFromArray, shuffle } from "./helpers";
import {
  Enemy,
  FightState,
  OwnedResource,
  Player,
  Resource,
  Spell,
  element,
} from "./types";
const rewardData = require("../data/rewards.json");

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
    for (let i = 0; i < c.quantity; i++) {
      if (c.character && characters.indexOf(c.character) === -1) {
        return;
      }
      heroSpells.push({
        id: c.id,
        image: c.image,
        name: c.name,
        quantity: c.quantity,
        strength: c.strength,
        character: c.character,
        element: c.element,
        owner: "hero",
        selected: c.selected,
      });
    }
  });
  return heroSpells;
};

export const generateEnemyDeck = (enemy: Enemy): Spell[] => {
  const enemySpells: Spell[] = [];
  enemy.cards.forEach((c: Spell) => {
    for (let i = 0; i < c.quantity; i++) {
      enemySpells.push({
        id: c.id,
        image: c.image,
        name: c.name,
        strength: c.strength,
        character: c.character,
        element: c.element,
        owner: "enemy",
        quantity: c.quantity,
        selected: true,
      });
    }
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

const generateSingleRewards = () => {
  const allRewards: Resource[] = [];
  rewardData.resources.forEach((r: Resource) => {
    for (let i = 0; i < r.commonality; i++) {
      allRewards.push({
        id: r.id,
        name: r.name,
        image: r.image,
        commonality: r.commonality,
      });
    }
  });
  return shuffle(allRewards)[0];
};
export const generateReward = (enemy: Enemy) => {
  const rewards = [];
  const max = enemyToNumber(enemy);
  for (let i = 0; i < max; i++) {
    rewards.push(generateSingleRewards());
  }
  return rewards;
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

const givePlayerResources = (player: Player, resources: Resource[]) => {
  const existingResources = player.resources;
  resources.forEach((r: Resource) => {
    const playerRes = player.resources.find(
      (o: OwnedResource) => o.id === r.id
    );
    if (!playerRes) throw new Error("Can't find resource you want to give me");
    const playerResIndex = existingResources.indexOf(playerRes);
    existingResources[playerResIndex].quantity++;
  });
  return existingResources;
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

const getNextElement = (
  elements: element[],
  element: element | null
): element | null => {
  if (element == null) return null;
  const index = elements.indexOf(element);
  if (index === -1)
    throw new Error("Can't find the element to give you the next one");
  if (index === elements.length - 1) {
    return elements[0];
  }
  return elements[index + 1];
};

const trumpAttack = (
  baseHealth: number,
  element: element,
  heroCard: Spell,
  enemyCard: Spell
): number => {
  // Trump logic
  if (element === enemyCard.element && element !== heroCard.element) {
    // enemy has the trump, hero doesn't - all damage applies
    return baseHealth - enemyCard.strength;
  }
  if (element === enemyCard.element && element === heroCard.element) {
    // enemy has the trump, hero has the trump, the damage negates for the strength of hero card (same as non-trump)
    if (heroCard.strength <= enemyCard.strength) {
      return baseHealth - enemyCard.strength + heroCard.strength;
    }
  }
  // enemy doesn't have the trump, hero has, all damage negates
  return baseHealth;
};

export const enemyAttack = (
  fightState: FightState,
  heroCard: Spell,
  enemyCard: Spell
) => {
  // Update cards state
  const [newDeck, newDrop] = updateHeroDeck(fightState, heroCard);
  const newHeroHand = removeFromArray(fightState.heroHand, heroCard);
  const newCard = newDeck.shift();
  newHeroHand.push(newCard);
  const enemyDrop = fightState.enemyDrop.concat([enemyCard]);
  const enemyDeck = fightState.enemyDeck.splice(1);
  let newHeroHealth = fightState.hero.currentHealth;

  if (
    fightState.element &&
    (fightState.element === heroCard.element ||
      fightState.element === enemyCard.element)
  ) {
    // Trump logic
    newHeroHealth = trumpAttack(
      newHeroHealth,
      fightState.element,
      heroCard,
      enemyCard
    );
  } else {
    if (heroCard.strength <= enemyCard.strength) {
      newHeroHealth = newHeroHealth - enemyCard.strength;
    }
  }

  const heroNew = {
    ...fightState.hero,
    currentHealth: newHeroHealth,
  };
  const nextElement = getNextElement(fightState.elements, fightState.element);

  return {
    ...fightState,
    heroDeck: newDeck,
    heroDrop: newDrop,
    enemyDeck: enemyDeck,
    enemyDrop: enemyDrop,
    heroHand: newHeroHand,
    hero: heroNew,
    element: nextElement,
  };
};
