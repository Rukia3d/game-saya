import { GameState, Spell, SpellUpdate } from "../src/utils/types";
import {
  readDialogues,
  readAdventures,
  readEnemies,
  readHeroes,
  readSpells,
  readNpcs,
  readResources,
  readSpellUpdates,
} from "./dataload";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
const dialogues = readDialogues();
const adventures = readAdventures();
const enemies = readEnemies();
const heroes = readHeroes();
const spells = readSpells();
const npcs = readNpcs();
const resources = readResources();
const spellUpdates = readSpellUpdates();

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
  console.log("spellUpdates", spellUpdates);

  const gameState: GameState = {
    player: {
      data: {
        id: 1,
        experience: 300,
        life: 7,
        maxLife: 7,
        mana: 10,
        maxMana: 15,
      },
      npcs: playerNpcs,
      heroes: playerHeroes,
      spells: playerCards,
      spellUpdates: [spellUpdates[0]],
      adventures: playerAdventures,
      resources: [
        {
          id: "leaf",
          name: "Leaf",
          commonality: 7,
          image: "leaf",
          quantity: 500,
        },
        {
          id: "r_flower",
          name: "Red flower",
          commonality: 5,
          image: "r_flower",
          quantity: 500,
        },
        {
          id: "wood",
          name: "Wood",
          commonality: 10,
          image: "wood",
          quantity: 500,
        },
      ],
      enemies: playerEnemies,
    },
    dialogues: dialogues,
    npcs: npcs,
    heroes: heroes,
    adventures: adventures,
    enemies: enemies,
    resources: resources,
    spells: spells,
    spellUpdates: spellUpdates,
  };
  res.send(gameState);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
