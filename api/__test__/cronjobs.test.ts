import { detectWinners, splitPool } from "../cronjobs";
import { IArenaResult, IMaterialQuant } from "../engine/types";

test("detectWinners works correctly with simple array", () => {
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

test("detectWinners works correctly with doubles", () => {
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

test("splitPool works correctly with a simple array", () => {
  const winners: IArenaResult[][] = [
    [{ playerName: "Winner 1", playerId: 1, time: 15151515 }],
    [{ playerName: "Winner 2", playerId: 2, time: 17171717 }],
    [{ playerName: "Winner 3", playerId: 3, time: 19191919 }],
    [{ playerName: "Winner 4", playerId: 4, time: 20000000 }],
  ];
  const rewards: IMaterialQuant[] = [
    { id: 0, name: "money", quantity: 100 },
    { id: 3, name: "resource1", quantity: 25 },
    { id: 5, name: "resource3", quantity: 7 },
  ];
  const res = splitPool(winners, rewards);
  expect(res[0].place).toEqual(1);
  expect(res[0].reward.length).toEqual(3);
  expect(res[0].reward[0].name).toEqual("money");
  expect(res[0].reward[0].quantity).toEqual(50);
  expect(res[0].reward[1].quantity).toEqual(12);
  expect(res[0].reward[2].quantity).toEqual(3);
  expect(res[1].reward[0].quantity).toEqual(30);
  expect(res[1].reward[1].quantity).toEqual(7);
  expect(res[1].reward[2].quantity).toEqual(2);
  expect(res[2].reward[0].quantity).toEqual(20);
  expect(res[2].reward[1].quantity).toEqual(5);
  expect(res[2].reward[2].quantity).toEqual(1);
});

test("splitPool works correctly with a double winner", () => {
  const winners: IArenaResult[][] = [
    [{ playerName: "Winner 1", playerId: 1, time: 15151515 }],
    [
      { playerName: "Winner 2", playerId: 2, time: 17171717 },
      { playerName: "Winner 3", playerId: 3, time: 17171717 },
    ],
    [{ playerName: "Winner 4", playerId: 4, time: 19191919 }],
    [{ playerName: "Winner 5", playerId: 5, time: 20000000 }],
  ];
  const rewards: IMaterialQuant[] = [
    { id: 0, name: "money", quantity: 100 },
    { id: 3, name: "resource1", quantity: 25 },
    { id: 5, name: "resource3", quantity: 7 },
  ];
  const res = splitPool(winners, rewards);
  expect(res[0].place).toEqual(1);
  expect(res[0].reward.length).toEqual(3);
  expect(res[0].reward[0].name).toEqual("money");
  expect(res[0].reward[0].quantity).toEqual(50);
  expect(res[0].reward[1].quantity).toEqual(12);
  expect(res[0].reward[2].quantity).toEqual(3);
  expect(res[1].reward[0].quantity).toEqual(15);
  expect(res[1].reward[1].quantity).toEqual(3);
  expect(res[1].reward[2].quantity).toEqual(1);
  expect(res[2].reward[0].quantity).toEqual(20);
  expect(res[2].reward[1].quantity).toEqual(5);
  expect(res[2].reward[2].quantity).toEqual(1);
});
