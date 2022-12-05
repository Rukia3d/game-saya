import * as readers from "./db/readers";
import * as writers from "./db/writers";
import * as engine from "./engine/engine";
import { Database } from "sqlite3";
import {
  IArenaEndData,
  IArenaStartData,
  ICreatePlayerData,
  IDelistSpellData,
  IListSpellData,
  IMissCheckpointData,
  IOpenSpellData,
  IPassCheckpointData,
  IStartEndlessData,
  IStartLevelData,
  IUpdateSpellData,
  IWinLevelData,
} from "./engine/types";
import { findPlayer } from "./engine/helpers";
import { testServer, testPlayer } from "../src/utils/testDBPlayer";
import createDb from "./db/db";

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
export const app = express();
app.use(cors());
app.use(bodyParser.json());

export const eventsApplication = async (db: Database) => {
  const events = await readers.playerEvents(db);
  console.log("events", events);
  const game = await engine.applyEvents(db, events);
  return game;
};

app.get("/api/players/:id", async (req: any, res: any) => {
  const playerId = parseInt(req.params.id);
  const db = await createDb();
  const game = await eventsApplication(db);
  const player = findPlayer(game, playerId);
  db.close();
  res.send({ server: game.server, player: player });
});

app.post("/api/players/new", async (req: any, res: any) => {
  console.log("CREATEPLAYER", req.query);
  const db = await createDb();
  const event: ICreatePlayerData = {
    created: new Date().valueOf(),
    type: "CREATEPLAYER",
    data: {
      name: req.query.name,
    },
  };
  const newEvent = await writers.createPlayerEvent(db, event);
  const game = await eventsApplication(db);
  const player = findPlayer(game, newEvent.playerId);
  db.close();
  res.send({ server: game.server, player: player });
});

/*
app.post("/api/players/:id/startLevel", async (req: any, res: any) => {
  console.log("STARTLEVEL", req.params.id, req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IStartLevelData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "STARTLEVEL",
    data: {
      elementId: req.body.element,
      adventureId: req.body.adventure,
      mode: req.body.mode,
      storyId: req.body.story,
    },
  };
  const newEvent = writers.startLevelEvent(game, event);
  const newGame = eventsApplication();
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
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
      storyId: req.body.storyId,
    },
  };

  const newEvent = writers.winLevelEvent(game, event);
  console.log("newEvent", newEvent);
  const newGame = eventsApplication();
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
});
/*
app.post("/api/players/:id/openSpell", async (req: any, res: any) => {
  console.log("OPENSPELL", req.params.id, req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IOpenSpellData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "OPENSPELL",
    data: {
      elementId: req.body.arcana,
      spellId: req.body.spell,
    },
  };

  const newEvent = writers.openSpellEvent(game, event);
  const newGame = eventsApplication();
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
});

app.post("/api/players/:id/updateSpell", async (req: any, res: any) => {
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IUpdateSpellData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "UPDATESPELL",
    data: {
      elementId: req.body.arcana,
      spellId: req.body.spell,
    },
  };
  const newEvent = writers.updateSpellEvent(game, event);
  const newGame = eventsApplication();
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
});

app.post("/api/players/:id/listSpell", async (req: any, res: any) => {
  console.log("LISTSPELL", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IListSpellData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "LISTSPELL",
    data: {
      spellId: req.body.spell,
      price: req.body.price,
      currency: req.body.currency,
    },
  };
  const newEvent = writers.listSpellEvent(game, event);
  const newGame = eventsApplication();
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
});

app.post("/api/players/:id/delistSpell", async (req: any, res: any) => {
  console.log("DELISTSPELL", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IDelistSpellData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "DELISTSPELL",
    data: {
      listingId: req.body.listing,
    },
  };
  const newEvent = writers.delistSpellEvent(game, event);
  const newGame = eventsApplication();
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
});

app.post("/api/players/:id/buySpell", async (req: any, res: any) => {
  console.log("BUYSPELL", req.body);
  const playerId = parseInt(req.params.id);
  const game = eventsApplication();
  const event: IListSpellData = {
    playerId: playerId,
    created: new Date().valueOf(),
    type: "BUYSPELL",
    data: {
      spellId: req.body.spell,
      price: req.body.price,
      currency: req.body.currency,
    },
  };
  const newEvent = writers.buySpellEvent(game, event);
  const newGame = eventsApplication();
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
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
      elementId: req.body.arcana,
      mode: req.body.mode,
    },
  };
  const newEvent = writers.startEndlessEvent(game, event);
  const newGame = eventsApplication();
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
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
      elementId: req.body.arcana,
      mode: req.body.mode,
      checkpoint: req.body.checkpoint,
    },
  };
  const newEvent = writers.passCheckpointEvent(game, event);
  const newGame = eventsApplication();
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
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
      elementId: req.body.arcana,
      mode: req.body.mode,
    },
  };
  const newEvent = writers.missCheckpointEvent(game, event);
  const newGame = eventsApplication();
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
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
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
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
  const player = findPlayer(game, playerId);
  res.send({ server: newGame.server, player: player });
});
*/
