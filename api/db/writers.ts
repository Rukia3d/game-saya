import { gameMode } from "../engine/types";
import {
  readAllCreatePlayerEvents,
  readAllOpenSpellEvents,
  readAllPlayerEvents,
  readAllStartLevelEvents,
} from "./readers";
import {
  createPlayerEvents,
  openSpellEvents,
  playerEvents,
  startLevelEvents,
  winLevelEvents,
} from "./testDBPlayer";

const getNextPlayerId = () => {
  const latestEvents = readAllPlayerEvents().sort(
    (a, b) => a.playerId - b.playerId
  );
  return latestEvents[latestEvents.length - 1].playerId + 1;
};

const getNextCreatePlayerEventId = () => {
  const latestEvents = readAllCreatePlayerEvents().sort(
    (a, b) => a.eventId - b.eventId
  );
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

const getNextStartLevelEventId = () => {
  const latestEvents = readAllStartLevelEvents().sort(
    (a, b) => a.eventId - b.eventId
  );
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

const getNextOpenSpellEventId = () => {
  const latestEvents = readAllOpenSpellEvents().sort(
    (a, b) => a.eventId - b.eventId
  );
  return latestEvents[latestEvents.length - 1].eventId + 1;
};

export const writeCreatePlayerEvent = (name: string): number => {
  const nextPlayerId = getNextPlayerId();
  const nextCreateEventId = getNextCreatePlayerEventId();
  playerEvents.push({
    playerId: nextPlayerId,
    eventId: nextCreateEventId,
    type: "CREATEPLAYER",
    created: new Date(),
  });
  createPlayerEvents.push({ eventId: nextCreateEventId, playerName: name });
  return nextPlayerId;
};

export const writeStartLevelEvent = (
  playerId: number,
  element: number,
  mode: string,
  level: number
) => {
  const nextCreateEventId = getNextStartLevelEventId();
  playerEvents.push({
    playerId: playerId,
    eventId: nextCreateEventId,
    type: "STARTLEVEL",
    created: new Date(),
  });
  startLevelEvents.push({
    eventId: nextCreateEventId,
    elementId: element,
    mode: mode as gameMode,
    levelId: level,
  });
  return nextCreateEventId;
};

export const writeWinLevelEvent = (
  playerId: number,
  element: number,
  mode: string,
  level: number
) => {
  const nextCreateEventId = getNextStartLevelEventId();
  playerEvents.push({
    playerId: playerId,
    eventId: nextCreateEventId,
    type: "WINLEVEL",
    created: new Date(),
  });
  winLevelEvents.push({
    eventId: nextCreateEventId,
    elementId: element,
    mode: mode as gameMode,
    levelId: level,
  });
  return nextCreateEventId;
};

export const writeOpenSpellEvent = (
  playerId: number,
  element: number,
  spellId: number
) => {
  const nextCreateEventId = getNextOpenSpellEventId();
  playerEvents.push({
    playerId: playerId,
    eventId: nextCreateEventId,
    type: "OPENSPELL",
    created: new Date(),
  });
  openSpellEvents.push({
    eventId: nextCreateEventId,
    elementId: element,
    spellId: spellId,
  });
  return nextCreateEventId;
};
