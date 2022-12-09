import { app } from "./server";
import * as cronjobs from "./cronjobs";
import { setupDb } from "./__test__/db.test";

const port = 3001;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);

  //cronjobs.run();
  //setupDb();
});
