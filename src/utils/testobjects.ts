import {
  Dialogue,
  Enemy,
  FightState,
  ForgeReq,
  GameState,
  Spell,
} from "./types";
const stories = require("../data/storiesAct1.json");
const dialogues = require("../data/dialogues.json");

export const story = {
  id: "fight1",
  type: "fight" as "fight",
  image: "../img/arena_1.png",
  enemy: "test-dude",
  open: true,
  characters: ["maya", "tara"],
};

export const mayaCard: Spell = {
  id: "base_hit1_maya",
  name: "Maya Hit 1",
  strength: 1,
  character: "maya",
  element: "earth" as "earth",
  image: "../img/Spells/spell1.jpg",
  selected: true,
  mana: 0,
  owner: "hero" as "hero",
  type: "",
  level: 0,
  description: "",
};

export const enemyCard: Spell = {
  id: "base_hit1",
  name: "Base Hit 1",
  strength: 0,
  character: null,
  element: null,
  image: "",
  selected: false,
  owner: "enemy" as "enemy",
  mana: 0,
  type: "",
  level: 0,
  description: "",
};

export const enemy: Enemy = {
  id: "dude",
  name: "Dude",
  element: "earth" as "earth",
  experience: "novice" as "novice",
  life: 2,
  cards: [enemyCard, enemyCard],
};

export const baseCards15: Spell[] = new Array(15).fill(0).map((x, n) => ({
  id: "base_hit" + n,
  name: "Base Hit " + n,
  strength: 1,
  character: null,
  element: null,
  image: "",
  mana: 0,
  selected: true,
  owner: "hero" as "hero",
  type: "",
  level: 0,
  description: "",
}));

export const spellUpdates: ForgeReq[] = [
  {
    itemType: "base_hit_maya",
    updates: [
      ["gold", 5],
      ["silk", 3],
    ],
    effect: "strengthen",
  },
  {
    itemType: "base_hit1",
    updates: [
      ["iron", 1],
      ["gold", 5],
      ["silk", 2],
    ],
    effect: "strengthen",
  },
];

export const fightState: FightState = {
  hero: {
    health: 15,
    currentHealth: 15,
    mana: 15,
    currentMana: 10,
  },
  enemy: enemy,
  heroDeck: [mayaCard, mayaCard],
  heroHand: [mayaCard, mayaCard],
  heroDrop: [mayaCard],
  enemyDeck: [enemyCard, enemyCard],
  enemyDrop: [enemyCard],
  elements: ["fire" as "fire", "earth" as "earth"],
  element: "fire" as "fire",
};

export const gameState: GameState = {
  sceneCharacters: [
    {
      id: "maya",
      name: "Maya",
      image: "../img/maya.png",
      state: "story",
      dial: "maya_replic1",
    },
    {
      id: "tara",
      name: "Tara",
      image: "../img/tara.png",
      state: "story",
      dial: "maya_replic1",
    },
  ],
  dialogues: dialogues,
  player: {
    id: 1,
    cards: baseCards15,
    cardUpdates: spellUpdates,
    experience: 300,
    mana: 3,
    maxMana: 5,
    heroes: ["maya", "tara", "nell", "dart", "grey"].map((s: string) => ({
      id: s,
      selected: false,
      name: "",
      image: "",
    })),
    resources: [
      { id: "gold", name: "Gold", image: "../", commonality: 2, quantity: 2 },
      { id: "iron", name: "Iron", image: "../", commonality: 5, quantity: 10 },
      {
        id: "dimond",
        name: "Dimonds",
        image: "../",
        commonality: 1,
        quantity: 3,
      },
      { id: "silk", name: "Silk", image: "../", commonality: 2, quantity: 0 },
      {
        id: "rdust",
        name: "Red dust",
        image: "../",
        commonality: 3,
        quantity: 0,
      },
      {
        id: "rflower",
        name: "Red flower",
        image: "../",
        commonality: 4,
        quantity: 0,
      },
    ],
  },
  adventures: [
    {
      id: "character",
      name: "Character",
      image: "character.jpg",
      open: true,
      form: "character",
      stories: [],
    },
    {
      id: "story",
      name: "Water Problems",
      image: "story.jpg",
      open: true,
      form: "story",
      stories: stories,
    },
    {
      id: "arena",
      name: "Arena",
      image: "arena.jpg",
      open: false,
      form: "arena",
      stories: [],
    },
    {
      id: "torunament",
      name: "Tournament",
      image: "tournament.jpg",
      open: false,
      form: "torunament",
      stories: [],
    },
    {
      id: "event",
      name: "Event",
      image: "event.jpg",
      open: false,
      form: "event",
      stories: [],
    },
  ],
};

export const dialogue: Dialogue = {
  id: "olija_replic1",
  lines: [
    {
      character: "olija",
      text: "Line one",
      image: "serious",
    },
    {
      character: "maya",
      image: "sad",
      pos: "L",
      text: "Line two",
    },
  ],
  background: "backg_0.png",
};
