import {
  dialogues,
  baseCards15,
  spellUpdates,
  heroes,
  enemy,
  fights,
  mayaCard,
  enemyCard,
  adventures,
  characters,
  resource,
} from "./test_gameobjects";
import {
  playerAdventures,
  playerHeroes,
  playerNPCs,
  playerSpells,
  playerSpellUpdates,
} from "./test_playerobjects";
import { GameState, FightState, IPlayerAdventure } from "./types";

export const gameState: GameState = {
  player: {
    data: {
      id: "1",
      experience: 300,
      life: 3,
      maxlife: 7,
      mana: 10,
      maxmana: 15,
      rank: 1,
      created_at: new Date(),
    },
    npcs: playerNPCs,
    spells: playerSpells,
    updates: playerSpellUpdates,
    heroes: playerHeroes,
    adventures: playerAdventures,
    resources: [],
  },
  game: {
    adventures: adventures,
    dialogues: dialogues,
    heroes: heroes,
    reels: [],
    characters: characters,
    resources: [resource],
    spells: baseCards15,
    updates: spellUpdates,
    fights: fights,
  },
};

export const fightState: FightState = {
  hero: {
    life: gameState.player.data.life,
    mana: gameState.player.data.mana,
    maxLife: gameState.player.data.maxlife,
    maxMana: gameState.player.data.maxmana,
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
  elements: ["red", "green"],
  element: "red" as "red",
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

export const testAdventure: IPlayerAdventure = {
  ...gameState.game.adventures[1],
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
        actions: [],
        nextStory: "test_arena" + (i + 1),
      })),
    },
  ],
  open: true,
  created_at: new Date(),
};
