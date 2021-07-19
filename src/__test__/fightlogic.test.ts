import { enemyAttack } from "../utils/fightlogic";
import { fightState, mayaCard, enemyCard } from "../utils/testobjects";

test("Simple attack: enemy attacks for 3 and hero counters with attack 1", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({ ...mayaCard, strength: 1 }),
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 3 }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.element).toEqual("earth");
  expect(enemyAttackRes.hero.currentHealth).toBe(12);
  expect(enemyAttackRes.heroDrop.length).toBe(2);
  expect(enemyAttackRes.enemyDrop.length).toBe(2);
  expect(enemyAttackRes.enemyDeck.length).toBe(2);
  expect(enemyAttackRes.heroDeck.length).toBe(1);
  expect(enemyAttackRes.heroHand.length).toBe(3);
});

test("Simple attack: enemy attacks for 2 and hero counters with attack 2", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({ ...mayaCard, strength: 2 }),
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 2 }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.element).toEqual("earth");
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
});

test("Simple attack: enemy attacks for 1 and hero counters with attack 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({ ...mayaCard, strength: 3 }),
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 1 }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.element).toEqual("earth");
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
});

test("Simple attack: enemy attacks for 3 and hero counters with attack 1 trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 3 }),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 1,
      element: "earth" as "earth",
    }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
});

test("Simple attack: enemy attacks for 2 and hero counters with attack 2 trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 2 }),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 2,
      element: "earth" as "earth",
    }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
});

test("Simple attack: enemy attacks for 1 and hero counters with attack 3 trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 1 }),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
      element: "earth" as "earth",
    }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
});

test("Simple attack: enemy attacks for 3 with trump and hero counters with attack 1", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 3,
      element: "earth" as "earth",
    }),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 1,
    }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(12);
});

test("Simple attack: enemy attacks for 2 with trump and hero counters with attack 2", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 2,
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 2,
      element: "earth" as "earth",
    }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(13);
});

test("Simple attack: enemy attacks for 1 with trump and hero counters with attack 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
    }),
    enemyDeck: fightState.enemyDeck.concat({
      ...enemyCard,
      strength: 1,
      element: "earth" as "earth",
    }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(14);
});

test("Hero special card, attack for 3, counter for 1, no trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 1,
      trump: ["strength", 1],
      effect: ["heal", 2],
      mana: 2,
    }),
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 3 }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.currentHealth).toBe(14);
  expect(enemyAttackRes.hero.currentMana).toBe(8);
});

test("Hero special card with max, attack for 1, counter for 3, no trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
      effect: ["heal", 2],
      mana: 2,
    }),
    hero: {
      health: 15,
      currentHealth: 15,
      mana: 15,
      currentMana: 10,
    },
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 1 }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
  expect(enemyAttackRes.hero.currentMana).toBe(8);
});

test("Hero special card, attack for 3, counter for 1, no mana", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 1,
      effect: ["heal", 2],
      mana: 2,
    }),
    hero: {
      health: 15,
      currentHealth: 15,
      mana: 15,
      currentMana: 0,
    },
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 3 }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.currentHealth).toBe(12);
  expect(enemyAttackRes.hero.currentMana).toBe(0);
});
