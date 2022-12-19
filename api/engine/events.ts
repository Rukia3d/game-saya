import { Console } from "console";
import { Database } from "sqlite";
import { detectWinners, splitPool } from "../cronjobs";
import { basePlayer } from "../storage/testDB";
import { testLevel } from "../storage/testDBLevelMaps";
import {
  claimPlayerReward,
  completeClaim,
  openNextLevel,
  removeMaterials,
  rewardPlayer,
  updateArenaResults,
  updateRewardPool,
} from "./actions";
import {
  readAdventuresData,
  readWeaponsData,
  readMaterialsData,
} from "./combiners";
import {
  calculateResult,
  energyPriceForStory,
  findEventArena,
  findPlayer,
  generateArenaRandom,
  generateStake,
  replacePlayer,
  rewardArenaPlayers,
  updatePlayerEnergy,
} from "./helpers";
import {
  currentState,
  IAdventure,
  IArenaEndEvent,
  IArenaEvent,
  IArenaStartEvent,
  IClaimRewardEvent,
  ICreatePlayerEvent,
  ICurrentState,
  IGame,
  IInventoryQuant,
  IPlayer,
  IServer,
  IServerArenaEndEvent,
  IServerArenaStartEvent,
  IStartLevelEvent,
  IWeapon,
  IWinLevelEvent,
} from "./types";

export const createPlayer = async (
  db: Database,
  event: ICreatePlayerEvent,
  game: IGame
): Promise<IGame> => {
  const allAdventures: IAdventure[] = await readAdventuresData(db);
  allAdventures[0].stories[0].chapters[0].state = "open";
  const allWeapons: IWeapon[] = await readWeaponsData(db);
  allWeapons[0].materials[0].state = "open";
  let allMaterials = await readMaterialsData(db);
  allMaterials = allMaterials.map((m: IInventoryQuant) => {
    return { ...m, quantity: 50 };
  });
  const newPlayer: IPlayer = {
    ...basePlayer,
    id: event.playerId,
    name: event.playerName,
    materials: allMaterials,
    weapons: allWeapons,
    adventures: allAdventures,
  };
  const newPlayers = game.players.concat([newPlayer]);
  return {
    ...game,
    players: newPlayers,
  };
};

