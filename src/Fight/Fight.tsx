import React, { useContext, useState } from "react";
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
import { enemyAttack } from "../utils/fightlogic";
import { FightResult } from "./FightResult";
import { GameContext } from "../App";
import { BigCard } from "./BigCard";
import { generateReward } from "../utils/resourceLogic";
import { gameState } from "../utils/testobjects";
import { displayAddedHero, displayAddedUpdate } from "../utils/screenLogic";

/*Start animation
Assign enemy element
Give cards
*/

/*Element animation
Change Element
*/

/*Hit animation
Hit hero
*/

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
    heroes: storyCharacters,
    enemy: enemy,
    heroDeck: heroDeck,
    heroCard: null,
    heroHand: heroDeck.splice(0, 5),
    heroDrop: [],
    enemyDeck: enemyDeck,
    enemyDrop: [],
    enemyCard: null,
    elements: elements,
    element: elements[0],
  });
  const [result, setResult] = useState<null | String>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [info, setInfo] = useState<null | Spell | Enemy>(null);
  const [rewards, setRewards] = useState<null | Resource[]>(null);

  const enemyAct = () => {
    const spell = fightState.enemyDeck[0] || null;
    setfightState({ ...fightState, enemyCard: spell });
  };

  const selectCard = (card: Spell) => {
    if (!fightState.enemyCard) {
      console.warn("You are acting first");
      return;
    }
    setfightState({ ...fightState, heroCard: card });
    setTimeout(() => {
      setfightState(enemyAttack(fightState));
    }, 500);
    setTimeout(() => {
      actionEnd();
    }, 1000);
  };

  const actionEnd = () => {
    setfightState({ ...fightState, enemyCard: null, heroCard: null });
    if (fightState.hero.life <= 0) {
      setResult("Lost");
    }
    if (fightState.enemyDrop.length === enemyHealt - 1) {
      const rewards = generateReward(enemy, gameState.resources);
      setRewards(rewards);
      setResult("Won");
    }
  };

  const finishFight = () => {
    console.warn("Fight is finished");
    const gameState = context.gameState;
    const story = context.story;
    if (!gameState || !story) throw new Error("Can't update the fight results");
    isValidAction(story.action);
    if (result === "Won" && rewards) {
      const player = finishStory(gameState, story.action);
      context.setGameState({
        ...gameState,
        player: updateWinPlayer(player, enemy, rewards),
      });
      displayAddedHero(
        gameState.heroes,
        story.action,
        context.setAdditionScreen
      );
      displayAddedUpdate(
        gameState.spellUpdates,
        story.action,
        context.setAdditionScreen
      );
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
      {fightState.enemyCard ? (
        <BigCard
          card={fightState.enemyCard}
          setInfo={setInfo}
          element={fightState.element}
        />
      ) : null}
      {fightState.heroCard ? (
        <BigCard
          card={fightState.heroCard}
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
