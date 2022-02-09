import { Database } from "sqlite3";
import {
  AdventureDB,
  StoryGroupDB,
  StoryActionDB,
  DialogueDB,
  FightDB,
  ResourceDB,
  HeroDB,
  ElementDB,
  SpellDB,
  CharacterDB,
  PlayerDB,
  SpellUpdateDB,
  SpellUpdateResourceDB,
  ActionDB,
} from "./types";

export const readAdventuresData = (db: Database): Promise<AdventureDB[]> => {
  const adventures: AdventureDB[] = [];
  const sql = `
    SELECT adventure.id, adventure.name as adventure_name, form, 
    storygroup_id, visual, storygroup.name as storygroup_name 
      FROM adventure 
    LEFT JOIN adventure_storygroup 
      ON adventure.id=adventure_storygroup.adventure_id 
      LEFT JOIN storygroup 
        ON storygroup.id=adventure_storygroup.storygroup_id
        ORDER BY adventure.id;`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: AdventureDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: AdventureDB) => {
        adventures.push(row);
      });

      resolve(adventures);
    });
  });
};

export const readStoriesData = (db: Database): Promise<StoryGroupDB[]> => {
  const stories: StoryGroupDB[] = [];
  const sql = `
  SELECT story.id as id, storygroup_id, story.name, image, story.type as story_type, story.next
  FROM storygroup_story 
  JOIN story 
  ON storygroup_story.story_id=story.id
  ORDER BY story."order";`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: StoryGroupDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: StoryGroupDB) => {
        stories.push(row);
      });

      resolve(stories);
    });
  });
};

export const readStoriesActionData = (
  db: Database
): Promise<StoryActionDB[]> => {
  const actions: StoryActionDB[] = [];
  const sql = `
    SELECT story_id, id, type, item, data
      FROM story_action 
    JOIN action 
      ON story_action.action_id=action.id 
    WHERE type != 'spellUpdate';`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: StoryActionDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: StoryActionDB) => {
        actions.push(row);
      });

      resolve(actions);
    });
  });
};

export const readActionUpdateData = (db: Database): Promise<ActionDB[]> => {
  const actions: ActionDB[] = [];
  const sql = `
    SELECT * FROM action 
    WHERE type == 'spellUpdate';`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: ActionDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: ActionDB) => {
        actions.push(row);
      });

      resolve(actions);
    });
  });
};

export const readDialoguesData = (db: Database): Promise<DialogueDB[]> => {
  const dialogues: DialogueDB[] = [];
  const sql = `
    SELECT dialogue_id, background, layout, line_id, image, 
    text, position, character_id 
      FROM dialogue 
    JOIN dialogue_line 
      ON dialogue.story_id=dialogue_line.dialogue_id 
    JOIN line ON  dialogue_line.line_id=line.id;`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DialogueDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DialogueDB) => {
        dialogues.push(row);
      });

      resolve(dialogues);
    });
  });
};

export const readFightsData = (db: Database): Promise<FightDB[]> => {
  const fights: FightDB[] = [];
  const sql = `
    SELECT fight.story_id as fight_id, enemy_id, hero_num, fight_element.element_id as hero_element, enemy.element_id as enemy_element, story.name
        FROM fight 
    JOIN story
        ON story.id=fight.story_id
    JOIN enemy 
        ON fight.enemy_id=enemy.character_id
    JOIN fight_element 
        ON fight.story_id=fight_element.fight_id;`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: FightDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: FightDB) => {
        fights.push(row);
      });

      resolve(fights);
    });
  });
};

export const readResourcesData = (db: Database): Promise<ResourceDB[]> => {
  const resources: ResourceDB[] = [];
  const sql = `SELECT * FROM resource;`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: ResourceDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: ResourceDB) => {
        resources.push(row);
      });

      resolve(resources);
    });
  });
};

export const readHeroesData = (db: Database): Promise<HeroDB[]> => {
  const heroes: HeroDB[] = [];
  const sql = `
  SELECT character_id, name, description, 
  element_id
      FROM hero 
  JOIN character 
      ON character.id=hero.character_id;`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: HeroDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: HeroDB) => {
        heroes.push(row);
      });

      resolve(heroes);
    });
  });
};

export const readElementsData = (db: Database): Promise<ElementDB[]> => {
  const elements: ElementDB[] = [];
  const sql = `
    SELECT element.id, code, element.name, element.description, school_id, 
    school.name as school_name, school.description as school_description 
        FROM element 
    JOIN school ON element.school_id=school.id;`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: ElementDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: ElementDB) => {
        elements.push(row);
      });

      resolve(elements);
    });
  });
};

export const readSpellsData = (db: Database): Promise<SpellDB[]> => {
  const spells: SpellDB[] = [];
  const sql = `SELECT * from spell;`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: SpellDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: SpellDB) => {
        spells.push(row);
      });

      resolve(spells);
    });
  });
};

export const readCharactersData = (db: Database): Promise<CharacterDB[]> => {
  const characters: CharacterDB[] = [];
  const sql = `SELECT * from character;`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: CharacterDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: CharacterDB) => {
        characters.push(row);
      });

      resolve(characters);
    });
  });
};

export const readUpdatesData = (db: Database): Promise<SpellUpdateDB[]> => {
  const updates: SpellUpdateDB[] = [];
  const sql = `SELECT * from spellupdate;`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: SpellUpdateDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: SpellUpdateDB) => {
        updates.push(row);
      });

      resolve(updates);
    });
  });
};

export const readUpdateResource = (
  db: Database
): Promise<SpellUpdateResourceDB[]> => {
  const updates: SpellUpdateResourceDB[] = [];
  const sql = `SELECT * from spellupdate_resource;`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: SpellUpdateResourceDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: SpellUpdateResourceDB) => {
        updates.push(row);
      });

      resolve(updates);
    });
  });
};
