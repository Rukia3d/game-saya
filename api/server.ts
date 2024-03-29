import * as readers from "./engine/readers";
import * as writers from "./engine/writers";
import * as engine from "./engine/engine";
import { Database } from "sqlite";
import {
  IArenaEndData,
  IArenaStartData,
  IClaimRewardData,
  ICreatePlayerData,
  IStartLevelData,
  IWinLevelData,
} from "./engine/types";
import { findPlayer } from "./engine/helpers";

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const appWithDB = (db: Database) => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const eventsApplication = async (db: Database) => {
    const events = await readers.playerEvents(db);
    const game = await engine.applyEvents(db, events);
    return game;
  };

  app.get("/api/players/:id", async (req: any, res: any) => {
    console.log("GETPLAYER", req.params.id, new Date());
    const playerId = parseInt(req.params.id);
    const game = await eventsApplication(db);
    const player = findPlayer(game, playerId);

    console.log("GETPLAYER END", new Date());
    res.send({ server: game.server, player: player });
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
    const newEvent = await writers.createPlayerEvent(db, event);
    const game = await eventsApplication(db);
    const player = findPlayer(game, newEvent.playerId);
    res.send({ server: game.server, player: player });
  });

  app.post("/api/players/:id/startLevel", async (req: any, res: any) => {
    console.log("STARTLEVEL", req.params.id, req.body);
    const playerId = parseInt(req.params.id);
    const game = await eventsApplication(db);
    const event: IStartLevelData = {
      playerId: playerId,
      created: new Date().valueOf(),
      type: "STARTLEVEL",
      data: {
        chapterId: req.body.chapterId,
        adventureId: req.body.adventureId,
        storyId: req.body.storyId,
      },
    };
    const newEvent = await writers.startLevelEvent(db, game, event);
    const newGame = await eventsApplication(db);
    const player = findPlayer(game, playerId);
    res.send({ server: newGame.server, player: player });
  });

  app.post("/api/players/:id/winLevel", async (req: any, res: any) => {
    console.log("WINLEVEL", req.params.id, req.body);
    const playerId = parseInt(req.params.id);
    const game = await eventsApplication(db);
    // TODO - add level triggered rewards, they are under triggered key
    const event: IWinLevelData = {
      playerId: playerId,
      created: new Date().valueOf(),
      type: "WINLEVEL",
      data: {
        chapterId: req.body.chapterId,
        adventureId: req.body.adventureId,
        storyId: req.body.storyId,
      },
    };
    const newEvent = await writers.winLevelEvent(db, game, event);
    const newGame = await eventsApplication(db);
    const player = findPlayer(game, playerId);
    res.send({ server: newGame.server, player: player });
  });

  app.post("/api/players/:id/startArena", async (req: any, res: any) => {
    console.log("ARENA START", req.body);
    const playerId = parseInt(req.params.id);
    const game = await eventsApplication(db);
    const event: IArenaStartData = {
      playerId: playerId,
      created: new Date().valueOf(),
      type: "ARENASTART",
      data: {
        mode: req.body.eventMode,
        index: req.body.eventIndx,
      },
    };
    const newEvent = writers.startArenaEvent(db, game, event);
    const newGame = await eventsApplication(db);
    const player = findPlayer(game, playerId);
    res.send({ server: newGame.server, player: player });
  });

  app.post("/api/players/:id/endArena", async (req: any, res: any) => {
    console.log("ARENA END", req.body);
    const playerId = parseInt(req.params.id);
    const game = await eventsApplication(db);
    const event: IArenaEndData = {
      playerId: playerId,
      created: new Date().valueOf(),
      type: "ARENAEND",
      data: {
        mode: req.body.eventMode,
        index: req.body.eventIndx,
      },
    };
    const newEvent = writers.endArenaEvent(db, game, event);
    const newGame = await eventsApplication(db);
    const player = findPlayer(game, playerId);
    res.send({ server: newGame.server, player: player });
  });

  app.post("/api/players/:id/claim", async (req: any, res: any) => {
    console.log("CLAIMREWARD", req.body);
    const playerId = parseInt(req.params.id);
    const game = await eventsApplication(db);
    const event: IClaimRewardData = {
      playerId: playerId,
      created: new Date().valueOf(),
      type: "CLAIMREWARD",
      data: {
        claimId: req.body.claimId,
      },
    };
    const newEvent = writers.claimRewardEvent(db, game, event);
    const newGame = await eventsApplication(db);
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
*/

  return app;
};

export { appWithDB as app };
