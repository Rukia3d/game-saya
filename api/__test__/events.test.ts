import { characters, materials } from "../db/testDB";
import {
  eventCreatePlayer,
  eventStartLevel,
  eventWinLevel,
} from "../engine/events";
import { IMaterial, IMaterialOwned, IPlayer } from "../engine/types";

const basePlayer: IPlayer = {
  id: 0,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  characters: [],
  spells: [],
  missions: [],
  messages: [],
};

test("eventCreatePlayer for player 1", async () => {
  const res = eventCreatePlayer(
    { eventId: 0, playerName: "player 1 name", playerId: 1 },
    basePlayer
  );
  expect(res.id).toEqual(1);
  expect(res.name).toEqual("player 1 name");
  expect(res.energy).toEqual(50);
  expect(res.exprience).toEqual(0);
  expect(res.characters.length).toEqual(1);
  expect(res.materials.length).toEqual(8);
  res.materials.forEach((r: IMaterialOwned) => expect(r.quantity).toEqual(0));
  expect(res.characters[0].stories.length).toEqual(3);
  expect(res.characters[0].stories[0].state).toEqual("open");
  expect(res.characters[0].stories[1].state).toEqual("closed");
});

test("eventStartLevel for player 1", async () => {
  const res = eventStartLevel(
    { eventId: 0, energyPrice: 10 },
    { ...basePlayer, energy: 100 }
  );
  expect(res.energy).toEqual(90);
});

test("eventWinLevel for player 1", async () => {
  const res = eventWinLevel(
    {
      eventId: 1,
      mode: "story",
      characterId: 0,
      levelId: 0,
      time: new Date(1654347902),
    },
    {
      ...basePlayer,
      characters: JSON.parse(JSON.stringify(characters)),
      materials: JSON.parse(JSON.stringify(materials)).map((m: IMaterial) => {
        return { ...m, quantity: 1 };
      }),
    }
  );
  expect(res.exprience).toEqual(10);
  expect(res.materials[0].quantity).toEqual(15);
  expect(res.materials[3].quantity).toEqual(5);
  expect(res.characters[0].stories[0].state).toEqual("complete");
  expect(res.characters[0].stories[1].state).toEqual("open");
});
