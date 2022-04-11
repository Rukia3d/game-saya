import { Database } from "sqlite3";
import { applyUserEvents } from "../engine/engine";
import createDb from "../storage/db_setup";

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
        id INTEGER,
        event VARCHAR,
        player_id INTEGER,
        created_at DATETIME,
        updated_at DATETIME,
        deleted_at DATETIME,
        PRIMARY KEY (id, event, player_id));
        `,
    `CREATE TABLE player_event_createuser(
        id INTEGER,
        player_id INTEGER,
        player_event_id INTEGER,
        PRIMARY KEY (id, player_id, player_event_id),
        FOREIGN KEY (player_event_id)
            REFERENCES player_event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);`,
    `CREATE TABLE player_event_finishstory(
        id INTEGER,
        player_id INTEGER,
        player_event_id INTEGER,
        story_id INTEGER,
        adventure_id INTEGER,
        PRIMARY KEY (id, player_id, player_event_id),
        FOREIGN KEY (player_event_id)
            REFERENCES player_event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);`,
    `CREATE TABLE player_event_startfight(
        id INTEGER,
        player_id INTEGER,
        player_event_id INTEGER,
        fight_id INTEGER,
        PRIMARY KEY (id, player_id, player_event_id),
        FOREIGN KEY (player_event_id)
            REFERENCES player_event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);`,
    `CREATE TABLE player_event_attackspell(
        id INTEGER,
        player_id INTEGER,
        player_event_id INTEGER,
        spell_id INTEGER,
        spell_copy INTEGER,
        PRIMARY KEY (id, player_id, player_event_id),
        FOREIGN KEY (player_event_id)
            REFERENCES player_event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);`,
    `INSERT INTO player_event (id, event, player_id, created_at, updated_at, deleted_at) VALUES
        ('0', 'CREATEUSER', '0', '1649035088', '1649035088', NULL),
        ('1', 'CREATEUSER', '1', '1649035089', '1649035089', NULL),
        ('2', 'FINISHSTORY', '1', '1649035104', '1649035104', NULL);`,
    `INSERT INTO player_event_createuser(id, player_id, player_event_id) VALUES
        (0, 0, 0),
        (1, 1, 1);`,
    `INSERT INTO player_event_finishstory(id, player_id, player_event_id, story_id, adventure_id) VALUES
    (1, 1, 2, 0, 0);`,
  ];
  const db = await createDb();
  for (let i = 0; i < sql.length; i++) {
    await runSql(db, sql[i]);
  }
  return db;
};

test("requesting user", async () => {
  const db = await setupDb();
  const res = await applyUserEvents("0", db);
  //@ts-ignore
  const adventure = res.adventures[0];
  expect(res.player.id).toEqual(0);
  expect(res.player.life).toEqual(10);
  expect(res.player.maxlife).toEqual(10);
  expect(res.player.mana).toEqual(10);
  expect(res.player.maxmana).toEqual(10);
  expect(res.adventures?.length).toEqual(1);
  expect(adventure.stories?.length).not.toEqual(0);
  //@ts-ignore
  expect(adventure.stories[0].open).toBeTruthy();
  //@ts-ignore
  expect(adventure.stories[1].open).toBeFalsy();

  console.log("res", res);
});
