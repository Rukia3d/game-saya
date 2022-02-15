import { IReel } from "../src/utils/types";
import {
  player,
  playerAdventures,
  playerCharacters,
  playerHeroes,
  playerResources,
  playerSpells,
  playerUpdates,
} from "./engine/engine";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());

const reelsInitialSet: IReel[] = [
  {
    id: "c1_reel_1",
    type: "reel",
    actions: [],
    imageGroups: [
      {
        id: 1,
        layout: 4,
        images: [
          { id: "c1_reel_1_1_img1", image: "storyline", direction: "down" },
          { id: "c1_reel_1_1_img2", image: "storyline", direction: "up" },
          { id: "c1_reel_1_1_img3", image: "storyline", direction: "left" },
          { id: "c1_reel_1_1_img4", image: "storyline", direction: "left" },
        ],
      },
      {
        id: 2,
        layout: 1,
        images: [
          { id: "c1_reel_1_2_img1", image: "storyline", direction: "left" },
        ],
      },
    ],
  },
  {
    id: "c1_reel_2",
    type: "reel",
    actions: [],
    imageGroups: [
      {
        id: 1,
        layout: 3,
        images: [
          {
            id: "c1_reel_2_1_img1",
            image: "storyline",
            direction: "right",
          },
          {
            id: "c1_reel_2_1_img2",
            image: "storyline",
            direction: "left",
          },
          { id: "c1_reel_2_1_img3", image: "storyline", direction: "left" },
        ],
      },
      {
        id: 2,
        layout: 2,
        images: [
          {
            id: "c1_reel_2_2_img1",
            image: "storyline",
            direction: "right",
          },
          { id: "c1_reel_2_2_img2", image: "storyline", direction: "left" },
        ],
      },
    ],
  },
];

app.get("/api/player/", async (req: any, res: any) => {
  console.log("Requesting new player game data", req.query);
  const gameState = {
    player: await player(req.query.id),
    adventures: await playerAdventures(req.query.id),
    heroes: await playerHeroes(req.query.id),
    npcs: await playerCharacters(req.query.id),
    spells: await playerSpells(req.query.id),
    updates: await playerUpdates(req.query.id),
    resources: await playerResources(req.query.id),
  };
  console.log("gameState", gameState);
  res.send(gameState);
});

app.get("/api/rewards/", (req: any, res: any) => {});

app.get("/api/fights/", (req: any, res: any) => {});

app.post("/api/heroes/:id", (req: any, res: any) => {});

app.post("/api/updates/:id", (req: any, res: any) => {});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
