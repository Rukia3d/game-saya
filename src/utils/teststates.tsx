import {
  dialogues,
  baseCards15,
  spellUpdates,
  heroes,
  enemy,
  fights,
  mayaCard,
  enemyCard,
  playerNpcs,
  adventures,
} from "./testobjects";
import { GameState, IDialogue, FightState } from "./types";

export const gameState: GameState = {
  dialogues: dialogues as IDialogue[],
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
    spells: baseCards15,
    spellUpdates: spellUpdates,
    heroes: heroes,
    adventures: adventures,
    enemies: [enemy],
    resources: [],
  },
  adventures: adventures,
  enemies: [enemy],
  heroes: heroes,
  reels: [],
  npcs: playerNpcs.concat([
    {
      id: "olija",
      name: "Tara",
      image: "../img/olija.png",
      dial: "olija_replic1",
    },
  ]),
  resources: [
    { id: "sparks", name: "Sparks", commonality: 2, image: "sparks" },
    { id: "ash", name: "Ash", commonality: 10, image: "ash" },
    { id: "lava_r", name: "Lava Rock", commonality: 7, image: "lava_r" },
    { id: "liz", name: "Scale", commonality: 3, image: "lizard_s" },
    { id: "char", name: "Charc", commonality: 5, image: "charcoal" },
  ],
  spells: baseCards15,
  spellUpdates: spellUpdates,
  fights: fights,
};

export const fightState: FightState = {
  hero: {
    life: gameState.player.data.life,
    mana: gameState.player.data.mana,
    maxLife: gameState.player.data.maxLife,
    maxMana: gameState.player.data.maxMana,
  },
  heroes: heroes.slice(0, 3),
  enemy: enemy,
  heroCardIndex: null,
  enemyCardIndex: null,
  heroDeck: [mayaCard, mayaCard],
  heroHand: [mayaCard, mayaCard],
  heroDrop: [mayaCard],
  enemyDeck: [enemyCard, enemyCard],
  enemyDrop: [enemyCard],
  elements: ["fire" as "fire", "earth" as "earth"],
  element: "fire" as "fire",
};
