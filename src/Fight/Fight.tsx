import React, { useContext, useState } from "react";
import "./Fight.css";

import { InfoCard } from "../UI/InfoCard";
import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";
import { CharacterBox } from "./CharacterBox";
import { HeroBlock } from "./HeroBlock";

import { Spell, Enemy, FightState, Resource } from "../utils/types";
import { findActiveCharacters, removeFromArray } from "../utils/helpers";
import {
  generateDeck,
  generateEnemyDeck,
  updateHeroDeck,
  updateLostPlayer,
  updateWinPlayer,
} from "../utils/gamelogic";
import { FightResult } from "./FightResult";
import { GameContext } from "../App";
import { BigCard } from "./BigCard";

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

export const Fight = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.story ||
    !context.gameState ||
    !context.setGameState ||
    !context.backToMain
  ) {
    throw new Error("No data");
  }

  if (!context.story) {
    throw new Error("No story for this fight");
  }

  const enemyId = context.story.enemy;
  if (!enemyId) {
    throw new Error("No enemy for this fight, something went very wrong");
  }
  const storyCharacters = context.story.characters
    ? context.story.characters
    : findActiveCharacters(context.gameState.player.heroes);
  const enemy: Enemy = enemies.find((e: any) => e.id === enemyId);
  const heroDeck = generateDeck(
    storyCharacters,
    context.gameState.player.cards
  ); //shuffle(generateDeck());
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
    setfightState(enemyAttack(fightState, c, enemyCard));
    setTimeout(() => {
      setHeroCard(null);
      setEnemyCard(null);
      if (fightState.hero.currentHealth <= 0) {
        setResult("Lost");
      }
      if (fightState.enemyDrop.length === enemyHealt - 1) {
        setResult("Won");
      }
    }, 100);
  };

  const finishFight = (resource: Resource[]) => {
    // TODO finidh fight when the result is detected, not onClick
    console.log("Fight is finished");
    const gameState = context.gameState;

    if (!gameState) throw new Error("Can't update the fight results");

    if (result === "Won") {
      context.setGameState({
        ...gameState,
        player: updateWinPlayer(gameState.player, enemy, resource),
      });
    }
    if (result === "Lost") {
      context.setGameState({
        ...gameState,
        player: updateLostPlayer(gameState.player),
      });
    }
    context.backToStory();
  };
  return (
    <div className="Fight">
      <SettingsButton onClick={() => setSettingsOpen(!settingsOpen)} />
      {settingsOpen ? <Settings /> : null}
      {enemyCard ? <BigCard card={enemyCard} setInfo={setInfo} /> : null}
      {heroCard ? <BigCard card={heroCard} setInfo={setInfo} /> : null}
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      {result ? (
        <FightResult
          finishFight={finishFight}
          result={result}
          enemy={fightState.enemy}
        />
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
