import {
  IAction,
  IStory,
  IAdventure,
  IPAdventure,
  ISchool,
  IElement,
  IHero,
  IPHero,
  ICharacter,
  IPCharacter,
  ISpell,
  IUpdate,
  IResource,
  IUpdateResource,
  IPUpdatedSpell,
  IPUpdate,
  IPResource,
} from "../storage/types";
const actions = ["addHero", "addNpc"];
const stories = ["dialogue", "fight", "reel"];
const adventures = ["story", "character", "event"];
const elements = ["red", "blue", "green", "rose"];
const schools = ["oblation", "amplification", "deception", "restoration"];
const characters = ["nell", "gabriel", "grey", "solveig"];
const spells = ["redHit1", "redHit2", "blueHit", "blueHit1", "blueHit2"];
const updates = ["oblation1", "oblation2", "amplification1"];
const resurces = ["someRed", "someRed2", "someBlue", "someGreen"];
export const testActions: IAction[] = actions.map((s: string, i: number) => {
  return {
    id: i,
    type: s,
    item: "nell",
    data: i === 0 ? "red" : "dialogue1",
  };
});
export const testStories: IStory[] = stories.map((s: string, i: number) => {
  return {
    id: i,
    type: s,
    name: s,
    next: i === 1 ? null : (i + 1).toString(),
    open: i === 2 ? false : true,
    actions: i === 1 ? testActions : null,
  };
});
export const testAdventures: IAdventure[] = adventures.map(
  (s: string, i: number) => {
    return {
      id: i,
      type: s,
      name: s,
      description: s,
      stories: i === 1 ? null : testStories,
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

export const testCharacters: ICharacter[] = characters.map(
  (s: string, i: number) => {
    return {
      id: i,
      name: s,
      description: s,
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

export const testUpdates: IUpdate[] = updates.map((s: string, i: number) => {
  return {
    id: i,
    name: s,
    description: s,
    effect: "h_heal",
    base_mana: 1,
    school: i < 2 ? testSchools[0] : testSchools[1],
    resource_base: testUpdateResources.slice(0, 3),
    actions: i < 2 ? testActions.slice(1, 3) : [testActions[0]],
  };
});

export const testPlayerHeroes: IPHero[] = ["nell", "gabriel", "grey"].map(
  (s: string, i: number) => {
    return {
      id: i,
      selected: i < 2 ? true : false,
      created_at: new Date(),
      expires_at: new Date(),
    };
  }
);

export const testPlayerAdventures: IPAdventure[] = [
  "story",
  "character",
  "event",
].map((s: string, i: number) => {
  return {
    id: i,
    last_story_id: i < 2 ? 1 : null,
    open: true,
    created_at: new Date(),
    expires_at: new Date(),
  };
});

export const testPlayerCharacters: IPCharacter[] = [
  "nell",
  "gabriel",
  "grey",
].map((s: string, i: number) => {
  return {
    id: i,
    image: s + i,
    dialogue_id: i,
    created_at: new Date(),
    expires_at: new Date(),
  };
});

export const testPlayerSpells: IPUpdatedSpell[] = [0, 1, 2].map((i) => {
  return {
    spell: {
      player_id: 1,
      spell_id: i < 2 ? 0 : 3,
      copy_id: i,
      selected: 1,
      expires_at: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    },

    updates: new Array(i).fill(0).map((x, n) => {
      return {
        spell_id: n,
        copy_id: i,
        player_id: 1,
        update_id: i,
        expires_at: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      };
    }),
  };
});

export const testPlayerUpdates: IPUpdate[] = [0, 1].map((i) => {
  return {
    id: i,
    created_at: new Date(),
    expires_at: new Date(),
  };
});

export const testPlayerResources: IPResource[] = [0, 1].map((i) => {
  return {
    id: i,
    quantity: 10,
    created_at: new Date(),
  };
});
