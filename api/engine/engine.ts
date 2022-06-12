import {
  readCreatePlayerEvent,
  readStartLevelEvent,
  readWinLevelEvent,
} from "../db/readers";
import { eventCreatePlayer, eventStartLevel, eventWinLevel } from "./events";
import { IPlayer, IPlayerEvent } from "./types";

const basePlayer: IPlayer = {
  id: 0,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  elements: [],
  spells: [],
  missions: [],
  messages: [],
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
