import React, { useContext } from "react";
import { GameContext } from "../App";
import "./TopMenu.css";

const Mana = ({ max, current }: { max: number; current: number }) => {
  const manaColor = (): string => {
    const third = Math.ceil(max / 3);
    if (current <= third) {
      return "red";
    }
    if (current <= third * 2) {
      return "orange";
    }
    return "green";
  };
  return (
    <div className="Mana">
      <div className="Lightning" aria-label="mana_icon"></div>
      <div
        className="ManaValue"
        aria-label="mana_value"
        style={{ color: manaColor() }}
      >
        {current}
      </div>
    </div>
  );
};

export const TopMenu = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.player) {
    throw new Error("No data");
  }
  const player = context.gameState.player;
  return (
    <div className="TopMenu" aria-label="top_menu">
      <Mana max={player.maxMana} current={player.mana} />
    </div>
  );
};
