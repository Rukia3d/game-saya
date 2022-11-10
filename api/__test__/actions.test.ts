import {
  basePlayer,
  elementAdventure,
  elements,
  materials,
} from "../db/testDBData";
import { openNextLevel, rewardPlayer, addExperience } from "../engine/actions";
import {
  IMaterial,
  IMaterialQuant,
  IPlayer,
  materialName,
} from "../engine/types";

test("openNextLevel opens next level correctly", async () => {
  const playerElements = [JSON.parse(JSON.stringify(elementAdventure[0]))];
  playerElements[0].adventures[0].stories[0].state = "open";
  const res = openNextLevel(
    {
      eventId: 0,
      mode: "story",
      elementId: 0,
      adventureId: 0,
      storyId: 0,
      created: 1654347302,
      playerId: 0,
      type: "WINLEVEL",
    },
    playerElements
  );
  expect(res[0].adventures[0].stories[0].state).toEqual("complete");
  expect(res[0].adventures[0].stories[1].state).toEqual("open");
  expect(res[0].adventures[0].stories[2].state).toEqual("closed");
  // Next level also opens
  const res2 = openNextLevel(
    {
      eventId: 1,
      mode: "story",
      elementId: 0,
      adventureId: 0,
      storyId: 1,
      created: 1654347302,
      playerId: 0,
      type: "WINLEVEL",
    },
    res
  );
  expect(res2[0].adventures[0].stories[0].state).toEqual("complete");
  expect(res2[0].adventures[0].stories[1].state).toEqual("complete");
  expect(res2[0].adventures[0].stories[2].state).toEqual("open");
});

test("rewardPlayer generates correct rewards", async () => {
  const playerMaterials = JSON.parse(JSON.stringify(materials)).map(
    (m: IMaterial) => {
      return { ...m, quantity: 1 };
    }
  );
  const playerElement = JSON.parse(JSON.stringify(elementAdventure[0]));
  const res = rewardPlayer(
    {
      eventId: 5,
      mode: "story",
      elementId: 0,
      adventureId: 0,
      storyId: 0,
      created: 1654347302,
      playerId: 0,
      type: "WINLEVEL",
    },
    playerMaterials,
    playerElement
  );
  expect(res.all[0].name).toEqual("Gold");
  expect(res.all[0].quantity).toEqual(4);
  expect(res.all[3].name).toEqual("Garnet");
  expect(res.all[3].quantity).toEqual(1);
});

test("addExperience correctly adds experience", async () => {
  const playerElement = JSON.parse(JSON.stringify(elementAdventure[0]));
  const res = addExperience(
    {
      eventId: 0,
      mode: "story",
      elementId: 0,
      adventureId: 0,
      storyId: 0,
      created: 1654347302,
      playerId: 0,
      type: "WINLEVEL",
    },
    { ...basePlayer, elements: [playerElement], exprience: 10 }
  );
  expect(res).toEqual(10);
  // For the level that was already completed exp is not granted
  playerElement.adventures[0].stories[1].state = "complete";
  const res2 = addExperience(
    {
      eventId: 1,
      mode: "story",
      elementId: 0,
      adventureId: 0,
      storyId: 1,
      created: 1654347302,
      playerId: 0,
      type: "WINLEVEL",
    },
    { ...basePlayer, elements: [playerElement], exprience: 10 }
  );
  expect(res2).toEqual(10);
});

/*
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
