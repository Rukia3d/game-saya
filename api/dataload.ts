import {
  Adventure,
  adventureType,
  Character,
  Dialogue,
  DialogueLine,
  elementType,
  Enemy,
  enemyExpLevel,
  Resource,
  Spell,
  spellEffectType,
  SpellUpdate,
  Story,
  StoryGroup,
} from "../src/utils/types";
import {
  AdventureDB,
  DialogueDB,
  EnemyCardDB,
  EnemyDB,
  HeroDB,
  LineDB,
  NpcDB,
  SpellDB,
  StoryDB,
  StoryGroupDB,
  ResourceDB,
  UpdateSpellDB,
} from "./db_types";
import {
  getResourceSet,
  getSpellSet,
  getStoryActions,
  getStoryCharacters,
} from "./helpers";
const parse = require("csv-parse/lib/sync");
const fs = require("fs");
const path = "../src/data/";
const options = {
  columns: true,
  skip_empty_lines: true,
};

const getDialogueLines = (data: DialogueDB): DialogueLine[] => {
  const inputLines = fs.readFileSync(path + "Story Data - DB_Lines.csv");
  const linesDB: LineDB[] = parse(inputLines, options);
  const dialLines: DialogueLine[] = [];
  const linesList = data.linesList.split(", ");
  const lines = linesList.map((l: string) =>
    linesDB.find((line: LineDB) => line.id === l)
  );
  if (!lines) throw new Error(`Can't find lines for dialogue ${data.id}`);
  for (let j = 0; j < lines.length; j++) {
    const currentLine = lines[j];
    if (!currentLine)
      throw new Error(`Can't find line for dialogue ${data.id}`);
    dialLines[j] = {
      id: currentLine.id,
      character: currentLine.character,
      image: currentLine.image,
      pos: currentLine.pos as "L" | "R" | "M",
      text: currentLine.text,
    };
  }
  return dialLines;
};

const getGroupStories = (currentGroup: StoryGroupDB): Story[] => {
  const story: Story[] = [];
  const inputSt = fs.readFileSync(path + "Story Data - DB_Stories.csv");
  const storyDB: StoryDB[] = parse(inputSt, options);
  const storyList = currentGroup.stories.split(", ");
  const stories = storyList.map((l: string) =>
    storyDB.find((story: StoryDB) => story.id === l)
  );
  for (let x = 0; x < stories.length; x++) {
    const currentStory = stories[x];
    if (currentStory) {
      story[x] = {
        type: currentStory.type as "dialogue" | "fight",
        id: currentStory.id,
        name: currentStory.name ? currentStory.name : undefined,
        image: currentStory.image,
        open: false,
        enemy: currentStory.enemy ? currentStory.enemy : undefined,
        characters: currentStory.characters
          ? getStoryCharacters(currentStory.characters)
          : undefined,
        action: currentStory.actions
          ? getStoryActions(currentStory.actions)
          : [],
      };
    }
  }
  return story;
};

const getStoryGroups = (a: AdventureDB): StoryGroup[] => {
  const inputSG = fs.readFileSync(path + "Story Data - DB_StoryGroups.csv");
  const sgroupDB: StoryGroupDB[] = parse(inputSG, options);
  const groupList = a.storyGroups.split(", ");
  const groups = groupList.map((l: string) =>
    sgroupDB.find((storyGroup: StoryGroupDB) => storyGroup.id === l)
  );
  let storyGroups: StoryGroup[] = [];
  for (let j = 0; j < groups.length; j++) {
    const currentGroup = groups[j];
    if (currentGroup) {
      storyGroups[j] = {
        id: currentGroup.id,
        name: currentGroup.name,
        stories: getGroupStories(currentGroup),
        group: parseInt(currentGroup.visual),
      };
    }
  }
  return storyGroups;
};

const heroInitialSpellSet = (db: SpellDB[]) => {
  const spells = [];
  for (let x = 0; x < db.length; x++) {
    const card = db[x];
    if (parseInt(card.strength) === 1) {
      [0, 1, 2].map((i: number) => spells.push(card));
    } else if (parseInt(card.strength) === 2) {
      [0, 1].map((j: number) => spells.push(card));
    } else {
      spells.push(card);
    }
  }
  return spells;
};

const getEnemySpells = (e: EnemyDB) => {
  const spell: Spell[] = [];
  const inputECards = fs.readFileSync(path + "Story Data - DB_Cards.csv");
  const enemyCardDB: EnemyCardDB[] = parse(inputECards, options);
  const spellSet = enemyCardDB.filter(
    (c: EnemyCardDB) => c.element === e.element
  );
  const spells = getSpellSet(spellSet, parseInt(e.life));
  for (let x = 0; x < spells.length; x++) {
    const currentSpell = spells[x];
    if (!currentSpell) throw new Error(`Can't find a spell for ${e.id}`);
    spell[x] = {
      id: currentSpell.id,
      image: currentSpell.image,
      name: currentSpell.name,
      strength: parseInt(currentSpell.strength),
      mana: 0,
      selected: false,
      element: currentSpell.element as elementType,
      owner: "enemy" as "enemy",
      type: currentSpell.name,
      level: 0,
      description: currentSpell.description,
    };
  }
  return spell;
};

