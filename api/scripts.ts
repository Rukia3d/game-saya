import { elementName, ICharacter, IPlayer } from "./engine/types";

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

const characters: ICharacter[] = [
  {
    element: "air" as elementName,
    id: 0,
    name: "Saya",
    stories: [
      { id: 0, level: "", name: "air story0", state: "open" },
      { id: 1, level: "", name: "air story1", state: "closed" },
    ],
    legend: ["Saya story line 1", "Saya story line 2"],
    currentQuests: [
      { id: 0, level: "", name: "air some0", state: "open" },
      { id: 1, level: "", name: "air some1", state: "open" },
    ],
    currentTournament: { id: 0, level: "" },
    currentTower: { id: 0, level: "" },
  },
  {
    element: "fire" as elementName,
    id: 1,
    name: "Nell",
    stories: [
      { id: 0, level: "", name: "fire some0", state: "closed" },
      { id: 1, level: "", name: "fire some1", state: "closed" },
    ],
    legend: ["Nell story line 1", "Nell story line 2"],
    currentQuests: [
      { id: 0, level: "", name: "fire some0", state: "open" },
      { id: 1, level: "", name: "fire some1", state: "open" },
    ],
    currentTournament: { id: 0, level: "" },
    currentTower: { id: 0, level: "" },
  },
];

const materials = [
  { id: 0, name: "Coin", quantity: 10 },
  { id: 1, name: "Black Soul Stone", quantity: 5 },
  { id: 1, name: "White Soul Stone", quantity: 7 },
];

app.get("/api/players/:id", async (req: any, res: any) => {
  const player: IPlayer = {
    id: 1,
    name: "player1 name",
    exprience: 0,
    energy: 10,
    maxEnergy: 10,
    loungeId: null,
    materials: materials,
    characters: characters,
    spells: [],
    missions: [],
    messages: [],
  };
  if (req.params.id === 2) {
    player.id = 2;
    player.name = "player2 name";
    player.loungeId = 5;
    player.energy = 15;
    player.maxEnergy = 20;
  }
  res.send(player);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
