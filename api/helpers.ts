import { effectValue, storyChangeType } from "../src/utils/types";

export const getStoryCharacters = (characters: string) => {
  // Characters in DB are two names separated by coma
  return characters.split(", ");
};

export const getStoryActions = (actions: string) => {
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
  return res;
};

export const getSpellEffect = (effect: string): [effectValue, number] => {
  const eff = effect.split(",");
  return [eff[0] as effectValue, parseInt(eff[1])];
};
