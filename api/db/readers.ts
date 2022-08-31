import { ensure } from "../engine/helpers";
import {
  IArenaStartEvent,
  ICreatePlayerEvent,
  IMissCheckpointEvent,
  IOpenSpellEvent,
  IPassCheckpointEvent,
  IPlayerEvent,
  IStartEndlessEvent,
  IStartLevelEvent,
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
    allPlayerEvents().filter((p: IPlayerEvent) => p.playerId == playerId)
  );
  if (events.length === 0) {
    throw new Error(`No events found for ${playerId}`);
  }

  return events;
};

export const playerEvents = (playerId: number) => {
  // Find events for a player
  const events = ensure(
    allPlayerEvents().filter((p: IPlayerEvent) => p.playerId == playerId)
  );
  if (events.length === 0) {
    throw new Error(`No events found for ${playerId}`);
  }

  return events;
};

export const createPlayerEvent = (eventId: number) => {
  const createPlayer = ensure(
    allCreatePlayerEvents().find(
      (e: ICreatePlayerEvent) => e.eventId == eventId
    ),
    "No create player event"
  );
  return createPlayer;
};

export const startLevelEvent = (eventId: number) => {
  const startLevel = ensure(
    allStartLevelEvents().find((e: IStartLevelEvent) => e.eventId == eventId),
    "No start level event"
  );
  return startLevel;
};

export const winLevelEvent = (eventId: number) => {
  const winLevel = ensure(
    allWinLevelEvents().find((e: IWinLevelEvent) => e.eventId == eventId),
    "No win level event"
  );
  return winLevel;
};

export const openSpellEvent = (eventId: number) => {
  const winLevel = ensure(
    allOpenSpellEvents().find((e: IOpenSpellEvent) => e.eventId == eventId),
    "No open spell event"
  );
  return winLevel;
};

export const startEndlessEvent = (eventId: number) => {
  const startEndless = ensure(
    allStartEndlessEvents().find(
      (e: IStartEndlessEvent) => e.eventId == eventId
    ),
    "No start endless event"
  );
  return startEndless;
};

export const passCheckpointEvent = (eventId: number) => {
  const passCheckpoint = ensure(
    allPassCheckpointEvents().find(
      (e: IPassCheckpointEvent) => e.eventId == eventId
    ),
    "No pass checkpoint event"
  );
  return passCheckpoint;
};

export const missCheckpointEvent = (eventId: number) => {
  const missCheckpoint = ensure(
    allMissCheckpointEvents().find(
      (e: IMissCheckpointEvent) => e.eventId == eventId
    ),
    "No miss checkpoint event"
  );
  return missCheckpoint;
};

export const updateSpellEvent = (eventId: number) => {
  const update = ensure(
    allUpdateSpellEvents().find((e: IOpenSpellEvent) => e.eventId == eventId),
    "No update spell event"
  );
  return update;
};

export const arenaStartEvent = (eventId: number) => {
  const arenastart = ensure(
    allArenaStartEvents().find((e: IArenaStartEvent) => e.eventId == eventId),
    "No arena start event"
  );
  return arenastart;
};

export const arenaEndEvent = (eventId: number) => {
  const arenaend = ensure(
    allArenaEndEvents().find((e: IArenaStartEvent) => e.eventId == eventId),
    "No arena end event"
  );
  return arenaend;
};
