import { IPlayer, IServer } from "../engine/types";

export const basePlayer: IPlayer = {
  id: 0,
  name: "BASEPLAYER",
  loungeId: null,
  maxEnergy: 100,
  materials: [],
  adventures: [],
  weapons: [],
  goals: [],
  collections: [],
  messages: [],
  currentState: { state: "MAIN" },
  claims: [],
  lastActive: new Date().valueOf(),
};

export const baseServer: IServer = {
  arenaRun: { events: [], resultTime: 1654347193, mode: "run" },
  arenaFight: { events: [], resultTime: 1654347193, mode: "fight" },
  arenaRunHistory: [],
  arenaFightHistory: [],
  nextLiveDistribution: (Date.now() + 5000).valueOf(),
};
