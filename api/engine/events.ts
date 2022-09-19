import { detectWinners } from "../cronjobs";
import { arcanas } from "../db/testDBArcanes";
import { eventTowerRewards } from "../db/testDBLevels";
import { materials } from "../db/testDBPlayer";
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
  findLastCheckpoint,
  generateArenaRandom,
} from "./helpers";

import {
  currentState,
  gameMode,
  IArena,
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
    ...game.player,
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
      return { ...m, quantity: 0 };
    }),
  };
  return {
    ...game,
    player: newPlayer,
  };
};

export const startLevel = (event: IStartLevelEvent, game: IGame): IGame => {
  let energyPrice = findEnergyPrice(event.arcanaId, "story", event.levelId);
  const firstTime =
    game.player.arcanas[event.arcanaId].stories[event.levelId].state !==
    "complete";
  if (
    event.arcanaId === 0 &&
    event.levelId < 2 &&
    game.player.arcanas &&
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
    ...game.player,
    energy: game.player.energy - energyPrice,
    currentState: state,
  };
  return { ...game, player: newPlayer };
};

export const winLevel = (event: IWinLevelEvent, game: IGame): IGame => {
  const newMaterials = rewardPlayer(
    event,
    game.player.materials,
    game.player.arcanas
  );
  // need to add experience before we open the next level
  const newExperience = addExperience(event, game.player);
  const newState = {
    state: "WINMATERIAL" as currentState,
    materials: newMaterials.new,
  };
  const newPlayer: IPlayer = {
    ...game.player,
    materials: newMaterials.all,
    arcanas: openNextLevel(event, game.player.arcanas),
    exprience: newExperience,
    // TODO Check if this is correct
    currentState: newState,
  };
  return { ...game, player: newPlayer };
};

export const startEndless = (event: IStartEndlessEvent, game: IGame): IGame => {
  let energyPrice = findEnergyPrice(event.arcanaId, event.mode);
  const state = {
    state: "PLAY" as currentState,
    level: {
      arcana: event.arcanaId,
      mode: event.mode as gameMode,
    },
  };
  const newPlayer: IPlayer = {
    ...game.player,
    energy: game.player.energy - energyPrice,
    currentState: state,
  };
  return { ...game, player: newPlayer };
};

export const passCheckpoint = (
  event: IPassCheckpointEvent,
  game: IGame
): IGame => {
  const newArcanas = JSON.parse(JSON.stringify(game.player.arcanas));
  const eventIndex = event.mode === "run" ? 0 : 1;
  const newAllowedRewards = ensure(
    eventTowerRewards.find(
      (s: IEventReward) =>
        s.id === event.checkpoint && s.arcanaId === event.arcanaId
    )
  ).reward;
  // -1 allows us to cover a spread between level start and 0 trigger
  const last = findLastCheckpoint(game.player, event.mode, event.arcanaId);
  newArcanas[event.arcanaId].currentEvents[eventIndex].checkpoint = last + 1;
  newArcanas[event.arcanaId].currentEvents[eventIndex].allowedRewards =
    newAllowedRewards;
  const newExperience = addExperience(event, game.player);
  const newPlayer: IPlayer = {
    ...game.player,
    arcanas: newArcanas,
    exprience: newExperience,
  };
  return { ...game, player: newPlayer };
};

export const missCheckpoint = (
  event: IMissCheckpointEvent,
  game: IGame
): IGame => {
  const newMaterials = rewardPlayer(
    event,
    game.player.materials,
    game.player.arcanas
  );
  const newState = {
    state: "WINMATERIAL" as currentState,
    materials: newMaterials.new,
  };
  const newPlayer: IPlayer = {
    ...game.player,
    materials: newMaterials.all,
    currentState: newState,
  };
  return { ...game, player: newPlayer };
};

export const openSpell = (event: IOpenSpellEvent, game: IGame): IGame => {
  const newPlayerSpells = JSON.parse(JSON.stringify(game.player.spells));
  const indexToChange = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) =>
      s.arcanaId === event.arcanaId && s.id === event.spellId
  );
  if (!newPlayerSpells[indexToChange].price) {
    throw new Error("Spell to open doesn't have a price");
  }
  let newMaterials = removeMaterials(
    JSON.parse(JSON.stringify(game.player.materials)),
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
    ...game.player,
    materials: newMaterials,
    spells: newPlayerSpells,
    currentState: { state: "SPELLS" },
  };
  return { ...game, player: newPlayer };
};

export const updateSpell = (event: IUpdateSpellEvent, game: IGame): IGame => {
  const newPlayerSpells = JSON.parse(JSON.stringify(game.player.spells));
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
    JSON.parse(JSON.stringify(game.player.materials)),
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
    ...game.player,
    materials: newMaterials,
    spells: newPlayerSpells,
    currentState: { state: "SPELLS" },
  };
  return { ...game, player: newPlayer };
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
        { id: 0, name: "Coin", quantity: 25 * (n + 1) },
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
        { id: 0, name: "Coin", quantity: 25 * (n + 1) },
        { ...randResource, quantity: 5 * (n + 1) },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "fight",
    };
  });

  newServer.arenaRun = {
    type: "run",
    resultTime: event.end,
    events: eventsRun,
  };
  newServer.arenaFight = {
    type: "fight",
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
  newServer.arenaRun.events.map((e: IArenaEvent) => {
    const result = detectWinners(e.results);
    //TODO Add message for players to claim achivements
  });
  return { ...game, server: newServer };
};

export const startArena = (event: IArenaStartEvent, game: IGame): IGame => {
  const newArena: IArena =
    event.mode === "run" ? game.server.arenaRun : game.server.arenaFight;
  const arenaEvent: IArenaEvent =
    event.mode === "run"
      ? game.server.arenaRun.events[event.index]
      : game.server.arenaFight.events[event.index];
  const newMaterials = removeMaterials(game.player.materials, arenaEvent.stake);
  const newArenaEvent = updateRewardPool(arenaEvent, arenaEvent.stake);
  const newState = {
    state: "ARENAPLAY" as currentState,
    arena: { mode: event.mode, index: event.index, startTime: event.created },
  };
  const newPlayer = {
    ...game.player,
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
    player: newPlayer,
    server: newServer,
  };
};

export const endArena = (event: IArenaEndEvent, game: IGame): IGame => {
  if (!game.player.currentState.arena?.startTime) {
    throw new Error("Can't end arena event withouth the starting time");
  }
  const newArena: IArena =
    event.mode === "run" ? game.server.arenaRun : game.server.arenaFight;
  const arenaEvent: IArenaEvent =
    event.mode === "run"
      ? game.server.arenaRun.events[event.index]
      : game.server.arenaFight.events[event.index];
  const resultTime = calculateResult(
    game.player.currentState.arena?.startTime,
    event.created
  );
  const newArenaEvent = updateArenaResults(arenaEvent, resultTime, game.player);
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
    ...game.player,
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
    player: newPlayer,
    server: newServer,
  };
};
