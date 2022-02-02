import {
  IDialogue,
  IAdventure,
  adventureType,
  ISpell,
  IEnemy,
  IHero,
  colorType,
  IStoryGroup,
  ISpellUpdate,
  IReel,
} from "./types";

export const dialogues: IDialogue[] = new Array(3).fill(0).map((x, i) => ({
  id: "dialogue" + i,
  background: "background" + i,
  layout: "single",
  characters: ["maya"],
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
    action: { action: "health", strength: i },
    description: "Some description" + i,
    effect: "h_redraw",
    school: "restoration",
    id: "fire_" + i,
    mana: 1,
    name: "SomeName" + i,
    price: null,
    resource_base: [["ash", i + 1]],
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

export const adventures: IAdventure[] = [];
const advFormat: [string, boolean][] = [
  ["character", true],
  ["story", true],
  ["arena", false],
  ["tournament", false],
  ["event", false],
];
advFormat.forEach((obj: [string, boolean]) =>
  adventures.push({
    id: obj[0] as adventureType,
    name: obj[0],
    image: `${obj[0]}.jpg`,
    open: obj[1],
    type: obj[0],
    storyGroups: stories,
  })
);

//@ts-ignore
export const fightstory = adventures[0].storyGroups[0].stories[2];
//@ts-ignore
export const dialstory = adventures[0].storyGroups[0].stories[0];
export const reelstory = {
  //@ts-ignore
  ...adventures[0].storyGroups[0].stories[0],
  type: "reel" as "reel",
  id: "reel1",
};

export const reel: IReel = {
  id: "reel1",
  type: "reel",
  action: [],
  imageGroups: [
    {
      id: 1,
      layout: 1,
      images: [{ id: "reel1", image: "storyline", direction: "left" }],
    },
    {
      id: 2,
      layout: 2,
      images: [
        {
          id: "reel2",
          image: "storyline",
          direction: "right",
        },
        { id: "reel3", image: "storyline", direction: "left" },
      ],
    },
  ],
};

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
  color: "yellow" as "yellow",
  school: "alteration" as "alteration",
  selected: true,
  owner: "hero" as "hero",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  updates: [],
};

export const enemyCard: ISpell = {
  id: "base_hit1",
  name: "Base Hit 1",
  strength: 0,
  color: "grey" as "grey",
  school: "restoration" as "restoration",
  selected: false,
  owner: "enemy" as "enemy",
  description: "",
  updates: [],
};

export const enemy: IEnemy = {
  id: "test-dude",
  name: "Dude",
  color: "grey" as "grey",
  school: "restoration",
  spells: [enemyCard, enemyCard],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

export const baseCards15: ISpell[] = new Array(15).fill(0).map((x, n) => ({
  id: "base_hit" + n,
  name: "Base Hit " + n,
  strength: 1,
  color: "yellow" as "yellow",
  school: "alteration" as "alteration",
  selected: true,
  owner: "hero" as "hero",
  description: "",
  updates: [],
}));

export const playerNpcs = [
  {
    id: "maya",
    name: "Maya",
    image: "../img/maya.png",
    dial: "dialogue0",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: "tara",
    name: "Tara",
    image: "../img/tara.png",
    dial: "dialogue1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
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
    code: "000000",
    image: "",
    color: obj[1] as colorType,
    school: "alteration",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  })
);

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
  layout: "double",
  characters: ["olija", "maya"],
};

export const characterToAdd: IHero = {
  color: "red",
  id: "nell",
  code: "000000",
  image: "../img/nell.png",
  name: "Nell",
  selected: false,
  school: "alteration",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
};
