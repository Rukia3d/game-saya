import {
  IDialogue,
  IAdventure,
  adventureType,
  ISpell,
  IEnemy,
  IHero,
  elementType,
  GameState,
  FightState,
  IStoryGroup,
  ISpellUpdate,
} from "./types";

export const dialogues = new Array(3).fill(0).map((x, i) => ({
  id: "dialogue" + i,
  lines: [
    {
      id: "id" + i,
      character: "maya",
      image: "excited",
      pos: "L",
      text: "test",
    },
  ],
}));

export const spellUpdates: ISpellUpdate[] = new Array(3)
  .fill(0)
  .map((x, i) => ({
    action: "Some Action" + i,
    description: "Some description" + i,
    effect: "h_redraw",
    element: "fire",
    id: "fire_" + i,
    mana: 1,
    name: "SomeName" + i,
    price: null,
    resource_base: [["ash", i]],
  }));

export const stories: IStoryGroup[] = new Array(4).fill(0).map((x, i) => ({
  id: "name" + i,
  name: "name" + i,
  group: i,
  stories: [
    {
      id: "dialogue" + i,
      type: "dialogue",
      image: "dialogue" + i,
      open: true,
      action: [],
      nextStory: "dialogue" + i + 1,
    },
    {
      id: "dialogue1" + i,
      type: "dialogue",
      image: "dialogue1" + i,
      open: true,
      action: [],
      nextStory: "dialogue" + i + 1,
    },
    {
      id: "arena" + i,
      type: "fight",
      image: "arena" + i,
      open: false,
      name: "Arena",
      action: [],
      nextStory: "dialogue" + i + 1,
    },
  ],
}));

const adventures: IAdventure[] = [];
const advFormat: [string, boolean][] = [
  ["character", true],
  ["story", true],
  ["arena", false],
  ["torunament", false],
  ["event", false],
];
advFormat.forEach((obj: [string, boolean]) =>
  adventures.push({
    id: obj[0] as adventureType,
    name: obj[0],
    image: `${obj[0]}.jpg`,
    open: obj[1],
    form: obj[0],
    storyGroups: stories,
  })
);

//@ts-ignore
export const fightstory = adventures[0].storyGroups[0].stories[2];
//@ts-ignore
export const dialstory = adventures[0].storyGroups[0].stories[0];

export const fights = new Array(6).fill(0).map((x, i) => ({
  id: "arena" + i,
  name: "Arena " + i,
  image: "../img/arena_1.png",
  enemy: "test-dude",
  characters: ["maya", "tara"],
}));

export const mayaCard: ISpell = {
  id: "base_hit1_maya",
  name: "Maya Hit 1",
  strength: 1,
  element: "earth" as "earth",
  image: "../img/Spells/spell1.jpg",
  selected: true,
  mana: 0,
  owner: "hero" as "hero",
  type: "",
  level: 0,
  description: "",
  updates: [],
};

export const enemyCard: ISpell = {
  id: "base_hit1",
  name: "Base Hit 1",
  strength: 0,
  element: "earth" as "earth",
  image: "",
  selected: false,
  owner: "enemy" as "enemy",
  mana: 0,
  type: "",
  level: 0,
  description: "",
  updates: [],
};

export const enemy: IEnemy = {
  id: "test-dude",
  name: "Dude",
  element: "earth" as "earth",
  experience: "novice" as "novice",
  life: 2,
  spells: [enemyCard, enemyCard],
};

export const baseCards15: ISpell[] = new Array(15).fill(0).map((x, n) => ({
  id: "base_hit" + n,
  name: "Base Hit " + n,
  strength: 1,
  element: "earth",
  image: "",
  mana: 0,
  selected: true,
  owner: "hero" as "hero",
  type: "",
  level: 0,
  description: "",
  updates: [],
}));

const playerNpcs = [
  {
    id: "maya",
    name: "Maya",
    image: "../img/maya.png",
    dial: "dialogue0",
  },
  {
    id: "tara",
    name: "Tara",
    image: "../img/tara.png",
    dial: "dialogue1",
  },
];
export const heroes: IHero[] = [];
const heroesFormat: [string, string][] = [
  ["maya", "earth"],
  ["tara", "metal"],
  ["nell", "fire"],
  ["dart", "water"],
  ["grey", "air"],
];
heroesFormat.forEach((obj: [string, string]) =>
  heroes.push({
    id: obj[0],
    selected: false,
    name: obj[0],
    image: "",
    element: obj[1] as elementType,
  })
);
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

export const dialogue: IDialogue = {
  id: "olija_replic1",
  lines: [
    {
      id: "1",
      character: "olija",
      text: "Line one",
      image: "serious",
    },
    {
      character: "maya",
      id: "2",
      image: "sad",
      pos: "L",
      text: "Line two",
    },
  ],
  background: "backg_0.png",
};

export const characterToAdd: IHero = {
  element: "fire",
  id: "nell",
  image: "../img/nell.png",
  name: "Nell",
  selected: false,
};
