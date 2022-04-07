import {
  applyUserEvents,
  player,
  playerAdventures,
  playerCharacters,
  playerHeroes,
  playerResources,
  playerSpells,
  playerUpdates,
} from "./engine/engine";

import { IPlayer } from "./engine/types";
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());

const getData = async (player_id: string) => {
  const player = await applyUserEvents(player_id);
  //console.log("getData", player);
  return player;
};

app.post("/api/users/:userId/fight/:fightId", async (req: any, res: any) => {
  console.log(
    `Requesting player game data for ${req.query.userId} fight ${req.query.fightId}`
  );
  const gameState = null;
  console.log("gameState", gameState);
  res.send(gameState);
});

app.post("/api/users/:userId/story/:storyId", async (req: any, res: any) => {
  console.log(
    `Requesting player game data for ${req.query.userId} story ${req.query.storyId}`
  );
  const gameState = null;
  console.log("gameState", gameState);
  res.send(gameState);
});

app.get("/api/users/:userId", async (req: any, res: any) => {
  console.log("Requesting new player game data", req.params);
  const gameState = await getData(req.params.userId);
  res.send(gameState);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
