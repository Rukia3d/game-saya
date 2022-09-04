import { ensure } from "../engine/helpers";
import {
  IArenaStartDB,
  ICreatePlayerDB,
  ICreatePlayerEvent,
  IGameEvent,
  IMissCheckpointDB,
  IMissCheckpointEvent,
  IOpenSpellDB,
  IOpenSpellEvent,
  IPassCheckpointDB,
  IPassCheckpointEvent,
  IPlayerEventDB,
  IStartEndlessDB,
  IStartEndlessEvent,
  IStartLevelDB,
  IStartLevelEvent,
  IUpdateSpellEvent,
  IWinLevelDB,
  IWinLevelEvent,
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
  arenaStartEvents,
  arenaEndEvents,
  allSEvents,
} from "./testDBPlayer";

export const allEvents = () => {
  return;
};

export const allServerEvents = () => {
  return allSEvents;
};

export const allPlayerEvents = () => {
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

export const allArenaStartEvents = () => {
  return arenaStartEvents;
};

export const allArenaEndEvents = () => {
  return arenaEndEvents;
};

export const serverEvents = (playerId: number) => {
  // Find events for a player
  const events = ensure(
    allPlayerEvents().filter((p: IPlayerEventDB) => p.playerId == playerId)
  );
  if (events.length === 0) {
    throw new Error(`No events found for ${playerId}`);
  }

  return events;
};

export const playerEvents = (playerId: number): IGameEvent[] => {
  // Find events for a player
  const events = ensure(
    allPlayerEvents().filter((p: IPlayerEventDB) => p.playerId == playerId)
  );
  if (events.length === 0) {
    throw new Error(`No events found for ${playerId}`);
  }
  const newEvents: IGameEvent[] = [];
  events.forEach((e: IPlayerEventDB) => {
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
  });

  return newEvents;
};

export const createPlayerEvent = (
  event: IPlayerEventDB
): ICreatePlayerEvent => {
  const createPlayer = ensure(
    allCreatePlayerEvents().find(
      (e: ICreatePlayerDB) => e.eventId == event.eventId
    ),
    "No create player event"
  );
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "CREATEPLAYER",
    playerName: createPlayer.playerName,
  };
};

export const startLevelEvent = (event: IPlayerEventDB): IStartLevelEvent => {
  const startLevel = ensure(
    allStartLevelEvents().find(
      (e: IStartLevelDB) => e.eventId == event.eventId
    ),
    "No start level event"
  );
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

export const winLevelEvent = (event: IPlayerEventDB): IWinLevelEvent => {
  const winLevel = ensure(
    allWinLevelEvents().find((e: IWinLevelDB) => e.eventId == event.eventId),
    "No win level event"
  );
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

export const openSpellEvent = (event: IPlayerEventDB): IOpenSpellEvent => {
  const openSpell = ensure(
    allOpenSpellEvents().find((e: IOpenSpellDB) => e.eventId == event.eventId),
    "No open spell event"
  );
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "OPENSPELL",
    arcanaId: openSpell.arcanaId,
    spellId: openSpell.arcanaId,
  };
};

export const updateSpellEvent = (event: IPlayerEventDB): IUpdateSpellEvent => {
  const updateSpell = ensure(
    allUpdateSpellEvents().find(
      (e: IOpenSpellDB) => e.eventId == event.eventId
    ),
    "No update spell event"
  );
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "UPDATESPELL",
    arcanaId: updateSpell.arcanaId,
    spellId: updateSpell.arcanaId,
  };
};

export const startEndlessEvent = (
  event: IPlayerEventDB
): IStartEndlessEvent => {
  const startEndless = ensure(
    allStartEndlessEvents().find(
      (e: IStartEndlessDB) => e.eventId == event.eventId
    ),
    "No start endless event"
  );
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "STARTENDLESS",
    arcanaId: startEndless.arcanaId,
    mode: startEndless.mode,
  };
};

export const passCheckpointEvent = (
  event: IPlayerEventDB
): IPassCheckpointEvent => {
  const passCheckpoint = ensure(
    allPassCheckpointEvents().find(
      (e: IPassCheckpointDB) => e.eventId == event.eventId
    ),
    "No pass checkpoint event"
  );
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

export const missCheckpointEvent = (
  event: IPlayerEventDB
): IMissCheckpointEvent => {
  const missCheckpoint = ensure(
    allMissCheckpointEvents().find(
      (e: IMissCheckpointDB) => e.eventId == event.eventId
    ),
    "No miss checkpoint event"
  );
  return {
    playerId: event.playerId,
    eventId: event.eventId,
    created: event.created,
    type: "MISSCHECKPOINT",
    arcanaId: missCheckpoint.arcanaId,
    mode: missCheckpoint.mode,
  };
};

export const arenaStartEvent = (eventId: number) => {
  const event = ensure(
    allPlayerEvents().find((e: IPlayerEventDB) => e.eventId == eventId),
    "No game state event"
  );
  const arenastart = ensure(
    allArenaStartEvents().find((e: IArenaStartDB) => e.eventId == eventId),
    "No arena start event"
  );
  return arenastart;
};

export const arenaEndEvent = (eventId: number) => {
  const event = ensure(
    allPlayerEvents().find((e: IPlayerEventDB) => e.eventId == eventId),
    "No game state event"
  );
  const arenaend = ensure(
    allArenaEndEvents().find((e: IArenaStartDB) => e.eventId == eventId),
    "No arena end event"
  );
  return arenaend;
};
