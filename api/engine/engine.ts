import * as readers from "../db/readers";
import * as writers from "../db/writers";
import * as events from "./events";
import { IGenericEvent, IPlayer, IPlayerEvent } from "./types";

export const processEvent = (
  player: IPlayer,
  event: IGenericEvent
): IPlayer => {
  let newPlayer = JSON.parse(JSON.stringify(player));
  switch (event.type) {
    case "CREATEPLAYER":
      const createPlayerEvent = writers.createPlayerEvent(event);
      return applyEvent(player, createPlayerEvent);
    case "STARTLEVEL":
      const startLevelEvent = writers.startLevelEvent(player, event);
      return applyEvent(player, startLevelEvent);
    case "WINLEVEL":
      const winLevelEvent = writers.winLevelEvent(player, event);
      return applyEvent(player, winLevelEvent);
    case "OPENSPELL":
      const openSpellEvent = writers.openSpellEvent(player, event);
      return applyEvent(player, openSpellEvent);
  }
  return newPlayer;
};

export const applyEvent = (player: IPlayer, event: IPlayerEvent): IPlayer => {
  let newPlayer = JSON.parse(JSON.stringify(player));
  switch (event.type) {
    case "CREATEPLAYER":
      return events.createPlayer(
        {
          ...readers.createPlayerEvent(event.eventId),
          playerId: event.playerId,
        },
        newPlayer
      );
    case "STARTLEVEL":
      return events.startLevel(
        readers.startLevelEvent(event.eventId),
        newPlayer
      );
    case "WINLEVEL":
      return events.winLevel(
        { ...readers.winLevelEvent(event.eventId), time: event.created },
        newPlayer
      );
    case "OPENSPELL":
      return events.openSpell(readers.openSpellEvent(event.eventId), newPlayer);
    case "UPDATESPELL":
      return events.updateSpell(
        readers.updateSpellEvent(event.eventId),
        newPlayer
      );
    // case "STARTENDLESS":
    //   return event.startEndless(
    //     readers.startEndlessEvent(event.eventId),
    //     newPlayer
    //   );
  }
  return newPlayer;
};

export const applyEvents = (events: IPlayerEvent[]): IPlayer => {
  // Apply events assuming they are sorted
  let player: IPlayer = {
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
    currentState: { state: "MAIN" },
  };
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    player = applyEvent(player, event);
  }
  return player;
};
