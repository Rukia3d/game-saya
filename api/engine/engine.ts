import * as readers from "../db/readers";
import * as writers from "../db/writers";
import * as events from "./events";
import { IGenericEvent, IPlayer, IPlayerEvent } from "./types";

export const processEvent = (
  player: IPlayer,
  event: IGenericEvent
): IPlayer => {
  let newPlayer = JSON.parse(JSON.stringify(player));
  console.log("Process Event", event.type);
  switch (event.type) {
    case "CREATEPLAYER":
      const createPlayerEvent = writers.createPlayerEvent(event);
      return applyEvent(newPlayer, createPlayerEvent);
    case "STARTLEVEL":
      const startLevelEvent = writers.startLevelEvent(newPlayer, event);
      const res = applyEvent(newPlayer, startLevelEvent);
      return res;
    case "WINLEVEL":
      const winLevelEvent = writers.winLevelEvent(newPlayer, event);
      return applyEvent(newPlayer, winLevelEvent);
    case "OPENSPELL":
      const openSpellEvent = writers.openSpellEvent(newPlayer, event);
      return applyEvent(newPlayer, openSpellEvent);
    case "UPDATESPELL":
      const updateSpellEvent = writers.updateSpellEvent(newPlayer, event);
      return applyEvent(newPlayer, updateSpellEvent);
    default:
      throw new Error("Unknown event type");
  }
};

export const applyEvent = (player: IPlayer, event: IPlayerEvent): IPlayer => {
  let newPlayer = JSON.parse(JSON.stringify(player));
  console.log("Apply Event", event);
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
    arcanas: [],
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
