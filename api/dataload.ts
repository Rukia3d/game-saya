import { getLineAndCharacterOfPosition } from "typescript";
import {
  Adventure,
  adventureType,
  Dialogue,
  DialogueLine,
  Story,
  StoryGroup,
} from "../src/utils/types";
import {
  AdventureDB,
  DialogueDB,
  LineDB,
  StoryDB,
  StoryGroupDB,
} from "./db_types";
const parse = require("csv-parse/lib/sync");
const fs = require("fs");
const path = "../src/data/";
const options = {
  columns: true,
  skip_empty_lines: true,
};

const getStoryCharacters = (characters: string) => {
  // Characters in DB are two names separated by coma
  return characters.split(", ");
};

const getStoryActions = (actions: string) => {
  // Actions in DB are separated by coma and a new line
  const act = actions.split(",\n");
  return act.map((a: any) => JSON.parse(a));
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

const getStoryGroups = (a: AdventureDB) => {
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
      action: undefined,
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
