import * as events from "./events";
import { IGame, IGameEvent, IPlayer, IServer } from "./types";

export const applyEvent = (game: IGame, event: IGameEvent): IGame => {
  let newPlayers: IPlayer[] = JSON.parse(JSON.stringify(game.players));
  let newServer: IServer = JSON.parse(JSON.stringify(game.server));
  let newGame: IGame = { players: newPlayers, server: newServer };
  console.log("Apply Event", event.type);
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
    case "LISTSPELL":
      newGame = events.listSpell(event, newGame);
      break;
    case "DELISTSPELL":
      newGame = events.delistSpell(event, newGame);
      break;
    case "BUYSPELL":
      newGame = events.buySpell(event, newGame);
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
      newGame = events.startArena(event, newGame);
      break;
    case "ARENAEND":
      newGame = events.endArena(event, newGame);
      break;
    default:
      throw new Error("Unknown event type");
  }
  return newGame;
};

export const applyEvents = (events: IGameEvent[]): IGame => {
  // Apply events assuming they are sorted
  let game: IGame = {
    players: [
      {
        id: 0,
        name: "",
        exprience: 0,
        energy: 0,
        maxEnergy: 0,
        loungeId: null,
        materials: [],
        elements: [],
        weapons: [],
        goals: [],
        messages: [],
        claims: [],
        currentState: { state: "MAIN" },
      },
    ],
    server: {
      arenaRun: { events: [], resultTime: 0, mode: "run" },
      arenaFight: { events: [], resultTime: 0, mode: "fight" },
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
