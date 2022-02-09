import {
  ISpell,
  IStoryGroup,
  IStory,
  IDialogue,
  IHero,
  IReel,
  IFight,
  ISpellUpdate,
  IStoryAction,
  herosSelectionError,
  IResource,
  ISpellUpdateResource,
  IPlayerResource,
} from "./types";

//@ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const unique = (arrArg: any[]) =>
  arrArg.filter(
    (elem: any, pos: number, arr: any) => arr.indexOf(elem) === pos
  );

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const removeFromArray = (arrArg: any[], item: any) => {
  const stringifiedArray = arrArg.map((a: any) => JSON.stringify(a));
  const index = stringifiedArray.indexOf(JSON.stringify(item));
  if (!item || index === -1)
    throw new Error("Can't find the item to remove from array");
  arrArg.splice(index, 1);
  return arrArg;
};

export const removePlayedCard = (cards: ISpell[], index: number): ISpell[] => {
  cards.splice(index, 1);
  return cards;
};

export const sortByKey = (array: any) => {
  return array.sort((a: any, b: any) => (a.character > b.character ? 1 : -1));
};

export const generateInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

export const findLastOpenStory = (storyGroup: IStoryGroup[]) => {
  const res = storyGroup.findIndex((g: IStoryGroup, i: number) => {
    return g.stories.some((s: IStory) => s.open === false);
  });
  return res;
};

export const findDialogue = (dialogues: IDialogue[], dialId: string | null) => {
  if (dialId == null)
    throw new Error(`Trying to find a dialogue for inactive character`);
  const res = dialogues.find((d: IDialogue) => d.id === dialId);
  if (!res) throw new Error(`Couldn't find a dialogue ${dialId}`);
  return res;
};

export const findStory = (groups: IStoryGroup[], id: string) => {
  let res: IStory | null = null;
  for (let i = 0; i < groups.length; i++) {
    res = groups[i].stories.find((s: IStory) => s.id === id) || null;
    if (res) break;
  }
  if (!res) throw new Error(`Couldn't find a story ${id}`);
  return res;
};

export const findResource = (
  resources: IResource[] | IPlayerResource[],
  s: ISpellUpdateResource
) => {
  const resource = resources.find((r: IResource) => r.id === s[0]);
  if (!resource) throw new Error("Can't find a resource to display");
  return resource;
};

export const findOwnedResource = (
  resources: IPlayerResource[],
  s: ISpellUpdateResource
) => {
  const resource = resources.find((r: IPlayerResource) => r.id === s[0]);
  if (!resource) throw new Error("Can't find a resource to display");
  return resource;
};

export const checkFightCharactersIds = (
  fightheroes: string[],
  playerheroes: string[]
): herosSelectionError => {
  // console.log(fightheroes);
  // console.log(playerheroes);
  if (playerheroes.length === 0) {
    return "none";
  }
  if (fightheroes.length > playerheroes.length) {
    return "less";
  }
  if (fightheroes.length < playerheroes.length) {
    return "more";
  }
  const anyHeroes = fightheroes.filter((s: string) => s === "any");
  if (
    anyHeroes.length === 0 &&
    JSON.stringify(fightheroes.sort()) !== JSON.stringify(playerheroes.sort())
  ) {
    return "incorrect";
  }
  if (anyHeroes.length > 0) {
    const needed = fightheroes.filter((s: string) => s !== "any");
    const res = needed
      .map((s: string) => playerheroes.indexOf(s) === -1)
      .some((b: boolean) => b);
    if (res) return "incorrect";
    return null;
  }
  return null;
};

export const filterActiveCharacters = (heroes: IHero[]) => {
  return heroes.filter((c: IHero) => c.selected === true);
};

export const findActiveCharacters = (heroes: IHero[]) => {
  if (heroes.length < 3) {
    throw new Error("Issues with heroes");
  }
  const active = heroes.filter((c: IHero) => c.selected === true);
  let i = 0;
  while (active.length < 3) {
    if (!heroes[i].selected) {
      active.push(heroes[i]);
    }
    i++;
  }
  return active;
};

export const findRequiredCharacters = (
  heroes: string[],
  allHeroes: IHero[]
): IHero[] => {
  const res: IHero[] = heroes
    .map((s: string) => (s !== "any" ? findCharacter(allHeroes, s) : null))
    .filter((h: IHero | null) => h !== null) as IHero[];
  return res;
};

export const findReel = (all: IReel[], id: string) => {
  const res = all.find((c: IReel) => c.id === id);
  if (!res) throw new Error(`Couldn't find a reel ${id}`);
  return res;
};

export const findFight = (all: IFight[], id: string) => {
  const res = all.find((c: IFight) => c.id === id);
  if (!res) throw new Error(`Couldn't find a fight ${id}`);
  return res;
};

export const findStoryCharacters = (
  heroes: string[],
  allHeroes: IHero[]
): IHero[] => {
  const active = allHeroes.filter((c: IHero) => c.selected === true);
  const res: IHero[] = findRequiredCharacters(heroes, allHeroes);
  if (res.length < heroes.length) {
    const addHeroes = heroes.length - res.length;
    res.concat(active.slice(0, addHeroes));
  }
  //allHeroes.filter((s: Hero) => heroes.indexOf(s.id) !== -1);
  return res;
};

export const findCharacter = (characters: IHero[], charId: string) => {
  const res = characters.find((c: IHero) => c.id === charId);
  if (!res) throw new Error(`Couldn't find a character ${charId}`);
  return res;
};

export const findUpdate = (updates: ISpellUpdate[], updateId: string) => {
  const res = updates.find((u: ISpellUpdate) => u.id === updateId);
  if (!res) throw new Error(`Couldn't find an update ${updateId}`);
  return res;
};

export const isValidAction = (actions: IStoryAction[]) => {
  if (actions.length === 0) {
    return false;
  }
  // You can't addHero and addUpdate in one scene
  const addHeroAction = actions.filter(
    (a: IStoryAction) => a.type === "addHero"
  );
  const addUpdateAction = actions.filter(
    (a: IStoryAction) => a.type === "addUpdate"
  );
  if (addHeroAction.length > 0 && addUpdateAction.length > 0) {
    throw new Error("You can't addHero and addUpdate in one scene");
  }
  if (addHeroAction.length > 1) {
    throw new Error("Trying to add more than 1 hero");
  }
  if (addUpdateAction.length > 1)
    throw new Error("Trying to add more than 1 update");

  return true;
};

export const shuffle = (array: any) => array.sort(() => Math.random() - 0.5);
