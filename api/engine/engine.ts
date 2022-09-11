import * as events from "./events";
import { IGame, IGameEvent } from "./types";

export const applyEvent = (game: IGame, event: IGameEvent): IGame => {
  let newPlayer = JSON.parse(JSON.stringify(game.player));
  let newServer = JSON.parse(JSON.stringify(game.server));
  //console.log("Apply Event", event.type);
  switch (event.type) {
    case "CREATEPLAYER":
      newPlayer = events.createPlayer(
        {
          ...event,
          playerId: event.playerId,
        },
        newPlayer
      );
      break;
    case "STARTLEVEL":
      newPlayer = events.startLevel(event, newPlayer);
      break;
    case "WINLEVEL":
      newPlayer = events.winLevel(event, newPlayer);
      break;
    case "OPENSPELL":
      newPlayer = events.openSpell(event, newPlayer);
      break;
    case "UPDATESPELL":
      newPlayer = events.updateSpell(event, newPlayer);
      break;
    case "STARTENDLESS":
      newPlayer = events.startEndless(event, newPlayer);
      break;
    case "PASSCHECKPOINT":
      newPlayer = events.passCheckpoint(event, newPlayer);
      break;
    case "MISSCHECKPOINT":
      newPlayer = events.missCheckpoint(event, newPlayer);
      break;
    // case "ARENASTART":
    //   newPlayer = events.arenaStart(
    //     { ...readers.arenaStartEvent(event.eventId), time: event.created },
    //     newPlayer
    //   );
    //   break;
    // case "ARENAEND":
    //   newPlayer = events.arenaEnd(
    //     { ...readers.arenaEndEvent(event.eventId), time: event.created },
    //     newPlayer
    //   );
    //   break;
  }
  return { player: newPlayer, server: newServer };
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
