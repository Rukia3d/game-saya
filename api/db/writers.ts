import * as readers from "./readers";
import {
  eventType,
  ICreatePlayerData,
  ICreatePlayerDB,
  ICreatePlayerEvent,
} from "../engine/types";
import { Database } from "sqlite3";
import { readCreatePlayerEventsData } from "../engine/combiners";
import { IEventDB } from "./playerdata_readers";
import { writeOneLine } from "./db";

const getNextPlayerId = async (db: Database) => {
  const createPlayers = await readCreatePlayerEventsData(db);
  if (!createPlayers) {
    throw new Error("Can't find the last created player Id");
  }
  return createPlayers[createPlayers.length - 1].playerId + 1;
};

export const writeCreatePlayer = async (
  player_id: number,
  created: number,
  name: string,
  db: Database
): Promise<number> => {
  // console.log("trying to write a new player");
  const player_event = "event(type, created_at, updated_at, deleted_at)";
  const newPlayer = ["CREATEPLAYER", created, created, "NULL"];
  const event_id = await writeOneLine(player_event, newPlayer, db);
  // console.log("player_event last ID", event_id);
  const event_createuser =
    "event_player_createplayer(player_id, player_name, event_id)";
  const newEvent = [player_id, name, event_id];
  const res = await writeOneLine(event_createuser, newEvent, db);
  // console.log("create_player_event last ID", res);
  return res;
};

export const createPlayerEvent = async (
  db: Database,
  event: ICreatePlayerData
): Promise<ICreatePlayerEvent> => {
  const nextPlayerId = await getNextPlayerId(db);
  const nextCreateEventId = await writeCreatePlayer(
    nextPlayerId,
    event.created,
    event.data.name,
    db
  );
  const newEvent: IEventDB = {
    eventId: nextCreateEventId,
    type: "CREATEPLAYER" as eventType,
    created: event.created,
  };
  const newPlayerEvent: ICreatePlayerDB = {
    playerId: nextPlayerId,
    eventId: nextCreateEventId,
    playerName: event.data.name,
  };
  return {
    playerId: nextPlayerId,
    eventId: newEvent.eventId,
    type: "CREATEPLAYER",
    created: newEvent.created,
    playerName: newPlayerEvent.playerName,
  };
};

