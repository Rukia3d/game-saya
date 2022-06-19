import { IEventReward } from "../engine/types";

// { id: 0, name: "Coin" },
// { id: 1, name: "Black Soul Stone" },
// { id: 2, name: "White Soul Stone" },
// { id: 3, name: "Air essence" },
// { id: 4, name: "Fire essence" },
// { id: 5, name: "Metal essence" },
// { id: 6, name: "Stone essence" },
// { id: 7, name: "Water essence" },

export const eventTowerRewards: IEventReward[] = [
  {
    id: 0,
    elementId: 0,
    reward: [
      { id: 0, name: "Coin", quantity: 5 },
      { id: 3, name: "Air essence", quantity: 1 },
    ],
  },
  {
    id: 1,
    elementId: 0,
    reward: [
      { id: 0, name: "Coin", quantity: 10 },
      { id: 3, name: "Air essence", quantity: 5 },
    ],
  },
  {
    id: 2,
    elementId: 0,
    reward: [
      { id: 0, name: "Coin", quantity: 15 },
      { id: 3, name: "Air essence", quantity: 10 },
      { id: 2, name: "White Soul Stone", quantity: 1 },
    ],
  },
  {
    id: 3,
    elementId: 0,
    reward: [
      { id: 0, name: "Coin", quantity: 20 },
      { id: 3, name: "Air essence", quantity: 10 },
      { id: 2, name: "White Soul Stone", quantity: 1 },
    ],
  },
  {
    id: 4,
    elementId: 0,
    reward: [
      { id: 0, name: "Coin", quantity: 25 },
      { id: 3, name: "Air essence", quantity: 10 },
      { id: 2, name: "White Soul Stone", quantity: 3 },
    ],
  },
];

const eventTournamentRewards: IEventReward[] = [];
