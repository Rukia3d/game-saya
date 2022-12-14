import dayjs from "dayjs";
import { Database } from "sqlite";
import * as writers from "./engine/writers";
import {
  IArenaResult,
  IArenaResultPool,
  IInventoryQuant,
} from "./engine/types";

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

export const getRewardPerPlace = (
  percent: number,
  pool: IInventoryQuant[],
  split: number
) => {
  const res: IInventoryQuant[] = [];

  for (let i = 0; i < pool.length; i++) {
    res.push({
      ...pool[i],
      quantity: Math.floor((pool[i].quantity * percent) / split),
    });
  }
  return res;
};

export const splitPool = (
  groups: IArenaResult[][],
  pool: IInventoryQuant[]
): IArenaResultPool[] => {
  let reward: IArenaResultPool[] = [];
  const upTo = pool.length > 3 ? 3 : pool.length;
  for (let i = 0; i < upTo; i++) {
    const results = groups[i] || [];
    const n = results.length;
    let percent = 0.2;
    if (i === 0) percent = 0.5;
    if (i === 1) percent = 0.3;
    reward.push({
      place: i + 1,
      reward: getRewardPerPlace(percent, pool, n),
    });
  }
  return reward;
};

export const startArena = (db: Database) => {
  const now = new Date().valueOf();
  writers.serverStartArena(db, {
    startDate: now,
    created: now,
    endDate: now + ARENAEVENTINTERVAL,
  });
  console.log("StartArena");
  console.log("startdate", dayjs(now).format("DD/MM/YYYY"));
  console.log("enddate", dayjs(now + ARENAEVENTINTERVAL).format("DD/MM/YYYY"));
};

export const endArena = (db: Database) => {
  console.log("EndArena");
  const now = new Date().valueOf();
  writers.serverEndArena(db, now);
};

let n = 0;
export const run = async (db: Database) => {
  if (n === 0) {
    await startArena(db);
  }
  setInterval(async () => await endArena(db), ARENAEVENTINTERVAL);
  setInterval(async () => await startArena(db), ARENAEVENTINTERVAL);
  n++;
};
