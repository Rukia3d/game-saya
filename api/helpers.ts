import { effectValue, trumpValue } from "../src/utils/types";

export const getStoryCharacters = (characters: string) => {
  // Characters in DB are two names separated by coma
  return characters.split(", ");
};

export const getStoryActions = (actions: string) => {
  // Actions in DB are separated by coma and a new line
  const act = actions.split(",\n");
  return act.map((a: any) => JSON.parse(a));
};

export const getSpellEffect = (effect: string): [effectValue, number] => {
  const eff = effect.split(",");
  return [eff[0] as effectValue, parseInt(eff[1])];
};

export const getSpellTrump = (trump: string): [trumpValue, number] => {
  const tr = trump.split(",");
  return [tr[0] as trumpValue, parseInt(tr[1])];
};
