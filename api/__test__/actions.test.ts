import { basePlayer, materials } from "../db/testDBData";
import {
  IMaterial,
  IMaterialQuant,
  IPlayer,
  materialName,
} from "../engine/types";

/*
test("rewardPlayer generates correct rewards", async () => {
  const playerMaterials = JSON.parse(JSON.stringify(materials)).map(
    (m: IMaterial) => {
      return { ...m, quantity: 1 };
    }
  );
  const playerCharacters = JSON.parse(JSON.stringify(arcanas));
  const res = rewardPlayer(
    {
      eventId: 5,
      mode: "story",
      elementId: 0,
      levelId: 0,
      created: 1654347302,
      playerId: 0,
      type: "WINLEVEL",
    },
    playerMaterials,
    playerCharacters
  );
  expect(res.all[0].name).toEqual("money");
  expect(res.all[0].quantity).toEqual(11);
  expect(res.all[3].name).toEqual("resource2");
  expect(res.all[3].quantity).toEqual(5);
  // Rewards are added 2nd time to the same materials (level replayed)
  playerCharacters[0].stories[0].state = "complete";
  const res2 = rewardPlayer(
    {
      eventId: 6,
      mode: "story",
      elementId: 0,
      levelId: 0,
      created: 1654347302,
      playerId: 0,
      type: "WINLEVEL",
    },
    JSON.parse(JSON.stringify(res.all)),
    playerCharacters
  );
  expect(res2.all[0].quantity).toEqual(16);
  expect(res2.all[3].quantity).toEqual(7);
});

test("openNextLevel opens next level correctly", async () => {
  const playerCharacters = [JSON.parse(JSON.stringify(arcanas[0]))];
  const res = openNextLevel(
    {
      eventId: 0,
      mode: "story",
      elementId: 0,
      levelId: 0,
      created: 1654347302,
      playerId: 0,
      type: "WINLEVEL",
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
      elementId: 0,
      levelId: 1,
      created: 1654347302,
      playerId: 0,
      type: "WINLEVEL",
    },
    res
  );
  expect(res2[0].stories[0].state).toEqual("complete");
  expect(res2[0].stories[1].state).toEqual("complete");
  expect(res2[0].stories[2].state).toEqual("open");
});

test("addExperience correctly adds experience", async () => {
  const playerCharacters = [JSON.parse(JSON.stringify(arcanas[0]))];
  playerCharacters[0].stories[0].state = "open";
  const res = addExperience(
    {
      eventId: 0,
      mode: "story",
      elementId: 0,
      levelId: 0,
      created: 1654347302,
      playerId: 0,
      type: "WINLEVEL",
    },
    { ...basePlayer, arcanas: playerCharacters, exprience: 10 }
  );
  expect(res).toEqual(20);
  // For the level that was already completed exp is not granted
  playerCharacters[0].stories[1].state = "complete";
  const res2 = addExperience(
    {
      eventId: 1,
      mode: "story",
      elementId: 0,
      levelId: 1,
      created: 1654347302,
      playerId: 0,
      type: "WINLEVEL",
    },
    { ...basePlayer, arcanas: playerCharacters, exprience: 10 }
  );
  expect(res2).toEqual(10);
});

test("Removes materials correctly", async () => {
  const owned: IMaterialQuant[] = materials.map((m: IMaterial) => {
    return { ...m, quantity: 10 };
  });

  const price: IMaterialQuant[] = [
    { ...materials[0], quantity: 5 },
    { ...materials[3], quantity: 7 },
  ];
  const res = removeMaterials(owned, price);
  expect(res[0].quantity).toEqual(5);
  expect(res[3].quantity).toEqual(3);
});

test("Updates rewards pool when a player joins", () => {
  const arenaEvent = JSON.parse(JSON.stringify(arenaRun.events[1]));
  const stake = [
    { id: 0, name: "money" as materialName, quantity: 50 },
    { id: 3, name: "resource1" as materialName, quantity: 15 },
  ];
  const oneStakeEvent = updateRewardPool(arenaEvent, stake);
  expect(oneStakeEvent.rewardPool.length).toEqual(2);
  expect(oneStakeEvent.rewardPool[0].quantity).toEqual(50);
  expect(oneStakeEvent.rewardPool[1].quantity).toEqual(15);
  const twoStakeEvent = updateRewardPool(oneStakeEvent, stake);
  expect(twoStakeEvent.rewardPool.length).toEqual(2);
  expect(twoStakeEvent.rewardPool[0].quantity).toEqual(100);
  expect(twoStakeEvent.rewardPool[1].quantity).toEqual(30);
});

test("Updates arena result when player finishes", () => {
  const arenaEvent = JSON.parse(JSON.stringify(arenaRun.events[1]));
  const player = JSON.parse(
    JSON.stringify({ ...basePlayer, name: "PlayerArena" })
  );
  const oneResultEvent = updateArenaResults(arenaEvent, 6565, player);
  expect(oneResultEvent.results.length).toEqual(1);
  expect(oneResultEvent.results[0].playerId).toEqual(1);
  expect(oneResultEvent.results[0].playerName).toEqual("PlayerArena");
  expect(oneResultEvent.results[0].time).toEqual(6565);
  const twoResultEvent = updateArenaResults(oneResultEvent, 7565, player);
  expect(twoResultEvent.results.length).toEqual(1);
  expect(twoResultEvent.results[0].playerId).toEqual(1);
  expect(twoResultEvent.results[0].playerName).toEqual("PlayerArena");
  expect(twoResultEvent.results[0].time).toEqual(7565);
});
*/
