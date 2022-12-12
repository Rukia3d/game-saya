import { IPlayer, IServer } from "../engine/types";

export const basePlayer: IPlayer = {
  id: 0,
  name: "BASEPLAYER",
  loungeId: null,
  materials: [],
  adventures: [],
  weapons: [],
  goals: [],
  collections: [],
  messages: [],
  currentState: { state: "MAIN" },
  claims: [],
};

export const baseServer: IServer = {
  arenaRun: { events: [], resultTime: 1654347193, mode: "run" },
  arenaFight: { events: [], resultTime: 1654347193, mode: "fight" },
  arenaRunHistory: [],
  arenaFightHistory: [],
};
