import { updateNPCs } from "../engine/actions";
import {
  testCharacters,
  testDialogues,
  testPlayerCharacters,
} from "./testdata";

test("updateNPC adds a new dialogue to the existing character", () => {
  const res = updateNPCs(testPlayerCharacters, testCharacters, testDialogues, [
    { npc_id: 0, dialogue_id: 3 },
    { npc_id: 1, dialogue_id: 1 },
  ]);
  expect(res[0].dialogue.id).toEqual(3);
  expect(res[1].dialogue.id).toEqual(1);
});

test("updateNPC adds a new character with a dialogue if none exist", () => {
  const res = updateNPCs(null, testCharacters, testDialogues, [
    { npc_id: 0, dialogue_id: 3 },
  ]);
  expect(res.length).toEqual(1);
  expect(res[0].dialogue.id).toEqual(3);
});

test("updateNPC adds a new character with a dialogue if it doesn't exist", () => {
  const res = updateNPCs(
    [testPlayerCharacters[0]],
    testCharacters,
    testDialogues,
    [
      { npc_id: 0, dialogue_id: 3 },
      { npc_id: 1, dialogue_id: 1 },
    ]
  );
  expect(res.length).toEqual(2);
  expect(res[0].dialogue.id).toEqual(3);
  expect(res[1].dialogue.id).toEqual(1);
});

test("updateNPC removes the character from dialogue if provided dialogue is null when several are provided", () => {
  const res = updateNPCs(
    [testPlayerCharacters[0], testPlayerCharacters[1]],
    testCharacters,
    testDialogues,
    [
      { npc_id: 1, dialogue_id: null },
      { npc_id: 0, dialogue_id: 3 },
    ]
  );
  expect(res.length).toEqual(1);
  expect(res[0].dialogue.id).toEqual(3);
});

test("updateNPC removes the character from dialogue if provided dialogue is null when only one is provided", () => {
  const res = updateNPCs(
    [testPlayerCharacters[0], testPlayerCharacters[1]],
    testCharacters,
    testDialogues,
    [{ npc_id: 0, dialogue_id: null }]
  );
  expect(res.length).toEqual(1);
  expect(res[0].dialogue.id).toEqual(1);
});

test("updateNPC throws an error when dialogue doesn't exist", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    updateNPCs(testPlayerCharacters, testCharacters, testDialogues, [
      { npc_id: 0, dialogue_id: 5 },
    ])
  ).toThrow("Can't find dialogue 5 in dialogue database");
  jest.restoreAllMocks();
});

test("updateNPC throws an error when character doesn't exist", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    updateNPCs(testPlayerCharacters, testCharacters, testDialogues, [
      { npc_id: 5, dialogue_id: 1 },
    ])
  ).toThrow("Can't find character 5 in characters database");
  jest.restoreAllMocks();
});

test("updateNPC throws an error when trying to set a dialogue to null for non existant character", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    updateNPCs([testPlayerCharacters[0]], testCharacters, testDialogues, [
      { npc_id: 1, dialogue_id: null },
    ])
  ).toThrow("Can't delete character 1 dialogue as it doesn't belong to player");
  jest.restoreAllMocks();
});
