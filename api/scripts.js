const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
const playerCards = require("../src/data/heroCards.json");
const dialogues = require("../src/data/dialogues.json");

app.get("/api/player/", (req, res) => {
    console.log("Requesting player game data");
    const gameState = {
        sceneCharacters: [
          { id: "maya", name: "Maya", image: "../img/maya.png", state: "story", dial: "" },
          {id: "tara", name: "Tara", image:"../img/tara.png", state: "story", dial: ""}
        ],
        dialogues: dialogues,
        player: { 
          id: 1, 
          cards: playerCards, 
          experience: 300, 
          lifes: 3, 
          heroes: [
            {  
              id: "maya",
              name: "Maya",
              image: "../img/maya_spells.png",
            }, 
            {  
              id: "tara",
              name: "Tara",
              image: "../img/tara_spells.png",
            }
          ],
          resources: [
          { id: "gold", name: "Gold", image: "../", commonality: 2, quantity: 0 },
          { id: "iron", name: "Iron", image: "../", commonality: 5, quantity: 0 },
          { id: "dimond", name: "Dimonds", image: "../", commonality: 1, quantity: 0 },
          { id: "silk", name: "Silk", image: "../", commonality: 2, quantity: 0 },
          { id: "rdust", name: "Red dust", image: "../", commonality: 3, quantity: 0 },
          { id: "rflower", name: "Red flower", image: "../", commonality: 4, quantity: 0 }
          ] 
        },
        adventures: [
          {
            id: "character",
            name: "Character",
            image: "character.jpg",
            state: "closed",
            form: "character",
            stories: [],
          },
          {
            id: "story",
            name: "Act 1",
            image: "story.jpg",
            state: "open",
            form: "story",
            stories: [
              {
                id: "fight1",
                type: "fight",
                image: "../img/arena_1.png",
                enemy: "dude",
                state: "open",
                characters: ["maya", "tara"],
              },
              {
                id: "dial1",
                type: "dialogue",
                image: "../img/dialogue_1.png",
                state: "open",
                characters: ["maya"],
              },
              {
                id: "fight2",
                type: "fight",
                image: "../img/arena_1.png",
                enemy: "dude",
                state: "closed",
                characters: ["maya", "tara"],
              },
              {
                id: "dial2",
                type: "dialogue",
                image: "../img/dialogue_1.png",
                state: "closed",
                characters: ["maya"],
              },
            ],
          },
          {
            id: "arena",
            name: "Arena",
            image: "arena.jpg",
            state: "closed",
            form: "arena",
            stories: [],
          },
          {
            id: "torunament",
            name: "Tournament",
            image: "tournament.jpg",
            state: "closed",
            form: "torunament",
            stories: [],
          },
          {
            id: "event",
            name: "Event",
            image: "event.jpg",
            state: "closed",
            form: "event",
            stories: [],
          },
        ]
      }
    res.send(gameState);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
