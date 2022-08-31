import { arcanas } from "../db/testDBArcanes";
import { materials } from "../db/testDBPlayer";
import { applyEvent } from "../engine/engine";
import { IMaterial, IPlayer, IPlayerEvent, IServer } from "../engine/types";

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
const baseServer: IServer = {
  arenaRun: { events: [], resultTime: 0, type: "run" },
  arenaFight: { events: [], resultTime: 0, type: "fight" },
};

test("Applies a single event correctly", () => {
  const newPlayer = { ...basePlayer, arcanas: arcanas };
  const newServer = { ...baseServer };
  const startLevelEvent: IPlayerEvent = {
    playerId: 1,
    eventId: 0,
    type: "STARTLEVEL",
    created: new Date().valueOf(),
  };
  const res = applyEvent(
    { server: newServer, player: newPlayer },
    startLevelEvent
  );
  expect(res.player.currentState.state).toEqual("PLAY");
  expect(res.player.currentState.level?.arcana).toEqual(0);
  expect(res.player.currentState.level?.mode).toEqual("story");
  expect(res.player.currentState.level?.level).toEqual(0);
});

test("Applies a series of events correctly", () => {
  const newPlayer = {
    ...basePlayer,
    arcanas: arcanas,
    materials: materials.map((m: IMaterial) => {
      return { ...m, quantity: 0 };
    }),
  };
  const newServer = { ...baseServer };
  const startLevelEvent: IPlayerEvent = {
    playerId: 1,
    eventId: 0,
    type: "STARTLEVEL",
    created: new Date().valueOf(),
  };
  const winLevelEvent: IPlayerEvent = {
    playerId: 1,
    eventId: 0,
    type: "WINLEVEL",
    created: new Date().valueOf(),
  };
  const resMiddle = applyEvent(
    { server: newServer, player: newPlayer },
    startLevelEvent
  );
  const res = applyEvent(resMiddle, winLevelEvent);
  expect(res.player.currentState.state).toEqual("WINMATERIAL");
  expect(res.player.currentState.materials?.length).toEqual(2);
});
