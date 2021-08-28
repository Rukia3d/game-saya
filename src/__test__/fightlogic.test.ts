import { enemyAttack } from "../utils/fightlogic";
import { fightState, mayaCard, enemyCard } from "../utils/testobjects";
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

test.skip("Hero special card, attack for 3, counter for 1, no trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 1,
      mana: 2,
    }),
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 3 }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(fightState.hero.life - 1);
  expect(enemyAttackRes.hero.mana).toBe(fightState.hero.mana - 2);
});

test.skip("Hero special card with mana, attack for 1, counter for 3, no trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 3,
      mana: 2,
    }),
    hero: {
      maxlife: 15,
      life: 15,
      maxMana: 15,
      mana: 10,
    },
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 1 }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(15);
  expect(enemyAttackRes.hero.mana).toBe(8);
});

test.skip("Hero special card, attack for 3, counter for 1, no mana", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...mayaCard,
      strength: 1,
      mana: 2,
    }),
    hero: {
      maxlife: 15,
      life: 15,
      maxMana: 15,
      mana: 0,
    },
    enemyDeck: fightState.enemyDeck.concat({ ...enemyCard, strength: 3 }),
  };
  const enemyAttackRes = enemyAttack(
    newFightState,
    newFightState.heroHand[2],
    newFightState.enemyDeck[2]
  );
  expect(enemyAttackRes.hero.life).toBe(12);
  expect(enemyAttackRes.hero.mana).toBe(0);
});
