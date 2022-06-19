import {
  ICreatePlayerEvent,
  IOpenSpellEvent,
  IPlayerEvent,
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
  const events = readAllPlayerEvents().filter(
    (p: IPlayerEvent) => p.playerId == playerId
  );
  if (events.length === 0) {
    throw new Error(`No events found for ${playerId}`);
  }

  return events;
};

export const readCreatePlayerEvent = (eventId: number) => {
  const createPlayer = readAllCreatePlayerEvents().find(
    (e: ICreatePlayerEvent) => e.eventId == eventId
  );
  if (!createPlayer) throw new Error("No create player event");
  return createPlayer;
};

export const readStartLevelEvent = (eventId: number) => {
  const startLevel = readAllStartLevelEvents().find(
    (e: IStartLevelEvent) => e.eventId == eventId
  );
  if (!startLevel) throw new Error("No start level event");
  return startLevel;
};

export const readWinLevelEvent = (eventId: number) => {
  const winLevel = readAllWinLevelEvents().find(
    (e: IWinLevelEvent) => e.eventId == eventId
  );
  if (!winLevel) throw new Error("No win level event");
  return winLevel;
};

export const readOpenSpellEvent = (eventId: number) => {
  const winLevel = readAllOpenSpellEvents().find(
    (e: IOpenSpellEvent) => e.eventId == eventId
  );
  if (!winLevel) throw new Error("No open spell event");
  return winLevel;
};
