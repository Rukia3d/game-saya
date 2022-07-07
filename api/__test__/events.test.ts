import { arcanas, materials } from "../db/testDBPlayer";
import { spells } from "../db/testDBSpells";
import * as events from "../engine/events";
import { IMaterial, IMaterialQuant, IPlayer } from "../engine/types";

const basePlayer: IPlayer = {
  id: 0,
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

test("eventCreatePlayer for player 1", async () => {
  const res = events.createPlayer(
    { eventId: 0, playerName: "player 1 name", playerId: 1 },
    basePlayer
  );
  expect(res.id).toEqual(1);
  expect(res.name).toEqual("player 1 name");
  expect(res.energy).toEqual(50);
  expect(res.exprience).toEqual(0);
  expect(res.arcanas.length).toEqual(1);
  expect(res.materials.length).toEqual(8);
  res.materials.forEach((r: IMaterialQuant) => expect(r.quantity).toEqual(0));
  expect(res.arcanas[0].stories.length).toEqual(3);
  expect(res.arcanas[0].stories[0].state).toEqual("open");
  expect(res.arcanas[0].stories[1].state).toEqual("closed");
});

test("eventStartLevel for player 1 within tutorial", async () => {
  const player = events.createPlayer(
    { eventId: 0, playerName: "player 1 name", playerId: 1 },
    basePlayer
  );
  const res = events.startLevel(
    { eventId: 0, mode: "story", arcanaId: 0, levelId: 0 },
    { ...player, energy: 100 }
  );
  expect(res.energy).toEqual(100);
  expect(res.currentState.state).toEqual("PLAY");
  expect(res.currentState.level?.arcanaId).toEqual(0);
  expect(res.currentState.level?.levelId).toEqual(0);
  expect(res.currentState.level?.mode).toEqual("story");
});

test("eventStartLevel for player 1 outside tutorial", async () => {
  const player = events.createPlayer(
    { eventId: 0, playerName: "player 1 name", playerId: 1 },
    basePlayer
  );
  const res = events.startLevel(
    { eventId: 0, mode: "story", arcanaId: 0, levelId: 2 },
    { ...player, energy: 100 }
  );
  expect(res.energy).toEqual(95);
  expect(res.currentState.state).toEqual("PLAY");
  expect(res.currentState.level?.arcanaId).toEqual(0);
  expect(res.currentState.level?.levelId).toEqual(2);
  expect(res.currentState.level?.mode).toEqual("story");
});

test("eventWinLevel for player 1", async () => {
  const res = events.winLevel(
    {
      eventId: 1,
      mode: "story",
      arcanaId: 0,
      levelId: 0,
      time: new Date(1654347902),
    },
    {
      ...basePlayer,
      currentState: {
        state: "PLAY",
        level: { mode: "story", arcanaId: 0, levelId: 0 },
      },
      arcanas: JSON.parse(JSON.stringify(arcanas)),
      materials: JSON.parse(JSON.stringify(materials)).map((m: IMaterial) => {
        return { ...m, quantity: 1 };
      }),
    }
  );
  expect(res.exprience).toEqual(10);
  expect(res.materials[0].quantity).toEqual(13);
  expect(res.materials[3].quantity).toEqual(5);
  expect(res.arcanas[0].stories[0].state).toEqual("complete");
  expect(res.arcanas[0].stories[1].state).toEqual("open");
  expect(res.currentState.state).toEqual("WINMATERIAL");
  expect(res.currentState.materials?.length).toEqual(2);
});

test("openSpell for player 1", async () => {
  const playerSpells = [
    {
      ...spells[0],
      price: [
        { ...materials[0], quantity: 5 },
        { ...materials[1], quantity: 7 },
      ],
    },
    {
      ...spells[1],
      price: [
        { ...materials[0], quantity: 3 },
        { ...materials[2], quantity: 3 },
      ],
    },
  ];
  const playerMaterials = materials.map((m: IMaterial) => {
    return { ...m, quantity: 10 };
  });
  const res = events.openSpell(
    { eventId: 0, arcanaId: 0, spellId: 0 },
    {
      ...basePlayer,
      materials: playerMaterials,
      spells: playerSpells,
    }
  );
  expect(res.spells.length).toEqual(2);
  expect(res.spells[0]).not.toHaveProperty("price");
  expect(res.spells[1]).toHaveProperty("price");
  expect(res.materials[0].quantity).toEqual(5);
  expect(res.materials[1].quantity).toEqual(3);
  expect(res.currentState.state).toEqual("SPELLS");
  expect(res.spells[0].state).toEqual("open");
  expect(res.spells[0]).toHaveProperty("updatePrice");
  expect(res.spells[0]).toHaveProperty("requiredStrength");

  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    events.openSpell(
      { eventId: 0, arcanaId: 0, spellId: 1 },
      {
        ...basePlayer,
        materials: playerMaterials,
        spells: [playerSpells[0], { ...spells[1] }],
      }
    )
  ).toThrow("Spell to open doesn't have a price");
  jest.restoreAllMocks();
});
