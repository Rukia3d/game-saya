import { materials } from "../db/testDBPlayer";
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
  arena: [],
  arcanas: [],
  spells: [],
  missions: [],
  messages: [],
  currentState: { state: "MAIN" },
};

test("eventCreatePlayer for player 1", async () => {
  const res: IPlayer = events.createPlayer(
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
  const res: IPlayer = events.openSpell(
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
