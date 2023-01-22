import { ICell } from "../engine/types";

type unitConnector = "open" | "enemy" | "obstacle";
type unitLayout = {
  id: number;
  len: number;
  cells: ICell[][];
  opening: unitConnector;
  ending: unitConnector;
  difficulty: number;
};

const unit0: unitLayout = {
  id: 0,
  len: 5,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "open",
  difficulty: 1,
};

const unit1: unitLayout = {
  id: 1,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "open",
};

const unit2: unitLayout = {
  id: 2,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "open",
};

const unit3: unitLayout = {
  id: 3,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "open",
};

const unit4: unitLayout = {
  id: 4,
  len: 5,
  difficulty: 2,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "open",
};

const unit5: unitLayout = {
  id: 5,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "open",
};

const unit6: unitLayout = {
  id: 6,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "open",
};

const unit7: unitLayout = {
  id: 7,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "open",
};

const unit8: unitLayout = {
  id: 8,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "open",
};

const unit9: unitLayout = {
  id: 9,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "open",
};

const unit10: unitLayout = {
  id: 10,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
    ],
  ],
  opening: "open",
  ending: "enemy",
};

const unit11: unitLayout = {
  id: 11,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "enemy",
};

const unit12: unitLayout = {
  id: 12,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "enemy",
};

const unit13: unitLayout = {
  id: 13,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "enemy",
};

const unit14: unitLayout = {
  id: 14,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "enemy",
};

const unit15: unitLayout = {
  id: 15,
  len: 5,
  difficulty: 2,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "open",
};

const unit16: unitLayout = {
  id: 16,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "open",
};

const unit17: unitLayout = {
  id: 17,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "open",
};

const unit18: unitLayout = {
  id: 18,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "open",
};

const unit19: unitLayout = {
  id: 19,
  len: 5,
  difficulty: 2,
  cells: [
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "open",
};

const unit20: unitLayout = {
  id: 20,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "enemy",
};

const unit21: unitLayout = {
  id: 21,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "enemy",
};

const unit22: unitLayout = {
  id: 22,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "enemy" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "enemy",
};

const unit23: unitLayout = {
  id: 23,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "enemy",
};

const unit24: unitLayout = {
  id: 24,
  len: 5,
  difficulty: 2,
  cells: [
    [
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
    ],
  ],
  opening: "enemy",
  ending: "enemy",
};

const unit25: unitLayout = {
  id: 25,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
    ],
  ],
  opening: "obstacle",
  ending: "enemy",
};

const unit26: unitLayout = {
  id: 26,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "enemy",
};

const unit27: unitLayout = {
  id: 27,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "enemy",
};

const unit28: unitLayout = {
  id: 28,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "enemy",
};

const unit29: unitLayout = {
  id: 29,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "enemy",
};

const unit30: unitLayout = {
  id: 30,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "obstacle",
};

const unit31: unitLayout = {
  id: 31,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
  ],
  opening: "open",
  ending: "obstacle",
};

const unit32: unitLayout = {
  id: 32,
  len: 5,
  difficulty: 2,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "obstacle",
};

const unit33: unitLayout = {
  id: 33,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "obstacle" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "obstacle",
};

const unit34: unitLayout = {
  id: 34,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "open",
  ending: "obstacle",
};

const unit35: unitLayout = {
  id: 35,
  len: 5,
  difficulty: 2,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
    ],
    [
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "obstacle",
};

const unit36: unitLayout = {
  id: 36,
  len: 5,
  difficulty: 2,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "obstacle",
};

const unit37: unitLayout = {
  id: 37,
  len: 5,
  difficulty: 2,
  cells: [
    [
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "obstacle",
};

const unit38: unitLayout = {
  id: 38,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
    ],
  ],
  opening: "enemy",
  ending: "obstacle",
};

const unit39: unitLayout = {
  id: 39,
  len: 5,
  difficulty: 2,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "enemy",
  ending: "obstacle",
};

const unit40: unitLayout = {
  id: 40,
  len: 5,
  difficulty: 2,
  cells: [
    [
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
  ],
  opening: "obstacle",
  ending: "obstacle",
};

const unit41: unitLayout = {
  id: 41,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "obstacle",
};

const unit42: unitLayout = {
  id: 42,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
    [
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "obstacle",
};

const unit43: unitLayout = {
  id: 43,
  len: 5,
  difficulty: 0,
  cells: [
    [
      { type: "obstacle" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
    ],
  ],
  opening: "obstacle",
  ending: "obstacle",
};

const unit44: unitLayout = {
  id: 44,
  len: 5,
  difficulty: 1,
  cells: [
    [
      { type: "space" },
      { type: "obstacle" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "enemy" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "space" },
    ],
    [
      { type: "space" },
      { type: "space" },
      { type: "space" },
      { type: "obstacle" },
      { type: "obstacle" },
    ],
  ],
  opening: "obstacle",
  ending: "obstacle",
};
