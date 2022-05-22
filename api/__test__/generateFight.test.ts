import { generateFight } from "../engine/actions";
import { testGameData, testPlayer } from "./testdata";

test("Generates fight correctly", () => {
  const selectedSpells = [
    { spell: 0, copy: 0 },
    { spell: 0, copy: 1 },
    { spell: 0, copy: 2 },
    { spell: 1, copy: 0 },
    { spell: 1, copy: 1 },
    { spell: 2, copy: 0 },
    { spell: 3, copy: 0 },
    { spell: 3, copy: 1 },
    { spell: 3, copy: 2 },
    { spell: 4, copy: 0 },
  ];
  const selectedHeroes = [0, 1];
  const res = generateFight(
    testGameData,
    testPlayer,
    0,
    1,
    selectedHeroes,
    selectedSpells,
    1
  );
  expect(res.heroes.length).toBe(2);
  expect(res.heroes[0].id).toBe(0);
  expect(res.heroes[1].id).toBe(1);
});

test("Changes to predefined heroes if they were not selected", () => {
  const selectedSpells = [
    { spell: 0, copy: 0 },
    { spell: 0, copy: 1 },
    { spell: 0, copy: 2 },
    { spell: 1, copy: 0 },
    { spell: 1, copy: 1 },
    { spell: 2, copy: 0 },
    { spell: 3, copy: 0 },
    { spell: 3, copy: 1 },
    { spell: 3, copy: 2 },
    { spell: 4, copy: 0 },
  ];
  const selectedHeroes = [1, 2];
  const res = generateFight(
    testGameData,
    testPlayer,
    0,
    1,
    selectedHeroes,
    selectedSpells,
    1
  );
  expect(res.heroes.length).toBe(2);
  expect(res.heroes[0].id).toBe(1);
  expect(res.heroes[1].id).toBe(2);
  console.log(res);
});
