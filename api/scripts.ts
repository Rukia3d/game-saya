import { Database } from "sqlite";
import { app } from "./server";
// import * as cronjobs from "./cronjobs";
// import { setupDb } from "./__test__/db.test";
import createDb from "./storage/db";

const port = 3001;
const database = "./storage/player.db";

createDb(database).then((db: Database) => {
  app(db).listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    //cronjobs.run();
    //setupDb();
  });
});
