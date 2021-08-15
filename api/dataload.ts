import {
  Adventure,
  adventureType,
  Character,
  Dialogue,
  DialogueLine,
  element,
  Enemy,
  enemyExpLevel,
  Spell,
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
} from "./db_types";
import {
  getSpellEffect,
  getSpellTrump,
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
          : undefined,
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

const getEnemySpells = (e: EnemyDB) => {
  const spell: Spell[] = [];
  const inputECards = fs.readFileSync(path + "Story Data - DB_EnemyCards.csv");
  const enemyCardDB: EnemyCardDB[] = parse(inputECards, options);
  const spellList = e.cards.split(", ");
  const spells = spellList.map((l: string) =>
    enemyCardDB.find((spell: EnemyCardDB) => spell.id === l)
  );
  for (let x = 0; x < spells.length; x++) {
    const currentSpell = spells[x];
    if (!currentSpell) throw new Error(`Can't find a spell for ${e.id}`);
    spell[x] = {
      id: currentSpell.id,
      image: currentSpell.image,
      name: currentSpell.name,
      strength: parseInt(currentSpell.strength),
      mana: 0,
      character: null,
      selected: false,
      element: currentSpell.element ? (currentSpell.element as element) : null,
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
      element: enemyDB[i].element,
      experience: enemyDB[i].exp as enemyExpLevel,
      cards: enemyCards,
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
  const inputSpells = fs.readFileSync(path + "Story Data - DB_HeroCards.csv");
  const spellDB: SpellDB[] = parse(inputSpells, options);
  for (let i = 0; i < spellDB.length; i++) {
    spells[i] = {
      id: spellDB[i].id,
      image: spellDB[i].image,
      name: spellDB[i].name,
      strength: parseInt(spellDB[i].strength),
      mana: parseInt(spellDB[i].mana),
      effect: spellDB[i].effect ? getSpellEffect(spellDB[i].effect) : undefined,
      trump: spellDB[i].trump ? getSpellTrump(spellDB[i].trump) : undefined,
      character: spellDB[i].character ? spellDB[i].character : null,
      selected: false,
      element: spellDB[i].element ? (spellDB[i].element as element) : null,
      owner: "hero",
      type: spellDB[i].type,
      level: 0,
      description: spellDB[i].description,
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
