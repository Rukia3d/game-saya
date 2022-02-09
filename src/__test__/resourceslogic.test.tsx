import { updateWinPlayer } from "../utils/gamelogic";
import { generateReward, removeResources } from "../utils/resourceLogic";
import { enemy } from "../utils/testobjects";
import { gameState } from "../utils/teststates";
import {
  colorType,
  IPlayerResource,
  IResource,
  ISpellUpdateResource,
} from "../utils/types";

test("generates rewards correctly", () => {
  const res = generateReward(enemy, gameState.resources);
  expect(res.length).toEqual(5);
});

test("updateWinPlayer assigns rewards correctly", () => {
  const resource: IResource[] = [
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      school: "restoration",
    },
    {
      id: "lava_r",
      name: "Lava Rock",
      commonality: 7,
      school: "restoration",
    },
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      school: "restoration",
    },
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      school: "restoration",
    },
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      school: "restoration",
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
      school: "restoration",
    },
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      quantity: 10,
      school: "restoration",
    },
    {
      id: "lava_r",
      name: "Lava Rock",
      commonality: 7,
      quantity: 10,
      school: "restoration",
    },
  ];
  const price: ISpellUpdateResource[] = [
    ["sparks", 5],
    ["ash", 7],
  ];
  const res = removeResources(price, resources);
  expect(res[0].quantity).toEqual(5);
  expect(res[1].quantity).toEqual(3);
  expect(res[2].quantity).toEqual(10);
});

test("removeResource throws correct errors", () => {
  const resources: IPlayerResource[] = [
    {
      id: "sparks",
      school: "restoration",
      name: "Sparks",
      commonality: 2,
      quantity: 10,
    },
    {
      id: "ash",
      name: "Ash",
      commonality: 10,
      quantity: 10,
      school: "restoration",
    },
    {
      id: "lava_r",
      name: "Lava Rock",
      commonality: 7,
      quantity: 10,
      school: "restoration",
    },
  ];
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());

  expect(() => removeResources([["liz", 1]], resources)).toThrow(
    "Trying to remove resource that is not owned"
  );
  expect(() => removeResources([["ash", 11]], resources)).toThrow(
    "Cant have negative resource"
  );

  jest.restoreAllMocks();
});
