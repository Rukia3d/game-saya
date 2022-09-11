import * as readers from "./readers";
import {
  canUpdateSpell,
  correctCheckpoint,
  enoughEnergyToPlay,
  enoughToPay,
  foundStartLevelToWin,
} from "../engine/helpers";
import {
  eventType,
  ICreatePlayerData,
  ICreatePlayerDB,
  ICreatePlayerEvent,
  IEventDB,
  IGame,
  IMissCheckpointData,
  IMissCheckpointDB,
  IMissCheckpointEvent,
  IOpenSpellData,
  IOpenSpellDB,
  IOpenSpellEvent,
  IPassCheckpointData,
  IPassCheckpointEvent,
  IServerArenaStartData,
  IServerArenaStartEvent,
  ISpell,
  ISpellClosed,
  ISpellOpen,
  IStartEndlessData,
  IStartEndlessDB,
  IStartEndlessEvent,
  IStartLevelData,
  IStartLevelDB,
  IStartLevelEvent,
  IUpdateSpellData,
  IUpdateSpellDB,
  IUpdateSpellEvent,
  IWinLevelData,
  IWinLevelDB,
  IWinLevelEvent,
} from "../engine/types";
import {
  createPlayerEvents,
  openSpellEvents,
  allPEvents,
  startLevelEvents,
  winLevelEvents,
  updateSpellEvents,
  startEldessEvents,
  passCheckpointEvents,
  missCheckpointEvents,
  serverArenaStartEvents,
} from "./testDBPlayer";
import { ARENAEVENTINTERVAL } from "../cronjobs";

const getNextPlayerId = () => {
  const createPlayers = readers
    .allCreatePlayerEvents()
    .sort((a, b) => a.eventId - b.eventId);
  const latestEvents = readers
    .allGameEvents()
    .find(
      (e: IEventDB) =>
        e.eventId == createPlayers[createPlayers.length - 1].eventId
    );

  if (!latestEvents || latestEvents.playerId == null) {
    throw new Error("Can't find the last created player Id");
  }
  return latestEvents.playerId + 1;
};

