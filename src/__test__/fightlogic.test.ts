import { convertTypeAcquisitionFromJson } from "typescript";
import { enemyAttack } from "../utils/fightlogic";
import { effectValue, FightState, Spell, trumpValue } from "../utils/types";
const cards = [
  {
    id: "base_hit1",
    name: "Base Hit 1",
    strength: 1,
    character: null,
    element: null,
    image: "../img/Spells/spell2.jpg",
    selected: true,
    owner: "hero" as "hero",
    mana: 0,
  },
  {
    id: "base_hit1_tara",
    name: "Tara Hit 1",
    strength: 1,
    character: "tara",
    element: "metal" as "metal",
    image: "../img/Spells/spell2.jpg",
    selected: true,
    owner: "hero" as "hero",
    mana: 0,
  },
  {
    id: "base_hit1_tara",
    name: "Tara Hit 1",
    strength: 1,
    character: "maya",
    element: "earth" as "earth",
    image: "../img/Spells/spell2.jpg",
    selected: true,
    owner: "hero" as "hero",
    mana: 0,
  },
];
const enemy = {
  id: "dude",
  name: "Dude",
  element: "Earth",
  experience: "novice" as "novice",
  life: 2,
  cards: cards,
  owner: "enemy" as "enemy",
};
const heroCard: Spell = {
  id: "base_hit1",
  name: "Base Hit 1",
  strength: 0,
  character: null,
  element: null,
  image: "",
  selected: false,
  owner: "hero" as "hero",
  mana: 0,
};
const enemyCard: Spell = {
  id: "base_hit1",
  name: "Base Hit 1",
  strength: 0,
  character: null,
  element: null,
  image: "",
  selected: false,
  owner: "enemy" as "enemy",
  mana: 0,
};
const fightState: FightState = {
  hero: {
    health: 15,
    currentHealth: 15,
    mana: 15,
    currentMana: 10,
  },
  enemy: enemy,
  heroDeck: cards,
  heroHand: [heroCard, heroCard, heroCard, heroCard],
  heroDrop: [],
  enemyDeck: [enemyCard, enemyCard],
  enemyDrop: [],
  elements: ["fire" as "fire", "earth" as "earth"],
  element: "fire" as "fire",
};

test("Simple attack: enemy attacks for 3 and hero counters with attack 1", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({ ...heroCard, strength: 1 }),
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 3,
  });
  expect(enemyAttackRes.element).toEqual("earth");
  expect(enemyAttackRes.hero.currentHealth).toBe(12);
  expect(enemyAttackRes.heroDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDeck.length).toBe(1);
  expect(enemyAttackRes.heroDeck.length).toBe(2);
  expect(enemyAttackRes.heroHand.length).toBe(5);
});

test("Simple attack: enemy attacks for 2 and hero counters with attack 2", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({ ...heroCard, strength: 2 }),
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 2,
  });
  expect(enemyAttackRes.element).toEqual("earth");
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
  expect(enemyAttackRes.heroDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDeck.length).toBe(1);
  expect(enemyAttackRes.heroDeck.length).toBe(2);
  expect(enemyAttackRes.heroHand.length).toBe(5);
});

test("Simple attack: enemy attacks for 1 and hero counters with attack 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({ ...heroCard, strength: 3 }),
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 1,
  });
  expect(enemyAttackRes.element).toEqual("earth");
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
  expect(enemyAttackRes.heroDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDeck.length).toBe(1);
  expect(enemyAttackRes.heroDeck.length).toBe(2);
  expect(enemyAttackRes.heroHand.length).toBe(5);
});

test("Simple attack: enemy attacks for 3 and hero counters with attack 1 trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    heroHand: fightState.heroHand.concat({
      ...heroCard,
      strength: 1,
      element: "earth" as "earth",
    }),
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 3,
  });
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
  expect(enemyAttackRes.heroDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDeck.length).toBe(1);
  expect(enemyAttackRes.heroDeck.length).toBe(2);
  expect(enemyAttackRes.heroHand.length).toBe(5);
});

test("Simple attack: enemy attacks for 2 and hero counters with attack 2 trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    heroHand: fightState.heroHand.concat({
      ...heroCard,
      strength: 2,
      element: "earth" as "earth",
    }),
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 2,
  });
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
  expect(enemyAttackRes.heroDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDeck.length).toBe(1);
  expect(enemyAttackRes.heroDeck.length).toBe(2);
  expect(enemyAttackRes.heroHand.length).toBe(5);
});

test("Simple attack: enemy attacks for 1 and hero counters with attack 3 trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    heroHand: fightState.heroHand.concat({
      ...heroCard,
      strength: 3,
      element: "earth" as "earth",
    }),
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 1,
  });
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
  expect(enemyAttackRes.heroDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDeck.length).toBe(1);
  expect(enemyAttackRes.heroDeck.length).toBe(2);
  expect(enemyAttackRes.heroHand.length).toBe(5);
});

test("Simple attack: enemy attacks for 3 with trump and hero counters with attack 1", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    heroHand: fightState.heroHand.concat({
      ...heroCard,
      strength: 1,
    }),
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 3,
    element: "earth" as "earth",
  });
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(12);
  expect(enemyAttackRes.heroDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDeck.length).toBe(1);
  expect(enemyAttackRes.heroDeck.length).toBe(2);
  expect(enemyAttackRes.heroHand.length).toBe(5);
});

test("Simple attack: enemy attacks for 2 with trump and hero counters with attack 2", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    heroHand: fightState.heroHand.concat({
      ...heroCard,
      strength: 2,
    }),
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 2,
    element: "earth" as "earth",
  });
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(13);
  expect(enemyAttackRes.heroDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDeck.length).toBe(1);
  expect(enemyAttackRes.heroDeck.length).toBe(2);
  expect(enemyAttackRes.heroHand.length).toBe(5);
});

test("Simple attack: enemy attacks for 1 with trump and hero counters with attack 3", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    element: "earth" as "earth",
    heroHand: fightState.heroHand.concat({
      ...heroCard,
      strength: 3,
    }),
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 1,
    element: "earth" as "earth",
  });
  expect(enemyAttackRes.element).toEqual("fire");
  expect(enemyAttackRes.hero.currentHealth).toBe(14);
  expect(enemyAttackRes.heroDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDeck.length).toBe(1);
  expect(enemyAttackRes.heroDeck.length).toBe(2);
  expect(enemyAttackRes.heroHand.length).toBe(5);
});

test("Hero special card, attack for 3, counter for 1, no trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...heroCard,
      strength: 1,
      trump: ["strength", 1],
      effect: ["heal", 2],
      mana: 2,
    }),
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 3,
  });
  expect(enemyAttackRes.hero.currentHealth).toBe(14);
  expect(enemyAttackRes.hero.currentMana).toBe(8);
});

test("Hero special card with max, attack for 1, counter for 3, no trump", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...heroCard,
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
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 1,
  });
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
  expect(enemyAttackRes.hero.currentMana).toBe(8);
});

test("Hero special card, attack for 3, counter for 1, no mana", () => {
  const newFightState = {
    ...JSON.parse(JSON.stringify(fightState)),
    heroHand: fightState.heroHand.concat({
      ...heroCard,
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
  };
  const enemyAttackRes = enemyAttack(newFightState, newFightState.heroHand[4], {
    ...enemyCard,
    strength: 3,
  });
  expect(enemyAttackRes.hero.currentHealth).toBe(12);
  expect(enemyAttackRes.hero.currentMana).toBe(0);
});
