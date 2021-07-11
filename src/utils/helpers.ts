import { Character, Dialogue, Story, StoryGroup } from "./types";

//@ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const unique = (arrArg: any[]) =>
  arrArg.filter(
    (elem: any, pos: number, arr: any) => arr.indexOf(elem) === pos
  );

export const removeFromArray = (arrArg: any[], item: any) => {
  const index = arrArg.indexOf(item);
  if (!item) console.warn("Array does not contain the element");
  if (index > -1) {
    arrArg.splice(index, 1);
  }
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

export const findDialogue = (dialogues: Dialogue[], dialId: string) => {
  const res = dialogues.find((d: Dialogue) => d.id === dialId);
  if (!res) throw new Error(`Couldn't find a dialogue ${dialId}`);
  return res;
};

export const findCharacter = (characters: Character[], charId: string) => {
  const res = characters.find((c: Character) => c.id === charId);
  if (!res) throw new Error(`Couldn't find a character ${charId}`);
  return res;
};
export const shuffle = (array: any) => array.sort(() => Math.random() - 0.5);
