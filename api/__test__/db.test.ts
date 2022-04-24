import { Database } from "sqlite3";
import { applyUserEvents } from "../engine/engine";
import createDb from "../storage/db_setup";
import { writeFinishStory } from "../storage/dynamic_data_writers";

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

const setupDb = async (): Promise<Database> => {
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
    `CREATE TABLE player_event_finishstory(
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
    // `INSERT INTO player_event (id, event, player_id, created_at, updated_at, deleted_at) VALUES
    //     ('0', 'CREATEUSER', '0', '1649035088', '1649035088', NULL),
    //     ('1', 'CREATEUSER', '1', '1649035089', '1649035089', NULL),
    //     ('2', 'FINISHSTORY', '1', '1649035104', '1649035104', NULL);`,
    // `INSERT INTO player_event_createuser(id, player_id, player_event_id) VALUES
    //     (0, 0, 0),
    //     (1, 1, 1);`,
    // `INSERT INTO player_event_finishstory(id, player_id, player_event_id, story_id, adventure_id) VALUES
    // (1, 1, 2, 0, 0);`,
  ];
  const db = await createDb();
  for (let i = 0; i < sql.length; i++) {
    await runSql(db, sql[i]);
  }
  return db;
};

test("requesting user", async () => {
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

  await writeFinishStory(0, 0, 0, db);

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

  await writeFinishStory(0, 0, 1, db);
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

  await writeFinishStory(0, 0, 2, db);
  const event3 = await applyUserEvents("0", db);
  //@ts-ignore
  expect(event3.adventures[0].stories[3].open).toBeTruthy();
  //@ts-ignore
  expect(event3.adventures[0].stories[4].open).toBeFalsy();
  expect(event3.heroes.length).toEqual(2);
  expect(event3.spells.length).toEqual(12);
  expect(event3.resources.length).toEqual(3);
  expect(event3.npcs.length).toEqual(1);

  await writeFinishStory(0, 0, 3, db);
  const event4 = await applyUserEvents("0", db);
  //@ts-ignore
  expect(event4.adventures[0].stories[4].open).toBeTruthy();
  //@ts-ignore
  expect(event4.adventures[0].stories[5].open).toBeFalsy();
  expect(event4.heroes.length).toEqual(2);
  expect(event4.spells.length).toEqual(12);
  expect(event4.npcs.length).toEqual(1);
  expect(event4.resources.length).toEqual(5);
  expect(event4.resources[0].name).toBe("Elderberry");
  expect(event4.resources[0].quantity).toBe(5);
  expect(event4.resources[1].name).toBe("Tea tree oil");
  expect(event4.resources[1].quantity).toBe(10);
  expect(event4.resources[2].name).toBe("Lavender");
  expect(event4.resources[2].quantity).toBe(3);
  expect(event4.resources[3].name).toBe("Peacock Feather");
  expect(event4.resources[3].quantity).toBe(2);
  expect(event4.resources[4].name).toBe("Snake skin");
  expect(event4.resources[4].quantity).toBe(2);
});
