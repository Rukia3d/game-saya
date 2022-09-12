import * as writers from "./db/writers";
import { IArenaResult, IPlayer, IServer } from "./engine/types";

export const ARENAEVENTINTERVAL = 10000;

const basePlayer: IPlayer = {
  id: 3,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  arcanas: [],
  spells: [],
  missions: [],
  messages: [],
  currentState: { state: "MAIN" },
};
const baseServer: IServer = {
  arenaRun: { events: [], resultTime: 0, type: "run" },
  arenaFight: { events: [], resultTime: 0, type: "fight" },
  arenaRunHistory: [],
  arenaFightHistory: [],
};

export const detectWinners = (winners: IArenaResult[]) => {
  let res: { [time: number]: IArenaResult[] } = {};

  for (const winner of winners) {
    res[winner.time] = res[winner.time] || [];
    res[winner.time].push(winner);
  }

  const groups: IArenaResult[][] = [];
  const times = (Object.keys(res) as unknown as number[]).sort();
  for (const time of times) {
    groups.push(res[time]);
  }
  return groups.slice(0, 3);
};

export const startArena = () => {
  console.log("StartArena");
  const now = new Date().valueOf();
  const game = {
    player: {
      ...basePlayer,
    },
    server: { ...baseServer },
  };
  writers.serverStartArena(game, {
    startDate: now,
    endDate: now + ARENAEVENTINTERVAL,
  });
};

export const endArena = () => {
  console.log("EndArena");
  const game = {
    player: {
      ...basePlayer,
    },
    server: { ...baseServer },
  };
  writers.serverEndArena(game);
};

export const run = () => {
  console.log("Run");
  setInterval(endArena, ARENAEVENTINTERVAL);
  setInterval(startArena, ARENAEVENTINTERVAL);
};
