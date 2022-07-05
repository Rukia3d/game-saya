import { elements, materials } from "../db/testDBPlayer";
import { applyEvent } from "../engine/engine";
import { IMaterial, IPlayer, IPlayerEvent } from "../engine/types";

const basePlayer: IPlayer = {
  id: 1,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  elements: [],
  spells: [],
  missions: [],
  messages: [],
  currentState: { state: "MAIN" },
};

test("Applies a single event correctly", () => {
  const newPlayer = { ...basePlayer, elements: elements };
  const startLevelEvent: IPlayerEvent = {
    playerId: 1,
    eventId: 0,
    type: "STARTLEVEL",
    created: new Date(),
  };
  const res = applyEvent(newPlayer, startLevelEvent);
  expect(res.currentState.state).toEqual("PLAY");
  expect(res.currentState.level?.elementId).toEqual(0);
  expect(res.currentState.level?.mode).toEqual("story");
  expect(res.currentState.level?.levelId).toEqual(0);
});

test("Applies a series of events correctly", () => {
  const newPlayer = {
    ...basePlayer,
    elements: elements,
    materials: materials.map((m: IMaterial) => {
      return { ...m, quantity: 0 };
    }),
  };
  const startLevelEvent: IPlayerEvent = {
    playerId: 1,
    eventId: 0,
    type: "STARTLEVEL",
    created: new Date(),
  };
  const winLevelEvent: IPlayerEvent = {
    playerId: 1,
    eventId: 0,
    type: "WINLEVEL",
    created: new Date(),
  };
  const resMiddle = applyEvent(newPlayer, startLevelEvent);
  const res = applyEvent(resMiddle, winLevelEvent);
  expect(res.currentState.state).toEqual("WINMATERIAL");
  expect(res.currentState.materials?.length).toEqual(2);
});
