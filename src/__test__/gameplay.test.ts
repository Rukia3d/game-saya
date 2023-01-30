import { Command, IRun } from "../../api/engine/types";
import {
  Gameplay,
  History,
  initGameplay,
  updateGameplay,
} from "../gameplay/gameplay";

// test
//
// const history = [{ y: 9, command: "left" }, { y: 85, command: "fire" }, { y: 98, command: "right" }];
//
// const gameplay = new Gameplay(....);
// for/while/???? {
//    const command = findCommand(history, gameplay.player.y);
//    updateGameplay(gameplay, command);
// }

test("Applies collisions correctly", async () => {
  const testLevel: IRun = {
    settingName: "Wood",
    setting: "forest",
    map: [0, 1, 2, 3, 4, 5, 6].map((e: any) => [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
    ]),
    entities: [],
    obstacles: [],
    enemiesContent: [],
    triggersContent: [],
    enemies: [],
    triggers: [],
    type: "run",
    musicAddress: "testmusic",
    dialogues: [],
    collections: [],
  };
  const history: History[] = [
    { y: 60, command: "right" as const },
    { y: 90, command: "right" as const },
  ];

  const gameplay = initGameplay(testLevel);
  gameplay.history = history;

  for (let i = 0; i < (gameplay.level.map.length - 1) * 80; i++) {
    const command = gameplay.history.find((h: History) => h.y === i);
    if (command) {
      updateGameplay(gameplay, command.command, false);
      console.log("gameplay", i, gameplay);
    } else {
      updateGameplay(gameplay, undefined, false);
    }
  }
});
