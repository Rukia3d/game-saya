import { ensure } from "../engine/helpers";
import {
  ICreatePlayerDB,
  ICreatePlayerEvent,
  IGameEvent,
  IMissCheckpointDB,
  IMissCheckpointEvent,
  IOpenSpellDB,
  IOpenSpellEvent,
  IPassCheckpointDB,
  IPassCheckpointEvent,
  IEventDB,
  IStartEndlessDB,
  IStartEndlessEvent,
  IStartLevelDB,
  IStartLevelEvent,
  IUpdateSpellEvent,
  IWinLevelDB,
  IWinLevelEvent,
  IServerArenaStartDB,
  IServerArenaStartEvent,
  IServerArenaEndEvent,
  IServerArenaEndDB,
  IArenaStartEvent,
  IArenaStartDB,
  IArenaEndEvent,
  IArenaEndDB,
  IListSpellEvent,
  IListSpellDB,
  IDelistSpellEvent,
  IDelistSpellDB,
  IBuySpellEvent,
  IBuySpellDB,
} from "../engine/types";
import {
  allGameEvents,
  createPlayerEvents,
  startLevelEvents,
  startEldessEvents,
  winLevelEvents,
  openSpellEvents,
  updateSpellEvents,
  passCheckpointEvents,
  missCheckpointEvents,
  serverArenaStartEvents,
  serverArenaEndEvents,
  startArenaEvents,
  endArenaEvents,
  listSpellEvents,
  delistSpellEvents,
  buySpellEvents,
} from "./testDBEvents";

export const gameEvents = (): IEventDB[] => {
  return allGameEvents;
};

export const allCreatePlayerEvents = () => {
  return createPlayerEvents;
};

export const allStartLevelEvents = () => {
  return startLevelEvents;
};

export const allStartEndlessEvents = () => {
  return startEldessEvents;
};

export const allWinLevelEvents = () => {
  return winLevelEvents;
};

export const allOpenSpellEvents = () => {
  return openSpellEvents;
};

export const allUpdateSpellEvents = () => {
  return updateSpellEvents;
};

export const allListSpellEvents = () => {
  return listSpellEvents;
};

export const allDelistSpellEvents = () => {
  return delistSpellEvents;
};

export const allBuySpellEvents = () => {
  return buySpellEvents;
};

export const allPassCheckpointEvents = () => {
  return passCheckpointEvents;
};

export const allMissCheckpointEvents = () => {
  return missCheckpointEvents;
};

export const allServerStartArena = () => {
  return serverArenaStartEvents;
};

export const allServerEndArena = () => {
  return serverArenaEndEvents;
};

export const allStartArena = () => {
  return startArenaEvents;
};

export const allEndArena = () => {
  return endArenaEvents;
};

export const playerEvents = (): IGameEvent[] => {
  // Find events for a player
  const events = gameEvents();
  const newEvents: IGameEvent[] = [];
  events.forEach((e: IEventDB) => {
    switch (e.type) {
      case "CREATEPLAYER":
        newEvents.push(createPlayerEvent(e));
        break;
      case "STARTLEVEL":
        newEvents.push(startLevelEvent(e));
        break;
      case "WINLEVEL":
        newEvents.push(winLevelEvent(e));
        break;
      case "OPENSPELL":
        newEvents.push(openSpellEvent(e));
        break;
      case "UPDATESPELL":
        newEvents.push(updateSpellEvent(e));
        break;
      case "LISTSPELL":
        newEvents.push(listSpellEvent(e));
        break;
      case "DELISTSPELL":
        newEvents.push(delistSpellEvent(e));
        break;
      case "BUYSPELL":
        newEvents.push(buySpellEvent(e));
        break;
      case "STARTENDLESS":
        newEvents.push(startEndlessEvent(e));
        break;
      case "PASSCHECKPOINT":
        newEvents.push(passCheckpointEvent(e));
        break;
      case "MISSCHECKPOINT":
        newEvents.push(missCheckpointEvent(e));
        break;
      case "SERVERARENASTART":
        newEvents.push(serverArenaStartEvent(e));
        break;
      case "SERVERARENAEND":
        newEvents.push(serverArenaEndEvent(e));
        break;
      case "ARENASTART":
        newEvents.push(startArenaEvent(e));
        break;
      case "ARENAEND":
        newEvents.push(endArenaEvent(e));
        break;
      default:
        throw new Error(`Can't find type ${e.type} in player events`);
    }
  });

  return newEvents;
};

export const createPlayerEvent = (event: IEventDB): ICreatePlayerEvent => {
  const createPlayer = ensure(
    allCreatePlayerEvents().find(
      (e: ICreatePlayerDB) => e.eventId == event.eventId
    ),
    "No create player event"
  );
  if (!createPlayer.playerId) {
    throw new Error("No player ID in createPlayerEvent");
  }
  return {
    playerId: createPlayer.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "CREATEPLAYER",
    playerName: createPlayer.playerName,
  };
};

export const startLevelEvent = (event: IEventDB): IStartLevelEvent => {
  const startLevel = ensure(
    allStartLevelEvents().find(
      (e: IStartLevelDB) => e.eventId == event.eventId
    ),
    "No start level event"
  );
  return {
    playerId: startLevel.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "STARTLEVEL",
    elementId: startLevel.elementId,
    mode: startLevel.mode,
    levelId: startLevel.levelId,
  };
};

