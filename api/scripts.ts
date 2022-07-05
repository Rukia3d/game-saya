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
  //console.log("events", events);
  return player;
};

app.get("/api/players/:id", async (req: any, res: any) => {
  try {
    const player = playerEventsApplication(parseInt(req.params.id));
    res.send(player);
  } catch (error) {
    res.send(error);
  }
});

/*
  const player = playerEventsApplication(playerId)
  const event = { type: 'StartEndlessEvent', data: {
    id, element, mode
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
      elements: [],
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
  const player = playerEventsApplication(parseInt(req.params.id));
  const event: IGenericEvent = {
    playerId: req.params.id,
    created: new Date(),
    type: "STARTLEVEL",
    data: {
      element: req.body.element,
      mode: req.body.mode,
      level: req.body.level,
    },
  };
  try {
    const updatePlayer = engine.processEvent(player, event);
    res.send(updatePlayer);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/winLevel", async (req: any, res: any) => {
  const player = playerEventsApplication(parseInt(req.params.id));
  const event = {
    playerId: 0,
    created: new Date(),
    type: "WINLEVEL" as eventType,
    data: {
      element: req.body.element,
      mode: req.body.mode,
      level: req.body.level,
    },
  };
  try {
    const updatePlayer = engine.processEvent(player, event);
    res.send(updatePlayer);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/openSpell", async (req: any, res: any) => {
  const player = playerEventsApplication(parseInt(req.params.id));
  const event = {
    playerId: 0,
    created: new Date(),
    type: "OPENSPELL" as eventType,
    data: {
      element: req.body.element,
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
  const player = playerEventsApplication(parseInt(req.params.id));
  const event = {
    playerId: 0,
    created: new Date(),
    type: "UPDATESPELL" as eventType,
    data: {
      element: req.body.element,
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
  let playerId = req.params.id;
});

app.post("/api/players/:id/passCheckpoint", async (req: any, res: any) => {
  let playerId = req.params.id;
  console.log("PASSCHECKPOINT", req.body);
  // writePassCheckpointEvent(
  //   req.params.id,
  //   req.body.element,
  //   req.body.mode,
  //   req.body.level
  // );
  // res.send(playerEventsApplication(playerId));
});

app.post("/api/players/:id/missCheckpoint", async (req: any, res: any) => {
  let playerId = req.params.id;
  console.log("MISS CHECKPOINT", req.body);
  // Just change state???
  // writeWinLevelEvent(
  //   req.params.id,
  //   req.body.element,
  //   req.body.mode,
  //   req.body.level
  // );
  // res.send(playerEventsApplication(playerId));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
