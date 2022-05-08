import { Database } from "sqlite3";
import { applyUserEvents } from "../engine/engine";
import createDb from "../storage/db_setup";
import {
  writeFinishDialogue,
  writeStartFight,
} from "../storage/dynamic_data_writers";

//jest.setMock("../storage/db_setup", require("../storage/db_setup.mock"));
jest.mock("../storage/db_setup");

const runSql = (db: Database, sql: string) =>
  new Promise((resolve, reject) => {
    db.run(sql, (err: Error) => {
      if (err) {
        console.log("Some Error Occured");
        reject(err);
      }
      resolve(null);
    });
  });

export const setupDb = async (): Promise<Database> => {
  const sql = [
    `CREATE TABLE player_event(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event VARCHAR,
        player_id INTEGER,
        created_at DATETIME,
        updated_at DATETIME,
        deleted_at DATETIME,
        UNIQUE (id, event, player_id));
        `,
    `CREATE TABLE player_event_finishdialogue(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER,
        story_id INTEGER,
        adventure_id INTEGER,
        UNIQUE (id, event_id),
        FOREIGN KEY (event_id)
            REFERENCES player_event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);`,
    `CREATE TABLE player_event_finishreel(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER,
      story_id INTEGER,
      adventure_id INTEGER,
      UNIQUE (id, event_id),
      FOREIGN KEY (event_id)
          REFERENCES player_event (id)
              ON DELETE CASCADE
              ON UPDATE NO ACTION);`,
    `CREATE TABLE player_event_startfight(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER,
        fight_id INTEGER,
        adventure_id INTEGER,
        heroes TEXT,
        spells TEXT,
        UNIQUE (id, event_id),
        FOREIGN KEY (event_id)
            REFERENCES player_event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);`,
    `CREATE TABLE player_event_attackspell(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER,
        spell_id INTEGER,
        spell_copy INTEGER,
        UNIQUE (id, event_id),
        FOREIGN KEY (event_id)
            REFERENCES player_event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);`,
    `CREATE TABLE player_event_winfight(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER,
      story_id INTEGER,
      adventure_id INTEGER,
      UNIQUE (id, event_id),
      FOREIGN KEY (event_id)
          REFERENCES player_event (id)
              ON DELETE CASCADE
              ON UPDATE NO ACTION);`,
    `CREATE TABLE player_event_loosefight(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER,
      story_id INTEGER,
      adventure_id INTEGER,
      UNIQUE (id, event_id),
      FOREIGN KEY (event_id)
          REFERENCES player_event (id)
              ON DELETE CASCADE
              ON UPDATE NO ACTION);`,
    `INSERT INTO player_event (id, event, player_id, created_at, updated_at, deleted_at) VALUES
        ('0', 'CREATEUSER', '0', '1649035088', '1649035088', NULL),
        ('1', 'CREATEUSER', '1', '1649035089', '1649035089', NULL),
        ('2', 'FINISDIALOGUE', '1', '1649035104', '1649035104', NULL);`,
    `INSERT INTO player_event_finishdialogue(id, event_id, story_id, adventure_id) VALUES
    (1, 1, 0, 0);`,
    `INSERT INTO player_event_attackspell(id, event_id, spell_id, spell_copy) VALUES
    (1, 1, 2, 0);`,
  ];
  const db = await createDb();
  for (let i = 0; i < sql.length; i++) {
    await runSql(db, sql[i]);
  }
  return db;
};

