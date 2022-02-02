import { enemyAttack } from "../utils/hitlogic";
import { mayaCard, enemyCard } from "../utils/testobjects";
import { fightState } from "../utils/teststates";
import { colorType, FightState, ISpell } from "../utils/types";
const testHeroLife = { ...fightState.hero, life: 10 };

// Base to Base attacks
test("Enemy attacks base card 3, hero defends base card 5", () => {
  const newHeroCard: ISpell = { ...mayaCard, strength: 5 };
  const newEnemyCard: ISpell = { ...enemyCard, strength: 3 };
  const newFightState: FightState = {
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
  const newHeroCard: ISpell = { ...mayaCard, strength: 3 };
  const newEnemyCard: ISpell = { ...enemyCard, strength: 3 };
  const newFightState: FightState = {
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
  const newHeroCard: ISpell = { ...mayaCard, strength: 3 };
  const newEnemyCard: ISpell = { ...enemyCard, strength: 5 };
  const newFightState: FightState = {
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
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 5,
    color: "red" as colorType,
  };
  const newEnemyCard: ISpell = { ...enemyCard, strength: 3 };
  const newFightState: FightState = {
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
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 3,
    color: "red" as colorType,
  };
  const newEnemyCard: ISpell = { ...enemyCard, strength: 3 };
  const newFightState: FightState = {
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
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 3,
    color: "red" as colorType,
  };
  const newEnemyCard: ISpell = { ...enemyCard, strength: 5 };
  const newFightState: FightState = {
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
  const newHeroCard: ISpell = { ...mayaCard, strength: 5 };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
  };
  const newFightState: FightState = {
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
  const newHeroCard: ISpell = { ...mayaCard, strength: 3 };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
  };
  const newFightState: FightState = {
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
  const newHeroCard: ISpell = { ...mayaCard, strength: 3 };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 5,
    color: "red" as colorType,
  };
  const newFightState: FightState = {
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
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 5,
    color: "red" as colorType,
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
  };
  const newFightState: FightState = {
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
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 3,
    color: "red" as colorType,
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
  };
  const newFightState: FightState = {
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
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 3,
    color: "red" as colorType,
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 5,
    color: "red" as colorType,
  };
  const newFightState: FightState = {
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
