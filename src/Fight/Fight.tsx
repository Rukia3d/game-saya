import React, { useContext, useState } from "react";
import "./Fight.css";

import { InfoCard } from "../UI/InfoCard";
import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";

import { Spell, Enemy, FightState, Player, Story } from "../utils/types";
import {
  findActiveCharacters,
  findStoryCharacters,
  isValidAction,
} from "../utils/helpers";
import {
  finishStory,
  updateLostPlayer,
  updateWinPlayer,
} from "../utils/gamelogic";
import { FightResult } from "./FightResult";
import { GameContext } from "../App";
import { displayAddedHero, displayAddedUpdate } from "../utils/screenLogic";
import { FightScene } from "./FightScene";
import { generateReward } from "../utils/resourceLogic";
import { findEnemy, initFight } from "../utils/fightlogic";

const initPreFight = (player: Player, story: Story) => {
  const storyCharacters = story.characters
    ? findStoryCharacters(story.characters, player.heroes)
    : findActiveCharacters(player.heroes);

  const enemy = findEnemy(player.enemies, story.enemy);

  const [heroDeck, enemyDeck, elements] = initFight(
    storyCharacters,
    player.spells,
    enemy
  );

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
  return prefightState;
};

export const Fight = () => {
  const context = useContext(GameContext);
  if (!context || !context.story || !context.gameState?.player) {
    throw new Error("No data in context");
  }

  const prefightState: FightState = initPreFight(
    context.gameState.player,
    context.story
  );
  const rewards = generateReward(
    prefightState.enemy,
    context.gameState.resources
  );
  const [result, setResult] = useState<null | String>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [info, setInfo] = useState<null | Spell | Enemy>(null);

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
        player: updateWinPlayer(player, prefightState.enemy, rewards),
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
