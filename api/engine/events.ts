import { detectWinners, splitPool } from "../cronjobs";
import { arcanas } from "../db/testDBArcanas";
import { eventTowerRewards } from "../db/testDBLevels";
import { basePlayer, materials } from "../db/testDBPlayer";
import { spellPrices, spells, spellUpdates } from "../db/testDBSpells";
import {
  addExperience,
  rewardPlayer,
  openNextLevel,
  removeMaterials,
  updateRewardPool,
  updateArenaResults,
} from "./actions";
import {
  calculateResult,
  ensure,
  findEnergyPrice,
  findEventArena,
  findLastCheckpoint,
  findPlayer,
  generateArenaRandom,
  replacePlayer,
  rewardArenaPlayers,
} from "./helpers";

import {
  currentState,
  gameMode,
  IArenaEndEvent,
  IArenaEvent,
  IArenaStartEvent,
  ICreatePlayerEvent,
  ICurrentState,
  IEventReward,
  IGame,
  IMaterial,
  IMissCheckpointEvent,
  IOpenSpellEvent,
  IPassCheckpointEvent,
  IPlayer,
  IServer,
  IServerArenaEndEvent,
  IServerArenaStartEvent,
  ISpell,
  ISpellClosed,
  ISpellOpen,
  ISpellPrice,
  ISpellUpdate,
  IStartEndlessEvent,
  IStartLevelEvent,
  IUpdateSpellEvent,
  IWinLevelEvent,
} from "./types";

export const createPlayer = (event: ICreatePlayerEvent, game: IGame): IGame => {
  const newPlayer: IPlayer = {
    ...basePlayer,
    id: event.playerId,
    name: event.playerName,
    maxEnergy: 50,
    energy: 50,
    spells: spells.map((s: ISpell) => {
      const price = spellPrices.find((p: ISpellPrice) => p.spellId === s.id);
      if (!price) throw new Error("Can't find a price for a spell");
      return { ...s, price: price.price };
    }),
    arcanas: [JSON.parse(JSON.stringify(arcanas[0]))],
    materials: JSON.parse(JSON.stringify(materials)).map((m: IMaterial) => {
      return { ...m, quantity: 50 };
    }),
  };
  const newPlayers = game.players.concat([newPlayer]);
  return {
    ...game,
    players: newPlayers,
  };
};

export const startLevel = (event: IStartLevelEvent, game: IGame): IGame => {
  const player = findPlayer(game, event.playerId);
  let energyPrice = findEnergyPrice(event.arcanaId, "story", event.levelId);
  const firstTime =
    player.arcanas[event.arcanaId].stories[event.levelId].state !== "complete";
  if (
    event.arcanaId === 0 &&
    event.levelId < 2 &&
    player.arcanas &&
    firstTime
  ) {
    energyPrice = 0;
  }
  const state = {
    state: "PLAY" as currentState,
    level: {
      arcana: event.arcanaId,
      mode: "story" as gameMode,
      level: event.levelId,
    },
  };
  const newPlayer: IPlayer = {
    ...player,
    energy: player.energy - energyPrice,
    currentState: state,
  };
  return { ...game, players: replacePlayer(game.players, newPlayer) };
};

export const winLevel = (event: IWinLevelEvent, game: IGame): IGame => {
  const player = findPlayer(game, event.playerId);
  const newMaterials = rewardPlayer(event, player.materials, player.arcanas);
  // need to add experience before we open the next level
  const newExperience = addExperience(event, player);
  const newState = {
    state: "WINMATERIAL" as currentState,
    materials: newMaterials.new,
  };
  const newPlayer: IPlayer = {
    ...player,
    materials: newMaterials.all,
    arcanas: openNextLevel(event, player.arcanas),
    exprience: newExperience,
    // TODO Check if this is correct
    currentState: newState,
  };
  return { ...game, players: replacePlayer(game.players, newPlayer) };
};

export const startEndless = (event: IStartEndlessEvent, game: IGame): IGame => {
  const player = findPlayer(game, event.playerId);
  let energyPrice = findEnergyPrice(event.arcanaId, event.mode);
  const state = {
    state: "PLAY" as currentState,
    level: {
      arcana: event.arcanaId,
      mode: event.mode as gameMode,
    },
  };
  const newPlayer: IPlayer = {
    ...player,
    energy: player.energy - energyPrice,
    currentState: state,
  };
  return { ...game, players: replacePlayer(game.players, newPlayer) };
};

