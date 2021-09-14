import React, { useContext, useEffect, useState } from "react";
import "./Fight.css";

import { InfoCard } from "../UI/InfoCard";
import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";
import { CharacterBox } from "./CharacterBox";
import { HeroBlock } from "./HeroBlock";

import {
  Spell,
  Enemy,
  FightState,
  Resource,
  elementType,
  StoryAction,
} from "../utils/types";
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
import { generateReward } from "../utils/resourceLogic";
import { gameState } from "../utils/testobjects";

export const Fight = () => {
  const context = useContext(GameContext);
  if (!context || !context.story || !context.gameState) {
    throw new Error("No data in context");
  }

  const enemyId = context.story.enemy;
  const enemies = context.gameState.player.enemies;
  const player = context.gameState.player;

  if (!enemyId) {
    throw new Error("No enemy for this fight, something went very wrong");
  }

  const storyCharacters = context.story.characters
    ? context.story.characters
    : findActiveCharacters(player.heroes);
  const enemy: Enemy | null =
    enemies.find((e: any) => e.id === enemyId) || null;

  if (!enemy) {
    throw new Error(`Can't find the enemy ${enemyId}`);
  }
  const heroDeck = shuffle(generateDeck(storyCharacters, player.spells));
  if (heroDeck.length === 0) {
    throw new Error(`Couldn't generate cards for player`);
  }
  const enemyDeck = shuffle(generateEnemyDeck(enemy)); //shuffle(generateEnemyDeck());
  const enemyHealt = enemyDeck.length;
  if (enemyHealt < 1) {
    throw new Error(`Couldn't generate cards for enemy`);
  }
  const elements: elementType[] = shuffle([
    "fire",
    "earth",
    "metal",
    "water",
    "air",
  ]);
  const [fightState, setfightState] = useState<FightState>({
    hero: {
      maxLife: player.data.maxLife,
      life: player.data.life,
      maxMana: player.data.maxMana,
      mana: player.data.mana,
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
  const [rewards, setRewards] = useState<null | Resource[]>(null);

  // useEffect(() => {
  //   console.log("Use effect");
  //   const gameState = context.gameState;
  //   const story = context.story;
  //   if (!gameState || !story) throw new Error("Can't update the fight results");
  //   const actions = story.action;

  //   if (result === "Won" && rewards) {
  //     const player = finishStory(gameState, actions);
  //     context.setGameState({
  //       ...gameState,
  //       player: updateWinPlayer(player, enemy, rewards),
  //     });
  //   }

  //   if (result === "Lost") {
  //     context.setGameState({
  //       ...gameState,
  //       player: updateLostPlayer(gameState.player),
  //     });
  //   }
  // }, [result, context, enemy, rewards]);

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
        const rewards = generateReward(enemy, gameState.resources);
        setRewards(rewards);
        setResult("Won");
      }
    }, 1000);
  };

  const finishFight = () => {
    console.warn("Fight is finished");
    const gameState = context.gameState;
    const story = context.story;
    if (!gameState || !story) throw new Error("Can't update the fight results");
    const actions = story.action;
    if (result === "Won" && rewards) {
      const player = finishStory(gameState, actions);
      context.setGameState({
        ...gameState,
        player: updateWinPlayer(player, enemy, rewards),
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
  // console.log(
  //   "game state FIGHT",
  //   JSON.parse(JSON.stringify(context.gameState?.adventures[0].stories))
  // );
  return (
    <div className="Fight">
      <SettingsButton onClick={() => setSettingsOpen(!settingsOpen)} />
      {settingsOpen ? <Settings /> : null}
      {enemyCard ? (
        <BigCard
          card={enemyCard}
          setInfo={setInfo}
          element={fightState.element}
        />
      ) : null}
      {heroCard ? (
        <BigCard
          card={heroCard}
          setInfo={setInfo}
          element={fightState.element}
        />
      ) : null}
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      {result ? (
        <FightResult
          finishFight={finishFight}
          result={result}
          rewards={rewards}
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