export const serverArenaStart = async (
  db: Database,
  event: IServerArenaStartEvent,
  game: IGame
): Promise<IGame> => {
  const newServer: IServer = JSON.parse(JSON.stringify(game.server));
  newServer.arenaFightHistory.push(game.server.arenaFight);
  newServer.arenaRunHistory.push(game.server.arenaRun);
  const allMaterials = await readMaterialsData(db);
  const eventsRun: IArenaEvent[] = [0, 1, 2].map((n: number) => {
    const reward = generateArenaRandom(event, "run", allMaterials.length, n);
    const randResource = allMaterials[reward];
    const stake = generateStake(n, randResource);
    return {
      index: n,
      stake: stake,
      level: testLevel,
      rewardPool: [],
      results: [],
      mode: "run",
    };
  });
  const eventsFight: IArenaEvent[] = [0, 1, 2].map((n: number) => {
    const reward = generateArenaRandom(event, "fight", allMaterials.length, n);
    const randResource = allMaterials[reward];
    const stake = generateStake(n, randResource);
    return {
      index: n,
      stake: stake,
      level: testLevel,
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

export const serverArenaEnd = async (
  db: Database,
  event: IServerArenaEndEvent,
  game: IGame
): Promise<IGame> => {
  const newServer: IServer = JSON.parse(JSON.stringify(game.server));
  let newPlayers: IPlayer[] = JSON.parse(JSON.stringify(game.players));
  newServer.arenaRun.events.map((e: IArenaEvent) => {
    if (e.results.length > 0) {
      const result = detectWinners(e.results);
      const reward = splitPool(result, e.rewardPool);
      newPlayers = rewardArenaPlayers(game, result, reward);
    }
  });
  return { players: newPlayers, server: newServer };
};

export const startLevel = async (
  db: Database,
  event: IStartLevelEvent,
  game: IGame
): Promise<IGame> => {
  const adventures = await readAdventuresData(db);
  const player = findPlayer(game, event.playerId);
  const energyPrice = energyPriceForStory(
    player,
    adventures,
    event.adventureId,
    event.storyId,
    event.chapterId
  );
  const state: ICurrentState = {
    state: "PLAY" as currentState,
    story: {
      chapterId: event.chapterId,
      adventureId: event.adventureId,
      storyId: event.storyId,
    },
  };
  const newPlayer: IPlayer = {
    ...updatePlayerEnergy(player, energyPrice),
    currentState: state,
  };
  const newPlayers = replacePlayer(game.players, newPlayer);
  return { ...game, players: newPlayers };
};

export const winLevel = async (
  db: Database,
  event: IWinLevelEvent,
  game: IGame
): Promise<IGame> => {
  const player = findPlayer(game, event.playerId);
  const newMaterials = rewardPlayer(event, player);
  const newState = {
    state: "WINMATERIAL" as currentState,
    materials: newMaterials.new,
  };
  const newPlayer: IPlayer = {
    ...player,
    materials: newMaterials.all,
    adventures: openNextLevel(event, player.adventures),
    // TODO Check if this is correct
    currentState: newState,
  };
  return { ...game, players: replacePlayer(game.players, newPlayer) };
};

export const claimReward = async (
  db: Database,
  event: IClaimRewardEvent,
  game: IGame
): Promise<IGame> => {
  const player = findPlayer(game, event.playerId);
  const newMaterials = claimPlayerReward(event, player);
  const newClaims = completeClaim(event, player);
  const newState = {
    state: "WINMATERIAL" as currentState,
    materials: newMaterials.new,
  };
  const newPlayer: IPlayer = {
    ...player,
    materials: newMaterials.all,
    currentState: newState,
    claims: newClaims,
  };
  return { ...game, players: replacePlayer(game.players, newPlayer) };
};

export const startArena = (
  db: Database,
  event: IArenaStartEvent,
  game: IGame
): IGame => {
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

export const endArena = (
  db: Database,
  event: IArenaEndEvent,
  game: IGame
): IGame => {
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

/*
export const startEndless = (event: IStartEndlessEvent, game: IGame): IGame => {
  const player = findPlayer(game, event.playerId);
  let energyPrice = findEnergyPrice(event.elementId, event.mode);
  const state = {
    state: "PLAY" as currentState,
    level: {
      arcana: event.elementId,
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
        s.id === event.checkpoint && s.elementId === event.elementId
    )
  ).reward;
  // -1 allows us to cover a spread between level start and 0 trigger
  const last = findLastCheckpoint(player, event.mode, event.elementId);
  newArcanas[event.elementId].currentEvents[eventIndex].checkpoint = last + 1;
  newArcanas[event.elementId].currentEvents[eventIndex].allowedRewards =
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
      s.elementId === event.elementId && s.id === event.spellId
  );
  if (!("price" in newPlayerSpells[indexToChange])) {
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
      elementId: newPlayerSpells[indexToChange].elementId,
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
      s.elementId === event.elementId && s.id === event.spellId
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

export const listSpell = (event: IListSpellEvent, game: IGame): IGame => {
  const player = findPlayer(game, event.playerId);
  const server = JSON.parse(JSON.stringify(game.server));
  const newPlayerSpells = JSON.parse(JSON.stringify(player.spells));
  const indexToRemove = newPlayerSpells.findIndex(
    (s: ISpellOpen | ISpellClosed | ISpell) => s.id === event.spellId
  );
  const seed = seedrandom(
    (event.eventId + event.created + event.playerId + event.spellId).toString()
  );
  const newListing: ISpellListing = {
    spell: newPlayerSpells[indexToRemove],
    price: event.price,
    currency: event.currency,
    owner: event.playerId,
    listingId: Math.round(seed()),
  };
  newPlayerSpells.splice(indexToRemove, 1);
  const newPlayer: IPlayer = {
    ...player,
    spells: newPlayerSpells,
    currentState: { state: "SPELLS" },
  };

  const newServer = {
    ...server,
    listings: server.listings.concat([newListing]),
  };
  return { server: newServer, players: replacePlayer(game.players, newPlayer) };
};

export const delistSpell = (event: IDelistSpellEvent, game: IGame): IGame => {
  const player: IPlayer = findPlayer(game, event.playerId);
  const server: IServer = JSON.parse(JSON.stringify(game.server));
  const indexToRemove = server.listings.findIndex(
    (s: ISpellListing) =>
      s.listingId === event.listingId && s.owner === event.playerId
  );
  const [newPlayerSpells, newListings] = listingToPlayer(
    player.spells,
    game.server.listings,
    indexToRemove
  );
  const newPlayer: IPlayer = {
    ...player,
    spells: newPlayerSpells,
    currentState: { state: "SPELLS" },
  };
  const newServer = {
    ...server,
    listings: newListings,
  };
  return { server: newServer, players: replacePlayer(game.players, newPlayer) };
};

export const buySpell = (event: IBuySpellEvent, game: IGame): IGame => {
  const player: IPlayer = findPlayer(game, event.playerId);
  const server: IServer = JSON.parse(JSON.stringify(game.server));
  const indexToRemove = server.listings.findIndex(
    (s: ISpellListing) => s.listingId === event.listingId
  );
  const [newPlayerSpells, newListings] = listingToPlayer(
    player.spells,
    game.server.listings,
    indexToRemove
  );
  const newPlayer: IPlayer = {
    ...player,
    spells: newPlayerSpells,
    currentState: { state: "SPELLS" },
  };
  const newServer = {
    ...server,
    listings: newListings,
  };
  return { server: newServer, players: replacePlayer(game.players, newPlayer) };
};

*/