export const passCheckpoint = (
  event: IPassCheckpointEvent,
  game: IGame
): IGame => {
  const player = findPlayer(game, event.playerId);
  const newArcanas = JSON.parse(JSON.stringify(player.arcanas));
  const eventIndex = event.mode === "run" ? 0 : 1;
  const newAllowedRewards = ensure(
    eventTowerRewards.find(
      (s: IEventReward) =>
        s.id === event.checkpoint && s.arcanaId === event.arcanaId
    )
  ).reward;
  // -1 allows us to cover a spread between level start and 0 trigger
  const last = findLastCheckpoint(player, event.mode, event.arcanaId);
  newArcanas[event.arcanaId].currentEvents[eventIndex].checkpoint = last + 1;
  newArcanas[event.arcanaId].currentEvents[eventIndex].allowedRewards =
    newAllowedRewards;
  const newExperience = addExperience(event, player);
  const newPlayer: IPlayer = {
    ...player,
    arcanas: newArcanas,
    exprience: newExperience,
  };
  return { ...game, players: replacePlayer(game.players, newPlayer) };
};

export const missCheckpoint = (
  event: IMissCheckpointEvent,
  game: IGame
): IGame => {
  const player = findPlayer(game, event.playerId);
  const newMaterials = rewardPlayer(event, player.materials, player.arcanas);
  const newState = {
    state: "WINMATERIAL" as currentState,
    materials: newMaterials.new,
  };
  const newPlayer: IPlayer = {
    ...player,
    materials: newMaterials.all,
    currentState: newState,
  };
  return { ...game, players: replacePlayer(game.players, newPlayer) };
};

export const openSpell = (event: IOpenSpellEvent, game: IGame): IGame => {
  const player = findPlayer(game, event.playerId);
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.arcanaId === event.arcanaId && s.id === event.spellId
  );
  if (!newPlayerSpells[indexToChange].price) {
    throw new Error("Spell to open doesn't have a price");
  }
  let newMaterials = removeMaterials(
    JSON.parse(JSON.stringify(player.materials)),
    newPlayerSpells[indexToChange].price
  );

  // Open spell should have an update
  let nextUpdate = spellUpdates.find(
    (u: ISpellUpdate) =>
      u.spellId === newPlayerSpells[indexToChange].id &&
      u.requiredStrength === newPlayerSpells[indexToChange].strength
  );

  if (nextUpdate) {
    newPlayerSpells[indexToChange] = {
      id: newPlayerSpells[indexToChange].id,
      arcanaId: newPlayerSpells[indexToChange].arcanaId,
      enemy: newPlayerSpells[indexToChange].enemy,
      strength: newPlayerSpells[indexToChange].strength,
      symbol: newPlayerSpells[indexToChange].symbol,
      state: "open",
      name: newPlayerSpells[indexToChange].name,
      updatePrice: nextUpdate.updatePrice,
      requiredStrength: nextUpdate.requiredStrength,
    };
  } else {
    console.warn(`Spell number${indexToChange} doesn't have updates in DB`);
  }
  const newPlayer: IPlayer = {
    ...player,
    materials: newMaterials,
    spells: newPlayerSpells,
    currentState: { state: "SPELLS" },
  };
  return { ...game, players: replacePlayer(game.players, newPlayer) };
};

export const updateSpell = (event: IUpdateSpellEvent, game: IGame): IGame => {
  const player = findPlayer(game, event.playerId);
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.arcanaId === event.arcanaId && s.id === event.spellId
  );
  if (!newPlayerSpells[indexToChange].updatePrice) {
    throw new Error("Spell to open doesn't have a price");
  }
  if (!newPlayerSpells[indexToChange].requiredStrength) {
    throw new Error("Spell to open doesn't have a required strength");
  }
  let newMaterials = removeMaterials(
    JSON.parse(JSON.stringify(player.materials)),
    newPlayerSpells[indexToChange].updatePrice
  );

  let nextUpdate = spellUpdates.find(
    (u: ISpellUpdate) =>
      u.spellId === newPlayerSpells[indexToChange].id &&
      u.requiredStrength === newPlayerSpells[indexToChange].strength + 1
  );

  if (nextUpdate) {
    newPlayerSpells[indexToChange] = {
      ...newPlayerSpells[indexToChange],
      strength: newPlayerSpells[indexToChange].strength + 1,
      updatePrice: nextUpdate.updatePrice,
      requiredStrength: nextUpdate.requiredStrength,
    };
  } else {
    console.warn(`Spell number${indexToChange} doesn't have updates in DB`);
  }
  const newPlayer: IPlayer = {
    ...player,
    materials: newMaterials,
    spells: newPlayerSpells,
    currentState: { state: "SPELLS" },
  };
  return { ...game, players: replacePlayer(game.players, newPlayer) };
};

