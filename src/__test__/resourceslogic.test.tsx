import { updateWinPlayer } from "../utils/gamelogic";
import { generateReward, removeResources } from "../utils/resourceLogic";
import { enemy, gameState } from "../utils/testobjects";
import { IOwnedResource, ISpellUpdateResource } from "../utils/types";

test("generates rewards correctly", () => {
  const res = generateReward(enemy, gameState.resources);
  expect(res.length).toEqual(5);
});

test("updateWinPlayer assigns rewards correctly", () => {
  const resource = [
    { id: "ash", name: "Ash", image: "ash", commonality: 10 },
    { id: "lava_r", name: "Lava Rock", image: "lava_r", commonality: 7 },
    { id: "ash", name: "Ash", image: "ash", commonality: 10 },
    { id: "ash", name: "Ash", image: "ash", commonality: 10 },
    { id: "ash", name: "Ash", image: "ash", commonality: 10 },
  ];

  const updatedPlayer = updateWinPlayer(gameState.player, enemy, resource);
  expect(updatedPlayer.resources[0].quantity).toEqual(4);
  expect(updatedPlayer.resources[1].quantity).toEqual(1);
  expect(updatedPlayer.data.experience).toEqual(325);
});

test("removeResource removes correctly", () => {
  const resources: IOwnedResource[] = [
    {
      id: "sparks",
      name: "Sparks",
      commonality: 2,
      image: "sparks",
      quantity: 10,
    },
    { id: "ash", name: "Ash", commonality: 10, image: "ash", quantity: 10 },
    {
      id: "lava_r",
      name: "Lava Rock",
      commonality: 7,
      image: "lava_r",
      quantity: 10,
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
  const resources: IOwnedResource[] = [
    {
      id: "sparks",
      name: "Sparks",
      commonality: 2,
      image: "sparks",
      quantity: 10,
    },
    { id: "ash", name: "Ash", commonality: 10, image: "ash", quantity: 10 },
    {
      id: "lava_r",
      name: "Lava Rock",
      commonality: 7,
      image: "lava_r",
      quantity: 10,
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
