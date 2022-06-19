import { ensure } from "../engine/helpers";
import {
  ICreatePlayerEvent,
  IOpenSpellEvent,
  IPlayerEvent,
  IStartEndlessEvent,
  IStartLevelEvent,
  IWinLevelEvent,
} from "../engine/types";
import {
  createPlayerEvents,
  openSpellEvents,
  playerEvents,
  startLevelEvents,
  updateSpellEvents,
  winLevelEvents,
  startEldessEvents,
} from "./testDBPlayer";

export const readAllPlayerEvents = () => {
  return playerEvents;
};

export const readAllCreatePlayerEvents = () => {
  return createPlayerEvents;
};

export const readAllStartLevelEvents = () => {
  return startLevelEvents;
};

export const readAllStartEndlessEvents = () => {
  return startEldessEvents;
};

export const readAllWinLevelEvents = () => {
  return winLevelEvents;
};

export const readAllOpenSpellEvents = () => {
  return openSpellEvents;
};

export const readAllUpdateSpellEvents = () => {
  return updateSpellEvents;
};

export const readPlayerEvents = (playerId: number) => {
  // Find events for a player
  const events = ensure(
    readAllPlayerEvents().filter((p: IPlayerEvent) => p.playerId == playerId)
  );
  if (events.length === 0) {
    throw new Error(`No events found for ${playerId}`);
  }

  return events;
};

export const readCreatePlayerEvent = (eventId: number) => {
  const createPlayer = ensure(
    readAllCreatePlayerEvents().find(
      (e: ICreatePlayerEvent) => e.eventId == eventId
    ),
    "No create player event"
  );
  return createPlayer;
};

export const readStartLevelEvent = (eventId: number) => {
  const startLevel = ensure(
    readAllStartLevelEvents().find(
      (e: IStartLevelEvent) => e.eventId == eventId
    ),
    "No start level event"
  );
  return startLevel;
};

export const readWinLevelEvent = (eventId: number) => {
  const winLevel = ensure(
    readAllWinLevelEvents().find((e: IWinLevelEvent) => e.eventId == eventId),
    "No win level event"
  );
  return winLevel;
};

export const readOpenSpellEvent = (eventId: number) => {
  const winLevel = ensure(
    readAllOpenSpellEvents().find((e: IOpenSpellEvent) => e.eventId == eventId),
    "No open spell event"
  );
  return winLevel;
};

export const readStartEndlessEvent = (eventId: number) => {
  const startEndless = ensure(
    readAllStartEndlessEvents().find(
      (e: IStartEndlessEvent) => e.eventId == eventId
    ),
    "No start endless event"
  );
  return startEndless;
};

export const readUpdateSpellEvent = (eventId: number) => {
  const update = ensure(
    readAllUpdateSpellEvents().find(
      (e: IOpenSpellEvent) => e.eventId == eventId
    ),
    "No update spell event"
  );
  return update;
};
