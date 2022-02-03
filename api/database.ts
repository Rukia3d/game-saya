import { IHero, INPC, ISpell, Player, PlayerData } from "../src/utils/types";
import type { Database } from "sqlite3";
import {
  CharacterDB,
  HeroDB,
  PlayerDB,
  SpellDB,
  SpellAppliedDB,
} from "./db_types";
import {
  addUpdatesToSpell,
  applyUpdateToSpell,
  parseCharacter,
  parseHero,
  parseSpell,
} from "./helpers";
const sqlite3 = require("sqlite3").verbose();

const exampleplayer: Player = {
  data: {
    id: "1",
    experience: 300,
    life: 7,
    maxlife: 7,
    mana: 10,
    maxmana: 15,
  },
  npcs: [],
  heroes: [],
  spells: [],
  spellUpdates: [],
  adventures: [],
  resources: [],
  enemies: [],
};

const readPlayer = (id: string, db: Database): Promise<PlayerDB> => {
  const sqlPlayer = `SELECT DISTINCT * FROM player WHERE id='${id}';`;

  // request player data from db and save into player
  return new Promise((resolve, reject) => {
    db.get(sqlPlayer, [], (err: Error, row: PlayerDB) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};

const readNPC = (id: string, db: Database): Promise<CharacterDB[]> => {
  const sqlNPCs = `SELECT character.id, name, dialogue_id, image FROM player_character INNER JOIN character ON character.id = player_character.character_id WHERE player_character.player_id='${id}';`;
  const playerNPCS: CharacterDB[] = [];
  return new Promise((resolve, reject) => {
    db.all(sqlNPCs, [], (err: Error, rows: CharacterDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: CharacterDB) => {
        playerNPCS.push(row);
      });

      resolve(playerNPCS);
    });
  });
};

const readHeroes = (id: string, db: Database): Promise<HeroDB[]> => {
  const sqlHeroes = `SELECT hero_id as id, character.name, element.name as school_name, selected, hero.description, element_id, element.school_id, element.code FROM player_hero INNER JOIN character ON character.id = player_hero.hero_id INNER JOIN hero ON hero.id = player_hero.hero_id INNER JOIN element ON hero.element_id=element.id WHERE player_hero.player_id='${id}'`;
  const playerHeroes: HeroDB[] = [];
  return new Promise((resolve, reject) => {
    db.all(sqlHeroes, [], (err: Error, rows: HeroDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: HeroDB) => {
        playerHeroes.push(row);
      });

      resolve(playerHeroes);
    });
  });
};

const readSpells = (id: string, db: Database): Promise<SpellDB[]> => {
  const sqlSpells = `SELECT player_spell.id as copy_id, player_spell.spell_id as id, spell.name, spell.strength, spell.description, player_spell.selected, spell.color_id as element_id, element.school_id FROM player_spell INNER JOIN spell ON player_spell.spell_id=spell.id INNER JOIN element ON spell.color_id=element.id WHERE player_spell.player_id='${id}'`;
  const playerSpells: SpellDB[] = [];
  return new Promise((resolve, reject) => {
    db.all(sqlSpells, [], (err: Error, rows: SpellDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: SpellDB) => {
        playerSpells.push(row);
      });

      resolve(playerSpells);
    });
  });
};

const readAppliedUpdates = (
  id: string,
  db: Database
): Promise<SpellAppliedDB[]> => {
  const sqlUpdatesApplied = `SELECT player_spell_spellupdate.spell_id, player_spell_spellupdate.copy_id, spellupdate.id as spellupdate_id, school_id, mana, spellupdate.effect, spellupdate.name, spellupdate.description, updateaction.id as updateaction_id, updateaction.effect as updateaction_effect, updateaction.action as updateaction_action, updateprice.id as updateprice_id, updateprice.effect as updateprice_effect, updateprice.action as updateprice_action  FROM player_spell_spellupdate INNER JOIN spellupdate on player_spell_spellupdate.spellupdate_id=spellupdate.id LEFT JOIN updateaction on spellupdate.updateaction_id=updateaction.id LEFT JOIN updateprice on spellupdate.updateprice_id=updateprice.id where player_spell_spellupdate.player_id='${id}'`;
  const appliedUpdates: SpellAppliedDB[] = [];
  return new Promise((resolve, reject) => {
    db.all(sqlUpdatesApplied, [], (err: Error, rows: SpellAppliedDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: SpellAppliedDB) => {
        appliedUpdates.push(row);
      });

      resolve(appliedUpdates);
    });
  });
};

export const createPlayer = (): Player => {
  return exampleplayer;
};

export const loadPlayer = async (id: string): Promise<Player> => {
  console.log("Requestimg player id", id);
  const sqlUpdates = ``;

  // open the database
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const npcData = await readNPC(id, db);
  const herosData = await readHeroes(id, db);
  const spellsData = await readSpells(id, db);
  const appliedUpdatesData = await readAppliedUpdates(id, db);

  const playerData: PlayerData = await readPlayer(id, db);
  let playerNpcs: INPC[] = npcData.map((n: CharacterDB) => parseCharacter(n));
  let playerHeroes: IHero[] = herosData.map((h: HeroDB) => parseHero(h));
  let playerSpells: ISpell[] = spellsData.map((s: SpellDB) => parseSpell(s));

  playerSpells.map((s: ISpell) => addUpdatesToSpell(s, appliedUpdatesData));

  exampleplayer.data = playerData;
  exampleplayer.npcs = playerNpcs;
  exampleplayer.heroes = playerHeroes;
  exampleplayer.spells = playerSpells;

  db.close();
  /*
  // request player characters and save into player
  db.all(sqlNPCs, [], (err: Error, rows: CharacterDB[]) => {
    if (err) {
      throw err;
    }
    rows.forEach((row: CharacterDB) => {
      playerNpcs.push(parseCharacter(row));
    });
    console.log("playerNpcs", playerNpcs);
  });

  // request player heroes and save into player
  db.all(sqlHeroes, [], (err: Error, rows: HeroDB[]) => {
    if (err) {
      throw err;
    }
    rows.forEach((row: HeroDB) => {
      playerHeroes.push(parseHero(row));
    });
    console.log("playerHeroes", playerHeroes);
  });

  // request player spells and save into player
  db.all(sqlSpells, [], (err: Error, rows: SpellDB[]) => {
    if (err) {
      throw err;
    }
    rows.forEach((row: SpellDB) => {
      playerSpells.push(parseSpell(row));
    });
    console.log("playerSpells", playerSpells);
  });

  db.all(sqlUpdatesApplied, [], (err: Error, rows: SpellAppliedDB[]) => {
    if (err) {
      throw err;
    }

    rows.forEach((row: SpellAppliedDB) => {
      playerAppliedSpells.push(row);
    });
  });

  // request player spellUpdates and save into player
  // request player adventures and save into player
  // request player resources and save into player


  // apply spell updates
  playerSpells.map((s: ISpell) =>
    s.updates.concat(
      applyUpdateToSpell(
        playerAppliedSpells.find(
          (a: SpellAppliedDB) => a.spell_id === s.id && a.copy_id === s.copy
        )
      )
    )
  );
  console.log("playerSpellsApplied", playerSpells);
*/
  return exampleplayer;
};
