import {
  unique,
  removeFromArray,
  shuffle,
  findLastOpenStory,
  findActiveCharacters,
} from "../utils/helpers";

import { Character, StoryGroup } from "../utils/types";

test("Unique function returns correctly", () => {
  const array1 = [1, 2, 3, 4];
  const array2 = [1, 2, 2, 3, 4];
  expect(unique(array1)).toEqual(array1);
  expect(unique(array2)).toEqual(array1);
});

test("Remove from array function returns correctly", () => {
  const array1 = [1, 2, 3, 4];
  expect(removeFromArray(array1, 1)).toEqual([2, 3, 4]);
});

test("Shuffle function returns correctly", () => {
  const array1 = [1, 2, 3, 4];
  expect(shuffle(array1)).not.toEqual([2, 3, 4]);
});

test("Find the correct next open story in group", () => {
  const storyExample = { id: "", type: "fight" as "fight", image: "" };
  const groups: StoryGroup[] = [];
  [1, 2, 3, 4].forEach((i: number) =>
    groups.push({
      group: i,
      stories: [
        { ...storyExample, open: true },
        { ...storyExample, open: true },
        { ...storyExample, open: true },
      ],
    })
  );
  groups[3].stories[2].open = false;
  expect(findLastOpenStory(groups)).toEqual(3);
  groups[3].stories[2].open = true;
  groups[1].stories[1].open = false;
  expect(findLastOpenStory(groups)).toEqual(1);
});

test("Finds correct characters to be active", () => {
  const heroes3active: Character[] = [];
  [true, true, true, false, false].map((b: boolean, i: number) =>
    heroes3active.push({
      id: "hero" + i,
      name: "hero" + i,
      image: "",
      selected: b,
    })
  );
  expect(findActiveCharacters(heroes3active)).toEqual([
    "hero0",
    "hero1",
    "hero2",
  ]);

  const heroes2active: Character[] = [];
  [false, true, true, false, false].map((b: boolean, i: number) =>
    heroes2active.push({
      id: "hero" + i,
      name: "hero" + i,
      image: "",
      selected: b,
    })
  );
  expect(findActiveCharacters(heroes2active)).toEqual([
    "hero1",
    "hero2",
    "hero0",
  ]);

  const heroesNoactive: Character[] = [];
  [false, false, false, false, false].map((b: boolean, i: number) =>
    heroesNoactive.push({
      id: "hero" + i,
      name: "hero" + i,
      image: "",
      selected: b,
    })
  );
  expect(findActiveCharacters(heroesNoactive)).toEqual([
    "hero0",
    "hero1",
    "hero2",
  ]);
});
