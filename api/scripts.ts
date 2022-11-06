import { app } from "./server";
import * as cronjobs from "./cronjobs";

const port = 3001;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  cronjobs.run();
});
