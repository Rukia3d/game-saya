import { findCharacter, findUpdate } from "./helpers";
import { Hero, SpellUpdate, StoryAction } from "./types";

export const displayAddedHero = (
  allHeroes: Hero[],
  actions: StoryAction[],
  setAdditionScreen: (s: null | Hero | SpellUpdate) => void
) => {
  const addingHero = actions.filter((a: StoryAction) => a.type === "addHero");
  if (addingHero.length === 1) {
    const action = addingHero[0];
    const hero = findCharacter(allHeroes, action.id);
    setAdditionScreen(hero);
  }
};

export const displayAddedUpdate = (
  allUpdates: SpellUpdate[],
  actions: StoryAction[],
  setAdditionScreen: (s: null | Hero | SpellUpdate) => void
) => {
  const addingUpdate = actions.filter(
    (a: StoryAction) => a.type === "addUpdate"
  );
  if (addingUpdate.length === 1) {
    const action = addingUpdate[0];
    if (!action.data) throw new Error("Update action is missing data");
    const update = findUpdate(allUpdates, action.data);
    setAdditionScreen(update);
  }
};
