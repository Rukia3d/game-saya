import {
  baseGame,
  basePlayer,
  baseServer,
  materials,
} from "../db/testDBPlayer";
import { spells } from "../db/testDBSpells";
import * as events from "../engine/events";
import { IGame, IMaterial, IMaterialQuant } from "../engine/types";

test("eventCreatePlayer for player 1", async () => {
  const res: IGame = events.createPlayer(
    {
      eventId: 0,
      playerName: "player 1 name",
      playerId: 1,
      created: new Date().valueOf(),
      type: "CREATEPLAYER",
    },
    { server: baseServer, players: [] }
  );
  expect(res.players[0].id).toEqual(1);
  expect(res.players[0].name).toEqual("player 1 name");
  expect(res.players[0].energy).toEqual(50);
  expect(res.players[0].exprience).toEqual(0);
  expect(res.players[0].arcanas.length).toEqual(1);
  expect(res.players[0].materials.length).toEqual(8);
  res.players[0].materials.forEach((r: IMaterialQuant) =>
    expect(r.quantity).toEqual(0)
  );
  expect(res.players[0].arcanas[0].stories.length).toEqual(3);
  expect(res.players[0].arcanas[0].stories[0].state).toEqual("open");
  expect(res.players[0].arcanas[0].stories[1].state).toEqual("closed");
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
      players: [
        {
          ...basePlayer,
          id: 1,
          materials: playerMaterials,
          spells: playerSpells,
        },
      ],
      server: baseServer,
    }
  );
  expect(res.players[0].spells.length).toEqual(2);
  expect(res.players[0].spells[0]).not.toHaveProperty("price");
  expect(res.players[0].spells[1]).toHaveProperty("price");
  expect(res.players[0].materials[0].quantity).toEqual(5);
  expect(res.players[0].materials[1].quantity).toEqual(3);
  expect(res.players[0].currentState.state).toEqual("SPELLS");
  expect(res.players[0].spells[0].state).toEqual("open");
  expect(res.players[0].spells[0]).toHaveProperty("updatePrice");
  expect(res.players[0].spells[0]).toHaveProperty("requiredStrength");

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
        players: [
          {
            ...basePlayer,
            id: 1,
            materials: playerMaterials,
            spells: [playerSpells[0], { ...spells[1] }],
          },
        ],
        server: baseServer,
      }
    )
  ).toThrow("Spell to open doesn't have a price");
  jest.restoreAllMocks();
});
