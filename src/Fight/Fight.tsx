import React, { useContext, useState } from "react";
import "./Fight.css";

import { InfoCard } from "../UI/InfoCard";
import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";

import {
  Spell,
  Enemy,
  Resource,
  elementType,
  FightState,
} from "../utils/types";
import {
  findActiveCharacters,
  findStoryCharacters,
  isValidAction,
  shuffle,
} from "../utils/helpers";
import {
  finishStory,
  generateDeck,
  generateEnemyDeck,
  updateLostPlayer,
  updateWinPlayer,
} from "../utils/gamelogic";
import { FightResult } from "./FightResult";
import { GameContext } from "../App";
import { displayAddedHero, displayAddedUpdate } from "../utils/screenLogic";
import { FightScene } from "./FightScene";
import { generateReward } from "../utils/resourceLogic";

export const Fight = () => {
  const context = useContext(GameContext);
  if (!context || !context.story || !context.gameState) {
    throw new Error("No data in context");
  }
  // This needs to go into useFightState hook
  const enemyId = context.story.enemy;
  const enemies = context.gameState.player.enemies;
  const player = context.gameState.player;

  if (!enemyId) {
    throw new Error("No enemy for this fight, something went very wrong");
  }

  const storyCharacters = context.story.characters
    ? findStoryCharacters(context.story.characters, player.heroes)
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
  if (enemyDeck.length < 1) {
    throw new Error(`Couldn't generate cards for enemy`);
  }
  const elements: elementType[] = shuffle([
    "fire",
    "earth",
    "metal",
    "water",
    "air",
  ]);

  const prefightState: FightState = {
    hero: {
      maxLife: player.data.maxLife,
      life: player.data.life,
      maxMana: player.data.maxMana,
      mana: player.data.mana,
    },
    heroes: storyCharacters,
    enemy: enemy,
    heroDeck: heroDeck,
    heroCardIndex: null,
    heroHand: heroDeck.splice(0, 5),
    heroDrop: [],
    enemyDeck: enemyDeck,
    enemyDrop: [],
    enemyCardIndex: null,
    elements: elements,
    element: elements[0],
  };
  const [result, setResult] = useState<null | String>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [info, setInfo] = useState<null | Spell | Enemy>(null);
  const [rewards, setRewards] = useState(
    generateReward(enemy, context.gameState.resources)
  );

  // This needs to go into finish fight hook
  const finishFight = () => {
    console.log("Fight is finished with", result);
    const gameState = context.gameState;
    const story = context.story;
    if (!gameState || !story) throw new Error("Can't update the fight results");
    isValidAction(story.action);
    if (result === "Won") {
      displayAddedHero(
        gameState.player.heroes,
        gameState.heroes,
        story.action,
        context.setAdditionScreen
      );
      displayAddedUpdate(
        gameState.player.spellUpdates,
        gameState.spellUpdates,
        story.action,
        context.setAdditionScreen
      );
      const player = finishStory(gameState, story.action);
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
      <FightScene
        prefightState={prefightState}
        setInfo={setInfo}
        setResult={setResult}
      />
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      {result ? (
        <FightResult
          finishFight={finishFight}
          result={result}
          rewards={rewards}
        />
      ) : null}
    </div>
  );
};
