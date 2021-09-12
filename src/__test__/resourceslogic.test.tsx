import {
  updatedCards,
  updateWinPlayer,
  cardUpdateRaise,
} from "../utils/gamelogic";
import { generateReward } from "../utils/resourceLogic";
import {
  baseCards15,
  enemy,
  gameState,
  mayaCard,
  spellUpdates,
} from "../utils/testobjects";

test("generates rewards correctly", () => {
  const res = generateReward(enemy, gameState.resources);
  console.log("res", res);
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

test.skip("Correctly updates Cards", () => {
  const card = { ...JSON.parse(JSON.stringify(mayaCard)) };
  const req: ForgeReq = spellUpdates[0];
  const spels = baseCards15.concat(card);
  const res = updatedCards(gameState.forgeEffects, card, req, spels);
  expect(res[15].id).toEqual(mayaCard.id);
  expect(res[15].strength).toEqual(mayaCard.strength + 1);
  expect(res[15].level).toEqual(mayaCard.level + 1);
});

test.skip("Correctly raises update requirements after card is updated", () => {
  const res = cardUpdateRaise(
    gameState.resources,
    "base_hit_maya",
    spellUpdates
  );
  expect(res[0].updates[0]).toEqual(["gold", 10]);
  expect(res[0].updates[1]).toEqual(["silk", 9]);
});
