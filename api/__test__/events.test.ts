import { eventCreatePlayer } from "../engine/events";
import { IMaterialOwned, IPlayer } from "../engine/types";

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
    { eventId: 0, playerName: "player 0 name", playerId: 1 },
    basePlayer
  );
  expect(res.id).toEqual(1);
  expect(res.name).toEqual("player 0 name");
  expect(res.energy).toEqual(50);
  expect(res.exprience).toEqual(0);
  expect(res.characters.length).toEqual(1);
  expect(res.materials.length).toEqual(8);
  res.materials.forEach((r: IMaterialOwned) => expect(r.quantity).toEqual(0));
  expect(res.characters[0].stories.length).toEqual(3);
  expect(res.characters[0].stories[0].state).toEqual("open");
  expect(res.characters[0].stories[1].state).toEqual("closed");
});
