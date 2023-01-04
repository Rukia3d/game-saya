import { Database } from "sqlite";
import * as events from "./events";
import { IGame, IGameEvent, IPlayer, IServer } from "./types";

export const applyEvent = async (
  db: Database,
  game: IGame,
  event: IGameEvent
): Promise<IGame> => {
  let newPlayers: IPlayer[] = JSON.parse(JSON.stringify(game.players));
  let newServer: IServer = JSON.parse(JSON.stringify(game.server));
  let newGame: IGame = { players: newPlayers, server: newServer };
  console.log("Apply Event", event.type);
  switch (event.type) {
    case "CREATEPLAYER":
      newGame = await events.createPlayer(
        db,
        {
          ...event,
          playerId: event.playerId,
        },

        newGame
      );
      break;
    case "SERVERARENASTART":
      newGame = await events.serverArenaStart(db, event, newGame);
      break;
    case "SERVERARENAEND":
      newGame = await events.serverArenaEnd(db, event, newGame);
      break;
    case "DISTRIBUTELIVES":
      newGame = await events.serverDistributeLives(db, event, newGame);
      break;
    case "STARTLEVEL":
      newGame = await events.startLevel(db, event, newGame);
      break;
    case "WINLEVEL":
      newGame = await events.winLevel(db, event, newGame);
      break;
    case "ARENASTART":
      newGame = await events.startArena(db, event, newGame);
      break;
    case "ARENAEND":
      newGame = await events.endArena(db, event, newGame);
      break;
    case "CLAIMREWARD":
      newGame = await events.claimReward(db, event, newGame);
      break;
    /*
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
      */
    default:
      throw new Error("Unknown event type");
  }
  return newGame;
};

export const applyEvents = async (
  db: Database,
  events: IGameEvent[]
): Promise<IGame> => {
  // Apply events assuming they are sorted
  let game: IGame = {
    players: [
      {
        id: 0,
        name: "",
        loungeId: null,
        materials: [],
        maxEnergy: 100,
        adventures: [],
        weapons: [],
        goals: [],
        messages: [],
        claims: [],
        collections: [],
        currentState: { state: "MAIN" },
        lastActive: new Date().valueOf(),
      },
    ],
    server: {
      arenaRun: { events: [], resultTime: 0, mode: "run" },
      arenaFight: { events: [], resultTime: 0, mode: "fight" },
      arenaRunHistory: [],
      arenaFightHistory: [],
      nextLiveDistribution: 0,
    },
  };
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    game = await applyEvent(db, game, event);
  }
  return game;
};
