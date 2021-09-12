import { enemyToNumber } from "./gamelogic";
import { shuffle } from "./helpers";
import { Enemy, OwnedResource, Player, Resource } from "./types";

export const givePlayerResources = (player: Player, resources: Resource[]) => {
  const existingResources = player.resources;
  resources.forEach((r: Resource) => {
    const playerRes = player.resources.find(
      (o: OwnedResource) => o.id === r.id
    );
    if (!playerRes) {
      player.resources.push({ ...r, quantity: 1 });
    } else {
      const playerResIndex = existingResources.indexOf(playerRes);
      existingResources[playerResIndex].quantity++;
    }
  });
  return existingResources;
};

const generateSingleRewards = (resources: Resource[]) => {
  const allRewards: Resource[] = [];
  resources.forEach((r: Resource) => {
    for (let i = 0; i < r.commonality; i++) {
      allRewards.push({
        id: r.id,
        name: r.name,
        image: r.image,
        commonality: r.commonality,
      });
    }
  });
  const res = shuffle(allRewards)[0];
  return res;
};

export const generateReward = (enemy: Enemy, resources: Resource[]) => {
  const rewards = [];
  const max = enemyToNumber(enemy);
  for (let i = 0; i < max; i++) {
    rewards.push(generateSingleRewards(resources));
  }
  //console.log("generateReward", rewards);
  return rewards;
};

const removeResource = (r: OwnedResource, toRemove: [string, number][]) => {
  const removable = toRemove.find((t: [string, number]) => t[0] === r.id);
  if (!removable) return { ...r };

  const newQuantity = r.quantity - removable[1];
  if (newQuantity < 0) throw new Error("Cant have negative resource");
  return { ...r, quantity: r.quantity - removable[1] };
};

export const removeResources = (
  cardRequirements: any,
  resources: OwnedResource[]
): OwnedResource[] => {
  const newRes = resources.map((r: OwnedResource) =>
    removeResource(r, cardRequirements.updates)
  );
  return newRes;
};
