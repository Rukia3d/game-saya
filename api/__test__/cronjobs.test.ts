import { detectWinners } from "../cronjobs";
import { IArenaResult } from "../engine/types";

test("detectWinners works correctly with simple array", async () => {
  const winners: IArenaResult[] = [
    { playerName: "Winner 1", playerId: 1, time: 15151515 },
    { playerName: "Winner 2", playerId: 2, time: 17171717 },
    { playerName: "Winner 3", playerId: 3, time: 19191919 },
    { playerName: "Winner 4", playerId: 4, time: 20000000 },
  ];
  const res = detectWinners(winners);
  expect(res.length).toEqual(4);
  expect(res[0][0].playerName).toEqual(winners[0].playerName);
  expect(res[0][0].time).toEqual(winners[0].time);
  expect(res[1][0].playerName).toEqual(winners[1].playerName);
  expect(res[1][0].time).toEqual(winners[1].time);
  expect(res[2][0].playerName).toEqual(winners[2].playerName);
  expect(res[2][0].time).toEqual(winners[2].time);
});

test("detectWinners works correctly with doubles", async () => {
  const winners: IArenaResult[] = [
    { playerName: "Winner 1", playerId: 1, time: 15151515 },
    { playerName: "Winner 2", playerId: 2, time: 17171717 },
    { playerName: "Winner 3", playerId: 3, time: 17171717 },
    { playerName: "Winner 4", playerId: 4, time: 19191919 },
    { playerName: "Winner 5", playerId: 5, time: 20000000 },
  ];
  const res = detectWinners(winners);
  expect(res.length).toEqual(4);
  expect(res[0][0].playerName).toEqual(winners[0].playerName);
  expect(res[0][0].time).toEqual(winners[0].time);
  expect(res[1][0].playerName).toEqual(winners[1].playerName);
  expect(res[1][0].time).toEqual(winners[1].time);
  expect(res[1][1].playerName).toEqual(winners[2].playerName);
  expect(res[1][1].time).toEqual(winners[2].time);
  expect(res[2][0].playerName).toEqual(winners[3].playerName);
  expect(res[2][0].time).toEqual(winners[3].time);
});
