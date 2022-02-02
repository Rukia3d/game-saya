import { GameState, IReel, ISpell } from "../src/utils/types";
import {
  readDialogues,
  readAdventures,
  readEnemies,
  readHeroes,
  readNpcs,
  readResources,
  readSpellUpdates,
  readFights,
  readSpells,
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
const npcs = readNpcs();
const resources = readResources();
const spellUpdates = readSpellUpdates();
const fights = readFights();
const spells = readSpells();

const reelsInitialSet: IReel[] = [
  {
    id: "c1_reel_1",
    type: "reel",
    action: [],
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
    action: [],
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

app.get("/api/player/", (req: any, res: any) => {
  console.log("Requesting new player game data", req.query);
  // TODO: Cut the second page of stories, add them if open is called at the end of a dialogue
  const playerAdventures = adventures;
  playerAdventures[0].open = true;
  //@ts-ignore
  playerAdventures[0].storyGroups[0].stories[0].open = true;
  const playerHeroes = [heroes[0]];
  playerHeroes[0].selected = true;
  const playerCards = spells.filter((s: ISpell) => s.color === "violet");
  playerCards.map((s: ISpell, i: number) =>
    i < 7 ? (s.selected = true) : (s.selected = false)
  );
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
          quantity: 1000,
          school: "restoration",
        },
        {
          id: "leaf",
          name: "Leaf",
          commonality: 7,
          quantity: 1000,
          school: "restoration",
        },
        {
          id: "r_flower",
          name: "Red flower",
          commonality: 5,
          quantity: 1000,
          school: "restoration",
        },
      ],
      enemies: playerEnemies,
    },
    reels: reelsInitialSet,
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

app.get("/api/rewards/", (req: any, res: any) => {
  console.log("rewards", req.query);
});

app.get("/api/fights/", (req: any, res: any) => {
  console.log("fights", req.query);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
