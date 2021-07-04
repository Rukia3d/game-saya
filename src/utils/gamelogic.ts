import { shuffle } from "./helpers";
import {
  Card,
  Enemy,
  FightState,
  OwnedResource,
  Player,
  Resource,
  Spell,
} from "./types";
const rewardData = require("../data/rewards.json");

export const generateDeck = (
  characters: string[],
  playerCards: Card[]
): Spell[] => {
  const heroSpells: Spell[] = [];
  playerCards.forEach((c: Card) => {
    for (let i = 0; i < c.quantity; i++) {
      if (c.character && characters.indexOf(c.character) === -1) {
        return;
      }
      heroSpells.push({
        id: c.id,
        name: c.name,
        strength: c.strength,
        character: c.character,
        element: c.element,
        owner: "hero",
      });
    }
  });
  return heroSpells;
};

export const generateEnemyDeck = (enemy: Enemy): Spell[] => {
  const enemySpells: Spell[] = [];
  enemy.cards.forEach((c: Card) => {
    for (let i = 0; i < c.quantity; i++) {
      enemySpells.push({
        id: c.id,
        name: c.name,
        strength: c.strength,
        character: c.character,
        element: c.element,
        owner: "enemy",
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
    lifes: player.lifes - 1,
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
