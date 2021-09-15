import { enemyToNumber } from "./gamelogic";
import { shuffle } from "./helpers";
import {
  Enemy,
  OwnedResource,
  Player,
  Resource,
  SpellUpdateResource,
} from "./types";

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

const removeResource = (
  toRemove: SpellUpdateResource[],
  toCheck: OwnedResource
) => {
  const removable = toRemove.find((t: [string, number]) => t[0] === toCheck.id);
  if (!removable) return { ...toCheck };

  const newQuantity = toCheck.quantity - removable[1];
  if (newQuantity < 0) throw new Error("Cant have negative resource");
  return { ...toCheck, quantity: toCheck.quantity - removable[1] };
};

export const removeResources = (
  req: SpellUpdateResource[],
  resources: OwnedResource[]
): OwnedResource[] => {
  const missedResource = req.some(
    (r: SpellUpdateResource) =>
      !resources.find((o: OwnedResource) => o.id === r[0])
  );
  if (missedResource) {
    throw new Error("Trying to remove resource that is not owned");
  }
  const newRes = resources.map((r: OwnedResource) => removeResource(req, r));
  return newRes;
};
