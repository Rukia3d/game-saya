import { IEventReward, IStoryReward } from "../engine/types";

// { id: 0, name: "Coin" },
// { id: 1, name: "Black Soul Stone" },
// { id: 2, name: "White Soul Stone" },
// { id: 3, name: "Rings" },
// { id: 4, name: "Wands" },
// { id: 5, name: "Swords" },
// { id: 6, name: "Cups" },
// { id: 7, name: "Dimonds" },

export const storyRewards: IStoryReward[] = [
  {
    id: 0,
    arcanaId: 0,
    storyId: 0,
    reward: [
      { id: 0, upTo: 10 },
      { id: 3, upTo: 3 },
    ],
  },
  {
    id: 0,
    arcanaId: 0,
    storyId: 1,
    reward: [
      { id: 0, upTo: 50 },
      { id: 3, upTo: 3 },
      { id: 4, upTo: 3 },
    ],
  },
  {
    id: 0,
    arcanaId: 0,
    storyId: 2,
    reward: [
      { id: 0, upTo: 50 },
      { id: 3, upTo: 3 },
      { id: 4, upTo: 3 },
    ],
  },
];
export const eventTowerRewards: IEventReward[] = [
  {
    id: 0,
    arcanaId: 0,
    reward: [
      { id: 0, upTo: 5 },
      { id: 3, upTo: 1 },
    ],
  },
  {
    id: 1,
    arcanaId: 0,
    reward: [
      { id: 0, upTo: 10 },
      { id: 3, upTo: 5 },
    ],
  },
  {
    id: 2,
    arcanaId: 0,
    reward: [
      { id: 0, upTo: 15 },
      { id: 3, upTo: 10 },
      { id: 2, upTo: 1 },
    ],
  },
  {
    id: 3,
    arcanaId: 0,
    reward: [
      { id: 0, upTo: 20 },
      { id: 3, upTo: 10 },
      { id: 2, upTo: 1 },
    ],
  },
  {
    id: 4,
    arcanaId: 0,
    reward: [
      { id: 0, upTo: 25 },
      { id: 3, upTo: 10 },
      { id: 2, upTo: 3 },
    ],
  },
];

const eventTournamentRewards: IEventReward[] = [];
