import { Database } from "sqlite";
import { app } from "./server";
import * as cronjobs from "./cronjobs";
import createDb from "./storage/db";

const port = 3001;
const database = "./storage/player.db";

createDb(database).then((db: Database) => {
  app(db).listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
    await cronjobs.run(db);
    //setupDb();
  });
});
