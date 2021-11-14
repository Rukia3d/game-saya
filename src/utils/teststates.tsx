import {
  dialogues,
  baseCards15,
  spellUpdates,
  heroes,
  enemy,
  fights,
  mayaCard,
  enemyCard,
  playerNpcs,
  adventures,
} from "./testobjects";
import { GameState, IDialogue, FightState, IAdventure } from "./types";

export const gameState: GameState = {
  dialogues: dialogues as IDialogue[],
  player: {
    data: {
      id: 1,
      experience: 300,
      life: 3,
      maxLife: 7,
      mana: 10,
      maxMana: 15,
    },
    npcs: playerNpcs,
    spells: baseCards15,
    spellUpdates: spellUpdates,
    heroes: heroes,
    adventures: adventures,
    enemies: [enemy],
    resources: [],
  },
  adventures: adventures,
  enemies: [enemy],
  heroes: heroes,
  reels: [],
  npcs: playerNpcs.concat([
    {
      id: "olija",
      name: "Tara",
      image: "../img/olija.png",
      dial: "olija_replic1",
    },
  ]),
  resources: [
    { id: "sparks", name: "Sparks", commonality: 2, image: "sparks" },
    { id: "ash", name: "Ash", commonality: 10, image: "ash" },
    { id: "lava_r", name: "Lava Rock", commonality: 7, image: "lava_r" },
    { id: "liz", name: "Scale", commonality: 3, image: "lizard_s" },
    { id: "char", name: "Charc", commonality: 5, image: "charcoal" },
  ],
  spells: baseCards15,
  spellUpdates: spellUpdates,
  fights: fights,
};

export const fightState: FightState = {
  hero: {
    life: gameState.player.data.life,
    mana: gameState.player.data.mana,
    maxLife: gameState.player.data.maxLife,
    maxMana: gameState.player.data.maxMana,
  },
  heroes: heroes.slice(0, 3),
  enemy: enemy,
  heroCardIndex: null,
  enemyCardIndex: null,
  heroDeck: [mayaCard, mayaCard],
  heroHand: [mayaCard, mayaCard],
  heroDrop: [mayaCard],
  enemyDeck: [enemyCard, enemyCard],
  enemyDrop: [enemyCard],
  elements: ["fire" as "fire", "earth" as "earth"],
  element: "fire" as "fire",
};

const game = JSON.parse(JSON.stringify(gameState));
game.adventures[1].storyGroups = [
  {
    id: "test_group_1",
    name: "test group 1",
    group: 0,
    stories: new Array(3).fill(0).map((x, i) => ({
      id: "test_arena" + i,
      type: "fight",
      image: "arena",
      open: i === 0,
      name: "Test Arena" + i,
      action: [],
      nextStory: "test_arena" + (i + 1),
    })),
  },
];
game.fights = [
  {
    id: "test_arena0",
    name: "Test Arena 0",
    image: "../img/arena_1.png",
    enemy: "test-dude",
    characters: ["maya", "tara"],
  },
  {
    id: "test_arena1",
    name: "Test Arena 1",
    image: "../img/arena_1.png",
    enemy: "test-dude",
    characters: ["maya", "grey", "any"],
  },
  {
    id: "test_arena2",
    image: "../img/arena_1.png",
    enemy: "test-dude",
    characters: ["any", "any", "any"],
  },
];

const testAdventure: IAdventure = {
  ...gameState.adventures[1],
  storyGroups: [
    {
      id: "test_group_1",
      name: "test group 1",
      group: 0,
      stories: new Array(3).fill(0).map((x, i) => ({
        id: "test_arena" + i,
        type: "fight",
        image: "arena",
        open: i === 0,
        name: "Test Arena" + i,
        action: [],
        nextStory: "test_arena" + (i + 1),
      })),
    },
  ],
};
export const gameRestrictedCharacters: GameState = {
  ...gameState,
  adventures: [gameState.adventures[0], testAdventure],
  fights: [
    {
      id: "test_arena0",
      name: "Test Arena 0",
      image: "../img/arena_1.png",
      enemy: "test-dude",
      characters: ["maya", "tara"],
    },
    {
      id: "test_arena1",
      name: "Test Arena 1",
      image: "../img/arena_1.png",
      enemy: "test-dude",
      characters: ["maya", "grey", "any"],
    },
    {
      id: "test_arena2",
      name: "Test Arena 2",
      image: "../img/arena_1.png",
      enemy: "test-dude",
      characters: ["any", "any", "any"],
    },
  ],
};
