import { updateHeroDeck, changeCardsInDeck } from "../utils/fightlogic";
import { enemyToNumber, finishStory } from "../utils/gamelogic";
import { generateDeck, generateEnemyDeck } from "../utils/prefightloginc";
import {
  baseCards15,
  enemy,
  enemyCard,
  heroes,
  mayaCard,
} from "../utils/testobjects";
import { fightState, gameState } from "../utils/teststates";
import { FightState, ISpell } from "../utils/types";

test("generateDeck function returns correct character cards", () => {
  const deckForOne: ISpell[] = generateDeck([heroes[0]], baseCards15);
  expect(deckForOne.length).toEqual(15);
});

test("generateEnemyDeck function returns correct number for enemy lifes", () => {
  const deckForEnemy: ISpell[] = generateEnemyDeck(enemy);
  expect(deckForEnemy.length).toEqual(2);
});

test("updateHeroDeck shuffles if there are no cards left", () => {
  const deckForTwo: ISpell[] = generateDeck(heroes.slice(0, 2), baseCards15);
  const deckForEnemy: ISpell[] = generateEnemyDeck(enemy);
  const newFightState: FightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: deckForTwo.slice(0, 3),
    heroDeck: [],
    heroDrop: deckForTwo,
    enemyDeck: deckForEnemy,
  };
  const [newDeck, newDrop] = updateHeroDeck(newFightState, deckForTwo[0]);
  expect(newDeck.length).toEqual(15);
  expect(newDrop.length).toEqual(1);
});

test("Throws a correct error when adding a wrong card", () => {
  const spellsUnselected: ISpell[] = new Array(15).fill(0).map((x, n) => ({
    ...mayaCard,
    id: "base_hit" + n,
    name: "Base Hit " + n,
  }));
  expect(() => changeCardsInDeck(spellsUnselected, 18)).toThrow(
    "Can't find the card you're trying to select in player's cards"
  );
});

test("Correctly adds Card to Player's deck", () => {
  const spellsUnselected: ISpell[] = new Array(15).fill(0).map((x, n) => ({
    ...mayaCard,
    id: "base_hit" + n,
    name: "Base Hit " + n,
  }));

  const spellsSelected: ISpell[] = new Array(15).fill(0).map((x, n) => ({
    ...enemyCard,
    id: "base_hit" + n,
    name: "Base Hit " + n,
  }));

  const spellsMore = spellsSelected.concat([mayaCard, mayaCard]);
  spellsUnselected[0].selected = false;
  const addingFirst = changeCardsInDeck(spellsUnselected, 0);
  expect(addingFirst.length).toEqual(15);
  expect(addingFirst[0].selected).toBeTruthy();

  spellsUnselected[3].selected = false;
  const addingThird = changeCardsInDeck(spellsUnselected, 3);
  expect(addingThird.length).toEqual(15);
  expect(addingThird[3].selected).toBeTruthy();

  spellsSelected[0].selected = true;
  const chaingingFirstTaken = changeCardsInDeck(spellsSelected, 0);
  expect(chaingingFirstTaken.length).toEqual(15);
  expect(chaingingFirstTaken[0].selected).not.toBeTruthy();

  spellsSelected[3].selected = true;
  const changingThirdTaken = changeCardsInDeck(spellsSelected, 3);
  expect(changingThirdTaken.length).toEqual(15);
  expect(changingThirdTaken[3].selected).not.toBeTruthy();

  spellsMore.map((s: ISpell, i: number) =>
    i < 15 ? (s.selected = true) : (s.selected = false)
  );
  const addingWhenAllSelected = changeCardsInDeck(spellsMore, 15);
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
      id: "story",
      data: "arena0",
    },
  ];
  const game = JSON.parse(JSON.stringify(gameState));
  game.adventures[2].open = false;
  const currentStory = game.adventures[1].storyGroups[1].stories[1];
  currentStory.action = action;
  const res = finishStory(game, currentStory);
  const stories = res.adventures[1].storyGroups || null;
  expect(stories).not.toBeNull();
  expect(res.npcs[0].dial).toBe(action[0].data);
  expect(res.adventures[1].open).toBeTruthy();
  //@ts-ignore
  expect(res.adventures[1].storyGroups[0].stories[2].open).toBeTruthy();
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
  const currentStory = game.adventures[1].storyGroups[1].stories[1];
  currentStory.action = action;
  const res = finishStory(game, currentStory);
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
  const currentStory = game.adventures[1].storyGroups[1].stories[1];
  currentStory.action = action;
  const res = finishStory(game, currentStory);
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
  const currentStory = game.adventures[1].storyGroups[1].stories[1];
  currentStory.action = action;
  const res = finishStory(game, currentStory);
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
  const nellCards = new Array(6).fill(0).map((x, n) => ({
    ...baseCards15[0],
    id: "some" + n,
    name: "Some Hit " + n,
    element: "fire",
  }));
  const newPlayer = { ...game.player, heroes: game.heroes.slice(0, 2) };
  const currentStory = game.adventures[1].storyGroups[1].stories[1];
  currentStory.action = action;
  const res = finishStory(
    { ...game, player: newPlayer, spells: game.spells.concat(nellCards) },
    currentStory
  );
  expect(res.heroes.length).toBe(3);
  expect(res.spells.length).toBe(21);
});

test("Adds update correctly if actions requires it", () => {
  const action = [
    {
      type: "addUpdate" as "addUpdate",
      id: "fire",
      data: "fire_1",
    },
  ];
  const game = JSON.parse(JSON.stringify(gameState));
  const newPlayer = { ...game.player, spellUpdates: [game.spellUpdates[1]] };
  const currentStory = game.adventures[1].storyGroups[1].stories[1];
  currentStory.action = action;
  const res = finishStory({ ...game, player: newPlayer }, currentStory);
  expect(res.spellUpdates.length).toBe(1);
  expect(res.spellUpdates[0].id).toEqual(action[0].data);
});

test("Can't add the same hero if exists", () => {
  const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
  const action = [
    {
      type: "addHero" as "addHero",
      id: "nell",
      data: "fire",
    },
  ];
  const nellSpells: ISpell[] = new Array(6).fill(0).map((x, n) => ({
    ...baseCards15[0],
    id: "some" + n,
    name: "Some Hit " + n,
    element: "fire",
  }));
  const newPlayer = { ...gameState.player, heroes: gameState.heroes };
  const game = JSON.parse(JSON.stringify(gameState));
  const currentStory = game.adventures[1].storyGroups[1].stories[1];
  currentStory.action = action;
  const res = finishStory(
    { ...game, spells: game.spells.concat(nellSpells), player: newPlayer },
    currentStory
  );
  expect(res.heroes.length).toBe(5);
  expect(warn).toBeCalledWith("Trying to add the same nell hero again");
  warn.mockReset();
});

test("Can't add the same update if exists", () => {
  const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
  const action = [
    {
      type: "addUpdate" as "addUpdate",
      id: "fire",
      data: "fire_1",
    },
  ];
  const newPlayer = {
    ...gameState.player,
    spellUpdates: gameState.spellUpdates,
  };
  const game = JSON.parse(JSON.stringify(gameState));
  const currentStory = game.adventures[1].storyGroups[1].stories[1];
  currentStory.action = action;
  const res = finishStory({ ...game, player: newPlayer }, currentStory);
  expect(res.spellUpdates.length).toBe(3);
  expect(warn).toBeCalledWith("Trying to add the same fire_1 update again");
  warn.mockReset();
});
