import {
  boolState,
  gameMode,
  IPlayer,
  IServer,
  levelState,
} from "../../api/engine/types";
import { cellType } from "../../api/levelgen";

const adventures = [
  {
    character: {
      id: 0,
      name: "Sayuri",
      weapon: "Chakram",
      material: {
        id: 5,
        name: "jade",
      },
    },
    id: 0,
    stories: [
      {
        name: "Chapter 0 of Story 0",
        id: 0,
        chapters: [
          {
            id: 0,
            mode: "run" as gameMode,
            name: "Lake",
            state: "open" as levelState,
            level: {
              levels: [
                {
                  settingName: "Wood",
                  setting: "forest",
                  map: [
                    [
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                  ],
                  enemies: [
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 0,
                      },
                      x: 160,
                      y: 7839,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 1,
                      },
                      x: 240,
                      y: 7599,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 2,
                      },
                      x: 320,
                      y: 7279,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 3,
                      },
                      x: 160,
                      y: 7039,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 4,
                      },
                      x: 80,
                      y: 6799,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 5,
                      },
                      x: 240,
                      y: 6319,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 6,
                      },
                      x: 320,
                      y: 6159,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 7,
                      },
                      x: 240,
                      y: 5919,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 8,
                      },
                      x: 0,
                      y: 5519,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 9,
                      },
                      x: 80,
                      y: 5279,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 10,
                      },
                      x: 160,
                      y: 5199,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 11,
                      },
                      x: 320,
                      y: 4799,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 12,
                      },
                      x: 320,
                      y: 4639,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 13,
                      },
                      x: 80,
                      y: 4319,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 14,
                      },
                      x: 320,
                      y: 4079,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 15,
                      },
                      x: 80,
                      y: 3839,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 16,
                      },
                      x: 0,
                      y: 3759,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 17,
                      },
                      x: 160,
                      y: 3359,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 18,
                      },
                      x: 320,
                      y: 3119,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 19,
                      },
                      x: 240,
                      y: 2879,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 20,
                      },
                      x: 0,
                      y: 2719,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 21,
                      },
                      x: 80,
                      y: 2399,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 22,
                      },
                      x: 0,
                      y: 2239,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 23,
                      },
                      x: 80,
                      y: 2079,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 24,
                      },
                      x: 0,
                      y: 1839,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 25,
                      },
                      x: 160,
                      y: 1519,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 26,
                      },
                      x: 0,
                      y: 1199,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 27,
                      },
                      x: 80,
                      y: 879,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 28,
                      },
                      x: 240,
                      y: 239,
                    },
                  ],
                  triggers: [
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 0,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 80,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 160,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 240,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 320,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 0,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 80,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 160,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 240,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 320,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 0,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 80,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 160,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 240,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 320,
                      y: -1,
                    },
                  ],
                  type: "run" as gameMode,
                  musicAddress: "testmusic",
                },
              ],
              element: [
                {
                  id: 0,
                  name: "jade",
                },
              ],
              opening: [
                {
                  layout: "4topRiht",
                  panels: [
                    {
                      imageAddress: "4topRiht-test1",
                    },
                    {
                      imageAddress: "4topRiht-test2",
                    },
                    {
                      imageAddress: "4topRiht-test3",
                    },
                    {
                      imageAddress: "4topRiht-test4",
                    },
                  ],
                },
                {
                  layout: "5top3",
                  panels: [
                    {
                      imageAddress: "5top3-test1",
                    },
                    {
                      imageAddress: "5top3-test2",
                    },
                    {
                      imageAddress: "5top3-test3",
                    },
                    {
                      imageAddress: "5top3-test4",
                    },
                    {
                      imageAddress: "5top3-test5",
                    },
                  ],
                },
                {
                  layout: "1full",
                  panels: [
                    {
                      imageAddress: "1full-test1",
                    },
                  ],
                },
                {
                  layout: "4bottomRight",
                  panels: [
                    {
                      imageAddress: "4bottomRiht-test1",
                    },
                    {
                      imageAddress: "4bottomRiht-test2",
                    },
                    {
                      imageAddress: "4bottomRiht-test3",
                    },
                    {
                      imageAddress: "4bottomRiht-test4",
                    },
                  ],
                },
              ],
              ending: [
                {
                  layout: "4topRiht",
                  panels: [
                    {
                      imageAddress: "4topRiht-test1",
                    },
                    {
                      imageAddress: "4topRiht-test2",
                    },
                    {
                      imageAddress: "4topRiht-test3",
                    },
                    {
                      imageAddress: "4topRiht-test4",
                    },
                  ],
                },
                {
                  layout: "5top3",
                  panels: [
                    {
                      imageAddress: "5top3-test1",
                    },
                    {
                      imageAddress: "5top3-test2",
                    },
                    {
                      imageAddress: "5top3-test3",
                    },
                    {
                      imageAddress: "5top3-test4",
                    },
                    {
                      imageAddress: "5top3-test5",
                    },
                  ],
                },
                {
                  layout: "1full",
                  panels: [
                    {
                      imageAddress: "1full-test1",
                    },
                  ],
                },
                {
                  layout: "4bottomRight",
                  panels: [
                    {
                      imageAddress: "4bottomRiht-test1",
                    },
                    {
                      imageAddress: "4bottomRiht-test2",
                    },
                    {
                      imageAddress: "4bottomRiht-test3",
                    },
                    {
                      imageAddress: "4bottomRiht-test4",
                    },
                  ],
                },
              ],
            },
            firstTimeRewards: [
              {
                id: 1,
                name: "gold",
                quantity: 50,
                initial: true,
              },
              {
                id: 5,
                name: "jade",
                quantity: 50,
                initial: true,
              },
              {
                id: 2,
                name: "experience",
                quantity: 30,
                initial: true,
              },
            ],
            staticRewards: [
              {
                id: 1,
                name: "gold",
                quantity: 25,
                initial: false,
              },
              {
                id: 5,
                name: "jade",
                quantity: 25,
                initial: false,
              },
              {
                id: 2,
                name: "experience",
                quantity: 3,
                initial: false,
              },
            ],
            energy: 5,
            storyId: 0,
            adventureId: 0,
          },
          {
            id: 1,
            mode: "run" as gameMode,
            name: "Shore",
            state: "closed" as levelState,
            level: {
              levels: [
                {
                  settingName: "Wood",
                  setting: "forest",
                  map: [
                    [
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                  ],
                  enemies: [
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 0,
                      },
                      x: 160,
                      y: 7839,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 1,
                      },
                      x: 240,
                      y: 7599,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 2,
                      },
                      x: 320,
                      y: 7279,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 3,
                      },
                      x: 160,
                      y: 7039,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 4,
                      },
                      x: 80,
                      y: 6799,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 5,
                      },
                      x: 240,
                      y: 6319,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 6,
                      },
                      x: 320,
                      y: 6159,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 7,
                      },
                      x: 240,
                      y: 5919,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 8,
                      },
                      x: 0,
                      y: 5519,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 9,
                      },
                      x: 80,
                      y: 5279,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 10,
                      },
                      x: 160,
                      y: 5199,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 11,
                      },
                      x: 320,
                      y: 4799,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 12,
                      },
                      x: 320,
                      y: 4639,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 13,
                      },
                      x: 80,
                      y: 4319,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 14,
                      },
                      x: 320,
                      y: 4079,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 15,
                      },
                      x: 80,
                      y: 3839,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 16,
                      },
                      x: 0,
                      y: 3759,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 17,
                      },
                      x: 160,
                      y: 3359,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 18,
                      },
                      x: 320,
                      y: 3119,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 19,
                      },
                      x: 240,
                      y: 2879,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 20,
                      },
                      x: 0,
                      y: 2719,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 21,
                      },
                      x: 80,
                      y: 2399,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 22,
                      },
                      x: 0,
                      y: 2239,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 23,
                      },
                      x: 80,
                      y: 2079,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 24,
                      },
                      x: 0,
                      y: 1839,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 25,
                      },
                      x: 160,
                      y: 1519,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 26,
                      },
                      x: 0,
                      y: 1199,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 27,
                      },
                      x: 80,
                      y: 879,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 28,
                      },
                      x: 240,
                      y: 239,
                    },
                  ],
                  triggers: [
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 0,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 80,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 160,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 240,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 320,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 0,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 80,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 160,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 240,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 320,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 0,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 80,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 160,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 240,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 320,
                      y: -1,
                    },
                  ],
                  type: "run" as gameMode,
                  musicAddress: "testmusic",
                },
              ],
              element: [
                {
                  id: 0,
                  name: "jade",
                },
              ],
              opening: [
                {
                  layout: "4topRiht",
                  panels: [
                    {
                      imageAddress: "4topRiht-test1",
                    },
                    {
                      imageAddress: "4topRiht-test2",
                    },
                    {
                      imageAddress: "4topRiht-test3",
                    },
                    {
                      imageAddress: "4topRiht-test4",
                    },
                  ],
                },
                {
                  layout: "5top3",
                  panels: [
                    {
                      imageAddress: "5top3-test1",
                    },
                    {
                      imageAddress: "5top3-test2",
                    },
                    {
                      imageAddress: "5top3-test3",
                    },
                    {
                      imageAddress: "5top3-test4",
                    },
                    {
                      imageAddress: "5top3-test5",
                    },
                  ],
                },
                {
                  layout: "1full",
                  panels: [
                    {
                      imageAddress: "1full-test1",
                    },
                  ],
                },
                {
                  layout: "4bottomRight",
                  panels: [
                    {
                      imageAddress: "4bottomRiht-test1",
                    },
                    {
                      imageAddress: "4bottomRiht-test2",
                    },
                    {
                      imageAddress: "4bottomRiht-test3",
                    },
                    {
                      imageAddress: "4bottomRiht-test4",
                    },
                  ],
                },
              ],
              ending: [
                {
                  layout: "4topRiht",
                  panels: [
                    {
                      imageAddress: "4topRiht-test1",
                    },
                    {
                      imageAddress: "4topRiht-test2",
                    },
                    {
                      imageAddress: "4topRiht-test3",
                    },
                    {
                      imageAddress: "4topRiht-test4",
                    },
                  ],
                },
                {
                  layout: "5top3",
                  panels: [
                    {
                      imageAddress: "5top3-test1",
                    },
                    {
                      imageAddress: "5top3-test2",
                    },
                    {
                      imageAddress: "5top3-test3",
                    },
                    {
                      imageAddress: "5top3-test4",
                    },
                    {
                      imageAddress: "5top3-test5",
                    },
                  ],
                },
                {
                  layout: "1full",
                  panels: [
                    {
                      imageAddress: "1full-test1",
                    },
                  ],
                },
                {
                  layout: "4bottomRight",
                  panels: [
                    {
                      imageAddress: "4bottomRiht-test1",
                    },
                    {
                      imageAddress: "4bottomRiht-test2",
                    },
                    {
                      imageAddress: "4bottomRiht-test3",
                    },
                    {
                      imageAddress: "4bottomRiht-test4",
                    },
                  ],
                },
              ],
            },
            firstTimeRewards: [
              {
                id: 1,
                name: "gold",
                quantity: 50,
                initial: true,
              },
              {
                id: 5,
                name: "jade",
                quantity: 50,
                initial: true,
              },
            ],
            staticRewards: [
              {
                id: 1,
                name: "gold",
                quantity: 25,
                initial: false,
              },
              {
                id: 5,
                name: "jade",
                quantity: 25,
                initial: false,
              },
            ],
            energy: 5,
            storyId: 0,
            adventureId: 0,
          },
          {
            id: 2,
            mode: "run" as gameMode,
            name: "Wood path",
            state: "closed" as levelState,
            level: {
              levels: [
                {
                  settingName: "Wood",
                  setting: "forest",
                  map: [
                    [
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                      {
                        type: "trigger" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                      {
                        type: "obstacle" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                    [
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                      {
                        type: "space" as cellType,
                      },
                    ],
                  ],
                  enemies: [
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 0,
                      },
                      x: 160,
                      y: 7839,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 1,
                      },
                      x: 240,
                      y: 7599,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 2,
                      },
                      x: 320,
                      y: 7279,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 3,
                      },
                      x: 160,
                      y: 7039,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 4,
                      },
                      x: 80,
                      y: 6799,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 5,
                      },
                      x: 240,
                      y: 6319,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 6,
                      },
                      x: 320,
                      y: 6159,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 7,
                      },
                      x: 240,
                      y: 5919,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 8,
                      },
                      x: 0,
                      y: 5519,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 9,
                      },
                      x: 80,
                      y: 5279,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 10,
                      },
                      x: 160,
                      y: 5199,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 11,
                      },
                      x: 320,
                      y: 4799,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 12,
                      },
                      x: 320,
                      y: 4639,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 13,
                      },
                      x: 80,
                      y: 4319,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 14,
                      },
                      x: 320,
                      y: 4079,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 15,
                      },
                      x: 80,
                      y: 3839,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 16,
                      },
                      x: 0,
                      y: 3759,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 17,
                      },
                      x: 160,
                      y: 3359,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 18,
                      },
                      x: 320,
                      y: 3119,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 19,
                      },
                      x: 240,
                      y: 2879,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 20,
                      },
                      x: 0,
                      y: 2719,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 21,
                      },
                      x: 80,
                      y: 2399,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 22,
                      },
                      x: 0,
                      y: 2239,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 23,
                      },
                      x: 80,
                      y: 2079,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 24,
                      },
                      x: 0,
                      y: 1839,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 25,
                      },
                      x: 160,
                      y: 1519,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 26,
                      },
                      x: 0,
                      y: 1199,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 27,
                      },
                      x: 80,
                      y: 879,
                    },
                    {
                      enemy: {
                        type: "enemy" as cellType,
                        id: 28,
                      },
                      x: 240,
                      y: 239,
                    },
                  ],
                  triggers: [
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 0,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 80,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 160,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 240,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 0,
                      x: 320,
                      y: 7999,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 0,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 80,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 160,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 240,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 1,
                      x: 320,
                      y: 1599,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 0,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 80,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 160,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 240,
                      y: -1,
                    },
                    {
                      trigger: {
                        type: "trigger" as cellType,
                      },
                      triggerId: 2,
                      x: 320,
                      y: -1,
                    },
                  ],
                  type: "run" as gameMode,
                  musicAddress: "testmusic",
                },
              ],
              element: [
                {
                  id: 0,
                  name: "jade",
                },
              ],
              opening: [
                {
                  layout: "4topRiht",
                  panels: [
                    {
                      imageAddress: "4topRiht-test1",
                    },
                    {
                      imageAddress: "4topRiht-test2",
                    },
                    {
                      imageAddress: "4topRiht-test3",
                    },
                    {
                      imageAddress: "4topRiht-test4",
                    },
                  ],
                },
                {
                  layout: "5top3",
                  panels: [
                    {
                      imageAddress: "5top3-test1",
                    },
                    {
                      imageAddress: "5top3-test2",
                    },
                    {
                      imageAddress: "5top3-test3",
                    },
                    {
                      imageAddress: "5top3-test4",
                    },
                    {
                      imageAddress: "5top3-test5",
                    },
                  ],
                },
                {
                  layout: "1full",
                  panels: [
                    {
                      imageAddress: "1full-test1",
                    },
                  ],
                },
                {
                  layout: "4bottomRight",
                  panels: [
                    {
                      imageAddress: "4bottomRiht-test1",
                    },
                    {
                      imageAddress: "4bottomRiht-test2",
                    },
                    {
                      imageAddress: "4bottomRiht-test3",
                    },
                    {
                      imageAddress: "4bottomRiht-test4",
                    },
                  ],
                },
              ],
              ending: [
                {
                  layout: "4topRiht",
                  panels: [
                    {
                      imageAddress: "4topRiht-test1",
                    },
                    {
                      imageAddress: "4topRiht-test2",
                    },
                    {
                      imageAddress: "4topRiht-test3",
                    },
                    {
                      imageAddress: "4topRiht-test4",
                    },
                  ],
                },
                {
                  layout: "5top3",
                  panels: [
                    {
                      imageAddress: "5top3-test1",
                    },
                    {
                      imageAddress: "5top3-test2",
                    },
                    {
                      imageAddress: "5top3-test3",
                    },
                    {
                      imageAddress: "5top3-test4",
                    },
                    {
                      imageAddress: "5top3-test5",
                    },
                  ],
                },
                {
                  layout: "1full",
                  panels: [
                    {
                      imageAddress: "1full-test1",
                    },
                  ],
                },
                {
                  layout: "4bottomRight",
                  panels: [
                    {
                      imageAddress: "4bottomRiht-test1",
                    },
                    {
                      imageAddress: "4bottomRiht-test2",
                    },
                    {
                      imageAddress: "4bottomRiht-test3",
                    },
                    {
                      imageAddress: "4bottomRiht-test4",
                    },
                  ],
                },
              ],
            },
            firstTimeRewards: [
              {
                id: 1,
                name: "gold",
                quantity: 50,
                initial: true,
              },
              {
                id: 5,
                name: "jade",
                quantity: 50,
                initial: true,
              },
              {
                id: 3,
                name: "blackstone",
                quantity: 5,
                initial: true,
              },
            ],
            staticRewards: [
              {
                id: 1,
                name: "gold",
                quantity: 25,
                initial: false,
              },
              {
                id: 5,
                name: "jade",
                quantity: 25,
                initial: false,
              },
            ],
            energy: 5,
            storyId: 0,
            adventureId: 0,
          },
        ],
      },
    ],
    endless: [],
    quests: [],
  },
  {
    character: {
      id: 1,
      name: "Nell",
      weapon: "Longsword",
      material: {
        id: 6,
        name: "garnet",
      },
    },
    id: 1,
    stories: [
      {
        name: "Chapter 1 of Story 0",
        id: 0,
        chapters: [],
      },
    ],
    endless: [],
    quests: [],
  },
  {
    character: {
      id: 2,
      name: "Ichiro",
      weapon: "Scythe",
      material: {
        id: 7,
        name: "obsidian",
      },
    },
    id: 2,
    stories: [
      {
        name: "Chapter 2 of Story 0",
        id: 0,
        chapters: [],
      },
    ],
    endless: [],
    quests: [],
  },
  {
    character: {
      id: 3,
      name: "Akemi",
      weapon: "Scroll",
      material: {
        id: 8,
        name: "moonstone",
      },
    },
    id: 3,
    stories: [],
    endless: [],
    quests: [],
  },
  {
    character: {
      id: 4,
      name: "Diane",
      weapon: "Daggers",
      material: {
        id: 9,
        name: "amber",
      },
    },
    id: 4,
    stories: [],
    endless: [],
    quests: [],
  },
];

