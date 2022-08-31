import * as readers from "./readers";
import {
  allowParticipation,
  canUpdateSpell,
  correctCheckpoint,
  enoughEnergyToPlay,
  enoughToPay,
  foundArenaStartEvent,
  foundStartLevelToWin,
} from "../engine/helpers";
import {
  eventType,
  gameMode,
  IGame,
  IPlayer,
  IPlayerEvent,
  ISpell,
  ISpellClosed,
  ISpellOpen,
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
  arenaStartEvents,
  arenaEndEvents,
} from "./testDBPlayer";

const getNextPlayerId = () => {
  const latestEvents = readers
    .allPlayerEvents()
    .sort((a, b) => a.playerId - b.playerId);
  return latestEvents[latestEvents.length - 1].playerId + 1;
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

const getNextArenaStartEvent = () => {
  const latestEvents = readers
    .allArenaStartEvents()
    .sort((a, b) => a.eventId - b.eventId);
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

const getNextArenaEndEvent = () => {
  const latestEvents = readers
    .allArenaEndEvents()
    .sort((a, b) => a.eventId - b.eventId);
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

export const createPlayerEvent = (event: {
  created: number;
  type: eventType;
  data: {
    name: string;
  };
}): IPlayerEvent => {
  const nextPlayerId = getNextPlayerId();
  const nextCreateEventId = getNextCreatePlayerEventId();
  const newEvent = {
    playerId: nextPlayerId,
    eventId: nextCreateEventId,
    type: "CREATEPLAYER" as eventType,
    created: event.created,
  };
  allPEvents.push(newEvent);
  createPlayerEvents.push({
    eventId: nextCreateEventId,
    playerName: event.data.name,
  });
  return newEvent;
};

export const startLevelEvent = (
  player: IPlayer,
  event: {
    playerId: number;
    created: number;
    type: eventType;
    data: {
      arcana: number;
      mode: gameMode;
      level: number;
    };
  }
): IPlayerEvent => {
  const nextCreateEventId = getNextStartLevelEventId();
  if (enoughEnergyToPlay(player, event.data)) {
    const newEvent = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      type: "STARTLEVEL" as eventType,
      created: event.created,
    };
    allPEvents.push(newEvent);
    startLevelEvents.push({
      eventId: nextCreateEventId,
      arcanaId: event.data.arcana,
      levelId: event.data.level,
      mode: event.data.mode,
    });
    return newEvent;
  } else {
    throw new Error("Can't generate startLevelEvent");
  }
};

export const winLevelEvent = (
  player: IPlayer,
  event: {
    playerId: number;
    created: number;
    type: eventType;
    data: {
      arcana: number;
      mode: gameMode;
      level: number;
    };
  }
) => {
  const nextCreateEventId = getNextWinLevelEventId();
  if (foundStartLevelToWin(player.currentState, event.data)) {
    const newEvent = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      type: "WINLEVEL" as eventType,
      created: event.created,
    };
    allPEvents.push(newEvent);
    winLevelEvents.push({
      eventId: nextCreateEventId,
      arcanaId: event.data.arcana,
      levelId: event.data.level,
      mode: event.data.mode,
    });
    return newEvent;
  } else {
    throw new Error("Can't generate winLevelEvent");
  }
};

export const startEndlessEvent = (
  player: IPlayer,
  event: {
    playerId: number;
    created: number;
    type: eventType;
    data: {
      arcana: number;
      mode: gameMode;
    };
  }
) => {
  const nextCreateEventId = getNextStartEndlessEventId();
  if (enoughEnergyToPlay(player, event.data)) {
    const newEvent = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      type: "STARTENDLESS" as eventType,
      created: new Date().valueOf(),
    };
    allPEvents.push(newEvent);
    startEldessEvents.push({
      eventId: nextCreateEventId,
      arcanaId: event.data.arcana,
      mode: event.data.mode,
    });
    return newEvent;
  } else {
    throw new Error("Can't generate startEndlessEvent");
  }
};

export const passCheckpointEvent = (
  player: IPlayer,
  event: {
    playerId: number;
    created: number;
    type: eventType;
    data: {
      arcana: number;
      mode: gameMode;
      checkpoint: number;
    };
  }
) => {
  const nextCreateEventId = getNextPassCheckpointEventId();
  if (correctCheckpoint(player, event.data)) {
    const newEvent = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      type: "PASSCHECKPOINT" as eventType,
      created: new Date().valueOf(),
    };
    allPEvents.push(newEvent);
    passCheckpointEvents.push({
      eventId: nextCreateEventId,
      arcanaId: event.data.arcana,
      mode: event.data.mode,
      checkpoint: event.data.checkpoint,
    });
    return newEvent;
  } else {
    throw new Error("Can't generate passCheckpointEvent");
  }
};

export const missCheckpointEvent = (
  player: IPlayer,
  event: {
    playerId: number;
    created: number;
    type: eventType;
    data: {
      arcana: number;
      mode: gameMode;
    };
  }
) => {
  const nextCreateEventId = getNextMissCheckpointEventId();
  const newEvent = {
    playerId: event.playerId,
    eventId: nextCreateEventId,
    type: "MISSCHECKPOINT" as eventType,
    created: new Date().valueOf(),
  };
  allPEvents.push(newEvent);
  missCheckpointEvents.push({
    eventId: nextCreateEventId,
    arcanaId: event.data.arcana,
    mode: event.data.mode,
  });
  return newEvent;
};

export const openSpellEvent = (
  player: IPlayer,
  event: {
    playerId: number;
    created: number;
    type: eventType;
    data: {
      arcana: number;
      spell: number;
    };
  }
) => {
  const nextCreateEventId = getNextOpenSpellEventId();
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.arcanaId === event.data.arcana && s.id === event.data.spell
  );
  if (!newPlayerSpells[indexToChange].price) {
    throw new Error("Spell to open doesn't have a price");
  }
  if (enoughToPay(player.materials, newPlayerSpells[indexToChange].price)) {
    const newEvent = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      type: "OPENSPELL" as eventType,
      created: event.created,
    };
    allPEvents.push(newEvent);
    openSpellEvents.push({
      eventId: nextCreateEventId,
      arcanaId: event.data.arcana,
      spellId: event.data.spell,
    });
    return newEvent;
  } else {
    throw new Error("Can't generate openSpellEvent");
  }
};

export const updateSpellEvent = (
  player: IPlayer,
  event: {
    playerId: number;
    created: number;
    type: eventType;
    data: {
      arcana: number;
      spell: number;
    };
  }
) => {
  const nextCreateEventId = getNextUpdateSpellEventId();
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.arcanaId === event.data.arcana && s.id === event.data.spell
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
    const newEvent = {
      playerId: event.playerId,
      eventId: nextCreateEventId,
      type: "UPDATESPELL" as eventType,
      created: event.created,
    };
    allPEvents.push(newEvent);
    updateSpellEvents.push({
      eventId: nextCreateEventId,
      arcanaId: event.data.arcana,
      spellId: event.data.spell,
    });
    return newEvent;
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
