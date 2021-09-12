import {
  changeCardsInDeck,
  enemyToNumber,
  finishStory,
  generateDeck,
  generateEnemyDeck,
  updateHeroDeck,
} from "../utils/gamelogic";
import {
  baseCards15,
  enemy,
  enemyCard,
  fightState,
  gameState,
  mayaCard,
} from "../utils/testobjects";
import { Spell } from "../utils/types";

test("generateDeck function returns correct character cards", () => {
  const deckForOne = generateDeck(["maya"], baseCards15);
  expect(deckForOne.length).toEqual(15);
});

test("generateEnemyDeck function returns correct number for enemy lifes", () => {
  const deckForEnemy = generateEnemyDeck(enemy);
  expect(deckForEnemy.length).toEqual(2);
});

test("updateHeroDeck shuffles if there are no cards left", () => {
  const deckForTwo = generateDeck(["maya", "tara"], baseCards15);
  const deckForEnemy = generateEnemyDeck(enemy);
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: deckForTwo.slice(0, 3),
    heroDesk: deckForTwo,
    heroDrop: [],
    enemyDeck: deckForEnemy,
  };
  const [newDeck, newDrop] = updateHeroDeck(newFightState, deckForTwo[0]);
  expect(newDeck.length).toEqual(2);
  expect(newDrop.length).toEqual(1);
});

test("Correctly adds Card to Player's deck", () => {
  const spellsUnselected = new Array(15).fill(0).map((x, n) => ({
    ...mayaCard,
    id: "base_hit" + n,
    name: "Base Hit " + n,
  }));

  const spellsSelected = new Array(15).fill(0).map((x, n) => ({
    ...enemyCard,
    id: "base_hit" + n,
    name: "Base Hit " + n,
  }));

  const spellsMore = spellsSelected.concat([mayaCard, mayaCard]);
  spellsUnselected[0].selected = false;
  const addingFirst = changeCardsInDeck(spellsUnselected, spellsUnselected[0]);
  expect(addingFirst.length).toEqual(15);
  expect(addingFirst[0].selected).toBeTruthy();

  spellsUnselected[3].selected = false;
  const addingThird = changeCardsInDeck(spellsUnselected, spellsUnselected[3]);
  expect(addingThird.length).toEqual(15);
  expect(addingThird[3].selected).toBeTruthy();

  spellsSelected[0].selected = true;
  const chaingingFirstTaken = changeCardsInDeck(
    spellsSelected,
    spellsSelected[0]
  );
  expect(chaingingFirstTaken.length).toEqual(15);
  expect(chaingingFirstTaken[0].selected).not.toBeTruthy();

  spellsSelected[3].selected = true;
  const changingThirdTaken = changeCardsInDeck(
    spellsSelected,
    spellsSelected[3]
  );
  expect(changingThirdTaken.length).toEqual(15);
  expect(changingThirdTaken[3].selected).not.toBeTruthy();

  spellsMore.map((s: Spell, i: number) =>
    i < 15 ? (s.selected = true) : (s.selected = false)
  );
  const addingWhenAllSelected = changeCardsInDeck(spellsMore, spellsMore[15]);
  expect(addingWhenAllSelected.length).toEqual(17);
  expect(addingWhenAllSelected[0].selected).not.toBeTruthy();
  expect(addingWhenAllSelected[15].selected).toBeTruthy();
});

test("Returns correct number for enemy experience", () => {
  expect(enemyToNumber(enemy)).toEqual(5);
  expect(enemyToNumber({ ...enemy, experience: "apprentice" })).toEqual(6);
  expect(enemyToNumber({ ...enemy, experience: "practitioner" })).toEqual(7);
  expect(enemyToNumber({ ...enemy, experience: "master" })).toEqual(8);
  expect(enemyToNumber({ ...enemy, experience: "grandmaster" })).toEqual(9);
});

test("Opens next story if dialogue is open", () => {
  const action = [
    {
      type: "addNpc" as "addNpc",
      id: "maya",
      data: "c1_dialogue2",
    },
    {
      type: "setAdventure" as "setAdventure",
      id: "arena",
    },
    {
      type: "openStory" as "openStory",
      id: "arena",
      data: "arena1",
    },
  ];
  const game = JSON.parse(JSON.stringify(gameState));
  const res = finishStory(game, action);
  const stories = res.adventures[0].stories || null;
  expect(stories).not.toBeNull();
  expect(res.npcs[0].dial).toBe(action[0].data);
  expect(res.adventures[2].open).toBeTruthy();
  //@ts-ignore
  expect(res.adventures[2].stories[0].stories[2].open).toBeTruthy();
});

test("Removes npc correctly if data says remove", () => {
  const action = [
    {
      type: "addNpc" as "addNpc",
      id: "maya",
      data: "remove",
    },
  ];
  const game = JSON.parse(JSON.stringify(gameState));
  const res = finishStory(game, action);
  expect(res.npcs.length).toBe(1);
  expect(res.npcs[0].id).toBe("tara");
});

test("Adds npc correctly if it's not present", () => {
  const action = [
    {
      type: "addNpc" as "addNpc",
      id: "olija",
      data: "olija_replic1",
    },
  ];
  const game = JSON.parse(JSON.stringify(gameState));
  const res = finishStory(game, action);
  expect(res.npcs.length).toBe(3);
  expect(res.npcs[2].id).toBe("olija");
});

test("Adds npc correctly if it's not present and doesn't have a dialogue", () => {
  const action = [
    {
      type: "addNpc" as "addNpc",
      id: "olija",
      data: null,
    },
  ];
  const game = JSON.parse(JSON.stringify(gameState));
  const res = finishStory(game, action);
  expect(res.npcs.length).toBe(3);
  expect(res.npcs[2].id).toBe("olija");
});

test("Adds hero correctly if actions requires it", () => {
  const action = [
    {
      type: "addHero" as "addHero",
      id: "nell",
      data: "fire",
    },
  ];
  const game = JSON.parse(JSON.stringify(gameState));
  const nellCards = new Array(3).fill(0).map((x, n) => ({
    id: "base_hit" + n,
    name: "Base Hit " + n,
    strength: 1,
    element: "fire",
    image: "",
    mana: 0,
    selected: true,
    owner: "hero" as "hero",
    type: "",
    level: 0,
    description: "",
  }));
  game.cards = game.cards.concat(nellCards);
  const newPlayer = { ...game.player, heroes: game.heroes.slice(0, 2) };
  const res = finishStory({ ...game, player: newPlayer }, action);
  expect(res.heroes.length).toBe(3);
  expect(res.spells.length).toBe(18);
});
