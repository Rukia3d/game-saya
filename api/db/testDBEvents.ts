import { IServerEvent } from "../engine/types";

export const allGEvents: IServerEvent[] = [
  {
    id: 0,
    eventId: 0,
    type: "CREATEARENARUN",
    created: 1661426668,
  },
];

/*
resultTime: new Date(new Date().valueOf() + 4 * 60 * 60 * 1000).valueOf(),
  type: "fight",
  events: [
    {
      index: 0,
      stake: [
        { id: 0, name: "Coin", quantity: 25 },
        { id: 3, name: "Rings", quantity: 5 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 1,
      stake: [
        { id: 0, name: "Coin", quantity: 50 },
        { id: 3, name: "Rings", quantity: 15 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 2,
      stake: [
        { id: 0, name: "Coin", quantity: 100 },
        { id: 3, name: "Rings", quantity: 25 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
    */
export const createArenaRunEvents = [
  {
    eventId: 0,
    resultTime: new Date(new Date().valueOf() + 4 * 60 * 60 * 1000).valueOf(),
    type: "run",
    events: [0, 1, 2].map((n: number) => {
      return {
        index: n,
        level: "some",
        mode: "run",
        rewardPool: [],
        results: [],
        stake: [0, 3].map((j: number) => {
          return {
            id: j,
            name: j === 0 ? "Coin" : "Rings",
            quantity: j === 0 ? 10 * n * j : 10 * j,
          };
        }),
      };
    }),
  },
];