const materials = [
  {
    id: 0,
    name: "energy",
    quantity: 50,
  },
  {
    id: 1,
    name: "gold",
    quantity: 0,
  },
  {
    id: 2,
    name: "experience",
    quantity: 0,
  },
  {
    id: 3,
    name: "blackstone",
    quantity: 0,
  },
  {
    id: 4,
    name: "whitestone",
    quantity: 0,
  },
  {
    id: 5,
    name: "jade",
    quantity: 0,
  },
  {
    id: 6,
    name: "garnet",
    quantity: 0,
  },
  {
    id: 7,
    name: "obsidian",
    quantity: 0,
  },
  {
    id: 8,
    name: "moonstone",
    quantity: 0,
  },
  {
    id: 9,
    name: "amber",
    quantity: 0,
  },
];

const weapons = [
  {
    id: 0,
    name: "Chakram",
    materials: [
      {
        id: 4,
        name: "whitestone",
        charge: 100,
        maxCharge: 100,
        state: "open" as boolState,
      },
      {
        id: 5,
        name: "jade",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 6,
        name: "garnet",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 7,
        name: "obsidian",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 8,
        name: "moonstone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 9,
        name: "amber",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
    ],
  },
  {
    id: 1,
    name: "Longsword",
    materials: [
      {
        id: 4,
        name: "whitestone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 5,
        name: "jade",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 6,
        name: "garnet",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 7,
        name: "obsidian",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 8,
        name: "moonstone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 9,
        name: "amber",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
    ],
  },
  {
    id: 2,
    name: "Scythe",
    materials: [
      {
        id: 4,
        name: "whitestone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 5,
        name: "jade",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 6,
        name: "garnet",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 7,
        name: "obsidian",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 8,
        name: "moonstone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 9,
        name: "amber",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
    ],
  },
  {
    id: 3,
    name: "Scroll",
    materials: [
      {
        id: 4,
        name: "whitestone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 5,
        name: "jade",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 6,
        name: "garnet",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 7,
        name: "obsidian",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 8,
        name: "moonstone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 9,
        name: "amber",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
    ],
  },
  {
    id: 4,
    name: "Daggers",
    materials: [
      {
        id: 4,
        name: "whitestone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 5,
        name: "jade",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 6,
        name: "garnet",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 7,
        name: "obsidian",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 8,
        name: "moonstone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 9,
        name: "amber",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
    ],
  },
];

export const testPlayer: IPlayer = {
  id: 0,
  name: "BASEPLAYER",
  loungeId: null,
  materials: materials,
  adventures: adventures,
  weapons: weapons,
  goals: [],
  collections: [],
  messages: [],
  currentState: { state: "MAIN" },
  claims: [],
};

export const testServer: IServer = {
  arenaRun: { events: [], resultTime: 1654347193, mode: "run" },
  arenaFight: { events: [], resultTime: 1654347193, mode: "fight" },
  arenaRunHistory: [],
  arenaFightHistory: [],
};
