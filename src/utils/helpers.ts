import {
  Dialogue,
  Story,
  StoryGroup,
  Hero,
  SpellUpdate,
  StoryAction,
} from "./types";

//@ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const unique = (arrArg: any[]) =>
  arrArg.filter(
    (elem: any, pos: number, arr: any) => arr.indexOf(elem) === pos
  );

export const removeFromArray = (arrArg: any[], item: any) => {
  const index = arrArg.indexOf(item);
  if (!item || index === -1)
    throw new Error("Can't find the item to remove from array");
  arrArg.splice(index, 1);
  return arrArg;
};

export const sortByKey = (array: any) => {
  return array.sort((a: any, b: any) => (a.character > b.character ? 1 : -1));
};

export const generateInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

export const findLastOpenStory = (storyGroup: StoryGroup[]) => {
  const res = storyGroup.findIndex((g: StoryGroup, i: number) => {
    return g.stories.some((s: Story) => s.open === false);
  });
  return res;
};

export const findDialogue = (dialogues: Dialogue[], dialId: string | null) => {
  if (dialId == null)
    throw new Error(`Trying to find a dialogue for inactive character`);
  const res = dialogues.find((d: Dialogue) => d.id === dialId);
  if (!res) throw new Error(`Couldn't find a dialogue ${dialId}`);
  return res;
};

export const findActiveCharacters = (heroes: Hero[]) => {
  if (heroes.length < 3) {
    throw new Error("Issues with heroes");
  }
  const active = heroes.filter((c: Hero) => c.selected === true);
  let i = 0;
  while (active.length < 3) {
    if (!heroes[i].selected) {
      active.push(heroes[i]);
    }
    i++;
  }
  return active;
};

export const findStoryCharacters = (heroes: string[], allHeroes: Hero[]) => {
  const res = allHeroes.filter((s: Hero) => heroes.indexOf(s.id) !== -1);
  return res;
};

export const findCharacter = (characters: Hero[], charId: string) => {
  const res = characters.find((c: Hero) => c.id === charId);
  if (!res) throw new Error(`Couldn't find a character ${charId}`);
  return res;
};

export const findUpdate = (updates: SpellUpdate[], updateId: string) => {
  const res = updates.find((u: SpellUpdate) => u.id === updateId);
  if (!res) throw new Error(`Couldn't find an update ${updateId}`);
  return res;
};

export const isValidAction = (actions: StoryAction[]) => {
  // You can't addHero and addUpdate in one scene
  const addHeroAction = actions.filter(
    (a: StoryAction) => a.type === "addHero"
  );
  const addUpdateAction = actions.filter(
    (a: StoryAction) => a.type === "addUpdate"
  );
  if (addHeroAction.length > 0 && addUpdateAction.length > 0) {
    throw new Error("You can't addHero and addUpdate in one scene");
  }
  if (addHeroAction.length > 1) {
    throw new Error("Trying to add more than 1 hero");
  }
  if (addUpdateAction.length > 1)
    throw new Error("Trying to add more than 1 update");
};

export const shuffle = (array: any) => array.sort(() => Math.random() - 0.5);
