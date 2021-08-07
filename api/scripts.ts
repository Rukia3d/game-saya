import { GameState } from "../src/utils/types";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
const cards = require("../src/data/heroCards.json");
const dialogues = require("../src/data/dialogues.json");
const spellUpdates = require("../src/data/spellUpdates.json");
const npcs = require("../src/data/npcs.json");
const heroes = require("../src/data/heroes.json");
const playerResources = require("../src/data/resources.json");
const adventures = require("../src/data/adventures.json");
const enemies = require("../src/data/enemies.json");
const forge = require("../src/data/forge.json");
const rewards = require("../src/data/rewards.json");

app.get("/api/player/", (req: any, res: any) => {
  console.log("Requesting new player game data");
  // TODO: Cut the second page of stories, add them if open is called at the end of a dialogue
  const playerAdventures = adventures;
  playerAdventures[0] = {
    ...adventures[0],
    stories: adventures[0].stories.slice(0, 3),
  };
  playerAdventures[0].open = true;
  const playerNpcs = [npcs[0]];
  const playerHeroes = [heroes[0]];
  playerHeroes[0].selected = true;
  const playerCards = cards.base;
  const playerEnemies = enemies;

  const gameState: GameState = {
    player: {
      data: {
        id: 1,
        experience: 300,
        life: 3,
        maxLife: 7,
        mana: 10,
        maxMana: 15,
      },
      npcs: playerNpcs,
      heroes: playerHeroes,
      cards: playerCards,
      cardUpdates: spellUpdates,
      adventures: playerAdventures,
      resources: playerResources,
      enemies: playerEnemies,
    },
    dialogues: dialogues,
    npcs: npcs,
    forgeEffects: forge,
    adventures: adventures,
    enemies: enemies,
    resources: rewards.resources,
    cards: cards.base.concat(cards.tara).concat(cards.maya),
    cardUpdates: spellUpdates,
  };
  res.send(gameState);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