/*
export const startLevelEvent = (
  game: IGame,
  event: IStartLevelData
): IStartLevelEvent => {
  const nextCreateEventId = getNextEventId();
  const player = findPlayer(game, event.playerId);
  if (enoughEnergyToPlay(player, event.data)) {
    const newEvent: IEventDB = {
      eventId: nextCreateEventId,
      type: "STARTLEVEL" as eventType,
      created: event.created,
    };
    const newStartPlayerEvent: IStartLevelDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      elementId: event.data.elementId,
      adventureId: event.data.adventureId,
      storyId: event.data.storyId,
      mode: event.data.mode,
    };
    allGameEvents.push(newEvent);
    startLevelEvents.push(newStartPlayerEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "STARTLEVEL",
      elementId: newStartPlayerEvent.elementId,
      adventureId: newStartPlayerEvent.adventureId,
      mode: newStartPlayerEvent.mode,
      storyId: newStartPlayerEvent.storyId,
    };
  } else {
    throw new Error("Can't generate startLevelEvent");
  }
};

export const winLevelEvent = (
  game: IGame,
  event: IWinLevelData
): IWinLevelEvent => {
  const nextCreateEventId = getNextEventId();
  const player = findPlayer(game, event.playerId);
  const res = findStartLevel(player.currentState, event.data.storyId);
  if (res) {
    const newEvent: IEventDB = {
      eventId: nextCreateEventId,
      created: event.created,
      type: "WINLEVEL" as eventType,
    };
    const newWinLevelEvent: IWinLevelDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      elementId: res.elementId,
      adventureId: res.adventureId,
      storyId: res.storyId,
      mode: res.mode,
    };
    allGameEvents.push(newEvent);
    winLevelEvents.push(newWinLevelEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "WINLEVEL",
      elementId: newWinLevelEvent.elementId,
      adventureId: newWinLevelEvent.adventureId,
      storyId: newWinLevelEvent.storyId,
      mode: newWinLevelEvent.mode,
    };
  } else {
    throw new Error("Can't generate winLevelEvent");
  }
};
/*
export const startEndlessEvent = (
  game: IGame,
  event: IStartEndlessData
): IStartEndlessEvent => {
  const nextCreateEventId = getNextEventId();
  const player = findPlayer(game, event.playerId);
  if (enoughEnergyToPlay(player, event.data)) {
    const newEvent: IEventDB = {
      eventId: nextCreateEventId,
      type: "STARTENDLESS" as eventType,
      created: new Date().valueOf(),
    };
    const newStartEldessEvents: IStartEndlessDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      elementId: event.data.elementId,
      mode: event.data.mode,
    };
    allGameEvents.push(newEvent);
    startEldessEvents.push(newStartEldessEvents);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "STARTENDLESS",
      elementId: newStartEldessEvents.elementId,
      mode: newStartEldessEvents.mode,
    };
  } else {
    throw new Error("Can't generate startEndlessEvent");
  }
};

export const passCheckpointEvent = (
  game: IGame,
  event: IPassCheckpointData
): IPassCheckpointEvent => {
  const nextCreateEventId = getNextEventId();
  const player = findPlayer(game, event.playerId);
  if (correctCheckpoint(player, event.data)) {
    const newEvent: IEventDB = {
      eventId: nextCreateEventId,
      type: "PASSCHECKPOINT" as eventType,
      created: new Date().valueOf(),
    };
    const newPassCheckpointEvent = {
      eventId: nextCreateEventId,
      playerId: event.playerId,
      elementId: event.data.elementId,
      mode: event.data.mode,
      checkpoint: event.data.checkpoint,
    };
    allGameEvents.push(newEvent);
    passCheckpointEvents.push(newPassCheckpointEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "PASSCHECKPOINT",
      elementId: newPassCheckpointEvent.elementId,
      mode: newPassCheckpointEvent.mode,
      checkpoint: newPassCheckpointEvent.checkpoint,
    };
  } else {
    throw new Error("Can't generate passCheckpointEvent");
  }
};

export const missCheckpointEvent = (
  game: IGame,
  event: IMissCheckpointData
): IMissCheckpointEvent => {
  const nextCreateEventId = getNextEventId();
  const newEvent: IEventDB = {
    eventId: nextCreateEventId,
    type: "MISSCHECKPOINT" as eventType,
    created: new Date().valueOf(),
  };
  const newMissCheckpointEvent: IMissCheckpointDB = {
    playerId: event.playerId,
    eventId: nextCreateEventId,
    elementId: event.data.elementId,
    mode: event.data.mode,
  };
  allGameEvents.push(newEvent);
  missCheckpointEvents.push(newMissCheckpointEvent);
  return {
    playerId: event.playerId,
    eventId: newEvent.eventId,
    created: newEvent.created,
    type: "MISSCHECKPOINT",
    elementId: newMissCheckpointEvent.elementId,
    mode: newMissCheckpointEvent.mode,
  };
};

/*
export const openSpellEvent = (
  game: IGame,
  event: IOpenSpellData
): IOpenSpellEvent => {
  const nextCreateEventId = getNextEventId();
  const player = findPlayer(game, event.playerId);
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.elementId === event.data.elementId && s.id === event.data.spellId
  );
  if (!("price" in newPlayerSpells[indexToChange])) {
    throw new Error("Spell to open doesn't have a price");
  }
  if (enoughToPay(player.materials, newPlayerSpells[indexToChange].price)) {
    const newEvent: IEventDB = {
      eventId: nextCreateEventId,
      type: "OPENSPELL" as eventType,
      created: event.created,
    };
    const newOpelSpellEvent: IOpenSpellDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      elementId: event.data.elementId,
      spellId: event.data.spellId,
    };
    allGameEvents.push(newEvent);
    openSpellEvents.push(newOpelSpellEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "OPENSPELL",
      elementId: newOpelSpellEvent.elementId,
      spellId: newOpelSpellEvent.spellId,
    };
  } else {
    throw new Error("Can't generate openSpellEvent");
  }
};

export const updateSpellEvent = (
  game: IGame,
  event: IUpdateSpellData
): IUpdateSpellEvent => {
  const nextCreateEventId = getNextEventId();
  const player = findPlayer(game, event.playerId);
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.elementId === event.data.elementId && s.id === event.data.spellId
  );
  if (!newPlayerSpells[indexToChange].updatePrice) {
    throw new Error("Spell to open doesn't have a price");
  }
  if (!newPlayerSpells[indexToChange].requiredStrength) {
    throw new Error("Spell to open doesn't have a required strength");
  }
  if (
    enoughToPay(player.materials, newPlayerSpells[indexToChange].updatePrice) &&
    canUpdateSpell(
      newPlayerSpells[indexToChange].requiredStrength,
      newPlayerSpells[indexToChange].strength
    )
  ) {
    const newEvent: IEventDB = {
      eventId: nextCreateEventId,
      type: "UPDATESPELL" as eventType,
      created: event.created,
    };
    const newupdateSpellEvent: IUpdateSpellDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      elementId: event.data.elementId,
      spellId: event.data.spellId,
    };
    allGameEvents.push(newEvent);
    updateSpellEvents.push(newupdateSpellEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "UPDATESPELL",
      elementId: newupdateSpellEvent.elementId,
      spellId: newupdateSpellEvent.spellId,
    };
  } else {
    throw new Error("Can't generate updateSpellEvent");
  }
};

export const listSpellEvent = (
  game: IGame,
  event: IListSpellData
): IListSpellEvent => {
  const nextCreateEventId = getNextEventId();
  const player = findPlayer(game, event.playerId);
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));
  const indexToRemove = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) => s.id === event.data.spellId
  );
  if (indexToRemove >= 0 && "updatePrice" in newPlayerSpells[indexToRemove]) {
    const newEvent: IEventDB = {
      eventId: nextCreateEventId,
      type: "LISTSPELL" as eventType,
      created: event.created,
    };
    const newListSpellEvent: IListSpellDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      spellId: event.data.spellId,
      currency: event.data.currency,
      price: event.data.price,
    };
    allGameEvents.push(newEvent);
    listSpellEvents.push(newListSpellEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "LISTSPELL",
      spellId: newListSpellEvent.spellId,
      currency: newListSpellEvent.currency,
      price: newListSpellEvent.price,
    };
  } else {
    throw new Error("Can't generate listSpellEvent");
  }
};

export const delistSpellEvent = (
  game: IGame,
  event: IDelistSpellData
): IDelistSpellEvent => {
  const nextCreateEventId = getNextEventId();
  const player = findPlayer(game, event.playerId);
  if (
    player.id === event.playerId &&
    findListing(game.server.listings, event.data.listingId)
  ) {
    const newEvent: IEventDB = {
      eventId: nextCreateEventId,
      type: "DELISTSPELL" as eventType,
      created: event.created,
    };
    const newDelistSpellEvent: IDelistSpellDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      listingId: event.data.listingId,
    };
    allGameEvents.push(newEvent);
    delistSpellEvents.push(newDelistSpellEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "DELISTSPELL",
      listingId: newDelistSpellEvent.listingId,
    };
  } else {
    throw new Error("Can't generate listSpellEvent");
  }
};

export const buySpellEvent = (
  game: IGame,
  event: IBuySpellData
): IBuySpellEvent => {
  const nextCreateEventId = getNextEventId();
  const buyer = findPlayer(game, event.playerId);
  // TODO - Balance check and balance updates
  if (true) {
    const newEvent: IEventDB = {
      eventId: nextCreateEventId,
      type: "BUYSPELL" as eventType,
      created: event.created,
    };
    const newBuySpellEvent: IBuySpellDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      listingId: event.data.listingId,
    };
    allGameEvents.push(newEvent);
    delistSpellEvents.push(newBuySpellEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "BUYSPELL",
      listingId: newBuySpellEvent.listingId,
    };
  } else {
    throw new Error("Can't generate listSpellEvent");
  }
};


export const startArenaEvent = (
  game: IGame,
  event: IArenaStartData
): IArenaStartEvent => {
  const arenaEvent =
    event.data.mode === "run" ? game.server.arenaRun : game.server.arenaFight;
  const player = findPlayer(game, event.playerId);
  if (
    enoughToPay(player.materials, arenaEvent.events[event.data.index].stake) &&
    allowParticipation(event.created, arenaEvent.resultTime)
  ) {
    const nextArenaStartEventId = getNextEventId();
    const newEvent: IEventDB = {
      eventId: nextArenaStartEventId,
      type: "ARENASTART" as eventType,
      created: new Date().valueOf(),
    };
    const newArenaStartEvent: IArenaStartDB = {
      eventId: nextArenaStartEventId,
      playerId: event.playerId,
      mode: event.data.mode,
      index: event.data.index,
    };
    allGameEvents.push(newEvent);
    startArenaEvents.push(newArenaStartEvent);

    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "ARENASTART",
      mode: newArenaStartEvent.mode,
      index: newArenaStartEvent.index,
    };
  } else {
    throw new Error("Can't generate startArenaEvent");
  }
};

export const endArenaEvent = (
  game: IGame,
  event: IArenaEndData
): IArenaEndEvent => {
  const player = findPlayer(game, event.playerId);
  if (foundArenaStartEvent(player.currentState, event.data)) {
    const nextArenaEndEventId = getNextEventId();
    const newEvent: IEventDB = {
      eventId: nextArenaEndEventId,
      type: "ARENAEND" as eventType,
      created: new Date().valueOf(),
    };
    const newArenaEndEvent: IArenaEndDB = {
      eventId: nextArenaEndEventId,
      playerId: event.playerId,
      mode: event.data.mode,
      index: event.data.index,
    };
    allGameEvents.push(newEvent);
    endArenaEvents.push(newArenaEndEvent);

    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "ARENAEND",
      mode: newArenaEndEvent.mode,
      index: newArenaEndEvent.index,
    };
  } else {
    throw new Error("Can't generate endArenaEvent");
  }
};

export const serverStartArena = (
  game: IGame,
  dates: IServerArenaStartData
): IServerArenaStartEvent => {
  const nextServerStartArena = getNextEventId();
  const now = new Date().valueOf();
  const newEvent = {
    playerId: null,
    eventId: nextServerStartArena,
    type: "SERVERARENASTART" as eventType,
    created: now,
  };
  const newServerStartArenaEvent: IServerArenaStartEvent = {
    eventId: nextServerStartArena,
    type: "SERVERARENASTART",
    start: dates.startDate,
    created: now,
    end: dates.endDate,
  };
  allGameEvents.push(newEvent);
  serverArenaStartEvents.push(newServerStartArenaEvent);
  return newServerStartArenaEvent;
};

export const serverEndArena = (game: IGame): IServerArenaEndEvent => {
  const nextServerEndArena = getNextEventId();
  const now = new Date().valueOf();
  const newEvent = {
    playerId: null,
    eventId: nextServerEndArena,
    type: "SERVERARENAEND" as eventType,
    created: now,
  };
  const newServerEndArenaEvent: IServerArenaEndEvent = {
    eventId: nextServerEndArena,
    type: "SERVERARENAEND",
    created: now,
  };
  allGameEvents.push(newEvent);
  serverArenaEndEvents.push(newServerEndArenaEvent);
  return newServerEndArenaEvent;
};
*/
