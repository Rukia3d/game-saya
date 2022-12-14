import {
  IArenaEndData,
  IArenaEndEvent,
  IArenaStartData,
  IArenaStartEvent,
  IClaimRewardData,
  IClaimRewardEvent,
  ICreatePlayerData,
  ICreatePlayerEvent,
  IGame,
  IServerArenaEndEvent,
  IServerArenaStartData,
  IServerArenaStartEvent,
  IStartLevelData,
  IStartLevelEvent,
  IWinLevelData,
  IWinLevelEvent,
} from "../engine/types";
import { Database } from "sqlite";
import { readCreatePlayerEventsData } from "../engine/combiners";
import {
  allowParticipation,
  enoughEnergyToPlay,
  enoughToPay,
  findPlayer,
  findStartLevel,
  foundArenaStartEvent,
} from "../engine/helpers";
import {
  writeArenaEnd,
  writeArenaEndEvent,
  writeArenaStart,
  writeArenaStartEvent,
  writeClaimRewardEvent,
  writeCreatePlayer,
  writeStartLevelEvent,
  writeWinLevelEvent,
} from "../storage/playerdata_writers";

const getNextPlayerId = async (db: Database) => {
  const createPlayers = await readCreatePlayerEventsData(db);
  if (!createPlayers) {
    throw new Error("Can't find the last created player Id");
  }
  return createPlayers[createPlayers.length - 1].playerId + 1;
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
  return {
    playerId: nextPlayerId,
    eventId: nextCreateEventId,
    type: "CREATEPLAYER",
    created: event.created,
    playerName: event.data.name,
  };
};

export const startLevelEvent = async (
  db: Database,
  game: IGame,
  event: IStartLevelData
): Promise<IStartLevelEvent> => {
  const player = findPlayer(game, event.playerId);
  if (enoughEnergyToPlay(player, event.data)) {
    const startLevelEventId = await writeStartLevelEvent(
      event.playerId,
      event.data.adventureId,
      event.data.storyId,
      event.data.chapterId,
      event.created,
      db
    );
    return {
      playerId: event.playerId,
      eventId: startLevelEventId,
      created: event.created,
      type: "STARTLEVEL",
      chapterId: event.data.chapterId,
      adventureId: event.data.adventureId,
      storyId: event.data.storyId,
    };
  } else {
    throw new Error("Can't generate startLevelEvent");
  }
};

export const winLevelEvent = async (
  db: Database,
  game: IGame,
  event: IWinLevelData
): Promise<IWinLevelEvent> => {
  const player = findPlayer(game, event.playerId);
  const res = findStartLevel(
    player,
    event.data.adventureId,
    event.data.storyId,
    event.data.chapterId
  );
  if (res) {
    const winLevelEventId = await writeWinLevelEvent(
      event.playerId,
      res.adventureId,
      res.storyId,
      res.chapterId,
      event.created,
      db
    );
    return {
      playerId: event.playerId,
      eventId: winLevelEventId,
      created: event.created,
      type: "WINLEVEL",
      chapterId: event.data.chapterId,
      adventureId: event.data.adventureId,
      storyId: event.data.storyId,
    };
  } else {
    throw new Error("Can't generate winLevelEvent");
  }
};

export const claimRewardEvent = async (
  db: Database,
  game: IGame,
  event: IClaimRewardData
): Promise<IClaimRewardEvent> => {
  const player = findPlayer(game, event.playerId);
  if (player) {
    const claimRewardId = await writeClaimRewardEvent(
      event.playerId,
      event.data.claimId,
      event.created,
      db
    );
    return {
      playerId: event.playerId,
      eventId: claimRewardId,
      created: event.created,
      type: "CLAIMREWARD",
      claimId: event.data.claimId,
    };
  } else {
    throw new Error("Can't generate claimRewardEvent");
  }
};

export const serverStartArena = async (
  db: Database,
  dates: IServerArenaStartData
): Promise<IServerArenaStartEvent> => {
  const nextArenaStartId = await writeArenaStart(
    dates.startDate,
    dates.endDate,
    dates.created,
    db
  );
  return {
    eventId: nextArenaStartId,
    type: "SERVERARENASTART",
    start: dates.startDate,
    created: dates.created,
    end: dates.endDate,
  };
};

export const serverEndArena = async (
  db: Database,
  created: number
): Promise<IServerArenaEndEvent> => {
  const nextArenaEndId = await writeArenaEnd(created, db);
  return {
    eventId: nextArenaEndId,
    type: "SERVERARENAEND",
    created: created,
  };
};

export const startArenaEvent = async (
  db: Database,
  game: IGame,
  event: IArenaStartData
): Promise<IArenaStartEvent> => {
  const arenaEvent =
    event.data.mode === "run" ? game.server.arenaRun : game.server.arenaFight;
  const player = findPlayer(game, event.playerId);
  if (
    enoughToPay(player.materials, arenaEvent.events[event.data.index].stake) &&
    allowParticipation(event.created, arenaEvent.resultTime)
  ) {
    const nextArenaStartEventId = await writeArenaStartEvent(
      event.playerId,
      event.data.mode,
      event.data.index,
      event.created,
      db
    );

    return {
      playerId: event.playerId,
      eventId: nextArenaStartEventId,
      created: event.created,
      type: "ARENASTART",
      mode: event.data.mode,
      index: event.data.index,
    };
  } else {
    throw new Error("Can't generate startArenaEvent");
  }
};

export const endArenaEvent = async (
  db: Database,
  game: IGame,
  event: IArenaEndData
): Promise<IArenaEndEvent> => {
  const player = findPlayer(game, event.playerId);
  if (foundArenaStartEvent(player.currentState, event.data)) {
    const nextArenaStartEventId = await writeArenaEndEvent(
      event.playerId,
      event.data.mode,
      event.data.index,
      event.created,
      db
    );

    return {
      playerId: event.playerId,
      eventId: nextArenaStartEventId,
      created: event.created,
      type: "ARENAEND",
      mode: event.data.mode,
      index: event.data.index,
    };
  } else {
    throw new Error("Can't generate endArenaEvent");
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
*/
