import { eventCreatePlayer, eventStartLevel, eventWinLevel } from "./events";
import {
  createPlayerEvents,
  ICreatePlayerEvent,
  IPlayerEvent,
  IStartLevelEvent,
  IWinLevelEvent,
  playerEvents,
  startLevelEvents,
  winLevelEvents,
} from "./testDB";
import { IPlayer } from "./types";

const basePlayer: IPlayer = {
  id: 0,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  characters: [],
  spells: [],
  missions: [],
  messages: [],
};

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

const readCreatePlayerEvent = (eventId: number) => {
  const createPlayer = createPlayerEvents.find(
    (e: ICreatePlayerEvent) => e.eventId === eventId
  );
  if (!createPlayer) throw new Error("No create player event");
  return createPlayer;
};

const readStartLevelEvent = (eventId: number) => {
  const startLevel = startLevelEvents.find(
    (e: IStartLevelEvent) => e.eventId === eventId
  );
  if (!startLevel) throw new Error("No start level event");
  return startLevel;
};

const readWinLevelEvent = (eventId: number) => {
  const winLevel = winLevelEvents.find(
    (e: IWinLevelEvent) => e.eventId === eventId
  );
  if (!winLevel) throw new Error("No start level event");
  return winLevel;
};

export const applyEvents = (events: IPlayerEvent[]): IPlayer => {
  // Apply events assuming they are sorted
  let player = basePlayer;
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    switch (event.type) {
      case "CREATEPLAYER":
        player = eventCreatePlayer(
          { ...readCreatePlayerEvent(event.eventId), playerId: event.playerId },
          player
        );
        continue;
      case "STARTLEVEL":
        player = eventStartLevel(readStartLevelEvent(event.eventId), player);
        continue;
      case "WINLEVEL":
        player = eventWinLevel(
          { ...readWinLevelEvent(event.eventId), time: event.created },
          player
        );
        continue;
    }
  }
  return player;
};
