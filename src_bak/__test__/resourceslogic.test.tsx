import { updateWinPlayer } from "../utils/gamelogic";
import { generateReward, removeResources } from "../utils/resourceLogic";
import { enemy, school } from "../utils/test_gameobjects";
import {
  playerResources,
  playerSpellUpdates,
} from "../utils/test_playerobjects";
import { gameState } from "../utils/test_states";
import { IPlayerResource, IResource } from "../utils/types";

test("generates rewards correctly", () => {
  const res = generateReward(enemy, gameState.game.resources);
  expect(res.length).toEqual(5);
});

test("updateWinPlayer assigns rewards correctly", () => {
  const resource: IResource[] = [
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      school: school,
      description: "some",
    },
    {
      id: "lava_r",
      name: "Lava Rock",
      commonality: 7,
      school: school,
      description: "some",
    },
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      school: school,
      description: "some",
    },
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      school: school,
      description: "some",
    },
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      school: school,
      description: "some",
    },
  ];

  const updatedPlayer = updateWinPlayer(gameState.player, enemy, resource);
  expect(updatedPlayer.resources[0].quantity).toEqual(4);
  expect(updatedPlayer.resources[1].quantity).toEqual(1);
  expect(updatedPlayer.data.experience).toEqual(325);
});

test("removeResource removes correctly", () => {
  const resources: IPlayerResource[] = [
    {
      id: "sparks",
      name: "Sparks",
      commonality: 2,
      quantity: 10,
      school: school,
      description: "some",
      created_at: new Date(),
    },
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      quantity: 10,
      school: school,
      description: "some",
      created_at: new Date(),
    },
    {
      id: "lava_r",
      name: "Lava Rock",
      commonality: 7,
      quantity: 10,
      school: school,
      description: "some",
      created_at: new Date(),
    },
  ];
  const res = removeResources(playerSpellUpdates[0].resource_base, resources);
  expect(res[0].quantity).toEqual(5);
  expect(res[1].quantity).toEqual(3);
  expect(res[2].quantity).toEqual(10);
});

test("removeResource throws correct errors", () => {
  const resources: IPlayerResource[] = [
    {
      id: "sparks",
      school: school,
      description: "some",
      created_at: new Date(),
      name: "Sparks",
      commonality: 2,
      quantity: 10,
    },
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      quantity: 10,
      school: school,
      description: "some",
      created_at: new Date(),
    },
    {
      id: "lava_r",
      name: "Lava Rock",
      commonality: 7,
      quantity: 10,
      school: school,
      description: "some",
      created_at: new Date(),
    },
  ];
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const noResource = { ...playerResources[0], id: "liz" };
  const notEnoughResource = { ...playerResources[0], quantity: 110 };
  expect(() => removeResources([noResource], resources)).toThrow(
    "Trying to remove resource that is not owned"
  );
  expect(() => removeResources([notEnoughResource], resources)).toThrow(
    "Cant have negative resource"
  );

  jest.restoreAllMocks();
});
