import { readPlayerEvents } from "./db/readers";
import {
  writeCreatePlayerEvent,
  writeStartLevelEvent,
  writeWinLevelEvent,
} from "./db/writers";
import { applyEvents } from "./engine/engine";

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

const playerEventsApplication = (playerId: number) => {
  const events = readPlayerEvents(playerId);
  const player = applyEvents(events);
  return player;
};

app.get("/api/players/:id", async (req: any, res: any) => {
  let playerId = req.params.id;
  if (playerId === "null") {
    if (!req.query.name)
      throw new Error("User name is required to create new user");
    playerId = writeCreatePlayerEvent(req.query.name);
  }
  res.send(playerEventsApplication(playerId));
});

app.post("/api/players/:id/startLevel", async (req: any, res: any) => {
  let playerId = req.params.id;
  writeStartLevelEvent(
    req.params.id,
    req.query.element,
    req.query.mode,
    req.query.level
  );
  res.send(playerEventsApplication(playerId));
});

app.post("/api/players/:id/winLevel", async (req: any, res: any) => {
  let playerId = req.params.id;
  writeWinLevelEvent(
    req.params.id,
    req.query.element,
    req.query.mode,
    req.query.level
  );
  res.send(playerEventsApplication(playerId));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
