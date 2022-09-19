import { arenaFight, arenaRun } from "../db/testDBArena";
import { materials } from "../db/testDBPlayer";
import { spells } from "../db/testDBSpells";
import * as events from "../engine/events";
import {
  IGame,
  IMaterial,
  IMaterialQuant,
  IPlayer,
  IServer,
} from "../engine/types";

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
const baseServer: IServer = {
  arenaRun: arenaRun,
  arenaFight: arenaFight,
  arenaRunHistory: [],
  arenaFightHistory: [],
};
const game = { player: basePlayer, server: baseServer };

test("eventCreatePlayer for player 1", async () => {
  const res: IGame = events.createPlayer(
    {
      eventId: 0,
      playerName: "player 1 name",
      playerId: 1,
      created: new Date().valueOf(),
      type: "CREATEPLAYER",
    },
    game
  );
  expect(res.player.id).toEqual(1);
  expect(res.player.name).toEqual("player 1 name");
  expect(res.player.energy).toEqual(50);
  expect(res.player.exprience).toEqual(0);
  expect(res.player.arcanas.length).toEqual(1);
  expect(res.player.materials.length).toEqual(8);
  res.player.materials.forEach((r: IMaterialQuant) =>
    expect(r.quantity).toEqual(0)
  );
  expect(res.player.arcanas[0].stories.length).toEqual(3);
  expect(res.player.arcanas[0].stories[0].state).toEqual("open");
  expect(res.player.arcanas[0].stories[1].state).toEqual("closed");
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
  const res: IGame = events.openSpell(
    {
      eventId: 0,
      arcanaId: 0,
      spellId: 0,
      playerId: 1,
      created: new Date().valueOf(),
      type: "OPENSPELL",
    },
    {
      player: {
        ...basePlayer,
        materials: playerMaterials,
        spells: playerSpells,
      },
      server: baseServer,
    }
  );
  expect(res.player.spells.length).toEqual(2);
  expect(res.player.spells[0]).not.toHaveProperty("price");
  expect(res.player.spells[1]).toHaveProperty("price");
  expect(res.player.materials[0].quantity).toEqual(5);
  expect(res.player.materials[1].quantity).toEqual(3);
  expect(res.player.currentState.state).toEqual("SPELLS");
  expect(res.player.spells[0].state).toEqual("open");
  expect(res.player.spells[0]).toHaveProperty("updatePrice");
  expect(res.player.spells[0]).toHaveProperty("requiredStrength");

  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    events.openSpell(
      {
        eventId: 0,
        arcanaId: 0,
        spellId: 1,
        playerId: 1,
        created: new Date().valueOf(),
        type: "OPENSPELL",
      },
      {
        player: {
          ...basePlayer,
          materials: playerMaterials,
          spells: [playerSpells[0], { ...spells[1] }],
        },
        server: baseServer,
      }
    )
  ).toThrow("Spell to open doesn't have a price");
  jest.restoreAllMocks();
});
