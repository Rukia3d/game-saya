import React, { useContext } from "react";
import { GameContext } from "../App";
import "./TopMenu.css";
// Types
// Utils
// Components
import { Resources } from "../Spells/Resources";

const valueColor = (max: number, current: number): string => {
  const third = Math.ceil(max / 3);
  if (current <= third) {
    return "red";
  }
  if (current <= third * 2) {
    return "orange";
  }
  return "green";
};

const Life = ({ max, current }: { max: number; current: number }) => {
  return (
    <div className="HeroStats">
      <div className="Heart" aria-label="life_icon"></div>
      <div
        className="StatsValue"
        aria-label="life_value"
        style={{ color: valueColor(max, current) }}
      >
        {current}
      </div>
    </div>
  );
};

const Mana = ({ max, current }: { max: number; current: number }) => {
  return (
    <div className="HeroStats">
      <div className="Lightning" aria-label="mana_icon"></div>
      <div
        className="StatsValue"
        aria-label="mana_value"
        style={{ color: valueColor(max, current) }}
      >
        {current}
      </div>
    </div>
  );
};

export const TopMenu = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.player) {
    throw new Error("No Data in Context");
  }
  const player = context.gameState.player.data;

  return (
    <div className="TopMenu" aria-label="top_menu">
      <Mana max={player.maxMana} current={player.mana} />
      <Life max={player.maxLife} current={player.life} />
      {/* <Resources resources={context.gameState.player.resources} /> */}
    </div>
  );
};
