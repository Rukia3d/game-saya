import React, { useContext } from "react";
import { GameContext } from "../App";
import "./TopMenu.css";

const Life = ({
  w = "30",
  h = "30",
  fill = false,
}: {
  w?: string;
  h?: string;
  fill?: boolean;
}) => {
  return (
    <svg className="heart" height={h} width={w} viewBox="0 0 475.528 475.528">
      <path
        className={fill ? "filled" : "empty"}
        d="M237.376,436.245l0.774,0.976c210.94-85.154,292.221-282.553,199.331-367.706
        c-92.899-85.154-199.331,30.953-199.331,30.953h-0.774c0,0-106.44-116.107-199.331-30.953
        C-54.844,154.658,26.437,351.092,237.376,436.245z"
      />
    </svg>
  );
};

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
