import { enemyAttack } from "../utils/gamelogic";
const cards = [
  {
    id: "base_hit1",
    name: "Base Hit 1",
    strength: 1,
    quantity: 2,
    character: null,
    element: null,
    image: "../img/Spells/spell2.jpg",
    selected: true,
    owner: "hero" as "hero",
  },
  {
    id: "base_hit1_tara",
    name: "Tara Hit 1",
    strength: 1,
    quantity: 1,
    character: "tara",
    element: "metal" as "metal",
    image: "../img/Spells/spell2.jpg",
    selected: true,
    owner: "hero" as "hero",
  },
  {
    id: "base_hit1_tara",
    name: "Tara Hit 1",
    strength: 1,
    quantity: 1,
    character: "maya",
    element: "earth" as "earth",
    image: "../img/Spells/spell2.jpg",
    selected: true,
    owner: "hero" as "hero",
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
const heroCard = {
  id: "base_hit1",
  name: "Base Hit 1",
  strength: 1,
  quantity: 1,
  character: null,
  element: null,
  image: "",
  selected: false,
  owner: "hero" as "hero",
};
const enemyCard = {
  id: "base_hit1",
  name: "Base Hit 1",
  strength: 1,
  quantity: 1,
  character: null,
  element: null,
  image: "",
  selected: false,
  owner: "enemy" as "enemy",
};
const fightState = {
  hero: {
    health: 15,
    currentHealth: 15,
    mana: 15,
    currentMana: 10,
  },
  enemy: enemy,
  heroDeck: cards,
  heroHand: [heroCard, heroCard, heroCard, heroCard, heroCard],
  heroDrop: [],
  enemyDeck: [enemyCard, enemyCard],
  enemyDrop: [],
  elements: ["fire" as "fire", "earth" as "earth"],
  element: "fire" as "fire",
};

test("Enemy Attacks and hero counters with a simple card", () => {
  const enemyAttackRes = enemyAttack(fightState, heroCard, enemyCard);
  expect(enemyAttackRes.element).toEqual("earth");
  expect(enemyAttackRes.hero.currentHealth).toBe(14);
  expect(enemyAttackRes.heroDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDrop.length).toBe(1);
  expect(enemyAttackRes.enemyDeck.length).toBe(1);
  expect(enemyAttackRes.heroDeck.length).toBe(2);
  expect(enemyAttackRes.heroHand.length).toBe(5);
});

test("Enemy Attacks with a trump card, no protection from a simple card", () => {
  const enemyAttackRes = enemyAttack(
    fightState,
    {
      id: "base_hit1",
      name: "Base Hit 1",
      strength: 1,
      quantity: 1,
      character: null,
      element: null,
      image: "",
      selected: false,
      owner: "hero" as "hero",
    },
    {
      id: "base_hit1",
      name: "Base Hit 1",
      strength: 3,
      quantity: 1,
      character: null,
      element: "fire" as "fire",
      image: "",
      selected: false,
      owner: "enemy" as "enemy",
    }
  );
  console.log(enemyAttackRes);
  expect(enemyAttackRes.hero.currentHealth).toBe(12);
});

test("Enemy Attacks with a trump card, hero has a smaller trump card", () => {
  const enemyAttackRes = enemyAttack(
    fightState,
    {
      id: "base_hit1",
      name: "Base Hit 1",
      strength: 2,
      quantity: 1,
      character: null,
      element: "fire" as "fire",
      image: "",
      selected: false,
      owner: "hero" as "hero",
    },
    {
      id: "base_hit1",
      name: "Base Hit 1",
      strength: 3,
      quantity: 1,
      character: null,
      element: "fire" as "fire",
      image: "",
      selected: false,
      owner: "enemy" as "enemy",
    }
  );
  console.log(enemyAttackRes);
  expect(enemyAttackRes.hero.currentHealth).toBe(14);
});

test("Enemy Attacks with a simple card, hero has a trump card", () => {
  const enemyAttackRes = enemyAttack(
    fightState,
    {
      id: "base_hit1",
      name: "Base Hit 1",
      strength: 2,
      quantity: 1,
      character: null,
      element: "fire" as "fire",
      image: "",
      selected: false,
      owner: "hero" as "hero",
    },
    {
      id: "base_hit1",
      name: "Base Hit 1",
      strength: 3,
      quantity: 1,
      character: null,
      element: "earth" as "earth",
      image: "",
      selected: false,
      owner: "enemy" as "enemy",
    }
  );
  expect(enemyAttackRes.hero.currentHealth).toBe(15);
});
