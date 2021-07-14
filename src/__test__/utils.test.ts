import {
  unique,
  removeFromArray,
  shuffle,
  findLastOpenStory,
  findActiveCharacters,
} from "../utils/helpers";
import {
  changeCardsInDeck,
  generateDeck,
  generateEnemyDeck,
  updateHeroDeck,
  updateWinPlayer,
} from "../utils/gamelogic";
import { Character, StoryGroup } from "../utils/types";

test("Unique function returns correctly", () => {
  const array1 = [1, 2, 3, 4];
  const array2 = [1, 2, 2, 3, 4];
  expect(unique(array1)).toEqual(array1);
  expect(unique(array2)).toEqual(array1);
});

test("Remove from array function returns correctly", () => {
  const array1 = [1, 2, 3, 4];
  expect(removeFromArray(array1, 1)).toEqual([2, 3, 4]);
});

test("Shuffle function returns correctly", () => {
  const array1 = [1, 2, 3, 4];
  expect(shuffle(array1)).not.toEqual([2, 3, 4]);
});

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
    element: "metal",
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
    element: "earrth",
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

test("generateDeck function returns correct character cards", () => {
  const deckForOne = generateDeck(["maya"], cards);
  expect(deckForOne.length).toEqual(3);
});

test("generateEnemyDeck function returns correct number for enemy lifes", () => {
  const deckForEnemy = generateEnemyDeck(enemy);
  expect(deckForEnemy.length).toEqual(2);
});

test("updateHeroDeck shuffles if there are no cards left", () => {
  const deckForTwo = generateDeck(["maya", "tara"], cards);
  const deckForEnemy = generateEnemyDeck(enemy);
  const fightState = {
    hero: {
      health: 15,
      currentHealth: 15,
    },
    enemy: enemy,
    heroDeck: [],
    heroHand: deckForTwo.slice(0, 3),
    heroDrop: deckForTwo,
    enemyDeck: deckForEnemy,
    enemyDrop: [],
  };
  const [newDeck, newDrop] = updateHeroDeck(fightState, deckForTwo[0]);
  expect(newDeck.length).toEqual(4);
  expect(newDrop.length).toEqual(1);
});

test("updateWinPlayer assigns rewards correctly", () => {
  const player = {
    id: 1,
    cards: [],
    experience: 300,
    lifes: 3,
    heroes: [],
    resources: [
      { id: "gold", name: "Gold", image: "../", commonality: 2, quantity: 0 },
      { id: "iron", name: "Iron", image: "../", commonality: 5, quantity: 0 },
      {
        id: "dimond",
        name: "Dimonds",
        image: "../",
        commonality: 1,
        quantity: 0,
      },
      { id: "silk", name: "Silk", image: "../", commonality: 2, quantity: 0 },
      {
        id: "rdust",
        name: "Red dust",
        image: "../",
        commonality: 3,
        quantity: 2,
      },
      {
        id: "rflower",
        name: "Red flower",
        image: "../",
        commonality: 4,
        quantity: 0,
      },
    ],
  };
  const resource = [
    { id: "iron", name: "Iron", image: "../", commonality: 5 },
    { id: "iron", name: "Iron", image: "../", commonality: 5 },
    { id: "silk", name: "Silk", image: "../", commonality: 2, quantity: 0 },
    {
      id: "rdust",
      name: "Red dust",
      image: "../",
      commonality: 3,
      quantity: 0,
    },
  ];
  const updatedPlayer = updateWinPlayer(player, enemy, resource);
  expect(updatedPlayer.resources[1].quantity).toEqual(2);
  expect(updatedPlayer.resources[3].quantity).toEqual(1);
  expect(updatedPlayer.resources[4].quantity).toEqual(3);
  expect(updatedPlayer.experience).toEqual(325);
});

test("Find the correct next open story in group", () => {
  const storyExample = { id: "", type: "fight" as "fight", image: "" };
  const groups: StoryGroup[] = [];
  [1, 2, 3, 4].forEach((i: number) =>
    groups.push({
      group: i,
      stories: [
        { ...storyExample, open: true },
        { ...storyExample, open: true },
        { ...storyExample, open: true },
      ],
    })
  );
  groups[3].stories[2].open = false;
  expect(findLastOpenStory(groups)).toEqual(3);
  groups[3].stories[2].open = true;
  groups[1].stories[1].open = false;
  expect(findLastOpenStory(groups)).toEqual(1);
});

