import {
  unique,
  removeFromArray,
  shuffle,
  findLastOpenStory,
  findActiveCharacters,
  findCardRequirements,
  achievedUpdate,
} from "../utils/helpers";
import { baseCards15, gameState } from "../utils/testobjects";

import { Character, ForgeReq, StoryGroup } from "../utils/types";

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

test("Find the correct requirements for forgin a card", () => {
  const req: ForgeReq[] = [];
  [1, 2, 3, 4].forEach((i: number) =>
    req.push({
      itemType: "base_hit" + i,
      updates: [
        ["gold", 5],
        ["silk", 3],
      ],
    })
  );
  const card = { ...baseCards15[0], type: "base_hit1" };
  const res = findCardRequirements(req, card);
  expect(res.itemType).toEqual("base_hit1");
});

test("Find if this card is ready for an update", () => {
  const ownedResources = gameState.player.resources;
  const requiredResources: [string, number][] = [
    ["gold", 2],
    ["iron", 5],
  ];
  const requiredResources2: [string, number][] = [
    ["gold", 5],
    ["iron", 5],
  ];
  const res1 = achievedUpdate(ownedResources, requiredResources);
  const res2 = achievedUpdate(ownedResources, requiredResources2);
  expect(res1).toBeTruthy();
  expect(res2).not.toBeTruthy();
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
