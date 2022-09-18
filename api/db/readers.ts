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
} from "../engine/types";
import {
  createPlayerEvents,
  openSpellEvents,
  allPEvents,
  startLevelEvents,
  updateSpellEvents,
  winLevelEvents,
  startEldessEvents,
  passCheckpointEvents,
  missCheckpointEvents,
  serverArenaStartEvents,
  serverArenaEndEvents,
  arenaStartEvents,
  arenaEndEvents,
} from "./testDBPlayer";

export const allGameEvents = () => {
  return allPEvents;
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
  return arenaStartEvents;
};

export const allEndArena = () => {
  return arenaEndEvents;
};

export const playerEvents = (playerId: number): IGameEvent[] => {
  // Find events for a player
  const events = ensure(
    allGameEvents().filter(
      (p: IEventDB) => p.playerId == playerId || p.playerId == null
    )
  );
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
      case "ARENASTART":
        newEvents.push(arenaStartEvent(e));
        break;
      case "ARENAEND":
        newEvents.push(arenaEndEvent(e));
        break;
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
  const allEvent = ensure(
    allGameEvents().find(
      (e: IEventDB) =>
        e.eventId == createPlayer.eventId && e.type == "CREATEPLAYER"
    ),
    "No create player event in all events"
  );
  if (!allEvent.playerId) {
    throw new Error("No player ID in createPlayerEvent");
  }
  return {
    playerId: allEvent.playerId,
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
  if (!event.playerId) {
    throw new Error("No player ID in startLevelEvent");
  }
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "STARTLEVEL",
    arcanaId: startLevel.arcanaId,
    mode: startLevel.mode,
    levelId: startLevel.levelId,
  };
};

export const winLevelEvent = (event: IEventDB): IWinLevelEvent => {
  const winLevel = ensure(
    allWinLevelEvents().find((e: IWinLevelDB) => e.eventId == event.eventId),
    "No win level event"
  );
  if (!event.playerId) {
    throw new Error("No player ID in winLevelEvent");
  }
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "WINLEVEL",
    arcanaId: winLevel.arcanaId,
    mode: winLevel.mode,
    levelId: winLevel.levelId,
  };
};

export const openSpellEvent = (event: IEventDB): IOpenSpellEvent => {
  const openSpell = ensure(
    allOpenSpellEvents().find((e: IOpenSpellDB) => e.eventId == event.eventId),
    "No open spell event"
  );
  if (!event.playerId) {
    throw new Error("No player ID in openSpellEvent");
  }
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "OPENSPELL",
    arcanaId: openSpell.arcanaId,
    spellId: openSpell.arcanaId,
  };
};

export const updateSpellEvent = (event: IEventDB): IUpdateSpellEvent => {
  const updateSpell = ensure(
    allUpdateSpellEvents().find(
      (e: IOpenSpellDB) => e.eventId == event.eventId
    ),
    "No update spell event"
  );
  if (!event.playerId) {
    throw new Error("No player ID in updateSpellEvent");
  }
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "UPDATESPELL",
    arcanaId: updateSpell.arcanaId,
    spellId: updateSpell.arcanaId,
  };
};

export const startEndlessEvent = (event: IEventDB): IStartEndlessEvent => {
  const startEndless = ensure(
    allStartEndlessEvents().find(
      (e: IStartEndlessDB) => e.eventId == event.eventId
    ),
    "No start endless event"
  );
  if (!event.playerId) {
    throw new Error("No player ID in startEndlessEvent");
  }
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "STARTENDLESS",
    arcanaId: startEndless.arcanaId,
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
  if (!event.playerId) {
    throw new Error("No player ID in passCheckpointEvent");
  }
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "PASSCHECKPOINT",
    arcanaId: passCheckpoint.arcanaId,
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
  if (!event.playerId) {
    throw new Error("No player ID in missCheckpointEvent");
  }
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "MISSCHECKPOINT",
    arcanaId: missCheckpoint.arcanaId,
    mode: missCheckpoint.mode,
  };
};

export const arenaStartEvent = (event: IEventDB): IArenaStartEvent => {
  const arenaStart = ensure(
    allStartArena().find((e: IArenaStartDB) => e.eventId == event.eventId),
    "No player start arena event"
  );
  if (!event.playerId) {
    throw new Error("No player ID in arenaStartEvent");
  }
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "ARENASTART",
    index: arenaStart.index,
    mode: arenaStart.mode,
  };
};

export const arenaEndEvent = (event: IEventDB): IArenaEndEvent => {
  const arenaStart = ensure(
    allEndArena().find((e: IArenaEndDB) => e.eventId == event.eventId),
    "No player end arena event"
  );
  if (!event.playerId) {
    throw new Error("No player ID in arenaEndEvent");
  }
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "ARENAEND",
    index: arenaStart.index,
    mode: arenaStart.mode,
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
