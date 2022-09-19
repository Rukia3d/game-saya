import * as events from "./events";
import { IGame, IGameEvent, IPlayer, IServer } from "./types";

export const applyEvent = (game: IGame, event: IGameEvent): IGame => {
  let newPlayer: IPlayer = JSON.parse(JSON.stringify(game.player));
  let newServer: IServer = JSON.parse(JSON.stringify(game.server));
  let newGame: IGame = { player: newPlayer, server: newServer };
  //console.log("Apply Event", event.type);
  switch (event.type) {
    case "CREATEPLAYER":
      newGame = events.createPlayer(
        {
          ...event,
          playerId: event.playerId,
        },
        newGame
      );
      break;
    case "STARTLEVEL":
      newGame = events.startLevel(event, newGame);
      break;
    case "WINLEVEL":
      newGame = events.winLevel(event, newGame);
      break;
    case "OPENSPELL":
      newGame = events.openSpell(event, newGame);
      break;
    case "UPDATESPELL":
      newGame = events.updateSpell(event, newGame);
      break;
    case "STARTENDLESS":
      newGame = events.startEndless(event, newGame);
      break;
    case "PASSCHECKPOINT":
      newGame = events.passCheckpoint(event, newGame);
      break;
    case "MISSCHECKPOINT":
      newGame = events.missCheckpoint(event, newGame);
      break;
    case "SERVERARENASTART":
      newGame = events.serverArenaStart(event, newGame);
      break;
    case "SERVERARENAEND":
      newGame = events.serverArenaEnd(event, newGame);
      break;
    case "ARENASTART":
      newGame = events.arenaStart(event, newGame);
      break;
    case "ARENAEND":
      newGame = events.arenaEnd(event, newGame);
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
