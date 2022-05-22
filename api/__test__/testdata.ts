import {
  IEventPlayer,
  IGameData,
  IPlayerAdventure,
  IPlayerHero,
  IPlayerResource,
  IPlayerSpell,
  IUserEvent,
} from "../engine/types";
import {
  IStory,
  IAdventure,
  ISchool,
  IElement,
  IHero,
  ICharacter,
  ISpell,
  IResource,
  IUpdateResource,
  IDialogue,
  ILine,
  IDialogueCharacter,
  IFight,
} from "../storage/types";
const stories = ["dialogue", "fight", "reel"];
const adventures = ["story", "character", "event"];
const elements = ["red", "blue", "green", "rose"];
const schools = ["oblation", "amplification", "deception", "restoration"];
const characters = ["nell", "gabriel", "grey", "solveig"];
const spells = [
  "redHit",
  "redHit1",
  "redHit2",
  "blueHit",
  "blueHit1",
  "blueHit2",
];
const updates = ["oblation1", "oblation2", "amplification1"];
const resurces = ["someRed", "someRed2", "someBlue", "someGreen"];
const events = [
  "CREATEUSER",
  "FINISHDIALOGUE",
  "FINISHDIALOGUE",
  "STARTFIGHT",
  "ATTACKSPELL",
];

export const playerTestEvents: IUserEvent[] = events.map(
  (s: string, i: number) => {
    return {
      id: i,
      event: s,
      player_id: 1,
      adventure_id: 0,
      story_id: i,
      story_type: i < 2 ? "story" : "fight",
      spell_id: 1,
      spell_index: 1,
      fight_id: 1,
      created_at: new Date("2022-04-04T01:18:54.000Z"),
      updated_at: new Date("2022-04-04T01:18:54.000Z"),
      deleted_at: null,
    };
  }
);

export const testCharacters: ICharacter[] = characters.map(
  (s: string, i: number) => {
    return {
      id: i,
      name: s,
      description: `Description for a character ${s}`,
    };
  }
);

export const testSchools: ISchool[] = schools.map((s: string, i: number) => {
  return {
    id: i,
    name: s,
    description: s,
  };
});

export const testElements: IElement[] = elements.map((s: string, i: number) => {
  return {
    id: i,
    name: s,
    description: s,
    code: s,
    school: testSchools[i],
  };
});

const testLines: ILine[] = [1, 2, 3].map((n: number) => {
  return {
    id: n,
    character: testCharacters[n],
    image: "image",
    position: "R",
    text: `${testCharacters[n].name} says something`,
  };
});

export const testDialogues: IDialogue[] = [1, 2, 3].map((n: number) => {
  return {
    id: n,
    story_id: n === 1 ? null : n,
    lines: testLines,
    background: "some image",
    layout: "double",
  };
});

export const testFights: IFight[] = [1, 2, 3].map((n: number) => {
  return {
    id: n,
    story_id: n,
    base_hero_num: n < 3 ? n + 1 : n,
    enemy: {
      id: n,
      name: "testEnemy",
      description: "testEnemy",
      element: testElements[n],
    },
    background: "some",
    base_elements: testElements,
  };
});

export const testStories: IStory[] = stories.map((s: string, i: number) => {
  return {
    id: i,
    type: s,
    name: s,
    next_id: i === 1 ? null : i + 1,
    open: i === 2 ? false : true,
    adventure_id: 0,
    item: s === "fight" ? testFights[0] : testDialogues[0],
  };
});

export const testAdventures: IAdventure[] = adventures.map(
  (s: string, i: number) => {
    return {
      id: i,
      type: s,
      name: s,
      description: s,
      stories: testStories,
    };
  }
);

export const testResources: IResource[] = resurces.map(
  (s: string, i: number) => {
    return {
      id: i,
      name: s,
      description: s,
      school: i < 2 ? testSchools[0] : testSchools[1],
      commonality: i < 2 ? 3 : 10,
    };
  }
);

export const testUpdateResources: IUpdateResource[] = testResources.map(
  (s: IResource) => {
    return { ...s, base_quantity: 5 };
  }
);

export const testHeroes: IHero[] = characters.map((s: string, i: number) => {
  return {
    id: i,
    name: s,
    description: s,
    element: testElements[i],
  };
});

export const testSpells: ISpell[] = spells.map((s: string, i: number) => {
  return {
    id: i,
    name: s,
    description: s,
    base_strength: 1,
    element: i < 2 ? testElements[0] : testElements[1],
  };
});

export const testGameData: IGameData = {
  heroes: testHeroes,
  adventures: testAdventures,
  characters: testCharacters,
  dialogues: testDialogues,
  spells: testSpells,
  updates: null,
  resources: testResources,
};

// export const testUpdates: IUpdate[] = updates.map((s: string, i: number) => {
//   return {
//     id: i,
//     name: s,
//     description: s,
//     effect: "h_heal",
//     base_mana: 1,
//     school: i < 2 ? testSchools[0] : testSchools[1],
//     resource_base: testUpdateResources.slice(0, 3),
//     actions: i < 2 ? testActions.slice(1, 3) : [testActions[0]],
//   };
// });

export const testPlayerHeroes: IPlayerHero[] = ["nell", "gabriel", "grey"].map(
  (s: string, i: number) => {
    const original = testHeroes.find((h: IHero) => h.name === s);
    if (original === undefined) {
      throw new Error(`Can't create testPlayerHeroes from testHeroes`);
    }
    return {
      ...original,
      selected: i < 2 ? true : false,
      created_at: new Date(),
      expires_at: new Date(),
    };
  }
);

export const testPlayerAdventures: IPlayerAdventure[] = [
  "story",
  "character",
  "event",
].map((s: string, i: number) => {
  return {
    id: i,
    type: s,
    name: s,
    description: `Adventure ${s} description`,
    open: true,
    created_at: new Date(),
    expires_at: new Date(),
    stories: testStories,
  };
});

export const testPlayerCharacters: IDialogueCharacter[] = testCharacters.map(
  (t: ICharacter, n: number) => {
    return { ...t, dialogue: testDialogues[n] };
  }
);

export const testPlayerSpells: IPlayerSpell[] = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [2, 0],
  [3, 0],
  [3, 1],
  [3, 2],
  [4, 0],
  [4, 1],
  [5, 0],
].map((n: number[]) => ({
  ...testSpells[n[0]],
  created_at: new Date(),
  expires_at: null,
  copy_id: n[1],
  updates: [],
  selected: true,
}));

export const testPlayerResources: IPlayerResource[] = testResources.map((i) => {
  return {
    ...i,
    quantity: 10,
    created_at: new Date(),
  };
});

export const testPlayer: IEventPlayer = {
  player: {
    id: 0,
    experience: 0,
    life: 7,
    maxlife: 7,
    mana: 5,
    maxmana: 5,
    created_at: new Date("10-10-2010"),
    updated_at: new Date("10-10-2010"),
    rank: 0,
  },
  adventures: testPlayerAdventures,
  heroes: testPlayerHeroes,
  spells: testPlayerSpells,
  resources: testPlayerResources,
  updates: null,
  npcs: testPlayerCharacters,
  currentfight: null,
};