test("Finds correct characters to be active", () => {
  const heroes3active: Character[] = [
    {
      id: "maya",
      name: "Maya",
      image: "../img/maya_spells.png",
      selected: true,
    },
    {
      id: "tara",
      name: "Tara",
      image: "../img/tara_spells.png",
      selected: true,
    },
    {
      id: "nell",
      name: "Nell",
      image: "../img/tara_spells.png",
      selected: true,
    },
    {
      id: "dart",
      name: "Dart",
      image: "../img/tara_spells.png",
      selected: false,
    },
    {
      id: "grey",
      name: "Grey",
      image: "../img/tara_spells.png",
      selected: false,
    },
  ];
  expect(findActiveCharacters(heroes3active)).toEqual(["maya", "tara", "nell"]);

  const heroes2active: Character[] = [
    {
      id: "maya",
      name: "Maya",
      image: "../img/maya_spells.png",
      selected: false,
    },
    {
      id: "tara",
      name: "Tara",
      image: "../img/tara_spells.png",
      selected: true,
    },
    {
      id: "nell",
      name: "Nell",
      image: "../img/tara_spells.png",
      selected: true,
    },
    {
      id: "dart",
      name: "Dart",
      image: "../img/tara_spells.png",
      selected: false,
    },
    {
      id: "grey",
      name: "Grey",
      image: "../img/tara_spells.png",
      selected: false,
    },
  ];
  expect(findActiveCharacters(heroes2active)).toEqual(["tara", "nell", "maya"]);

  const heroesNoactive: Character[] = [
    {
      id: "maya",
      name: "Maya",
      image: "../img/maya_spells.png",
      selected: false,
    },
    {
      id: "tara",
      name: "Tara",
      image: "../img/tara_spells.png",
      selected: false,
    },
    {
      id: "nell",
      name: "Nell",
      image: "../img/tara_spells.png",
      selected: false,
    },
    {
      id: "dart",
      name: "Dart",
      image: "../img/tara_spells.png",
      selected: false,
    },
    {
      id: "grey",
      name: "Grey",
      image: "../img/tara_spells.png",
      selected: false,
    },
  ];
  expect(findActiveCharacters(heroesNoactive)).toEqual([
    "maya",
    "tara",
    "nell",
  ]);
});

test.only("Correctly adds Card to Player's deck", () => {
  const spellsUnselected = new Array(15).fill(0).map((x, n) => ({
    id: "base_hit" + n,
    name: "Base Hit " + n,
    strength: 1,
    quantity: 1,
    character: null,
    element: null,
    image: "",
    selected: false,
    owner: "hero" as "hero",
  }));

  const spellsSelected = new Array(15).fill(0).map((x, n) => ({
    id: "base_hit" + n,
    name: "Base Hit " + n,
    strength: 1,
    quantity: 1,
    character: null,
    element: null,
    image: "",
    selected: true,
    owner: "hero" as "hero",
  }));

  const spellsMore = spellsSelected.concat([
    {
      id: "base_hit16",
      name: "Base Hit 16",
      strength: 1,
      quantity: 1,
      character: null,
      element: null,
      image: "",
      selected: false,
      owner: "hero" as "hero",
    },
    {
      id: "base_hit17",
      name: "Base Hit 17",
      strength: 1,
      quantity: 1,
      character: null,
      element: null,
      image: "",
      selected: false,
      owner: "hero" as "hero",
    },
  ]);
  const addingFirst = changeCardsInDeck(spellsUnselected, spellsUnselected[0]);
  expect(addingFirst.length).toEqual(15);
  expect(addingFirst[0].selected).toBeTruthy();

  const addingThird = changeCardsInDeck(spellsUnselected, spellsUnselected[3]);
  expect(addingThird.length).toEqual(15);
  expect(addingThird[3].selected).toBeTruthy();

  const chaingingFirstTaken = changeCardsInDeck(
    spellsSelected,
    spellsSelected[0]
  );
  expect(chaingingFirstTaken.length).toEqual(15);
  expect(chaingingFirstTaken[0].selected).not.toBeTruthy();

  const changingThirdTaken = changeCardsInDeck(
    spellsSelected,
    spellsSelected[3]
  );
  expect(changingThirdTaken.length).toEqual(15);
  expect(changingThirdTaken[3].selected).not.toBeTruthy();

  const addingWhenAllSelected = changeCardsInDeck(spellsMore, spellsMore[15]);
  expect(addingWhenAllSelected.length).toEqual(17);
  expect(addingWhenAllSelected[0].selected).not.toBeTruthy();
  expect(addingWhenAllSelected[15].selected).toBeTruthy();
});
