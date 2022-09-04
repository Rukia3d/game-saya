import * as readers from "./db/readers";
import * as writers from "./db/writers";
import * as engine from "./engine/engine";
import * as cronjobs from "./cronjobs";
import {
  ICreatePlayerData,
  IMissCheckpointData,
  IOpenSpellData,
  IPassCheckpointData,
  IPlayer,
  IServer,
  IStartEndlessData,
  IStartLevelData,
  IUpdateSpellData,
  IWinLevelData,
} from "./engine/types";

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

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
const baseServer: IServer = {
  arenaRun: { events: [], resultTime: 0, type: "run" },
  arenaFight: { events: [], resultTime: 0, type: "fight" },
};

export const eventsApplication = (playerId: number) => {
  const events = readers.playerEvents(playerId);
  const game = engine.applyEvents(events);
  return game;
};

app.get("/api/players/:id", async (req: any, res: any) => {
  const playerId = parseInt(req.params.id);
  try {
    const game = eventsApplication(playerId);
    res.send(game);
  } catch (error) {
    res.send(error);
  }
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
  try {
    const newEvent = writers.createPlayerEvent(event);
    const game = eventsApplication(newEvent.playerId);
    res.send(game);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/startLevel", async (req: any, res: any) => {
  console.log("STARTLEVEL", req.params.id, req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication(playerId);
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
  try {
    const newEvent = writers.startLevelEvent(game, event);
    const newGame = eventsApplication(newEvent.playerId);
    res.send(newGame);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/winLevel", async (req: any, res: any) => {
  console.log("WINLEVEL", req.params.id, req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication(playerId);
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
  try {
    const newEvent = writers.winLevelEvent(game, event);
    const newGame = eventsApplication(newEvent.playerId);
    res.send(newGame);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/openSpell", async (req: any, res: any) => {
  console.log("OPENSPELL", req.params.id, req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication(playerId);
  const event: IOpenSpellData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "OPENSPELL",
    data: {
      arcanaId: req.body.arcana,
      spellId: req.body.spell,
    },
  };
  try {
    const newEvent = writers.openSpellEvent(game, event);
    const newGame = eventsApplication(newEvent.playerId);
    res.send(newGame);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/updateSpell", async (req: any, res: any) => {
  const playerId = parseInt(req.params.id);
  const game = eventsApplication(playerId);
  const event: IUpdateSpellData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "UPDATESPELL",
    data: {
      arcanaId: req.body.arcana,
      spellId: req.body.spell,
    },
  };
  try {
    const newEvent = writers.updateSpellEvent(game, event);
    const newGame = eventsApplication(newEvent.playerId);
    res.send(newGame);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/startEndless", async (req: any, res: any) => {
  console.log("STARTENDLESS", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication(playerId);
  const event: IStartEndlessData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "STARTENDLESS",
    data: {
      arcanaId: req.body.arcana,
      mode: req.body.mode,
    },
  };
  try {
    const newEvent = writers.startEndlessEvent(game, event);
    const newGame = eventsApplication(newEvent.playerId);
    res.send(newGame);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/passCheckpoint", async (req: any, res: any) => {
  console.log("PASSCHECKPOINT", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication(playerId);
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
  try {
    const newEvent = writers.passCheckpointEvent(game, event);
    const newGame = eventsApplication(newEvent.playerId);
    res.send(newGame);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/missCheckpoint", async (req: any, res: any) => {
  console.log("MISS CHECKPOINT", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication(playerId);
  const event: IMissCheckpointData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "MISSCHECKPOINT",
    data: {
      arcanaId: req.body.arcana,
      mode: req.body.mode,
    },
  };
  try {
    const newEvent = writers.missCheckpointEvent(game, event);
    const newGame = eventsApplication(newEvent.playerId);
    res.send(newGame);
  } catch (error) {
    res.send(error);
  }
});

/*
app.post("/api/players/:id/arena", async (req: any, res: any) => {
  console.log("ARENA START", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication(playerId);
  const event = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "ARENASTART" as eventType,
    data: {
      mode: req.body.eventMode,
      index: req.body.eventIndx,
    },
  };
  try {
    const updateGame = engine.processEvent(game, event);
    res.send(updateGame);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/players/:id/endArena", async (req: any, res: any) => {
  console.log("ARENA END", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication(playerId);
  const event = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "ARENAEND" as eventType,
    data: {
      mode: req.body.eventMode,
      index: req.body.eventIndx,
    },
  };
  try {
    const updateGame = engine.processEvent(game, event);
    res.send(updateGame);
  } catch (error) {
    res.send(error);
  }
});
*/

app.post("/api/debug/arenaResult", async (req: any, res: any) => {
  console.log("Trigger arena results");
  cronjobs.endArenaRun();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