export const readDialogues = (): Dialogue[] => {
  const dialogues: Dialogue[] = [];
  const inputDial = fs.readFileSync(path + "Story Data - DB_Dialogues.csv");
  const dialogueDB: DialogueDB[] = parse(inputDial, options);
  for (let i = 0; i < dialogueDB.length; i++) {
    const dialLines = getDialogueLines(dialogueDB[i]);
    // Transform data from DB into game Dialogue format
    dialogues[i] = {
      id: dialogueDB[i].id,
      lines: dialLines,
      background: dialogueDB[i].background,
    };
  }
  return dialogues;
};

export const readResources = (): Resource[] => {
  const resources: Resource[] = [];
  const inputResource = fs.readFileSync(path + "Story Data - DB_Resources.csv");
  const resourceDB: ResourceDB[] = parse(inputResource, options);
  for (let i = 0; i < resourceDB.length; i++) {
    // Transform data from DB into game Dialogue format
    resources[i] = {
      id: resourceDB[i].id,
      name: resourceDB[i].name,
      commonality: parseInt(resourceDB[i].commonality),
      image: resourceDB[i].image,
    };
  }
  return resources;
};

export const readSpellUpdates = (): SpellUpdate[] => {
  const updates: SpellUpdate[] = [];
  const inputSpellUpdate = fs.readFileSync(
    path + "Story Data - DB_Library.csv"
  );
  const updateSpellDB: UpdateSpellDB[] = parse(inputSpellUpdate, options);
  for (let i = 0; i < updateSpellDB.length; i++) {
    // Transform data from DB into game Dialogue format
    updates[i] = {
      element: updateSpellDB[i].element as elementType,
      mana: parseInt(updateSpellDB[i].mana),
      resource_base: getResourceSet(updateSpellDB[i].resource_base),
      effect: updateSpellDB[i].effect as spellEffectType,
      action: updateSpellDB[i].action,
      price: updateSpellDB[i].price,
    };
  }
  return updates;
};

export const readAdventures = (): Adventure[] => {
  const adventures: Adventure[] = [];
  const inputAdv = fs.readFileSync(path + "Story Data - DB_Adventures.csv");
  const adventureDB: AdventureDB[] = parse(inputAdv, options);
  for (let i = 0; i < adventureDB.length; i++) {
    const storyGroups = getStoryGroups(adventureDB[i]);
    // Transform data from DB into game Adventure format
    adventures[i] = {
      id: adventureDB[i].id as adventureType,
      form: adventureDB[i].form,
      name: adventureDB[i].name,
      image: adventureDB[i].image,
      open: false,
      stories: storyGroups.length > 0 ? storyGroups : undefined,
    };
  }
  if (adventures.length < 5)
    throw new Error("Reading from DB returned less than 5 adventures");
  return adventures;
};

export const readEnemies = (): Enemy[] => {
  const enemies: Enemy[] = [];
  const inputEnemies = fs.readFileSync(path + "Story Data - DB_Enemies.csv");
  const enemyDB: EnemyDB[] = parse(inputEnemies, options);
  for (let i = 0; i < enemyDB.length; i++) {
    const enemyCards = getEnemySpells(enemyDB[i]);
    enemies[i] = {
      id: enemyDB[i].id,
      name: enemyDB[i].name,
      element: enemyDB[i].element as elementType,
      experience: enemyDB[i].exp as enemyExpLevel,
      spells: enemyCards,
      life: parseInt(enemyDB[i].life),
    };
  }
  return enemies;
};

export const readHeroes = (): Character[] => {
  const heroes: Character[] = [];
  const inputHeroes = fs.readFileSync(path + "Story Data - DB_Heroes.csv");
  const heroDB: HeroDB[] = parse(inputHeroes, options);
  for (let i = 0; i < heroDB.length; i++) {
    heroes[i] = {
      id: heroDB[i].id,
      name: heroDB[i].name,
      image: heroDB[i].image,
      selected: false,
    };
  }
  return heroes;
};

export const readSpells = (): Spell[] => {
  const spells: Spell[] = [];
  const inputSpells = fs.readFileSync(path + "Story Data - DB_Cards.csv");
  const spellDB: SpellDB[] = parse(inputSpells, options);
  const parsedSpells = heroInitialSpellSet(spellDB);
  for (let i = 0; i < parsedSpells.length; i++) {
    spells[i] = {
      id: parsedSpells[i].id,
      image: parsedSpells[i].image,
      name: parsedSpells[i].name,
      strength: parseInt(parsedSpells[i].strength),
      mana: 0,
      selected: false,
      element: parsedSpells[i].element as elementType,
      owner: "hero",
      type: "base",
      level: 0,
      description: parsedSpells[i].description,
    };
  }
  return spells;
};

export const readNpcs = (): Character[] => {
  const npcs: Character[] = [];
  const inputNpcs = fs.readFileSync(path + "Story Data - DB_NPCs.csv");
  const npcDB: NpcDB[] = parse(inputNpcs, options);
  for (let i = 0; i < npcDB.length; i++) {
    npcs[i] = {
      id: npcDB[i].id,
      name: npcDB[i].name,
      image: npcDB[i].image,
    };
  }
  return npcs;
};
