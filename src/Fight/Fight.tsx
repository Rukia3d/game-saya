import React, { useContext, useState } from "react";
import "./Fight.scss";
import { GameContext } from "../App";
// Types
import {
  ISpell,
  IEnemy,
  FightState,
  IFight,
  ISpellUpdate,
  IHero,
} from "../utils/types";
// Utils
import { generateReward } from "../utils/resourceLogic";
import { initPreFight } from "../utils/prefightloginc";
import { findFight, isValidAction } from "../utils/helpers";
import {
  finishStory,
  updateLostPlayer,
  updateWinPlayer,
} from "../utils/gamelogic";
import { displayAddedHero, displayAddedUpdate } from "../utils/screenLogic";
// Components
import { InfoCard } from "../Info/InfoCard";
import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";
import { FightResult } from "./FightResult";
import { FightScene } from "./FightScene";

export const Fight = () => {
  const context = useContext(GameContext);
  if (!context || !context.story || !context.gameState?.player) {
    throw new Error("No data in context");
  }
  const prefightState: FightState = initPreFight(
    context.gameState.player,
    findFight(context.gameState.fights, context.story.id)
  );
  const rewards = generateReward(
    prefightState.enemy,
    context.gameState.resources
  );
  const [result, setResult] = useState<null | string>(null);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [info, setInfo] = useState<
    null | ISpell | ISpellUpdate | IEnemy | IHero
  >(null);
  const fight: IFight = findFight(context.gameState.fights, context.story.id);

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
      const player = finishStory(gameState, story);
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
    context.setStory(null);
  };
  // console.log(
  //   "game state FIGHT",
  //   JSON.parse(JSON.stringify(context.gameState?.adventures[0].stories))
  // );
  return (
    <div className="Fight">
      <SettingsButton onClick={() => setSettingsOpen(false)} />
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
