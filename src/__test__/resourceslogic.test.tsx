import { updateWinPlayer } from "../utils/gamelogic";
import { generateReward } from "../utils/resourceLogic";
import { enemy, gameState } from "../utils/testobjects";

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
