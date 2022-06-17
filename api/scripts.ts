import { readPlayerEvents } from "./db/readers";
import {
  writeCreatePlayerEvent,
  writeOpenSpellEvent,
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

export const playerEventsApplication = (playerId: number) => {
  const events = readPlayerEvents(playerId);
  const player = applyEvents(events);
  //console.log("events", events);
  return player;
};

app.get("/api/players/:id", async (req: any, res: any) => {
  let playerId: number = parseInt(req.params.id);
  if (req.params.id === "null") {
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
    req.body.element,
    req.body.mode,
    req.body.level
  );
  res.send(playerEventsApplication(playerId));
});

app.post("/api/players/:id/winLevel", async (req: any, res: any) => {
  let playerId = req.params.id;
  console.log("WIN PLAYER", req.body);
  writeWinLevelEvent(
    req.params.id,
    req.body.element,
    req.body.mode,
    req.body.level
  );
  res.send(playerEventsApplication(playerId));
});

app.post("/api/players/:id/openSpell", async (req: any, res: any) => {
  let playerId = req.params.id;
  console.log("OPEN SPELL", req.body);
  writeOpenSpellEvent(req.params.id, req.body.spell, req.body.element);
  res.send(playerEventsApplication(playerId));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
