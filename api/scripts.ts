import { GameState, Spell } from "../src/utils/types";
import {
  readDialogues,
  readAdventures,
  readEnemies,
  readHeroes,
  readSpells,
  readNpcs,
} from "./dataload";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
const spellUpdates = require("../src/data/spellUpdates.json");
const playerResources = require("../src/data/resources.json");
const forge = require("../src/data/forge.json");
const rewards = require("../src/data/rewards.json");

const dialogues = readDialogues();
const adventures = readAdventures();
const enemies = readEnemies();
const heroes = readHeroes();
const spells = readSpells();
const npcs = readNpcs();

app.get("/api/player/", (req: any, res: any) => {
  console.log("Requesting new player game data");
  // TODO: Cut the second page of stories, add them if open is called at the end of a dialogue
  const playerAdventures = adventures;
  playerAdventures[0].open = true;
  //@ts-ignore
  playerAdventures[0].stories[0].stories[0].open = true;
  const playerNpcs = [{ ...npcs[0], dial: "maya_replic1" }];
  const playerHeroes = [heroes[0]];
  playerHeroes[0].selected = true;
  const playerCards = spells.filter((s: Spell) => s.element === "earth");
  playerCards.map((s: Spell) => (s.selected = true));
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
    heroes: heroes,
    forgeEffects: forge,
    adventures: adventures,
    enemies: enemies,
    resources: rewards.resources,
    cards: spells,
    cardUpdates: spellUpdates,
  };
  res.send(gameState);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
