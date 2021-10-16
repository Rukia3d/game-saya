import { enemyAttack } from "../utils/fightlogic";
import { fightState, mayaCard, enemyCard, heroes } from "../utils/testobjects";
import { elementType, spellEffectType, SpellUpdate } from "../utils/types";
const testHeroLife = { ...fightState.hero, life: 10 };

// Base to Base attacks
test("Enemy attacks base card 3, hero defends base card 5", () => {
  const newHeroCard = { ...mayaCard, strength: 5 };
  const newEnemyCard = { ...enemyCard, strength: 3 };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    heroCardIndex: 2,
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

test("Enemy attacks base card 3, hero defends base card 3", () => {
  const newHeroCard = { ...mayaCard, strength: 3 };
  const newEnemyCard = { ...enemyCard, strength: 3 };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    heroCardIndex: 2,
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

test("Enemy attacks base card 5, hero defends base card 3", () => {
  const newHeroCard = { ...mayaCard, strength: 3 };
  const newEnemyCard = { ...enemyCard, strength: 5 };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life - 2);
});

// Base to defence Trump
test("Enemy attacks base card 3, hero defends trump card 5", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 5,
    element: "fire" as elementType,
  };
  const newEnemyCard = { ...enemyCard, strength: 3 };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    heroCardIndex: 2,
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

test("Enemy attacks base card 3, hero defends trump card 3", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newEnemyCard = { ...enemyCard, strength: 3 };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

test("Enemy attacks base card 5, hero defends trump card 3", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newEnemyCard = { ...enemyCard, strength: 5 };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

// Trump to base defence
test("Enemy attacks trump card 3, hero defends base card 5", () => {
  const newHeroCard = { ...mayaCard, strength: 5 };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life - 3);
});

test("Enemy attacks trump card 3, hero defends base card 3", () => {
  const newHeroCard = { ...mayaCard, strength: 3 };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life - 3);
});

test("Enemy attacks trump card 5, hero defends base card 3", () => {
  const newHeroCard = { ...mayaCard, strength: 3 };
  const newEnemyCard = {
    ...enemyCard,
    strength: 5,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life - 5);
});

test("Enemy attacks trump card 3, hero defends trump card 5", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 5,
    element: "fire" as elementType,
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

test("Enemy attacks trump card 3, hero defends trump card 3", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

test("Enemy attacks trump card 5, hero defends trump card 3", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 5,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(newFightState);
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life - 2);
});

const h_heal_1: SpellUpdate = {
  element: "earth" as elementType,
  mana: 1,
  resource_base: [],
  effect: "h_heal" as spellEffectType,
  action: "health, +1",
  price: null,
  name: "Heal 1",
  description: "Earth: heal 1 (mana 1)",
  id: "earth_1",
};

test("Update effect h_heal works with simple attack", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 3,
    element: "earth" as elementType,
    updates: [h_heal_1],
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "air" as elementType,
    elements: ["fire", "earth", "air"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(11);
});

test("Update effect h_heal works with simple attack with any effect", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 3,
    element: "earth" as elementType,
    updates: [{ ...h_heal_1, action: "health, +3" }],
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "air" as elementType,
    elements: ["fire", "earth", "air"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(13);
});

test("Update effect h_heal works with trump defence", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 1,
    element: "earth" as elementType,
    updates: [h_heal_1],
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "earth" as elementType,
    elements: ["fire", "earth", "air"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(11);
});

test("Update effect h_heal works with trump attack", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 1,
    element: "earth" as elementType,
    updates: [h_heal_1],
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "fire" as elementType,
    elements: ["fire", "earth", "air"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(8);
});

test("Update effect h_heal doesn't work if there's no mana", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 3,
    element: "earth" as elementType,
    updates: [h_heal_1],
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const updatedHero = { ...testHeroLife, mana: 0 };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "air" as elementType,
    elements: ["fire", "earth", "air"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: updatedHero,
  };
  const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
  const res = enemyAttack(newFightState);
  expect(res.hero.life).toBe(10);
  expect(warn).toBeCalledWith("Not enough mana to use");
  warn.mockReset();
});

test("Update effect h_heal doesn't work if character is not present", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 3,
    element: "earth" as elementType,
    updates: [h_heal_1],
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "air" as elementType,
    elements: ["fire", "earth", "air"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
    heroes: fightState.heroes.slice(1, 3),
  };
  const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
  const res = enemyAttack(newFightState);
  expect(res.hero.life).toBe(10);
  expect(warn).toBeCalledWith("Hero is not present to use this update");
  warn.mockReset();
});

const h_trumpremove_1: SpellUpdate = {
  element: "air" as elementType,
  mana: 1,
  resource_base: [],
  effect: "h_trumpremove" as spellEffectType,
  action: "trump, 0",
  price: "",
  name: "Simplify",
  description: "Air: make not trump (mana 1)",
  id: "air_1",
};

test("Update effect h_trumpremove_1 works with trump attack", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 1,
    element: "air" as elementType,
    updates: [h_trumpremove_1],
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "fire" as elementType,
    elements: ["fire", "earth", "air"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
    heroes: heroes,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(8);
});

test("Update effect h_trumpremove_1 doesnt works with simple attack", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 1,
    element: "air" as elementType,
    updates: [h_trumpremove_1],
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "earth" as elementType,
    elements: ["fire", "earth", "air"],
    hero: testHeroLife,
    heroCardIndex: 2,
    enemyCardIndex: 2,
    heroes: heroes,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(8);
});

const h_trumpset_1: SpellUpdate = {
  element: "air" as elementType,
  mana: 2,
  resource_base: [],
  effect: "h_trumpset" as spellEffectType,
  action: "trump, air",
  price: "",
  name: "Make Air",
  description: "Air: change trump to air next turn (mana 2)",
  id: "air_2",
};

test("Update effect h_trumpset_1 works", () => {
  const newHeroCard = {
    ...mayaCard,
    strength: 1,
    element: "air" as elementType,
    updates: [h_trumpset_1],
  };
  const newEnemyCard = {
    ...enemyCard,
    strength: 3,
    element: "fire" as elementType,
  };
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "air" as elementType,
    elements: ["fire", "earth", "air"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
    heroes: heroes,
  };
  expect(enemyAttack(newFightState).element).toEqual("air");
});
