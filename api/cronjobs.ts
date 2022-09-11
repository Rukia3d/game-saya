import * as writers from "./db/writers";
import { IArenaResult } from "./engine/types";

export const ARENAEVENTINTERVAL = 10000;

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
  writers.serverStartArena();
};

export const endArena = () => {
  console.log("EndArena");
};

export const run = () => {
  console.log("Run");
  setInterval(startArena, ARENAEVENTINTERVAL);
  setInterval(endArena, ARENAEVENTINTERVAL);
};
