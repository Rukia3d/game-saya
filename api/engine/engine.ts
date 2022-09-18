import * as events from "./events";
import { IGame, IGameEvent } from "./types";

export const applyEvent = (game: IGame, event: IGameEvent): IGame => {
  let newPlayer = JSON.parse(JSON.stringify(game.player));
  let newServer = JSON.parse(JSON.stringify(game.server));
  let newGame = { player: newPlayer, server: newServer };
  //console.log("Apply Event", event.type);
  switch (event.type) {
    case "CREATEPLAYER":
      newGame.player = events.createPlayer(
        {
          ...event,
          playerId: event.playerId,
        },
        newPlayer
      );
      break;
    case "STARTLEVEL":
      newGame.player = events.startLevel(event, newPlayer);
      break;
    case "WINLEVEL":
      newGame.player = events.winLevel(event, newPlayer);
      break;
    case "OPENSPELL":
      newGame.player = events.openSpell(event, newPlayer);
      break;
    case "UPDATESPELL":
      newGame.player = events.updateSpell(event, newPlayer);
      break;
    case "STARTENDLESS":
      newGame.player = events.startEndless(event, newPlayer);
      break;
    case "PASSCHECKPOINT":
      newGame.player = events.passCheckpoint(event, newPlayer);
      break;
    case "MISSCHECKPOINT":
      newGame.player = events.missCheckpoint(event, newPlayer);
      break;
    case "SERVERARENASTART":
      newGame.server = events.serverArenaStart(event, newServer);
      break;
    case "SERVERARENAEND":
      newGame.server = events.serverArenaEnd(event, newServer);
      break;
    case "ARENASTART":
      newGame = events.arenaStart(event, newPlayer);
      break;
    case "ARENAEND":
      newGame = events.arenaEnd(event, newPlayer);
      break;
  }
  return newGame;
};

export const applyEvents = (events: IGameEvent[]): IGame => {
  // Apply events assuming they are sorted
  let game: IGame = {
    player: {
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
    },
    server: {
      arenaRun: { events: [], resultTime: 0, type: "run" },
      arenaFight: { events: [], resultTime: 0, type: "fight" },
      arenaRunHistory: [],
      arenaFightHistory: [],
    },
  };
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    game = applyEvent(game, event);
  }
  return game;
};
