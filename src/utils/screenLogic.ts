import { findCharacter, findUpdate } from "./helpers";
import { IHero, IPlayerHero, ISpellUpdate, IStoryAction } from "./types";

export const displayAddedHero = (
  playerHeroes: IPlayerHero[],
  allHeroes: IHero[],
  actions: IStoryAction[],
  setAdditionScreen: (s: null | IHero | ISpellUpdate) => void
) => {
  //{type: "addHero", id: "nell", data: "fire"}
  const addingHero = actions.filter((a: IStoryAction) => a.type === "addHero");
  if (addingHero.length === 1) {
    const action = addingHero[0];
    if (!action.id)
      throw new Error("Update action is missing data - hero name");
    if (!action.data)
      throw new Error("Update action is missing data - hero element");
    const hero = findCharacter(allHeroes, action.id);
    const res = playerHeroes.find((a: IPlayerHero) => hero.id === a.id);
    if (res) {
      console.warn(`Trying to add the same ${action.id} hero again`);
      return;
    }
    setAdditionScreen(hero);
  }
};

export const displayAddedUpdate = (
  playerUpdates: ISpellUpdate[],
  allUpdates: ISpellUpdate[],
  actions: IStoryAction[],
  setAdditionScreen: (s: null | IHero | ISpellUpdate) => void
) => {
  // {type: "addUpdate", id: "earth", data: "earth_2"}
  const addingUpdate = actions.filter(
    (a: IStoryAction) => a.type === "addUpdate"
  );
  if (addingUpdate.length === 1) {
    const action = addingUpdate[0];
    if (!action.data)
      throw new Error("Update action is missing data - update name");
    if (!action.id)
      throw new Error("Update action is missing data - update element");
    const update = findUpdate(allUpdates, action.data);

    const res = playerUpdates.indexOf(update);
    if (res !== -1) {
      console.warn(`Trying to add the same ${action.id} update again`);
      return;
    }
    setAdditionScreen(update);
  }
};
