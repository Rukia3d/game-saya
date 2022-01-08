import {
  adventureType,
  dialogueLayout,
  elementType,
  enemyExpLevel,
  IAdventure,
  IDialogue,
  IEnemy,
  IFight,
  IHero,
  IResource,
  ISpell,
  ISpellUpdate,
  spellEffectType,
} from "../src/utils/types";
import {
  getDialogueLines,
  getStoryGroups,
  getEnemySpells,
} from "./additionaldata";
import {
  AdventureDB,
  DialogueDB,
  EnemyDB,
  HeroDB,
  NpcDB,
  SpellDB,
  ResourceDB,
  UpdateSpellDB,
  FightDB,
} from "./db_types";
import {
  getCharacters,
  getHeroInitialSpellSet,
  getResourceSet,
  parseAction,
  parsePrice,
} from "./helpers";
const parse = require("csv-parse/lib/sync");
const fs = require("fs");
const path = "../src/data/";
const options = {
  columns: true,
  skip_empty_lines: true,
};

export const readDialogues = (): IDialogue[] => {
  const dialogues: IDialogue[] = [];
  const inputDial = fs.readFileSync(path + "Story Data - DB_Dialogues.csv");
  const dialogueDB: DialogueDB[] = parse(inputDial, options);
  for (let i = 0; i < dialogueDB.length; i++) {
    const dialLines = getDialogueLines(dialogueDB[i]);
    // Transform data from DB into game Dialogue format
    dialogues[i] = {
      id: dialogueDB[i].id,
      lines: dialLines,
      background: dialogueDB[i].background,
      layout: dialogueDB[i].layout as dialogueLayout,
      characters: getCharacters(dialogueDB[i].characters),
    };
  }
  return dialogues;
};

export const readResources = (): IResource[] => {
  const resources: IResource[] = [];
  const inputResource = fs.readFileSync(path + "Story Data - DB_Resources.csv");
  const resourceDB: ResourceDB[] = parse(inputResource, options);
  for (let i = 0; i < resourceDB.length; i++) {
    // Transform data from DB into game Dialogue format
    resources[i] = {
      id: resourceDB[i].id,
      name: resourceDB[i].name,
      commonality: parseInt(resourceDB[i].commonality),
      image: resourceDB[i].image,
      element: resourceDB[i].element as elementType,
    };
  }
  return resources;
};

export const readSpellUpdates = (): ISpellUpdate[] => {
  const updates: ISpellUpdate[] = [];
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
      action: parseAction(updateSpellDB[i].action),
      price: parsePrice(updateSpellDB[i].price),
      name: updateSpellDB[i].name,
      description: updateSpellDB[i].description,
      id: updateSpellDB[i].id,
    };
  }
  return updates;
};

export const readAdventures = (): IAdventure[] => {
  const adventures: IAdventure[] = [];
  const inputAdv = fs.readFileSync(path + "Story Data - DB_Adventures.csv");
  const adventureDB: AdventureDB[] = parse(inputAdv, options);
  for (let i = 0; i < adventureDB.length; i++) {
    const storyGroups = getStoryGroups(adventureDB[i]);
    // Transform data from DB into game Adventure format
    adventures[i] = {
      id: adventureDB[i].id as adventureType,
      type: adventureDB[i].form,
      name: adventureDB[i].name,
      image: adventureDB[i].image,
      open: false,
      storyGroups: storyGroups.length > 0 ? storyGroups : undefined,
    };
  }
  if (adventures.length < 5)
    throw new Error("Reading from DB returned less than 5 adventures");
  return adventures;
};

export const readEnemies = (): IEnemy[] => {
  const enemies: IEnemy[] = [];
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
      description: enemyDB[i].description,
    };
  }
  return enemies;
};

export const readHeroes = (): IHero[] => {
  const heroes: IHero[] = [];
  const inputHeroes = fs.readFileSync(path + "Story Data - DB_Heroes.csv");
  const heroDB: HeroDB[] = parse(inputHeroes, options);
  for (let i = 0; i < heroDB.length; i++) {
    heroes[i] = {
      id: heroDB[i].id,
      name: heroDB[i].name,
      image: heroDB[i].image,
      selected: false,
      element: heroDB[i].element as elementType,
      description: heroDB[i].description,
    };
  }
  return heroes;
};

export const readSpells = (): ISpell[] => {
  const spells: ISpell[] = [];
  const inputSpells = fs.readFileSync(path + "Story Data - DB_Cards.csv");
  const spellDB: SpellDB[] = parse(inputSpells, options);
  const parsedSpells = getHeroInitialSpellSet(spellDB);
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
      updates: [],
    };
  }
  return spells;
};

export const readNpcs = (): IHero[] => {
  const npcs: IHero[] = [];
  const inputNpcs = fs.readFileSync(path + "Story Data - DB_NPCs.csv");
  const npcDB: NpcDB[] = parse(inputNpcs, options);
  for (let i = 0; i < npcDB.length; i++) {
    npcs[i] = {
      id: npcDB[i].id,
      name: npcDB[i].name,
      image: npcDB[i].image,
      description: npcDB[i].description,
    };
  }
  return npcs;
};

export const readFights = (): IFight[] => {
  const fights: IFight[] = [];
  const inputFights = fs.readFileSync(path + "Story Data - DB_Fights.csv");
  const fightsDB: FightDB[] = parse(inputFights, options);
  for (let i = 0; i < fightsDB.length; i++) {
    fights[i] = {
      id: fightsDB[i].id,
      name: fightsDB[i].name,
      image: fightsDB[i].image,
      enemy: fightsDB[i].enemy,
      characters: getCharacters(fightsDB[i].characters),
    };
  }
  return fights;
};
