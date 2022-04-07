import { addSpells } from "../engine/actions";
import { testPlayerSpells, testSpells } from "./testdata";

test("addSpells adds several spells if player has no spells", () => {
  const res = addSpells(null, testSpells, [1, 2]);
  expect(res.length).toBe(2);
  expect(res[0].id).toEqual(1);
  expect(res[0].copy_id).toEqual(0);
  expect(res[0].expires_at).toEqual(null);
  expect(res[1].id).toEqual(2);
  expect(res[1].copy_id).toEqual(0);
  expect(res[1].expires_at).toEqual(null);
});

test("addSpell adds several new spells correctly", () => {
  const newPlayerSpells = JSON.parse(
    JSON.stringify(testPlayerSpells.slice(0, 3))
  );
  newPlayerSpells[0].id = 5;
  newPlayerSpells[1].id = 6;
  newPlayerSpells[2].id = 7;
  const res = addSpells(newPlayerSpells, testSpells, [1]);
  expect(res.length).toBe(4);
  expect(res[3].id).toEqual(1);
});

test("addSpell adds a spell with a new copy_id", () => {
  const newPlayerSpells = JSON.parse(
    JSON.stringify(testPlayerSpells.slice(0, 3))
  );
  newPlayerSpells[2].copy_id = 0;
  const res = addSpells(newPlayerSpells, testSpells, [2]);
  expect(res.length).toBe(4);
  expect(res[3].id).toEqual(2);
  expect(res[3].copy_id).toEqual(1);
});

test("addSpell adds a spell with a new copy_id if several copies exists", () => {
  const newPlayerSpells = JSON.parse(
    JSON.stringify(testPlayerSpells.slice(0, 3))
  );
  newPlayerSpells[2].copy_id = 0;
  newPlayerSpells.push({ ...newPlayerSpells[2], copy_id: 4 });
  const res = addSpells(newPlayerSpells, testSpells, [2]);
  expect(res.length).toBe(5);
  expect(res[4].id).toEqual(2);
  expect(res[4].copy_id).toEqual(5);
});

test("addSpell adds several spells with the expiration date", () => {
  const res = addSpells(null, testSpells, [1, 2], new Date("10-10-2030"));
  expect(res.length).toBe(2);
  expect(res[0].expires_at).not.toEqual(null);
  expect(res[1].expires_at).not.toEqual(null);
});

test("addSpell trhows an error if spell id doesn't exist", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => addSpells(null, testSpells, [8])).toThrow(
    "Can't find a spell 8 in spells database"
  );
  jest.restoreAllMocks();
});
