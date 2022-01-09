import React, { useContext, useState } from "react";
import "./Fight.scss";
import { GameContext } from "../App";
// Types
import {
  ISpell,
  IEnemy,
  FightState,
  ISpellUpdate,
  IHero,
} from "../utils/types";
// Utils
import { generateReward } from "../utils/resourceLogic";
import { initPreFight } from "../utils/prefightloginc";
import { findFight } from "../utils/helpers";
// Components
import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";
import { FightResult } from "./FightResult";
import { FightContent } from "./FightContent";

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

  // console.log(
  //   "game state FIGHT",
  //   JSON.parse(JSON.stringify(context.gameState?.adventures[0].stories))
  // );
  return (
    <div className="Fight" aria-label="fight-screen">
      {settingsOpen ? <Settings /> : null}
      <SettingsButton onClick={() => setSettingsOpen(false)} />
      <FightContent prefightState={prefightState} setResult={setResult} />
      {result ? (
        <FightResult
          result={result}
          rewards={rewards}
          enemy={prefightState.enemy}
        />
      ) : null}
    </div>
  );
};
