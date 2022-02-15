import { shuffle } from "./helpers";
import {
  Player,
  IResource,
  IPlayerResource,
  IEnemy,
  IPlayerSpellUpdate,
} from "./types";

export const updatePlayerResources = (
  player: Player,
  resources: IResource[]
) => {
  const existingResources = player.resources;
  resources.forEach((r: IResource) => {
    const playerRes = player.resources.find(
      (o: IPlayerResource) => o.id === r.id
    );
    if (!playerRes) {
      player.resources.push({ ...r, quantity: 1, created_at: new Date() });
    } else {
      const playerResIndex = existingResources.indexOf(playerRes);
      existingResources[playerResIndex].quantity++;
    }
  });
  return existingResources;
};

const generateSingleRewards = (resources: IResource[]) => {
  const allRewards: IResource[] = [];
  resources.forEach((r: IResource) => {
    for (let i = 0; i < r.commonality; i++) {
      allRewards.push({
        id: r.id,
        name: r.name,
        commonality: r.commonality,
        description: r.description,
        school: r.school,
      });
    }
  });
  const res = shuffle(allRewards)[0];
  return res;
};

export const generateReward = (
  enemy: IEnemy,
  resources: IResource[]
): IResource[] => {
  const DEFAULTMAXREWARD = 5;
  const rewards = [];
  const max = DEFAULTMAXREWARD;
  for (let i = 0; i < max; i++) {
    rewards.push(generateSingleRewards(resources));
  }
  //console.log("generateReward", rewards);
  return rewards;
};

const removeResource = (toRemove: number, resource: IPlayerResource) => {
  const newQuantity = resource.quantity - toRemove;
  if (newQuantity < 0) throw new Error("Cant have negative resource");
  return { ...resource, quantity: newQuantity };
};

export const removeResources = (
  req: IPlayerResource[],
  resources: IPlayerResource[]
): IPlayerResource[] => {
  const newRes = resources.map((r: IPlayerResource) => {
    const toRemove = req.find((t: IPlayerResource) => r.id === t.id);
    if (!toRemove)
      throw new Error("Trying to remove resource that is not owned");
    return removeResource(toRemove.quantity, r);
  });
  return newRes;
};
