import dayjs from "dayjs";
import * as writers from "./db/writers";
import { IArenaResult, IPlayer, IServer } from "./engine/types";

export const ARENAEVENTINTERVAL = 60000000;

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
  arenaRun: { events: [], resultTime: 0, mode: "run" },
  arenaFight: { events: [], resultTime: 0, mode: "fight" },
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
  return groups;
};

export const startArena = () => {
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
  console.log("StartArena");
  console.log("startdate", dayjs(now).format("DD/MM/YYYY"));
  console.log("enddate", dayjs(now + ARENAEVENTINTERVAL).format("DD/MM/YYYY"));
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

let n = 0;
export const run = () => {
  if (n === 0) {
    startArena();
  }
  setInterval(endArena, ARENAEVENTINTERVAL);
  setInterval(startArena, ARENAEVENTINTERVAL);
  n++;
};
