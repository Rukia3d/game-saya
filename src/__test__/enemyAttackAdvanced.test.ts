import { enemyAttack } from "../utils/hitlogic";
import { mayaCard, enemyCard, heroes } from "../utils/testobjects";
import { fightState } from "../utils/teststates";
import {
  colorType,
  spellEffectType,
  ISpellUpdate,
  ISpell,
  schoolType,
  FightState,
} from "../utils/types";
const testHeroLife = { ...fightState.hero, life: 10 };

const h_heal_1: ISpellUpdate = {
  school: "restoration" as schoolType,
  mana: 1,
  resource_base: [],
  effect: "h_heal" as spellEffectType,
  action: { action: "health", strength: 1 },
  price: null,
  name: "Heal 1",
  description: "Earth: heal 1 (mana 1)",
  id: "earth_1",
};

test("Update effect h_heal works with simple attack", () => {
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 3,
    color: "violet" as colorType,
    school: "restoration" as schoolType,
    updates: [h_heal_1],
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
    school: "oblation" as schoolType,
  };
  const newFightState: FightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "grey" as colorType,
    elements: ["red", "violet", "grey"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(11);
});

test("Update effect h_heal works with simple attack with any effect", () => {
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 3,
    color: "violet" as colorType,
    school: "restoration" as schoolType,
    updates: [{ ...h_heal_1, action: { action: "health", strength: 3 } }],
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
    school: "oblation" as schoolType,
  };
  const newFightState: FightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "air" as colorType,
    elements: ["fire", "earth", "air"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(13);
});

test("Update effect h_heal works with trump defence", () => {
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 1,
    color: "violet" as colorType,
    school: "restoration" as schoolType,
    updates: [h_heal_1],
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
    school: "oblation" as schoolType,
  };
  const newFightState: FightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "violet" as colorType,
    elements: ["red", "violet", "green"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(11);
});

test("Update effect h_heal works with trump attack", () => {
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 1,
    color: "violet" as colorType,
    school: "restoration" as schoolType,
    updates: [h_heal_1],
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
    school: "oblation" as schoolType,
  };
  const newFightState: FightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "red" as colorType,
    elements: ["red", "violet", "green"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(8);
});

test("Update effect h_heal doesn't work if there's no mana", () => {
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 3,
    color: "violet" as colorType,
    school: "restoration" as schoolType,
    updates: [h_heal_1],
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
    school: "oblation" as schoolType,
  };
  const updatedHero = { ...testHeroLife, mana: 0 };
  const newFightState: FightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "air" as colorType,
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
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 3,
    color: "violet" as colorType,
    school: "restoration" as schoolType,
    updates: [h_heal_1],
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
    school: "oblation" as schoolType,
  };
  const newFightState: FightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "air" as colorType,
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

const h_trumpremove_1: ISpellUpdate = {
  school: "deception" as schoolType,
  mana: 1,
  resource_base: [],
  effect: "h_trumpremove" as spellEffectType,
  action: { action: "trump", strength: 0 },
  price: null,
  name: "Simplify",
  description: "Air: make not trump (mana 1)",
  id: "air_1",
};

test("Update effect h_trumpremove_1 works with trump attack", () => {
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 1,
    color: "green" as colorType,
    school: "deception" as schoolType,
    updates: [h_trumpremove_1],
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
    school: "oblation" as schoolType,
  };
  const newFightState: FightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "red" as colorType,
    elements: ["red", "violet", "green"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
    heroes: heroes,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(8);
});

test("Update effect h_trumpremove_1 doesnt works with simple attack", () => {
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 1,
    color: "green" as colorType,
    school: "deception" as schoolType,
    updates: [h_trumpremove_1],
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
    school: "oblation" as schoolType,
  };
  const newFightState: FightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "violet" as colorType,
    elements: ["red", "violet", "green"],
    hero: testHeroLife,
    heroCardIndex: 2,
    enemyCardIndex: 2,
    heroes: heroes,
  };
  expect(enemyAttack(newFightState).hero.life).toBe(8);
});

const h_trumpset_1: ISpellUpdate = {
  school: "deception" as schoolType,
  mana: 2,
  resource_base: [],
  effect: "h_trumpset" as spellEffectType,
  action: { action: "trump", strength: "green" },
  price: null,
  name: "Make Air",
  description: "Air: change trump to air next turn (mana 2)",
  id: "air_2",
};

test("Update effect h_trumpset_1 works", () => {
  const newHeroCard: ISpell = {
    ...mayaCard,
    strength: 1,
    color: "green" as colorType,
    school: "deception" as schoolType,
    updates: [h_trumpset_1],
  };
  const newEnemyCard: ISpell = {
    ...enemyCard,
    strength: 3,
    color: "red" as colorType,
    school: "oblation" as schoolType,
  };
  const newFightState: FightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat(newHeroCard),
    enemyDeck: fightState.enemyDeck.concat(newEnemyCard),
    element: "green" as colorType,
    elements: ["red", "violet", "green"],
    heroCardIndex: 2,
    enemyCardIndex: 2,
    hero: testHeroLife,
    heroes: heroes,
  };
  expect(enemyAttack(newFightState).element).toEqual("green");
});
