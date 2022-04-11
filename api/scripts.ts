import { applyUserEvents } from "./engine/engine";
import createDb from "./storage/db_setup";
import { writeFinishStory } from "./storage/dynamic_data_writers";
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());

// app.post("/api/users/:userId/fight/:fightId", async (req: any, res: any) => {
//   console.log(
//     `Requesting player game data for ${req.query.userId} fight ${req.query.fightId}`
//   );
//   const gameState = null;
//   console.log("gameState", gameState);
//   res.send(gameState);
// });

app.post(
  "/api/users/:userId/adventure/:advId/story/:storyId",
  async (req: any, res: any) => {
    console.log(
      `Requesting player game data for ${req.params.userId} adventure ${req.params.advId} story ${req.params.storyId}`
    );
    const db = await createDb();
    await writeFinishStory(
      req.params.userId,
      req.params.advId,
      req.params.storyId,
      db
    );
    const gameState = await applyUserEvents(req.params.userId, db);
    db.close();
    res.send(gameState);
  }
);

app.get("/api/users/:userId", async (req: any, res: any) => {
  const db = await createDb();
  const gameState = await applyUserEvents(req.params.userId, db);
  db.close();
  res.send(gameState);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
