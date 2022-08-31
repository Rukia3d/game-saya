import { arenaRun, arenaFight } from "./db/testDBArena";
import { IArenaEvent, IArenaResult } from "./engine/types";

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

export const endArenaRun = () => {
  // 50
  // 35
  // 15
  arenaRun.events.forEach((e: IArenaEvent) => {
    const rewards = e.rewardPool;
    const winners = detectWinners(e.results);
  });

  //engine.processEvent(player, event);
};
