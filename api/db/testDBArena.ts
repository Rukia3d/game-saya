import { IArena, IServer } from "../engine/types";
export const arenaRun: IArena = {
  resultTime: new Date(new Date().valueOf() + 50 * 1000).valueOf(),
  mode: "run",
  events: [
    {
      index: 0,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 25 },
        { id: 3, name: "Jade", element: "jade", quantity: 5 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 1,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 50 },
        { id: 3, name: "Jade", element: "jade", quantity: 15 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 2,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 100 },
        { id: 3, name: "Jade", element: "jade", quantity: 20 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
  ],
};

export const arenaFight: IArena = {
  resultTime: new Date(new Date().valueOf() + 4 * 60 * 60 * 1000).valueOf(),
  mode: "fight",
  events: [
    {
      index: 0,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 25 },
        { id: 3, name: "Jade", element: "jade", quantity: 5 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 1,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 50 },
        { id: 3, name: "Jade", element: "jade", quantity: 15 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 2,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 100 },
        { id: 3, name: "Jade", element: "jade", quantity: 20 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
  ],
};

export const serverGames: IServer = {
  arenaRun: arenaRun,
  arenaFight: arenaFight,
  arenaRunHistory: [],
  arenaFightHistory: [],
};
