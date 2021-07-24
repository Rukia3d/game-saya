import {
  updatedCards,
  updateWinPlayer,
  cardUpdateRaise,
} from "../utils/gamelogic";
import {
  baseCards15,
  enemy,
  gameState,
  mayaCard,
  spellUpdates,
} from "../utils/testobjects";
import { ForgeReq } from "../utils/types";

test("updateWinPlayer assigns rewards correctly", () => {
  const resource = [
    {
      id: "iron" as "iron",
      name: "Iron",
      image: "../",
      commonality: 5,
      quantity: 0,
    },
    {
      id: "silk" as "silk",
      name: "Silk",
      image: "../",
      commonality: 2,
      quantity: 0,
    },
    {
      id: "rdust" as "rdust",
      name: "Red dust",
      image: "../",
      commonality: 3,
      quantity: 0,
    },
  ];
  const updatedPlayer = updateWinPlayer(gameState.player, enemy, resource);
  expect(updatedPlayer.resources[1].quantity).toEqual(11);
  expect(updatedPlayer.resources[3].quantity).toEqual(1);
  expect(updatedPlayer.resources[4].quantity).toEqual(1);
  expect(updatedPlayer.experience).toEqual(325);
});

test("Correctly updates Cards", () => {
  const card = { ...JSON.parse(JSON.stringify(mayaCard)) };
  const req: ForgeReq = spellUpdates[0];
  const spels = baseCards15.concat(card);
  const res = updatedCards(card, req, spels);
  expect(res[15].id).toEqual(mayaCard.id);
  expect(res[15].strength).toEqual(mayaCard.strength + 1);
  expect(res[15].level).toEqual(mayaCard.level + 1);
});

test("Correctly raises update requirements after card is updated", () => {
  const res = cardUpdateRaise("base_hit_maya", spellUpdates);
  expect(res[0].updates[0]).toEqual(["gold", 10]);
  expect(res[0].updates[1]).toEqual(["silk", 9]);
});