export const winLevelEvent = (event: IEventDB): IWinLevelEvent => {
  const winLevel = ensure(
    allWinLevelEvents().find((e: IWinLevelDB) => e.eventId == event.eventId),
    "No win level event"
  );

  return {
    playerId: winLevel.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "WINLEVEL",
    elementId: winLevel.elementId,
    mode: winLevel.mode,
    levelId: winLevel.levelId,
  };
};

export const openSpellEvent = (event: IEventDB): IOpenSpellEvent => {
  const openSpell = ensure(
    allOpenSpellEvents().find((e: IOpenSpellDB) => e.eventId == event.eventId),
    "No open spell event"
  );

  return {
    playerId: openSpell.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "OPENSPELL",
    elementId: openSpell.elementId,
    spellId: openSpell.elementId,
  };
};

export const updateSpellEvent = (event: IEventDB): IUpdateSpellEvent => {
  const updateSpell = ensure(
    allUpdateSpellEvents().find(
      (e: IOpenSpellDB) => e.eventId == event.eventId
    ),
    "No update spell event"
  );

  return {
    playerId: updateSpell.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "UPDATESPELL",
    elementId: updateSpell.elementId,
    spellId: updateSpell.spellId,
  };
};

export const listSpellEvent = (event: IEventDB): IListSpellEvent => {
  const listSpell = ensure(
    allListSpellEvents().find((e: IListSpellDB) => e.eventId == event.eventId),
    "No list spell event"
  );

  return {
    playerId: listSpell.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "LISTSPELL",
    spellId: listSpell.spellId,
    currency: listSpell.currency,
    price: listSpell.price,
  };
};

export const delistSpellEvent = (event: IEventDB): IDelistSpellEvent => {
  const delistSpell = ensure(
    allDelistSpellEvents().find(
      (e: IDelistSpellDB) => e.eventId == event.eventId
    ),
    "No delist spell event"
  );

  return {
    playerId: delistSpell.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "DELISTSPELL",
    listingId: delistSpell.listingId,
  };
};

export const buySpellEvent = (event: IEventDB): IBuySpellEvent => {
  const buySpell = ensure(
    allBuySpellEvents().find((e: IBuySpellDB) => e.eventId == event.eventId),
    "No buy spell event"
  );

  return {
    playerId: buySpell.playerId,
    listingId: buySpell.listingId,
    eventId: event.eventId,
    created: event.created,
    type: "BUYSPELL",
  };
};

export const startEndlessEvent = (event: IEventDB): IStartEndlessEvent => {
  const startEndless = ensure(
    allStartEndlessEvents().find(
      (e: IStartEndlessDB) => e.eventId == event.eventId
    ),
    "No start endless event"
  );

  return {
    playerId: startEndless.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "STARTENDLESS",
    elementId: startEndless.elementId,
    mode: startEndless.mode,
  };
};

export const passCheckpointEvent = (event: IEventDB): IPassCheckpointEvent => {
  const passCheckpoint = ensure(
    allPassCheckpointEvents().find(
      (e: IPassCheckpointDB) => e.eventId == event.eventId
    ),
    "No pass checkpoint event"
  );

  return {
    playerId: passCheckpoint.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "PASSCHECKPOINT",
    elementId: passCheckpoint.elementId,
    mode: passCheckpoint.mode,
    checkpoint: passCheckpoint.checkpoint,
  };
};

export const missCheckpointEvent = (event: IEventDB): IMissCheckpointEvent => {
  const missCheckpoint = ensure(
    allMissCheckpointEvents().find(
      (e: IMissCheckpointDB) => e.eventId == event.eventId
    ),
    "No miss checkpoint event"
  );

  return {
    playerId: missCheckpoint.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "MISSCHECKPOINT",
    elementId: missCheckpoint.elementId,
    mode: missCheckpoint.mode,
  };
};

export const startArenaEvent = (event: IEventDB): IArenaStartEvent => {
  const startArena = ensure(
    allStartArena().find((e: IArenaStartDB) => e.eventId == event.eventId),
    "No player start arena event"
  );

  return {
    playerId: startArena.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "ARENASTART",
    index: startArena.index,
    mode: startArena.mode,
  };
};

export const endArenaEvent = (event: IEventDB): IArenaEndEvent => {
  const startArena = ensure(
    allEndArena().find((e: IArenaEndDB) => e.eventId == event.eventId),
    "No player end arena event"
  );

  return {
    playerId: startArena.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "ARENAEND",
    index: startArena.index,
    mode: startArena.mode,
  };
};

export const serverArenaStartEvent = (
  event: IEventDB
): IServerArenaStartEvent => {
  const startArena = ensure(
    allServerStartArena().find(
      (e: IServerArenaStartDB) => e.eventId == event.eventId
    ),
    "No start server arena event"
  );
  return {
    eventId: startArena.eventId,
    type: "SERVERARENASTART",
    created: event.created,
    start: startArena.start,
    end: startArena.end,
  };
};

export const serverArenaEndEvent = (event: IEventDB): IServerArenaEndEvent => {
  const startArena = ensure(
    allServerEndArena().find(
      (e: IServerArenaEndDB) => e.eventId == event.eventId
    ),
    "No start server arena event"
  );
  return {
    eventId: startArena.eventId,
    type: "SERVERARENAEND",
    created: event.created,
  };
};