test("requesting user 0", async () => {
  const db = await setupDb();
  const event0 = await applyUserEvents("0", db);
  expect(event0.player.id).toEqual(0);
  expect(event0.player.life).toEqual(10);
  expect(event0.player.maxlife).toEqual(10);
  expect(event0.player.mana).toEqual(10);
  expect(event0.player.maxmana).toEqual(10);

  //@ts-ignore
  expect(event0.adventures[0].stories[0].open).toBeTruthy();
  //@ts-ignore
  expect(event0.adventures[0].stories[1].open).toBeFalsy();

  expect(event0.heroes[0].name).toEqual("Maya");
  expect(event0.spells.length).toEqual(6);
  expect(event0.spells[0].selected).toBeTruthy();
  expect(event0.resources.length).toEqual(3);
  expect(event0.resources[0].name).toEqual("Elderberry");
  expect(event0.resources[1].name).toEqual("Tea tree oil");
  expect(event0.resources[1].quantity).toEqual(5);
  expect(event0.npcs[0].name).toEqual("Maya");
  expect(event0.npcs[0].dialogue.id).toEqual(6);

  await writeFinishDialogue(0, 0, 0, db);

  const event1 = await applyUserEvents("0", db);
  expect(event1.player.life).toEqual(10);
  expect(event1.player.mana).toEqual(10);
  //@ts-ignore
  expect(event1.adventures[0].stories[1].open).toBeTruthy();
  //@ts-ignore
  expect(event1.adventures[0].stories[2].open).toBeFalsy();
  expect(event1.heroes.length).toEqual(1);
  expect(event1.spells.length).toEqual(6);
  expect(event1.npcs.length).toEqual(1);
  expect(event1.npcs[0].name).toEqual("Olija");
  expect(event1.npcs[0].dialogue.id).toEqual(7);

  await writeFinishDialogue(0, 0, 1, db);
  const event2 = await applyUserEvents("0", db);
  expect(event2.player.life).toEqual(10);
  expect(event2.player.mana).toEqual(10);
  //@ts-ignore
  expect(event2.adventures[0].stories[2].open).toBeTruthy();
  //@ts-ignore
  expect(event2.adventures[0].stories[3].open).toBeFalsy();
  expect(event2.heroes.length).toEqual(2);
  expect(event2.heroes[0].name).toEqual("Maya");
  expect(event2.heroes[1].name).toEqual("Nell");
  expect(event2.spells.length).toEqual(12);
  expect(event2.spells[0].selected).toBeTruthy();
  expect(event2.spells[6].selected).toBeFalsy();
  expect(event2.resources.length).toEqual(3);
  expect(event2.npcs.length).toEqual(1);
  expect(event2.npcs[0].name).toEqual("Olija");
  expect(event2.npcs[0].dialogue.id).toEqual(7);

  await writeFinishDialogue(0, 0, 2, db);
  const event3 = await applyUserEvents("0", db);
  //@ts-ignore
  expect(event3.adventures[0].stories[3].open).toBeTruthy();
  //@ts-ignore
  expect(event3.adventures[0].stories[4].open).toBeFalsy();
  expect(event3.heroes.length).toEqual(2);
  expect(event3.spells.length).toEqual(12);
  expect(event3.resources.length).toEqual(3);
  expect(event3.npcs.length).toEqual(1);
  await writeStartFight(
    0,
    0,
    3,
    "0, 1",
    "7:0, 7:1, 8:0, 8:1, 9:0, 10:0, 10:1, 11:0, 11:1, 12:0",
    db
  );
  const event4 = await applyUserEvents("0", db);
  console.log("event4", event4);

  /*
  await writeFinishStory(0, 0, 3, db);
  const event5 = await applyUserEvents("0", db);
  //@ts-ignore
  expect(event5.adventures[0].stories[4].open).toBeTruthy();
  //@ts-ignore
  expect(event5.adventures[0].stories[5].open).toBeFalsy();
  expect(event5.heroes.length).toEqual(2);
  expect(event5.spells.length).toEqual(12);
  expect(event5.npcs.length).toEqual(1);
  expect(event5.resources.length).toEqual(5);
  expect(event5.resources[0].name).toBe("Elderberry");
  expect(event5.resources[0].quantity).toBe(5);
  expect(event5.resources[1].name).toBe("Tea tree oil");
  expect(event5.resources[1].quantity).toBe(11);
  expect(event5.resources[2].name).toBe("Lavender");
  expect(event5.resources[2].quantity).toBe(3);
  expect(event5.resources[3].name).toBe("Water Lily");
  expect(event5.resources[3].quantity).toBe(3);
  expect(event5.resources[4].name).toBe("Stone");
  expect(event5.resources[4].quantity).toBe(8);
  */
});
