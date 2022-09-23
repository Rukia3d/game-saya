import * as readers from "./db/readers";
import * as writers from "./db/writers";
import * as engine from "./engine/engine";
import * as cronjobs from "./cronjobs";
import {
  IArenaEndData,
  IArenaStartData,
  ICreatePlayerData,
  IMissCheckpointData,
  IOpenSpellData,
  IPassCheckpointData,
  IStartEndlessData,
  IStartLevelData,
  IUpdateSpellData,
  IWinLevelData,
} from "./engine/types";
import { findPlayer } from "./engine/helpers";

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

export const eventsApplication = () => {
  const events = readers.playerEvents();
  console.log("events", events);
  const game = engine.applyEvents(events);
  return game;
};

app.get("/api/players/:id", async (req: any, res: any) => {
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const player = findPlayer(game, playerId);
  const playerBased = { server: game.server, player: player };
  res.send(playerBased);
});

app.post("/api/players/new", async (req: any, res: any) => {
  console.log("CREATEPLAYER", req.query);
  const event: ICreatePlayerData = {
    created: new Date().valueOf(),
    type: "CREATEPLAYER",
    data: {
      name: req.query.name,
    },
  };
  const newEvent = writers.createPlayerEvent(event);
  const game = eventsApplication();
  res.send(game);
});

app.post("/api/players/:id/startLevel", async (req: any, res: any) => {
  console.log("STARTLEVEL", req.params.id, req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IStartLevelData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "STARTLEVEL",
    data: {
      arcanaId: req.body.arcana,
      mode: req.body.mode,
      levelId: req.body.level,
    },
  };
  console.log("going to write an event");
  const newEvent = writers.startLevelEvent(game, event);
  console.log("newEvent", newEvent);
  const newGame = eventsApplication();
  res.send(newGame);
});

app.post("/api/players/:id/winLevel", async (req: any, res: any) => {
  console.log("WINLEVEL", req.params.id, req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IWinLevelData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "WINLEVEL",
    data: {
      arcanaId: req.body.arcana,
      mode: req.body.mode,
      levelId: req.body.level,
    },
  };

  const newEvent = writers.winLevelEvent(game, event);
  const newGame = eventsApplication();
  res.send(newGame);
});

app.post("/api/players/:id/openSpell", async (req: any, res: any) => {
  console.log("OPENSPELL", req.params.id, req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IOpenSpellData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "OPENSPELL",
    data: {
      arcanaId: req.body.arcana,
      spellId: req.body.spell,
    },
  };

  const newEvent = writers.openSpellEvent(game, event);
  const newGame = eventsApplication();
  res.send(newGame);
});

app.post("/api/players/:id/updateSpell", async (req: any, res: any) => {
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IUpdateSpellData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "UPDATESPELL",
    data: {
      arcanaId: req.body.arcana,
      spellId: req.body.spell,
    },
  };
  const newEvent = writers.updateSpellEvent(game, event);
  const newGame = eventsApplication();
  res.send(newGame);
});

app.post("/api/players/:id/startEndless", async (req: any, res: any) => {
  console.log("STARTENDLESS", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IStartEndlessData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "STARTENDLESS",
    data: {
      arcanaId: req.body.arcana,
      mode: req.body.mode,
    },
  };
  const newEvent = writers.startEndlessEvent(game, event);
  const newGame = eventsApplication();
  res.send(newGame);
});

app.post("/api/players/:id/passCheckpoint", async (req: any, res: any) => {
  console.log("PASSCHECKPOINT", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IPassCheckpointData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "PASSCHECKPOINT",
    data: {
      arcanaId: req.body.arcana,
      mode: req.body.mode,
      checkpoint: req.body.checkpoint,
    },
  };
  const newEvent = writers.passCheckpointEvent(game, event);
  const newGame = eventsApplication();
  res.send(newGame);
});

app.post("/api/players/:id/missCheckpoint", async (req: any, res: any) => {
  console.log("MISS CHECKPOINT", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IMissCheckpointData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "MISSCHECKPOINT",
    data: {
      arcanaId: req.body.arcana,
      mode: req.body.mode,
    },
  };
  const newEvent = writers.missCheckpointEvent(game, event);
  const newGame = eventsApplication();
  res.send(newGame);
});

app.post("/api/players/:id/startArena", async (req: any, res: any) => {
  console.log("ARENA START", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IArenaStartData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "ARENASTART",
    data: {
      mode: req.body.eventMode,
      index: req.body.eventIndx,
    },
  };
  const newEvent = writers.startArenaEvent(game, event);
  const newGame = eventsApplication();
  res.send(newGame);
});

app.post("/api/players/:id/endArena", async (req: any, res: any) => {
  console.log("ARENA END", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IArenaEndData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "ARENAEND",
    data: {
      mode: req.body.eventMode,
      index: req.body.eventIndx,
    },
  };
  const newEvent = writers.endArenaEvent(game, event);
  const newGame = eventsApplication();
  res.send(newGame);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  cronjobs.run();
});
