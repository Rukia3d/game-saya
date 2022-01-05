import { GameState, ISpell } from "../src/utils/types";
import {
  readDialogues,
  readAdventures,
  readEnemies,
  readHeroes,
  readSpells,
  readNpcs,
  readResources,
  readSpellUpdates,
  readFights,
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
const fights = readFights();

app.get("/api/player/", (req: any, res: any) => {
  console.log("Requesting new player game data");
  // TODO: Cut the second page of stories, add them if open is called at the end of a dialogue
  const playerAdventures = adventures;
  playerAdventures[0].open = true;
  //@ts-ignore
  playerAdventures[0].storyGroups[0].stories[0].open = true;
  const playerHeroes = [heroes[0]];
  playerHeroes[0].selected = true;
  const playerCards = spells.filter((s: ISpell) => s.element === "earth");
  playerCards.map((s: ISpell, i: number) =>
    i < 7 ? (s.selected = true) : (s.selected = false)
  );
  // playerCards[0].updates = [];
  // playerCards[1].updates = [spellUpdates[0], spellUpdates[2]];
  // playerCards[2].updates = [spellUpdates[1], spellUpdates[1]];
  const playerEnemies = enemies;

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
      npcs: [],
      heroes: playerHeroes,
      spells: playerCards,
      spellUpdates: spellUpdates, //[],
      adventures: playerAdventures,
      resources: [
        {
          id: "wood",
          name: "Wood",
          commonality: 10,
          image: "wood",
          quantity: 1000,
          element: "earth",
        },
        {
          id: "leaf",
          name: "Leaf",
          commonality: 7,
          image: "leaf",
          quantity: 1000,
          element: "earth",
        },
        {
          id: "r_flower",
          name: "Red flower",
          commonality: 5,
          image: "r_flower",
          quantity: 1000,
          element: "earth",
        },
      ],
      enemies: playerEnemies,
    },
    reels: [
      {
        id: "c1_reel_1",
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
    ],
    dialogues: dialogues,
    fights: fights,
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
