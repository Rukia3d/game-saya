import { arcanas, materials } from "../db/testDBPlayer";
import {
  addExperience,
  openNextLevel,
  removeMaterials,
  rewardPlayer,
} from "../engine/actions";
import { IMaterial, IMaterialQuant, IPlayer } from "../engine/types";

const basePlayer: IPlayer = {
  id: 1,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  arcanas: [],
  spells: [],
  missions: [],
  messages: [],
  currentState: { state: "MAIN" },
};

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
      arcanaId: 0,
      levelId: 0,
      time: new Date(1654347302),
    },
    playerMaterials,
    playerCharacters
  );
  expect(res.all[0].name).toEqual("Coin");
  expect(res.all[0].quantity).toEqual(11);
  expect(res.all[3].name).toEqual("Rings");
  expect(res.all[3].quantity).toEqual(3);
  // Rewards are added 2nd time to the same materials (level replayed)
  playerCharacters[0].stories[0].state = "complete";
  const res2 = rewardPlayer(
    {
      eventId: 6,
      mode: "story",
      arcanaId: 0,
      levelId: 0,
      time: new Date(1654347302),
    },
    JSON.parse(JSON.stringify(res.all)),
    playerCharacters
  );
  expect(res2.all[0].quantity).toEqual(13);
  expect(res2.all[3].quantity).toEqual(4);
});

test("openNextLevel opens next level correctly", async () => {
  const playerCharacters = [JSON.parse(JSON.stringify(arcanas[0]))];
  const res = openNextLevel(
    {
      eventId: 0,
      mode: "story",
      arcanaId: 0,
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
      arcanaId: 0,
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
  const playerCharacters = [JSON.parse(JSON.stringify(arcanas[0]))];
  playerCharacters[0].stories[0].state = "open";
  const res = addExperience(
    {
      eventId: 0,
      mode: "story",
      arcanaId: 0,
      levelId: 0,
      time: new Date(1654347302),
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
      arcanaId: 0,
      levelId: 1,
      time: new Date(1654347302),
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
