import { unique, removeFromArray, shuffle } from "../utils/helpers";
import {
  generateDeck,
  generateEnemyDeck,
  updateHeroDeck,
} from "../utils/gamelogic";
test("Unique function returns correctly", () => {
  const array1 = [1, 2, 3, 4];
  const array2 = [1, 2, 2, 3, 4];
  expect(unique(array1)).toEqual(array1);
  expect(unique(array2)).toEqual(array1);
});

test("Remove from array function returns correctly", () => {
  const array1 = [1, 2, 3, 4];
  expect(removeFromArray(array1, 1)).toEqual([2, 3, 4]);
});

test("Shuffle function returns correctly", () => {
  const array1 = [1, 2, 3, 4];
  expect(shuffle(array1)).not.toEqual([2, 3, 4]);
});

const cards = [
  {
    id: "base_hit1",
    name: "Base Hit 1",
    strength: 1,
    quantity: 2,
    character: null,
    element: null,
  },
  {
    id: "base_hit1_tara",
    name: "Tara Hit 1",
    strength: 1,
    quantity: 1,
    character: "tara",
    element: "metal",
  },
  {
    id: "base_hit1_tara",
    name: "Tara Hit 1",
    strength: 1,
    quantity: 1,
    character: "maya",
    element: "earrth",
  },
];
const enemy = {
  id: "dude",
  name: "Dude",
  element: "Earth",
  exp: 10,
  life: 2,
  cards: cards,
};

test("generateDeck function returns correct character cards", () => {
  const deckForOne = generateDeck(["maya"], cards);
  expect(deckForOne.length).toEqual(3);
});

test("generateEnemyDeck function returns correct number for enemy lifes", () => {
  const deckForEnemy = generateEnemyDeck(enemy);
  expect(deckForEnemy.length).toEqual(2);
});

test("updateHeroDeck shuffles if there are no cards left", () => {
  const deckForTwo = generateDeck(["maya", "tara"], cards);
  const deckForEnemy = generateEnemyDeck(enemy);
  const fightState = {
    hero: {
      health: 15,
      currentHealth: 15,
    },
    enemy: enemy,
    heroDeck: [],
    heroHand: deckForTwo.slice(0, 3),
    heroDrop: deckForTwo,
    enemyDeck: deckForEnemy,
    enemyDrop: [],
  };
  const [newDeck, newDrop] = updateHeroDeck(fightState, deckForTwo[0]);
  expect(newDeck.length).toEqual(4);
  expect(newDrop.length).toEqual(1);
});