const getNextCreatePlayerEventId = () => {
  const latestEvents = readers
    .allCreatePlayerEvents()
    .sort((a, b) => a.eventId - b.eventId);
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

const getNextStartLevelEventId = () => {
  const latestEvents = readers
    .allStartLevelEvents()
    .sort((a, b) => a.eventId - b.eventId);
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

const getNextStartEndlessEventId = () => {
  const latestEvents = readers
    .allStartLevelEvents()
    .sort((a, b) => a.eventId - b.eventId);
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

const getNextPassCheckpointEventId = () => {
  const latestEvents = readers
    .allPassCheckpointEvents()
    .sort((a, b) => a.eventId - b.eventId);
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

const getNextMissCheckpointEventId = () => {
  const latestEvents = readers
    .allMissCheckpointEvents()
    .sort((a, b) => a.eventId - b.eventId);
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

const getNextWinLevelEventId = () => {
  const latestEvents = readers
    .allWinLevelEvents()
    .sort((a, b) => a.eventId - b.eventId);
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

const getNextOpenSpellEventId = () => {
  const latestEvents = readers
    .allOpenSpellEvents()
    .sort((a, b) => a.eventId - b.eventId);
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

const getNextUpdateSpellEventId = () => {
  const latestEvents = readers
    .allUpdateSpellEvents()
    .sort((a, b) => a.eventId - b.eventId);
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

const getNextServerStartArena = () => {
  const latestEvents = readers
    .allServerStartArena()
    .sort((a, b) => a.eventId - b.eventId);
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

export const createPlayerEvent = (
  event: ICreatePlayerData
): ICreatePlayerEvent => {
  const nextPlayerId = getNextPlayerId();
  const nextCreateEventId = getNextCreatePlayerEventId();
  const newEvent: IEventDB = {
    playerId: nextPlayerId,
    eventId: nextCreateEventId,
    type: "CREATEPLAYER" as eventType,
    created: event.created,
  };
  const newPlayerEvent: ICreatePlayerDB = {
    eventId: nextCreateEventId,
    playerName: event.data.name,
  };
  allPEvents.push(newEvent);
  createPlayerEvents.push(newPlayerEvent);
  return {
    playerId: nextPlayerId,
    eventId: newEvent.eventId,
    type: "CREATEPLAYER",
    created: newEvent.created,
    playerName: newPlayerEvent.playerName,
  };
};

export const startLevelEvent = (
  game: IGame,
  event: IStartLevelData
): IStartLevelEvent => {
  const nextCreateEventId = getNextStartLevelEventId();
  if (enoughEnergyToPlay(game.player, event.data)) {
    const newEvent: IEventDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      type: "STARTLEVEL" as eventType,
      created: event.created,
    };
    const newStartPlayerEvent: IStartLevelDB = {
      eventId: nextCreateEventId,
      arcanaId: event.data.arcanaId,
      levelId: event.data.levelId,
      mode: event.data.mode,
    };
    allPEvents.push(newEvent);
    startLevelEvents.push(newStartPlayerEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "STARTLEVEL",
      arcanaId: newStartPlayerEvent.arcanaId,
      mode: newStartPlayerEvent.mode,
      levelId: newStartPlayerEvent.levelId,
    };
  } else {
    throw new Error("Can't generate startLevelEvent");
  }
};

export const winLevelEvent = (
  game: IGame,
  event: IWinLevelData
): IWinLevelEvent => {
  const nextCreateEventId = getNextWinLevelEventId();
  if (foundStartLevelToWin(game.player.currentState, event.data)) {
    const newEvent: IEventDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      created: event.created,
      type: "WINLEVEL" as eventType,
    };
    const newWinLevelEvent: IWinLevelDB = {
      eventId: nextCreateEventId,
      arcanaId: event.data.arcanaId,
      levelId: event.data.levelId,
      mode: event.data.mode,
    };
    allPEvents.push(newEvent);
    winLevelEvents.push(newWinLevelEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "WINLEVEL",
      arcanaId: newWinLevelEvent.arcanaId,
      mode: newWinLevelEvent.mode,
      levelId: newWinLevelEvent.levelId,
    };
  } else {
    throw new Error("Can't generate winLevelEvent");
  }
};

export const startEndlessEvent = (
  game: IGame,
  event: IStartEndlessData
): IStartEndlessEvent => {
  const nextCreateEventId = getNextStartEndlessEventId();
  if (enoughEnergyToPlay(game.player, event.data)) {
    const newEvent: IEventDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      type: "STARTENDLESS" as eventType,
      created: new Date().valueOf(),
    };
    const newStartEldessEvents: IStartEndlessDB = {
      eventId: nextCreateEventId,
      arcanaId: event.data.arcanaId,
      mode: event.data.mode,
    };
    allPEvents.push(newEvent);
    startEldessEvents.push(newStartEldessEvents);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "STARTENDLESS",
      arcanaId: newStartEldessEvents.arcanaId,
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
  const nextCreateEventId = getNextPassCheckpointEventId();
  if (correctCheckpoint(game.player, event.data)) {
    const newEvent: IEventDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      type: "PASSCHECKPOINT" as eventType,
      created: new Date().valueOf(),
    };
    const newPassCheckpointEvent = {
      eventId: nextCreateEventId,
      arcanaId: event.data.arcanaId,
      mode: event.data.mode,
      checkpoint: event.data.checkpoint,
    };
    allPEvents.push(newEvent);
    passCheckpointEvents.push(newPassCheckpointEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "PASSCHECKPOINT",
      arcanaId: newPassCheckpointEvent.arcanaId,
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
  const nextCreateEventId = getNextMissCheckpointEventId();
  const newEvent: IEventDB = {
    playerId: event.playerId,
    eventId: nextCreateEventId,
    type: "MISSCHECKPOINT" as eventType,
    created: new Date().valueOf(),
  };
  const newMissCheckpointEvent: IMissCheckpointDB = {
    eventId: nextCreateEventId,
    arcanaId: event.data.arcanaId,
    mode: event.data.mode,
  };
  allPEvents.push(newEvent);
  missCheckpointEvents.push(newMissCheckpointEvent);
  return {
    playerId: event.playerId,
    eventId: newEvent.eventId,
    created: newEvent.created,
    type: "MISSCHECKPOINT",
    arcanaId: newMissCheckpointEvent.arcanaId,
    mode: newMissCheckpointEvent.mode,
  };
};

export const openSpellEvent = (
  game: IGame,
  event: IOpenSpellData
): IOpenSpellEvent => {
  const nextCreateEventId = getNextOpenSpellEventId();
  const newPlayerSpells = JSON.parse(JSON.stringify(game.player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.arcanaId === event.data.arcanaId && s.id === event.data.spellId
  );
  if (!newPlayerSpells[indexToChange].price) {
    throw new Error("Spell to open doesn't have a price");
  }
  if (
    enoughToPay(game.player.materials, newPlayerSpells[indexToChange].price)
  ) {
    const newEvent: IEventDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      type: "OPENSPELL" as eventType,
      created: event.created,
    };
    const newOpelSpellEvent: IOpenSpellDB = {
      eventId: nextCreateEventId,
      arcanaId: event.data.arcanaId,
      spellId: event.data.spellId,
    };
    allPEvents.push(newEvent);
    openSpellEvents.push(newOpelSpellEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "OPENSPELL",
      arcanaId: newOpelSpellEvent.arcanaId,
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
  const nextCreateEventId = getNextUpdateSpellEventId();
  const newPlayerSpells = JSON.parse(JSON.stringify(game.player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.arcanaId === event.data.arcanaId && s.id === event.data.spellId
  );
  if (!newPlayerSpells[indexToChange].updatePrice) {
    throw new Error("Spell to open doesn't have a price");
  }
  if (!newPlayerSpells[indexToChange].requiredStrength) {
    throw new Error("Spell to open doesn't have a required strength");
  }
  if (
    enoughToPay(
      game.player.materials,
      newPlayerSpells[indexToChange].updatePrice
    ) &&
    canUpdateSpell(
      newPlayerSpells[indexToChange].requiredStrength,
      newPlayerSpells[indexToChange].strength
    )
  ) {
    const newEvent: IEventDB = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      type: "UPDATESPELL" as eventType,
      created: event.created,
    };
    const newupdateSpellEvent: IUpdateSpellDB = {
      eventId: nextCreateEventId,
      arcanaId: event.data.arcanaId,
      spellId: event.data.spellId,
    };
    allPEvents.push(newEvent);
    updateSpellEvents.push(newupdateSpellEvent);
    return {
      playerId: event.playerId,
      eventId: newEvent.eventId,
      created: newEvent.created,
      type: "UPDATESPELL",
      arcanaId: newupdateSpellEvent.arcanaId,
      spellId: newupdateSpellEvent.spellId,
    };
  } else {
    throw new Error("Can't generate updateSpellEvent");
  }
};

/*
export const arenaStartEvent = (
  player: IPlayer,
  event: {
    playerId: number;
    created: number;
    type: eventType;
    data: {
      mode: gameMode;
      index: number;
    };
  }
) => {
  const arenaEvent =
    event.data.mode === "run" ? player.arenaRun : player.arenaFight;
  if (
    enoughToPay(player.materials, arenaEvent.events[event.data.index].stake) &&
    allowParticipation(event.created, arenaEvent.resultTime)
  ) {
    const nextArenaStartEventId = getNextArenaStartEvent();
    const newEvent = {
      playerId: event.playerId,
      eventId: nextArenaStartEventId,
      type: "ARENASTART" as eventType,
      created: new Date().valueOf(),
    };
    allPEvents.push(newEvent);
    arenaStartEvents.push({
      eventId: nextArenaStartEventId,
      mode: event.data.mode,
      index: event.data.index,
    });
    return newEvent;
  } else {
    throw new Error("Can't generate arenaStartEvent");
  }
};


export const arenaEndEvent = (
  player: IPlayer,
  event: {
    playerId: number;
    created: number;
    type: eventType;
    data: {
      mode: gameMode;
      index: number;
    };
  }
) => {
  if (foundArenaStartEvent(player.currentState, event.data)) {
    const nextArenaEndEventId = getNextArenaEndEvent();
    const newEvent = {
      playerId: event.playerId,
      eventId: nextArenaEndEventId,
      type: "ARENAEND" as eventType,
      created: new Date().valueOf(),
    };
    allPEvents.push(newEvent);
    arenaEndEvents.push({
      eventId: nextArenaEndEventId,
      mode: event.data.mode,
      index: event.data.index,
    });
    return newEvent;
  } else {
    throw new Error("Can't generate arenaEndEvent");
  }
};
*/

export const serverStartArena = (
  game: IGame,
  dates: IServerArenaStartData
): IServerArenaStartEvent => {
  const nextServerStartArena = getNextServerStartArena();
  const now = new Date().valueOf();
  const newEvent = {
    playerId: null,
    eventId: nextServerStartArena,
    type: "SERVERARENASTART" as eventType,
    created: now,
  };
  const newServerStartArenaEvent: IServerArenaStartEvent = {
    eventId: nextServerStartArena,
    mode: "run",
    type: "SERVERARENASTART",
    start: dates.startDate,
    created: now,
    end: dates.endDate,
  };
  allPEvents.push(newEvent);
  serverArenaStartEvents.push(newServerStartArenaEvent);
  return newServerStartArenaEvent;
};
