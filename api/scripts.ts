import {
  player,
  playerAdventures,
  playerCharacters,
  playerHeroes,
  playerResources,
  playerSpells,
  playerUpdates,
  userEvents,
} from "./engine/engine";

import { IPlayer } from "./engine/types";
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());

const BASEPLAYER: IPlayer = {
  id: 0,
  experience: 0,
  life: 7,
  maxlife: 7,
  mana: 5,
  maxmana: 5,
  created_at: new Date("2022-04-01"),
  rank: 1,
};

const getData = async (player_id: string) => {
  const events = await userEvents(player_id);
  console.log("events", events);
  const gameState = {
    player: BASEPLAYER,
    // player: await player(player_id),
    // adventures: await playerAdventures(player_id),
    // heroes: await playerHeroes(player_id),
    // npcs: await playerCharacters(player_id),
    // spells: await playerSpells(player_id),
    // updates: await playerUpdates(player_id),
    // resources: await playerResources(player_id),
  };
  return gameState;
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
  console.log("gameState", gameState);
  res.send(gameState);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
