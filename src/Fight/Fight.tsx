import React, { useState } from "react";
import "./Fight.css";

import { InfoCard } from "../UI/InfoCard";
import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";
import { CharacterBox } from "./CharacterBox";
import { HeroBlock } from "./HeroBlock";

import { Spell, Enemy, FightState, Story, Player } from "../utils/types";
import { removeFromArray } from "../utils/helpers";
import {
  generateDeck,
  generateEnemyDeck,
  updateHeroDeck,
} from "../utils/gamelogic";

const enemies = require("../data/enemies.json");

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
    <div
      className={card.owner === "enemy" ? "EnemyCard" : "HeroCard"}
      aria-label="display_card"
    >
      <p>{card.name}</p>
      <p>Belongs to {card.owner}</p>
      <p>
        <button onClick={() => setInfo(card)}>Info</button>
      </p>
    </div>
  );
};

const Result = ({
  result,
  finishFight,
}: {
  result: String;
  finishFight: () => void;
}) => {
  return (
    <div className="ResultCard">
      <p>{result}</p>
      <button onClick={finishFight}>exit</button>
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

  return (
    <div className="Fight">
      <SettingsButton onClick={() => setSettingsOpen(!settingsOpen)} />
      {settingsOpen ? <Settings /> : null}
      {enemyCard ? <BigCard card={enemyCard} setInfo={setInfo} /> : null}
      {heroCard ? <BigCard card={heroCard} setInfo={setInfo} /> : null}
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      {result ? <Result finishFight={finishFight} result={result} /> : null}
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
