import React, { useState } from "react";
import { Player, SettingsButton, Story } from "./App";
import { CharacterBox } from "./CharacterBox";
import "./Fight.css";
import { HeroBlock } from "./HeroBlock";
import { InfoCard } from "./InfoCard";
import { Settings } from "./Settings";
import { removeFromArray } from "./utils/helpers";
const enemies = require("./data/enemies.json");

interface Card {
  id: string;
  name: string;
  strength: number;
  quantity: number;
  character: null | string;
  element: null | string;
}
export interface Enemy {
  id: string;
  name: string;
  element: string;
  cards: Card[];
}

export interface Spell {
  id: string;
  name: string;
  strength: number;
  character: null | string;
  element: null | string;
  owner: "hero" | "enemy";
}

export interface FightState {
  hero: {
    health: number;
    currentHealth: number;
  };
  enemy: Enemy;
  heroDeck: Spell[];
  heroDrop: Spell[];
  heroHand: Spell[];
  enemyDeck: Spell[];
  enemyDrop: Spell[];
}

const generateDeck = (characters: string[], playerCards: Card[]): Spell[] => {
  const heroSpells: Spell[] = [];
  playerCards.forEach((c: Card) => {
    for (let i = 0; i < c.quantity; i++) {
      if (c.character && characters.indexOf(c.character) === -1) {
        return;
      }
      heroSpells.push({
        id: c.id,
        name: c.name,
        strength: c.strength,
        character: c.character,
        element: c.element,
        owner: "hero",
      });
    }
  });
  return heroSpells;
};
const generateEnemyDeck = (enemy: Enemy): Spell[] => {
  const enemySpells: Spell[] = [];
  enemy.cards.forEach((c: Card) => {
    for (let i = 0; i < c.quantity; i++) {
      enemySpells.push({
        id: c.id,
        name: c.name,
        strength: c.strength,
        character: c.character,
        element: c.element,
        owner: "enemy",
      });
    }
  });
  return enemySpells;
};

const updateHeroDeck = (fightState: FightState, heroCard: Spell) => {
  let newDeck = fightState.heroDeck;
  let newDrop = fightState.heroDrop;
  if (fightState.heroDeck.length <= 0) {
    newDeck = newDrop;
    newDrop = [heroCard];
  } else {
    newDrop.push(heroCard);
  }
  return [newDeck, newDrop];
};

const enemyAttack = (
  fightState: FightState,
  heroCard: Spell,
  enemyCard: Spell
) => {
  const [newDeck, newDrop] = updateHeroDeck(fightState, heroCard);
  const newHeroHand = removeFromArray(fightState.heroHand, heroCard);
  const newCard = newDeck.shift();
  newHeroHand.push(newCard);
  let newHealth = fightState.hero.currentHealth;
  if (heroCard.character) {
    // hero card is a special one
  } else {
    if (heroCard.strength <= enemyCard.strength) {
      newHealth = newHealth - enemyCard.strength;
    }
  }

  const heroNewHealth = {
    ...fightState.hero,
    currentHealth: newHealth,
  };
  return {
    ...fightState,
    heroDeck: newDeck,
    heroDrop: newDrop,
    enemyDrop: fightState.enemyDrop.concat([enemyCard]),
    heroHand: newHeroHand,
    hero: heroNewHealth,
  };
};

const BigCard = ({
  card,
  setInfo,
}: {
  card: Spell;
  setInfo: (s: Spell | Enemy | null) => void;
}) => {
  return (
    <div className={card.owner === "enemy" ? "EnemyCard" : "HeroCard"}>
      <p>{card.name}</p>
      <p>Belongs to {card.owner}</p>
      <p>
        <button onClick={() => setInfo(card)}>Info</button>
      </p>
    </div>
  );
};

export const Fight = ({
  story,
  player,
  clearScreen,
}: {
  story: Story;
  player: Player;
  clearScreen: () => void;
}) => {
  if (!story.enemy) {
    throw "No enemy for this fight, something went very wrong";
  }
  const enemy: Enemy = enemies.find((e: any) => e.id === story.enemy);
  const heroDeck = generateDeck(story.characters, player.cards); //shuffle(generateDeck());
  const enemyDeck = generateEnemyDeck(enemy); //shuffle(generateEnemyDeck());
  const enemyHealt = enemyDeck.length;
  const [fightState, setfightState] = useState<FightState>({
    hero: {
      health: 15,
      currentHealth: 15,
    },
    enemy: enemy,
    heroDeck: heroDeck,
    heroHand: heroDeck.splice(0, 5),
    heroDrop: [],
    enemyDeck: enemyDeck,
    enemyDrop: [],
  });
  const [enemyCard, setEnemyCard] = useState<null | Spell>(null);
  const [heroCard, setHeroCard] = useState<null | Spell>(null);
  const [result, setResult] = useState<null | String>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [info, setInfo] = useState<null | Spell | Enemy>(null);

  const selectCard = (c: Spell) => {
    if (!enemyCard) {
      console.log("You are acting first");
      return;
    }
    setHeroCard(c);
    const res = enemyAttack(fightState, c, enemyCard);
    setfightState(res);
    setTimeout(() => {
      setHeroCard(null);
      setEnemyCard(null);
      console.log(fightState.enemyDrop.length);
      if (fightState.hero.currentHealth <= 0) {
        setResult("Lost");
      }
      if (fightState.enemyDrop.length === enemyHealt - 1) {
        setResult("Won");
      }
    }, 3000);
  };

  const finishFight = () => {
    console.log("fight Finished");
    clearScreen();
  };
  //console.log("gso", JSON.parse(JSON.stringify(fightState)));
  return (
    <div className="Fight">
      <SettingsButton onClick={() => setSettingsOpen(!settingsOpen)} />
      {settingsOpen ? <Settings /> : null}
      {enemyCard ? <BigCard card={enemyCard} setInfo={setInfo} /> : null}
      {heroCard ? <BigCard card={heroCard} setInfo={setInfo} /> : null}
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      {result ? (
        <div className="ResultCard">
          <p>{result}</p>
          <button onClick={finishFight}>exit</button>
        </div>
      ) : null}
      <CharacterBox
        fightState={fightState}
        setEnemyCard={setEnemyCard}
        setInfo={setInfo}
      />
      <HeroBlock
        fightState={fightState}
        selectCard={selectCard}
        setInfo={setInfo}
      />
    </div>
  );
};
