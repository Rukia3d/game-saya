import { IEventReward, IStoryReward } from "../engine/types";

export const storyRewards: IStoryReward[] = [
  {
    id: 0,
    elementId: 0,
    storyId: 0,
    reward: [
      { id: 0, upTo: 10 },
      { id: 3, upTo: 3 },
    ],
  },
  {
    id: 0,
    elementId: 0,
    storyId: 1,
    reward: [
      { id: 0, upTo: 50 },
      { id: 3, upTo: 3 },
      { id: 4, upTo: 3 },
    ],
  },
  {
    id: 0,
    elementId: 0,
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
    elementId: 0,
    reward: [
      { id: 0, upTo: 5 },
      { id: 3, upTo: 1 },
    ],
  },
  {
    id: 1,
    elementId: 0,
    reward: [
      { id: 0, upTo: 10 },
      { id: 3, upTo: 5 },
    ],
  },
  {
    id: 2,
    elementId: 0,
    reward: [
      { id: 0, upTo: 15 },
      { id: 3, upTo: 10 },
      { id: 2, upTo: 1 },
    ],
  },
  {
    id: 3,
    elementId: 0,
    reward: [
      { id: 0, upTo: 20 },
      { id: 3, upTo: 10 },
      { id: 2, upTo: 1 },
    ],
  },
  {
    id: 4,
    elementId: 0,
    reward: [
      { id: 0, upTo: 25 },
      { id: 3, upTo: 10 },
      { id: 2, upTo: 3 },
    ],
  },
];

const eventTournamentRewards: IEventReward[] = [];
