import {
  ICreatePlayerEvent,
  IPlayerEvent,
  IStartLevelEvent,
  IWinLevelEvent,
} from "../engine/types";
import {
  createPlayerEvents,
  playerEvents,
  startLevelEvents,
  winLevelEvents,
} from "./testDB";

export const readEvents = (playerId: number) => {
  // Find events for a player
  const events = playerEvents.filter(
    (p: IPlayerEvent) => p.playerId === playerId
  );

  if (events.length === 0) {
    //TODO CREATE PLAYER
  }

  return events;
};

export const readCreatePlayerEvent = (eventId: number) => {
  const createPlayer = createPlayerEvents.find(
    (e: ICreatePlayerEvent) => e.eventId === eventId
  );
  if (!createPlayer) throw new Error("No create player event");
  return createPlayer;
};

export const readStartLevelEvent = (eventId: number) => {
  const startLevel = startLevelEvents.find(
    (e: IStartLevelEvent) => e.eventId === eventId
  );
  if (!startLevel) throw new Error("No start level event");
  return startLevel;
};

export const readWinLevelEvent = (eventId: number) => {
  const winLevel = winLevelEvents.find(
    (e: IWinLevelEvent) => e.eventId === eventId
  );
  if (!winLevel) throw new Error("No start level event");
  return winLevel;
};
