import {
  IArcana,
  arcanaName,
  IStoryReward,
  IEventReward,
} from "../engine/types";
import { storyRewards, eventTowerRewards } from "./testDBLevels";

function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export const arcanas: IArcana[] = [
  {
    arcanaName: "one" as arcanaName,
    id: 0,
    characterName: "Character1",
    stories: [
      {
        id: 0,
        arcanaId: 0,
        level: "",
        name: "Character1 story1",
        mode: "story",
        state: "open",
        allowedRewards: ensure(
          storyRewards.find(
            (s: IStoryReward) =>
              s.id === 0 && s.arcanaId === 0 && s.storyId === 0
          )
        ).reward,
        experience: 10,
        energy: 5,
      },
      {
        id: 1,
        arcanaId: 0,
        level: "",
        name: "Character1 story2",
        mode: "story",
        state: "closed",
        allowedRewards: ensure(
          storyRewards.find(
            (s: IStoryReward) =>
              s.id === 0 && s.arcanaId === 0 && s.storyId === 1
          )
        ).reward,
        experience: 10,
        energy: 5,
      },
      {
        id: 2,
        arcanaId: 0,
        level: "",
        name: "Character1 story3",
        mode: "story",
        state: "closed",
        allowedRewards: ensure(
          storyRewards.find(
            (s: IStoryReward) =>
              s.id === 0 && s.arcanaId === 0 && s.storyId === 2
          )
        ).reward,
        experience: 10,
        energy: 5,
      },
    ],
    legend: ["Char1 story line 1", "Char1 story line 2"],
    currentQuests: [],
    currentEvents: [
      {
        id: 0,
        arcanaId: 0,
        level: "",
        mode: "run",
        energy: 10,
        checkpoint: null,
        allowedRewards: ensure(
          eventTowerRewards.find(
            (s: IEventReward) => s.id === 0 && s.arcanaId === 0
          )
        ).reward,
      },
      {
        id: 1,
        arcanaId: 0,
        level: "",
        mode: "fight",
        energy: 10,
        checkpoint: null,
        allowedRewards: [
          { id: 0, upTo: 5 },
          { id: 3, upTo: 1 },
        ],
      },
    ],
  },
  {
    arcanaName: "two" as arcanaName,
    id: 1,
    characterName: "Character2",
    stories: [
      {
        id: 0,
        arcanaId: 1,
        level: "",
        name: "Character2 story1",
        mode: "story",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        experience: 10,
        energy: 5,
      },
      {
        id: 1,
        arcanaId: 1,
        level: "",
        name: "Character2 story2",
        mode: "story",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        energy: 5,
        experience: 10,
      },
    ],
    legend: ["Char2 story line 1", "Char2 story line 2"],
    currentQuests: [],
    currentEvents: [
      {
        id: 0,
        arcanaId: 1,
        level: "",
        mode: "run",
        energy: 10,
        checkpoint: null,
        allowedRewards: [
          { id: 0, upTo: 5 },
          { id: 3, upTo: 1 },
        ],
      },
      {
        id: 1,
        arcanaId: 1,
        level: "",
        mode: "fight",
        energy: 10,
        checkpoint: null,
        allowedRewards: [
          { id: 0, upTo: 5 },
          { id: 3, upTo: 1 },
        ],
      },
    ],
  },
];
