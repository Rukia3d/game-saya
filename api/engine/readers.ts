import { Database } from "sqlite";
import {
  ICreatePlayerEvent,
  IGameEvent,
  IStartLevelEvent,
  IWinLevelEvent,
  IServerArenaStartEvent,
  IServerArenaEndEvent,
  IArenaStartEvent,
  arenaMode,
  IArenaEndEvent,
} from "./types";
import {
  IEventArenaEndDB,
  IEventArenaStartDB,
  IEventCreatePlayerDB,
  IEventDB,
  IEventServerArenaEndDB,
  IEventServerArenaStartDB,
  IEventStartLevelDB,
  IEventWinLevelDB,
  readCreatePlayerEvents,
  readEndArena,
  readGameEvents,
  readServerEndArena,
  readServerStartArena,
  readStartArena,
  readStartLevelEvents,
  readWinLevelEvents,
} from "../storage/playerdata_readers";

export const playerEvents = async (db: Database): Promise<IGameEvent[]> => {
  // Find events for a player
  const events = await readGameEvents(db);
  const newEvents: IGameEvent[] = [];
  for (let e of events) {
    switch (e.type) {
      case "CREATEPLAYER":
        newEvents.push(await createPlayerEvent(db, e));
        break;
      case "STARTLEVEL":
        newEvents.push(await startLevelEvent(db, e));
        break;
      case "WINLEVEL":
        newEvents.push(await winLevelEvent(db, e));
        break;
      case "SERVERARENASTART":
        newEvents.push(await serverArenaStartEvent(db, e));
        break;
      case "SERVERARENAEND":
        newEvents.push(await serverArenaEndEvent(db, e));
        break;
      case "ARENASTART":
        newEvents.push(await startArenaEvent(db, e));
        break;
      case "ARENAEND":
        newEvents.push(await endArenaEvent(db, e));
        break;
      /*
      // case "OPENSPELL":
      //   newEvents.push(openSpellEvent(e));
      //   break;
      // case "UPDATESPELL":
      //   newEvents.push(updateSpellEvent(e));
      //   break;
      // case "LISTSPELL":
      //   newEvents.push(listSpellEvent(e));
      //   break;
      // case "DELISTSPELL":
      //   newEvents.push(delistSpellEvent(e));
      //   break;
      // case "BUYSPELL":
      //   newEvents.push(buySpellEvent(e));
      //   break;
      case "STARTENDLESS":
        newEvents.push(startEndlessEvent(e));
        break;
      case "PASSCHECKPOINT":
        newEvents.push(passCheckpointEvent(e));
        break;
      case "MISSCHECKPOINT":
        newEvents.push(missCheckpointEvent(e));
        break;
        */
      default:
        throw new Error(`Can't find type ${e.type} in player events`);
    }
  }

  return newEvents;
};

export const createPlayerEvent = async (
  db: Database,
  event: IEventDB
): Promise<ICreatePlayerEvent> => {
  const allPlayerEvents = await readCreatePlayerEvents(db);
  const createPlayer = allPlayerEvents.find(
    (p: IEventCreatePlayerDB) => p.eventId === event.eventId
  );
  if (!createPlayer) {
    throw new Error("No create player event found");
  }
  return {
    playerId: createPlayer.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "CREATEPLAYER",
    playerName: createPlayer.playerName,
  };
};

export const startLevelEvent = async (
  db: Database,
  event: IEventDB
): Promise<IStartLevelEvent> => {
  const allPlayerEvents = await readStartLevelEvents(db);
  const startLevel = allPlayerEvents.find(
    (p: IEventStartLevelDB) => p.eventId === event.eventId
  );
  if (!startLevel) {
    throw new Error("No start level event found");
  }
  return {
    playerId: startLevel.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "STARTLEVEL",
    chapterId: startLevel.chapterId,
    adventureId: startLevel.adventureId,
    storyId: startLevel.storyId,
  };
};

export const winLevelEvent = async (
  db: Database,
  event: IEventDB
): Promise<IWinLevelEvent> => {
  const allPlayerEvents = await readWinLevelEvents(db);
  const winLevel = allPlayerEvents.find(
    (p: IEventWinLevelDB) => p.eventId === event.eventId
  );
  if (!winLevel) {
    throw new Error("No win level event found");
  }
  return {
    playerId: winLevel.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "WINLEVEL",
    chapterId: winLevel.chapterId,
    adventureId: winLevel.adventureId,
    storyId: winLevel.storyId,
  };
};

export const serverArenaStartEvent = async (
  db: Database,
  event: IEventDB
): Promise<IServerArenaStartEvent> => {
  const allPlayerEvents = await readServerStartArena(db);
  const startArena = allPlayerEvents.find(
    (p: IEventServerArenaStartDB) => p.eventId === event.eventId
  );
  if (!startArena) {
    throw new Error("No win level event found");
  }
  return {
    eventId: startArena.eventId,
    type: "SERVERARENASTART",
    created: event.created,
    start: startArena.start,
    end: startArena.end,
  };
};

export const serverArenaEndEvent = async (
  db: Database,
  event: IEventDB
): Promise<IServerArenaEndEvent> => {
  const allPlayerEvents = await readServerEndArena(db);
  const endArena = allPlayerEvents.find(
    (p: IEventServerArenaEndDB) => p.eventId === event.eventId
  );
  if (!endArena) {
    throw new Error("No win level event found");
  }
  return {
    eventId: endArena.eventId,
    type: "SERVERARENAEND",
    created: event.created,
  };
};

export const startArenaEvent = async (
  db: Database,
  event: IEventDB
): Promise<IArenaStartEvent> => {
  const allPlayerEvents = await readStartArena(db);
  const startArena = allPlayerEvents.find(
    (p: IEventArenaStartDB) => p.eventId === event.eventId
  );
  if (!startArena) {
    throw new Error("No start level event found");
  }
  return {
    playerId: startArena.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "ARENASTART",
    index: startArena.id,
    mode: startArena.mode as arenaMode,
  };
};

export const endArenaEvent = async (
  db: Database,
  event: IEventDB
): Promise<IArenaEndEvent> => {
  const allPlayerEvents = await readEndArena(db);
  const startArena = allPlayerEvents.find(
    (p: IEventArenaEndDB) => p.eventId === event.eventId
  );
  if (!startArena) {
    throw new Error("No end level event found");
  }

  return {
    playerId: startArena.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "ARENAEND",
    index: startArena.id,
    mode: startArena.mode as arenaMode,
  };
};

/*
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

*/
