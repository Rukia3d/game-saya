import dayjs from "dayjs";
import { basePlayer, baseServer } from "./db/testDBPlayer";
import * as writers from "./db/writers";
import { IArenaResult } from "./engine/types";

export const ARENAEVENTINTERVAL = 60000000;

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
    players: [
      {
        ...basePlayer,
      },
    ],
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
    players: [
      {
        ...basePlayer,
      },
    ],
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
