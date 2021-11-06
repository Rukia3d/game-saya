import {
  IDialogueLine,
  IStory,
  IStoryGroup,
  ISpell,
  elementType,
} from "../src/utils/types";
import {
  DialogueDB,
  LineDB,
  StoryGroupDB,
  StoryDB,
  AdventureDB,
  EnemyDB,
  EnemyCardDB,
} from "./db_types";
import { getStoryActions, getSpellSet } from "./helpers";
const parse = require("csv-parse/lib/sync");
const path = "../src/data/";
const fs = require("fs");
const options = {
  columns: true,
  skip_empty_lines: true,
};

export const getDialogueLines = (data: DialogueDB): IDialogueLine[] => {
  const inputLines = fs.readFileSync(path + "Story Data - DB_Lines.csv");
  const linesDB: LineDB[] = parse(inputLines, options);
  const dialLines: IDialogueLine[] = [];
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

export const getGroupStories = (currentGroup: StoryGroupDB): IStory[] => {
  const story: IStory[] = [];
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
        nextStory: currentStory.next,
        name: currentStory.name ? currentStory.name : undefined,
        image: currentStory.image,
        open: false,
        //enemy: currentStory.enemy ? currentStory.enemy : undefined,
        //characters: getStoryCharacters(currentStory.characters),
        action: currentStory.next
          ? getStoryActions(currentStory.actions, currentStory.next)
          : [],
      };
    }
  }
  return story;
};

export const getStoryGroups = (a: AdventureDB): IStoryGroup[] => {
  const inputSG = fs.readFileSync(path + "Story Data - DB_StoryGroups.csv");
  const sgroupDB: StoryGroupDB[] = parse(inputSG, options);
  const groupList = a.storyGroups.split(", ");
  const groups = groupList.map((l: string) =>
    sgroupDB.find((storyGroup: StoryGroupDB) => storyGroup.id === l)
  );
  let storyGroups: IStoryGroup[] = [];
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

export const getEnemySpells = (e: EnemyDB) => {
  const spell: ISpell[] = [];
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
      updates: [],
    };
  }
  return spell;
};
