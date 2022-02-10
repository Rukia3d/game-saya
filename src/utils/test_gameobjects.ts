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
  schoolType,
  ISchool,
  IPlayerResource,
  spellEffectType,
  ICharacter,
  IResource,
  IFight,
} from "./types";

export const dialogues: IDialogue[] = new Array(3).fill(0).map((x, i) => ({
  id: "dialogue" + i,
  background: "background" + i,
  layout: "single",
  character_ids: ["maya"],
  lines: [
    {
      id: "id" + i,
      character: "maya",
      image: "excited",
      position: "L",
      text: "test",
    },
  ],
}));
export const school: ISchool = {
  id: "restoration" as schoolType,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  name: "Restoration",
};

export const resource: IResource = {
  id: "ametyst",
  name: "Ametyst",
  school: school,
  description: "Some Description",
  commonality: 2,
};

export const element = {
  code: "a6009c",
  color: "violet" as colorType,
  description: "Some description",
  school: school,
};

export const spellUpdates: ISpellUpdate[] = new Array(3)
  .fill(0)
  .map((x, i) => ({
    action: { item: "health", data: i },
    description: "Some description" + i,
    effect: "h_redraw" as spellEffectType,
    school: school,
    id: "fire_" + i,
    mana: 1,
    name: "SomeName" + i,
    price: null,
    resource_base: [{ ...resource, quantity: 5, created_at: new Date() }],
  }));

export const stories: IStoryGroup[] = new Array(4).fill(0).map((x, i) => ({
  id: "name" + i,
  name: "name" + i,
  group: i,
  stories: [
    {
      id: "dialogue" + i,
      type: "dialogue",
      name: "dialogue" + i,
      image: "dialogue" + i,
      open: true,
      actions: [],
      nextStory: "dialogue" + i + 1,
    },
    {
      id: "dialogue1" + i,
      name: "dialogue1" + i,
      type: "dialogue",
      image: "dialogue1" + i,
      open: true,
      actions: [],
      nextStory: "dialogue" + i + 1,
    },
    {
      id: "arena" + i,
      name: "arena" + i,
      type: "fight",
      image: "arena" + i,
      open: false,
      actions: [],
      nextStory: "dialogue" + i + 1,
    },
  ],
}));

export const adventures: IAdventure[] = [];
[
  ["character", true],
  ["story", true],
  ["arena", false],
  ["tournament", false],
  ["event", false],
].forEach((obj: any) =>
  adventures.push({
    id: obj[0] as adventureType,
    name: obj[0],
    image: `${obj[0]}.jpg`,
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

export const fights: IFight[] = new Array(6).fill(0).map((x, i) => ({
  id: "arena" + i,
  name: "Arena " + i,
  image: "../img/arena_1.png",
  enemy: enemy,
  hero_elements: ["violet", "grey"],
  hero_num: 2,
}));

export const mayaCard: ISpell = {
  id: "base_hit1_maya",
  name: "Maya Hit 1",
  element: element,
  strength: 1,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
};

export const enemyCard: ISpell = {
  id: "base_hit1",
  name: "Base Hit 1",
  element: element,
  strength: 0,
  description: "",
};

export const enemy: IEnemy = {
  id: "test-dude",
  name: "Dude",
  element: element,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

export const baseCards15: ISpell[] = new Array(15).fill(0).map((x, n) => ({
  id: "base_hit" + n,
  name: "Base Hit " + n,
  strength: 1,
  element: element,
  description: "",
}));

export const characters: ICharacter[] = [
  {
    id: "maya",
    name: "Maya",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: "tara",
    name: "Tara",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
];
export const heroes: IHero[] = [];
["maya", "tara", "nell", "dart", "grey"].forEach((obj: string) =>
  heroes.push({
    id: obj,
    name: obj,
    element: element,
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
      position: "L",
    },
    {
      character: "maya",
      id: "2",
      image: "sad",
      position: "L",
      text: "Line two",
    },
  ],
  background: "backg_0.png",
  layout: "double",
  character_ids: ["olija", "maya"],
};

export const characterToAdd: IHero = {
  id: "nell",
  name: "Nell",
  element: element,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
};
