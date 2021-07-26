import { Adventure } from "../src/utils/types";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
const cards = require("../src/data/heroCards.json");
const dialogues = require("../src/data/dialogues.json");
const stories = require("../src/data/storiesAct1.json");
const spellUpdates = require("../src/data/spellUpdates.json");
const sceneCharacters = require("../src/data/sceneCharacters.json");
const heroes = require("../src/data/heroes.json");
const resources = require("../src/data/resources.json");
const adventures = require("../src/data/adventures.json");

app.get("/api/player/", (req: any, res: any) => {
  console.log("Requesting new player game data");

  const playerAdventures = adventures;
  playerAdventures[0].open = true;
  playerAdventures[0].stories = stories;
  const playerCharacters = [sceneCharacters[0]];
  const playerHeroes = [heroes[0]];
  playerHeroes[0].selected = true;
  const playerCards = cards.base;

  const gameState = {
    sceneCharacters: playerCharacters,
    dialogues: dialogues,
    player: {
      id: 1,
      cards: playerCards,
      cardUpdates: spellUpdates,
      experience: 300,
      mana: 15,
      maxMana: 15,
      heroes: playerHeroes,
      resources: resources,
    },
    adventures: adventures,
  };
  res.send(gameState);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
