import { characters, materials } from "../db/testDB";
import { addExperience, openNextLevel, rewardPlayer } from "../engine/actions";
import { IMaterial } from "../engine/types";

test("rewardPlayer generates correct rewards", async () => {
  const playerMaterials = JSON.parse(JSON.stringify(materials)).map(
    (m: IMaterial) => {
      return { ...m, quantity: 1 };
    }
  );
  const playerCharacters = JSON.parse(JSON.stringify(characters));
  const res = rewardPlayer(
    {
      eventId: 5,
      mode: "story",
      characterId: 0,
      levelId: 0,
      time: new Date(1654347302),
    },
    playerMaterials,
    playerCharacters
  );
  expect(res[0].name).toEqual("Coin");
  expect(res[0].quantity).toEqual(9);
  expect(res[3].name).toEqual("Air essence");
  expect(res[3].quantity).toEqual(3);
  // Rewards are added 2nd time to the same materials (level replayed)
  playerCharacters[0].stories[0].state = "complete";
  const res2 = rewardPlayer(
    {
      eventId: 6,
      mode: "story",
      characterId: 0,
      levelId: 0,
      time: new Date(1654347302),
    },
    JSON.parse(JSON.stringify(res)),
    playerCharacters
  );
  expect(res2[0].quantity).toEqual(13);
  expect(res2[3].quantity).toEqual(4);
});

test("openNextLevel opens next level correctly", async () => {
  const playerCharacters = [JSON.parse(JSON.stringify(characters[0]))];
  const res = openNextLevel(
    {
      eventId: 0,
      mode: "story",
      characterId: 0,
      levelId: 0,
      time: new Date(1654347302),
    },
    playerCharacters
  );
  expect(res[0].stories[0].state).toEqual("complete");
  expect(res[0].stories[1].state).toEqual("open");
  expect(res[0].stories[2].state).toEqual("closed");
  // Next level also opens
  const res2 = openNextLevel(
    {
      eventId: 1,
      mode: "story",
      characterId: 0,
      levelId: 1,
      time: new Date(1654347302),
    },
    res
  );
  expect(res2[0].stories[0].state).toEqual("complete");
  expect(res2[0].stories[1].state).toEqual("complete");
  expect(res2[0].stories[2].state).toEqual("open");
});

test("addExperience correctly adds experience", async () => {
  const playerCharacters = [JSON.parse(JSON.stringify(characters[0]))];
  const res = addExperience(
    {
      eventId: 0,
      mode: "story",
      characterId: 0,
      levelId: 0,
      time: new Date(1654347302),
    },
    10,
    playerCharacters
  );
  expect(res).toEqual(20);
  // For the level that was already completed exp is not granted
  playerCharacters[0].stories[1].state = "complete";
  const res2 = addExperience(
    {
      eventId: 1,
      mode: "story",
      characterId: 0,
      levelId: 1,
      time: new Date(1654347302),
    },
    10,
    playerCharacters
  );
  expect(res2).toEqual(10);
});
