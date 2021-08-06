import React, { useContext, useState } from "react";
import "./Fight.css";

import { InfoCard } from "../UI/InfoCard";
import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";
import { CharacterBox } from "./CharacterBox";
import { HeroBlock } from "./HeroBlock";

import { Spell, Enemy, FightState, Resource, element } from "../utils/types";
import { findActiveCharacters, shuffle } from "../utils/helpers";
import {
  finishStory,
  generateDeck,
  generateEnemyDeck,
  updateLostPlayer,
  updateWinPlayer,
} from "../utils/gamelogic";
import { enemyAttack } from "../utils/fightlogic";
import { FightResult } from "./FightResult";
import { GameContext } from "../App";
import { BigCard } from "./BigCard";

export const Fight = () => {
  const context = useContext(GameContext);
  if (!context || !context.story || !context.gameState) {
    throw new Error("No data in context");
  }

  const enemyId = context.story.enemy;
  const enemies = context.gameState.player.enemies;
  const player = context.gameState.player.data;

  if (!enemyId) {
    throw new Error("No enemy for this fight, something went very wrong");
  }

  const storyCharacters = context.story.characters
    ? context.story.characters
    : findActiveCharacters(context.gameState.player.heroes);
  const enemy: Enemy | null =
    enemies.find((e: any) => e.id === enemyId) || null;

  if (!enemy) {
    throw new Error(`Can't find the enemy ${enemyId}`);
  }

  const heroDeck = generateDeck(
    storyCharacters,
    context.gameState.player.cards
  ); //shuffle(generateDeck());
  const enemyDeck = generateEnemyDeck(enemy); //shuffle(generateEnemyDeck());
  const enemyHealt = enemyDeck.length;
  const elements: element[] = shuffle([
    "fire",
    "earth",
    "metal",
    "water",
    "air",
  ]);
  const [fightState, setfightState] = useState<FightState>({
    hero: {
      maxLife: player.maxLife,
      life: player.life,
      maxMana: player.maxMana,
      mana: player.mana,
    },
    enemy: enemy,
    heroDeck: heroDeck,
    heroHand: heroDeck.splice(0, 5),
    heroDrop: [],
    enemyDeck: enemyDeck,
    enemyDrop: [],
    elements: elements,
    element: elements[0],
  });
  const [enemyCard, setEnemyCard] = useState<null | Spell>(null);
  const [heroCard, setHeroCard] = useState<null | Spell>(null);
  const [result, setResult] = useState<null | String>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [info, setInfo] = useState<null | Spell | Enemy>(null);

  const enemyAct = () => {
    const spell = fightState.enemyDeck[0] || null;
    setEnemyCard(spell);
  };

  const selectCard = (c: Spell) => {
    if (!enemyCard) {
      console.warn("You are acting first");
      return;
    }
    setHeroCard(c);
    setfightState(enemyAttack(fightState, c, enemyCard));
    setTimeout(() => {
      setHeroCard(null);
      setEnemyCard(null);
      if (fightState.hero.life <= 0) {
        setResult("Lost");
      }
      if (fightState.enemyDrop.length === enemyHealt - 1) {
        setResult("Won");
      }
    }, 1000);
  };

  const finishFight = (resource: Resource[]) => {
    // TODO finidh fight when the result is detected, not onClick
    console.warn("Fight is finished");
    const gameState = context.gameState;

    if (!gameState) throw new Error("Can't update the fight results");

    if (result === "Won") {
      if (
        context.gameState &&
        context.gameState.player &&
        context.story?.action
      )
        context.setGameState({
          ...gameState,
          player: finishStory(context.gameState.player, context.story?.action),
        });

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
        enemyAct={enemyAct}
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
