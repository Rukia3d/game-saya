import { Heroes } from "../Main/Heroes";
import { enemyAttack } from "../utils/fightlogic";
import { fightState, mayaCard, enemyCard } from "../utils/testobjects";
import { elementType, spellEffectType } from "../utils/types";
const testHeroLife = { ...fightState.hero, life: 10 };

// Base to Base attacks
test("Enemy attacks base card 3, hero defends base card 5", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({ ...mayaCard, strength: 5 }),
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 3 }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

test("Enemy attacks base card 3, hero defends base card 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({ ...mayaCard, strength: 3 }),
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 3 }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

test("Enemy attacks base card 5, hero defends base card 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({ ...mayaCard, strength: 3 }),
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 5 }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life - 2);
});

// Base to defence Trump
test("Enemy attacks base card 3, hero defends trump card 5", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 5,
      element: "fire",
    }),
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 3 }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

test("Enemy attacks base card 3, hero defends trump card 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
      element: "fire",
    }),
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 3 }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

test("Enemy attacks base card 5, hero defends trump card 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
      element: "fire",
    }),
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 5 }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

// Trump to base defence
test("Enemy attacks trump card 3, hero defends base card 5", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 5,
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 3,
      element: "fire",
    }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life - 3);
});

test("Enemy attacks trump card 3, hero defends base card 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 3,
      element: "fire",
    }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life - 3);
});

test("Enemy attacks trump card 5, hero defends base card 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 5,
      element: "fire",
    }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life - 5);
});

test("Enemy attacks trump card 3, hero defends trump card 5", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 5,
      element: "fire",
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 3,
      element: "fire",
    }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});

test("Enemy attacks trump card 3, hero defends trump card 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
      element: "fire",
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 3,
      element: "fire",
    }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life);
});
test("Enemy attacks trump card 5, hero defends trump card 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
      element: "fire",
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 5,
      element: "fire",
    }),
    hero: testHeroLife,
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(testHeroLife.life - 2);
});

test("Update effect h_heal works with simple attack", () => {
  const h_heal_1 = {
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
  const noTrumpFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
      element: "earth" as elementType,
      updates: [h_heal_1],
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 3,
      element: "fire",
    }),
    element: "air" as elementType,
    elements: ["fire", "earth", "air"],
    hero: testHeroLife,
  };
  expect(
    enemyAttack(
      noTrumpFightState,
      noTrumpFightState.heroHand[2],
      noTrumpFightState.enemyDeck[2]
    ).hero.life
  ).toBe(11);
});

test("Update effect h_heal works with simple attack with any effect", () => {
  const h_heal_1 = {
    element: "earth" as elementType,
    mana: 1,
    resource_base: [],
    effect: "h_heal" as spellEffectType,
    action: "health, +3",
    price: null,
    name: "Heal 1",
    description: "Earth: heal 1 (mana 1)",
    id: "earth_1",
  };
  const noTrumpFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
      element: "earth" as elementType,
      updates: [h_heal_1],
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 3,
      element: "fire",
    }),
    element: "air" as elementType,
    elements: ["fire", "earth", "air"],
    hero: testHeroLife,
  };
  expect(
    enemyAttack(
      noTrumpFightState,
      noTrumpFightState.heroHand[2],
      noTrumpFightState.enemyDeck[2]
    ).hero.life
  ).toBe(13);
});

test("Update effect h_heal works with trump defence", () => {
  const h_heal_1 = {
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
  const noTrumpFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 1,
      element: "earth" as elementType,
      updates: [h_heal_1],
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 3,
      element: "fire",
    }),
    element: "earth" as elementType,
    elements: ["fire", "earth", "air"],
    hero: testHeroLife,
  };
  expect(
    enemyAttack(
      noTrumpFightState,
      noTrumpFightState.heroHand[2],
      noTrumpFightState.enemyDeck[2]
    ).hero.life
  ).toBe(11);
});

test("Update effect h_heal works with trump attack", () => {
  const h_heal_1 = {
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
  const noTrumpFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 1,
      element: "earth" as elementType,
      updates: [h_heal_1],
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 3,
      element: "fire",
    }),
    element: "fire" as elementType,
    elements: ["fire", "earth", "air"],
    hero: testHeroLife,
  };
  expect(
    enemyAttack(
      noTrumpFightState,
      noTrumpFightState.heroHand[2],
      noTrumpFightState.enemyDeck[2]
    ).hero.life
  ).toBe(8);
});

test("Update effect h_heal doesn't work if there's no mana", () => {
  const updatedHero = { ...testHeroLife, mana: 0 };
  const h_heal_1 = {
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
  const noTrumpFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
      element: "earth" as elementType,
      updates: [h_heal_1],
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 3,
      element: "fire",
    }),
    element: "air" as elementType,
    elements: ["fire", "earth", "air"],
    hero: updatedHero,
  };
  const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
  const res = enemyAttack(
    noTrumpFightState,
    noTrumpFightState.heroHand[2],
    noTrumpFightState.enemyDeck[2]
  );
  expect(res.hero.life).toBe(10);
  expect(warn).toBeCalledWith("Not enough mana to use");
  warn.mockReset();
});

test("Update effect h_heal doesn't work if character is not present", () => {
  const h_heal_1 = {
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
  const noTrumpFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
      element: "earth" as elementType,
      updates: [h_heal_1],
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 3,
      element: "fire",
    }),
    element: "air" as elementType,
    elements: ["fire", "earth", "air"],
    hero: testHeroLife,
    heroes: fightState.heroes.slice(1, 3),
  };
  const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
  const res = enemyAttack(
    noTrumpFightState,
    noTrumpFightState.heroHand[2],
    noTrumpFightState.enemyDeck[2]
  );
  expect(res.hero.life).toBe(10);
  expect(warn).toBeCalledWith("Hero is not present to use this update");
  warn.mockReset();
});
