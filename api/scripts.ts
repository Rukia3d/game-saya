import { applyUserEvents } from "./engine/engine";
import createDb from "./storage/db_setup";
import {
  writeFinishStory,
  writeStartFight,
} from "./storage/dynamic_data_writers";
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

// app.post("/api/users/:userId/fight/:fightId", async (req: any, res: any) => {
//   console.log(
//     `Requesting player game data for ${req.query.userId} fight ${req.query.fightId}`
//   );
//   const gameState = null;
//   console.log("gameState", gameState);
//   res.send(gameState);
// });

// app.post(
//   "/api/users/:userId/adventure/:advId/fight/:fightId",
//   async (req: any, res: any) => {
//     console.log(
//       `Requesting player game data for ${req.params.userId} adventure ${req.params.advId} fight ${req.params.fightId} was ${req.query.result}`
//     );
//     const db = await createDb();
//     await writeFinishFight(
//       req.params.userId,
//       req.params.advId,
//       req.params.storyId,
//       req.query.result,
//       db
//     );
//     const gameState = await applyUserEvents(req.params.userId, db);
//     db.close();
//     res.send(gameState);
//   }
// );

app.post("/api/users/:userId/fight", async (req: any, res: any) => {
  const adventure = req.body.advId;
  const fight = req.body.fightId;
  const heroes = req.body.heroes;
  const spells = req.body.spells;
  console.log(
    `Requesting player game data for ${req.params.userId} adventure ${adventure} fight ${req.body.fightId}`
  );
  const db = await createDb();
  await writeStartFight(
    req.params.userId,
    adventure,
    fight,
    heroes,
    spells,
    db
  );
  const gameState = await applyUserEvents(req.params.userId, db);
  db.close();
  res.send(gameState);
});

app.post("/api/users/:userId/story", async (req: any, res: any) => {
  const adventure = req.body.advId;
  const story = req.body.storyId;
  console.log(
    `Requesting player game data for ${req.params.userId} adventure ${adventure} story ${story}`
  );
  const db = await createDb();
  await writeFinishStory(req.params.userId, adventure, story, db);
  const gameState = await applyUserEvents(req.params.userId, db);
  db.close();
  res.send(gameState);
});

app.get("/api/users/:userId", async (req: any, res: any) => {
  const db = await createDb();
  const gameState = await applyUserEvents(req.params.userId, db);
  db.close();
  res.send(gameState);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
