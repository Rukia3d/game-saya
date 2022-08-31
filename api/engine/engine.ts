import * as readers from "../db/readers";
import * as writers from "../db/writers";
import * as events from "./events";
import { IGame, IPlayerDataEvent, IPlayerEvent } from "./types";

export const processEvent = (game: IGame, event: IPlayerDataEvent): IGame => {
  let newPlayer = JSON.parse(JSON.stringify(game.player));
  let newServer = JSON.parse(JSON.stringify(game.server));
  let eventToWrite: any = {};
  switch (event.type) {
    case "CREATEPLAYER":
      eventToWrite = writers.createPlayerEvent(event);
      break;
    case "STARTLEVEL":
      eventToWrite = writers.startLevelEvent(newPlayer, event);
      break;
    case "WINLEVEL":
      eventToWrite = writers.winLevelEvent(newPlayer, event);
      break;
    case "OPENSPELL":
      eventToWrite = writers.openSpellEvent(newPlayer, event);
      break;
    case "UPDATESPELL":
      eventToWrite = writers.updateSpellEvent(newPlayer, event);
      break;
    case "STARTENDLESS":
      eventToWrite = writers.startEndlessEvent(newPlayer, event);
      break;
    case "PASSCHECKPOINT":
      eventToWrite = writers.passCheckpointEvent(newPlayer, event);
      break;
    case "MISSCHECKPOINT":
      eventToWrite = writers.missCheckpointEvent(newPlayer, event);
      break;
    // case "ARENASTART":
    //   eventToWrite = writers.arenaStartEvent(newPlayer, event);
    //   break;
    // case "ARENAEND":
    //   eventToWrite = writers.arenaEndEvent(newPlayer, event);
    //   break;
    default:
      throw new Error("Unknown event type");
  }
  return applyEvent({ player: newPlayer, server: newServer }, eventToWrite);
};

export const applyEvent = (game: IGame, event: IPlayerEvent): IGame => {
  let newPlayer = JSON.parse(JSON.stringify(game.player));
  let newServer = JSON.parse(JSON.stringify(game.server));
  //console.log("Apply Event", event.type);
  switch (event.type) {
    case "CREATEPLAYER":
      newPlayer = events.createPlayer(
        {
          ...readers.createPlayerEvent(event.eventId),
          playerId: event.playerId,
        },
        newPlayer
      );
      break;
    case "STARTLEVEL":
      newPlayer = events.startLevel(
        readers.startLevelEvent(event.eventId),
        newPlayer
      );
      break;
    case "WINLEVEL":
      newPlayer = events.winLevel(
        { ...readers.winLevelEvent(event.eventId), time: event.created },
        newPlayer
      );
      break;
    case "OPENSPELL":
      newPlayer = events.openSpell(
        readers.openSpellEvent(event.eventId),
        newPlayer
      );
      break;
    case "UPDATESPELL":
      newPlayer = events.updateSpell(
        readers.updateSpellEvent(event.eventId),
        newPlayer
      );
      break;
    case "STARTENDLESS":
      newPlayer = events.startEndless(
        readers.startEndlessEvent(event.eventId),
        newPlayer
      );
      break;
    case "PASSCHECKPOINT":
      newPlayer = events.passCheckpoint(
        readers.passCheckpointEvent(event.eventId),
        newPlayer
      );
      break;
    case "MISSCHECKPOINT":
      newPlayer = events.missCheckpoint(
        readers.missCheckpointEvent(event.eventId),
        newPlayer
      );
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

export const applyEvents = (events: IPlayerEvent[]): IGame => {
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
    },
  };
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    game = applyEvent(game, event);
  }
  return game;
};
