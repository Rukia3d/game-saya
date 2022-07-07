import * as readers from "./db/readers";
import * as engine from "./engine/engine";
import { eventType, IGenericEvent, IPlayer } from "./engine/types";

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

export const playerEventsApplication = (playerId: number) => {
  const events = readers.playerEvents(playerId);
  const player = engine.applyEvents(events);
  console.log("playerEventsApplication events", events);
  return player;
};

app.get("/api/players/:id", async (req: any, res: any) => {
  const playerId = parseInt(req.params.id);
  try {
    const player = playerEventsApplication(playerId);
    res.send(player);
  } catch (error) {
    res.send(error);
  }
});

/*
  const player = playerEventsApplication(playerId)
  const event = { type: 'StartEndlessEvent', data: {
    id, arcana, mode
  }};

  try {
    const updatePlayer = engine.applyEvent(player, event);
    res.send(updatePlayer);
  } catch (error) {
    res.send(error);
  }

  // applyEvent = writeStartEndlessEvent
  //
    // applyEvent:
    //  \- validate event for current player state
    //     |- if invalid - raise/return error
    //     |- if valid - raise/return error
    //        \- write event to db
    //        \- rebuild and return player
    //


*/

app.post("/api/players/new", async (req: any, res: any) => {
  const event = {
    playerId: 0,
    created: new Date(),
    type: "CREATEPLAYER" as eventType,
    data: {
      name: req.query.name,
    },
  };
  try {
    const basePlayer: IPlayer = {
      id: 0,
      name: "",
      exprience: 0,
      energy: 0,
      maxEnergy: 0,
      loungeId: null,
      materials: [],
      arcanas: [],
      spells: [],
      missions: [],
      messages: [],
      currentState: { state: "MAIN" },
    };
    const updatePlayer = engine.processEvent(basePlayer, event);
    res.send(updatePlayer);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/startLevel", async (req: any, res: any) => {
  console.log("STARTLEVEL", req.params.id, req.body);
  const playerId = parseInt(req.params.id);
  const player = playerEventsApplication(playerId);
  const event: IGenericEvent = {
    playerId: playerId,
    created: new Date(),
    type: "STARTLEVEL" as eventType,
    data: {
      arcana: req.body.arcana,
      mode: req.body.mode,
      level: req.body.level,
    },
  };
  console.log("generated event", event);
  try {
    const updatePlayer = engine.processEvent(player, event);
    res.send(updatePlayer);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/winLevel", async (req: any, res: any) => {
  console.log("WINLEVEL", req.params.id, req.body);
  const playerId = parseInt(req.params.id);
  const player = playerEventsApplication(playerId);
  const event = {
    playerId: playerId,
    created: new Date(),
    type: "WINLEVEL" as eventType,
    data: {
      arcana: req.body.arcana,
      mode: req.body.mode,
      level: req.body.level,
    },
  };
  console.log("winLevel event", event);
  try {
    const updatePlayer = engine.processEvent(player, event);
    res.send(updatePlayer);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/openSpell", async (req: any, res: any) => {
  console.log("OPENSPELL", req.params.id, req.body);
  const playerId = parseInt(req.params.id);
  const player = playerEventsApplication(playerId);
  const event = {
    playerId: playerId,
    created: new Date(),
    type: "OPENSPELL" as eventType,
    data: {
      arcana: req.body.arcana,
      spell: req.body.spell,
    },
  };
  try {
    const updatePlayer = engine.processEvent(player, event);
    res.send(updatePlayer);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/updateSpell", async (req: any, res: any) => {
  const playerId = parseInt(req.params.id);
  const player = playerEventsApplication(playerId);
  const event = {
    playerId: playerId,
    created: new Date(),
    type: "UPDATESPELL" as eventType,
    data: {
      arcana: req.body.arcana,
      spell: req.body.spell,
    },
  };
  try {
    const updatePlayer = engine.processEvent(player, event);
    res.send(updatePlayer);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/startEndless", async (req: any, res: any) => {
  console.log("STARTENDLESS", req.body.mode);
  const playerId = parseInt(req.params.id);
});

app.post("/api/players/:id/passCheckpoint", async (req: any, res: any) => {
  console.log("PASSCHECKPOINT", req.body);
  const playerId = parseInt(req.params.id);
  // writePassCheckpointEvent(
  //   req.params.id,
  //   req.body.arcana,
  //   req.body.mode,
  //   req.body.level
  // );
  // res.send(playerEventsApplication(playerId));
});

app.post("/api/players/:id/missCheckpoint", async (req: any, res: any) => {
  console.log("MISS CHECKPOINT", req.body);
  const playerId = parseInt(req.params.id);
  // Just change state???
  // writeWinLevelEvent(
  //   req.params.id,
  //   req.body.arcana,
  //   req.body.mode,
  //   req.body.level
  // );
  // res.send(playerEventsApplication(playerId));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
