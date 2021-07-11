const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
const playerCards = require("../src/data/heroCards.json");
const dialogues = require("../src/data/dialogues.json");
const stories = require("../src/data/storiesAct1.json");

app.get("/api/player/", (req, res) => {
    console.log("Requesting player game data");
    const gameState = {
        sceneCharacters: [
          { id: "maya", name: "Maya", image: "../img/maya.png", state: "story", dial: "maya_replic1" },
          {id: "tara", name: "Tara", image:"../img/tara.png", state: "story", dial: "tara_replic1"}
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
            open: true,
            form: "character",
            stories: [],
          },
          {
            id: "story",
            name: "Water Problems",
            image: "story.jpg",
            open: true,
            form: "story",
            stories: stories
          },
          {
            id: "arena",
            name: "Arena",
            image: "arena.jpg",
            open: false,
            form: "arena",
            stories: [],
          },
          {
            id: "torunament",
            name: "Tournament",
            image: "tournament.jpg",
            open: false,
            form: "torunament",
            stories: [],
          },
          {
            id: "event",
            name: "Event",
            image: "event.jpg",
            open: false,
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
