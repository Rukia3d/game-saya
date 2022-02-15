import {
  combineAdventures,
  combineCharacters,
  combineHeroes,
  combineResources,
  combineSpells,
  combineUpdates,
} from "../engine/combiners";
import { IStory, IUpdate } from "../storage/types";
import {
  testAdventures,
  testCharacters,
  testHeroes,
  testPlayerAdventures,
  testPlayerCharacters,
  testPlayerHeroes,
  testPlayerResources,
  testPlayerSpells,
  testPlayerUpdates,
  testResources,
  testSpells,
  testUpdates,
} from "./testdata";

test("Adventures transformed into correct types", () => {
  const res = combineAdventures(testAdventures, testPlayerAdventures);
  expect(res[0].stories?.length).toEqual(3);
  expect(res[1].stories).toEqual(null);
  expect(res[2].stories?.length).toEqual(3);
  const stories = res[0].stories as IStory[];
  expect(stories[0].open).toBeTruthy();
  expect(stories[1].open).toBeTruthy();
  expect(stories[2].open).not.toBeTruthy();
});

test("Heroes transformed into correct types", () => {
  const res = combineHeroes(testHeroes, testPlayerHeroes);
  expect(res[0].selected).toBeTruthy();
  expect(res[0].name).toEqual("nell");
  expect(res[0].element.id).toEqual(0);
  expect(res[0].element.name).toEqual("red");
  expect(res[0].element.school.name).toEqual("oblation");
  expect(res[1].selected).toBeTruthy();
  expect(res[1].name).toEqual("gabriel");
  expect(res[2].selected).toBeFalsy();
  expect(res[2].name).toEqual("grey");
});

test("Characters transformed into correct types", () => {
  const res = combineCharacters(testCharacters, testPlayerCharacters);
  expect(res[0].dialogue_id).toEqual(0);
  expect(res[1].dialogue_id).toEqual(1);
});

test("Spells transformed into correct types", () => {
  const res = combineSpells(testSpells, testUpdates, testPlayerSpells);
  expect(res[0].id).toEqual(0);
  expect(res[0].name).toEqual("redHit1");
  expect(res[0].copy_id).toEqual(0);
  expect(res[0].element.id).toEqual(0);
  expect(res[0].element.name).toEqual("red");
  expect(res[0].element.school.name).toEqual("oblation");
  expect(res[0].updates.length).toEqual(0);
  expect(res[1].updates.length).toEqual(1);
  const update = res[1].updates[0] as IUpdate;
  expect(update.name).toEqual("oblation2");
  expect(update.school.name).toEqual("oblation");
  expect(update.actions[0].type).toEqual("addNpc");
  expect(update.actions[0].item).toEqual("nell");
});

test("Updates transformed into correct types", () => {
  const res = combineUpdates(testUpdates, testPlayerUpdates);
  expect(res[0].id).toEqual(0);
  expect(res[0].name).toEqual("oblation1");
  expect(res[0].resource_base.length).toEqual(3);
  expect(res[0].resource_base[0].name).toEqual("someRed");
  expect(res[0].resource_base[0].school.name).toEqual("oblation");
  expect(res[0].resource_base[0].base_quantity).toEqual(5);
});

test("resources transformed into correct types", () => {
  const res = combineResources(testResources, testPlayerResources);
  expect(res[0].id).toEqual(0);
  expect(res[0].name).toEqual("someRed");
  expect(res[0].school.name).toEqual("oblation");
  expect(res[0].commonality).toEqual(3);
  expect(res[0].quantity).toEqual(10);
});
