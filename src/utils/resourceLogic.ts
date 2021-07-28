import { enemyToNumber } from "./gamelogic";
import { shuffle } from "./helpers";
import { gameState } from "./testobjects";
import {
  Enemy,
  ForgeReq,
  OwnedResource,
  Player,
  Resource,
  resourceType,
} from "./types";

export const givePlayerResources = (player: Player, resources: Resource[]) => {
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

const generateSingleRewards = () => {
  const allRewards: Resource[] = [];
  gameState.resources.forEach((r: Resource) => {
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

const removeResource = (
  r: OwnedResource,
  toRemove: [resourceType, number][]
) => {
  const removable = toRemove.find((t: [resourceType, number]) => t[0] === r.id);
  if (!removable) return { ...r };

  const newQuantity = r.quantity - removable[1];
  if (newQuantity < 0) throw new Error("Cant have negative resource");
  return { ...r, quantity: r.quantity - removable[1] };
};

export const removeResources = (
  cardRequirements: ForgeReq,
  resources: OwnedResource[]
): OwnedResource[] => {
  const newRes = resources.map((r: OwnedResource) =>
    removeResource(r, cardRequirements.updates)
  );
  return newRes;
};