export const serverArenaStart = (
  event: IServerArenaStartEvent,
  game: IGame
): IGame => {
  const newServer: IServer = JSON.parse(JSON.stringify(game.server));
  newServer.arenaFightHistory.push(game.server.arenaFight);
  newServer.arenaRunHistory.push(game.server.arenaRun);
  const eventsRun: IArenaEvent[] = [0, 1, 2].map((n: number) => {
    const reward = generateArenaRandom(event, "run", 4, n);
    const randResource = materials[reward + 3];
    return {
      index: n,
      stake: [
        { id: 0, name: "money", quantity: 25 * (n + 1) },
        { ...randResource, quantity: 5 * (n + 1) },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    };
  });
  const eventsFight: IArenaEvent[] = [0, 1, 2].map((n: number) => {
    const reward = generateArenaRandom(event, "fight", 4, n);
    const randResource = materials[reward + 3];
    return {
      index: n,
      stake: [
        { id: 0, name: "money", quantity: 25 * (n + 1) },
        { ...randResource, quantity: 5 * (n + 1) },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "fight",
    };
  });

  newServer.arenaRun = {
    mode: "run",
    resultTime: event.end,
    events: eventsRun,
  };
  newServer.arenaFight = {
    mode: "fight",
    resultTime: event.end,
    events: eventsFight,
  };
  return { ...game, server: newServer };
};

export const serverArenaEnd = (
  event: IServerArenaEndEvent,
  game: IGame
): IGame => {
  const newServer: IServer = JSON.parse(JSON.stringify(game.server));
  let newPlayers: IPlayer[] = JSON.parse(JSON.stringify(game.players));
  newServer.arenaRun.events.map((e: IArenaEvent) => {
    const result = detectWinners(e.results);
    const reward = splitPool(result, e.rewardPool);
    newPlayers = rewardArenaPlayers(game, result, reward);
  });
  return { players: newPlayers, server: newServer };
};

export const startArena = (event: IArenaStartEvent, game: IGame): IGame => {
  const player = findPlayer(game, event.playerId);
  const [newArena, arenaEvent] = findEventArena(game, event.mode, event.index);
  const newMaterials = removeMaterials(player.materials, arenaEvent.stake);
  const newArenaEvent = updateRewardPool(arenaEvent, arenaEvent.stake);
  const newState = {
    state: "ARENAPLAY" as currentState,
    arena: { mode: event.mode, index: event.index, startTime: event.created },
  };
  const newPlayer = {
    ...player,
    materials: newMaterials,
    currentState: newState,
  };
  newArena.events[event.index] = newArenaEvent;
  const newServer: IServer = {
    arenaFight: event.mode === "fight" ? newArena : game.server.arenaFight,
    arenaRun: event.mode === "run" ? newArena : game.server.arenaRun,
    arenaFightHistory: game.server.arenaFightHistory,
    arenaRunHistory: game.server.arenaRunHistory,
  };
  return {
    players: replacePlayer(game.players, newPlayer),
    server: newServer,
  };
};

export const endArena = (event: IArenaEndEvent, game: IGame): IGame => {
  const player = findPlayer(game, event.playerId);
  if (!player.currentState.arena?.startTime) {
    throw new Error("Can't end arena event withouth the starting time");
  }
  const [newArena, arenaEvent] = findEventArena(game, event.mode, event.index);
  const resultTime = calculateResult(
    player.currentState.arena?.startTime,
    event.created
  );
  const newArenaEvent = updateArenaResults(arenaEvent, resultTime, player);
  const newState: ICurrentState = {
    state: "ARENAEND" as currentState,
    arena: undefined,
    arenaResult: {
      results: newArenaEvent.results,
      result: resultTime,
    },
  };
  newArena.events[event.index] = newArenaEvent;
  const newPlayer = {
    ...player,
    currentState: newState,
  };
  newArena.events[event.index] = newArenaEvent;
  const newServer: IServer = {
    arenaFight: event.mode === "fight" ? newArena : game.server.arenaFight,
    arenaRun: event.mode === "run" ? newArena : game.server.arenaRun,
    arenaFightHistory: game.server.arenaFightHistory,
    arenaRunHistory: game.server.arenaRunHistory,
  };
  return {
    players: replacePlayer(game.players, newPlayer),
    server: newServer,
  };
};
