import { generateInt } from "../src/utils/helpers";
import {
  ISpellUpdateResource,
  IStoryAction,
  storyChangeType,
} from "../src/utils/types";
import { EnemyCardDB, SpellDB } from "./db_types";

export const getCharacters = (characters: string) => {
  const newCharacters = characters.split(", ");
  return newCharacters.map((c: string) => c.trim());
};

export const getStoryActions = (actions: string, nextStory: string) => {
  // Actions in DB are separated by coma and a new line
  const act = actions.split(",\n");
  const res = act.map((a: string) => {
    const details = a.split(", ");
    return {
      type: details[0] as storyChangeType,
      id: details[1],
      data: details.length > 2 ? details[2] : undefined,
    };
  });
  let all: IStoryAction[] = [
    { type: "openStory", id: "story", data: nextStory },
  ];
  if (res[0].type) {
    all = all.concat(res);
  }
  return all;
};

export const getHeroInitialSpellSet = (db: SpellDB[]) => {
  const spells = [];
  for (let x = 0; x < db.length; x++) {
    const card = db[x];
    if (parseInt(card.strength) === 1) {
      [0, 1, 2].map((i: number) => spells.push(card));
    } else if (parseInt(card.strength) === 2) {
      [0, 1].map((j: number) => spells.push(card));
    } else {
      spells.push(card);
    }
  }
  return spells;
};

export const getResourceSet = (data: string): ISpellUpdateResource[] => {
  const res: ISpellUpdateResource[] = [];
  const allResources = data.split(", ");
  allResources.forEach((resource: string) => {
    const price = resource.split(": ");
    res.push([price[0], parseInt(price[1])]);
  });
  return res;
};

export const getSpellSet = (set: EnemyCardDB[], life: number) => {
  const spells = [];
  for (let x = 0; x < life; x++) {
    const card = set[generateInt(set.length)];
    spells.push(card);
  }
  return spells;
};
