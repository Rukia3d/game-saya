import React, { useContext } from "react";
import { GameContext } from "../App";
import "./TopMenu.scss";
// Types
// Utils
// Components
import { Resources } from "../Spells/Resources";
import { FightState, ISpell } from "../utils/types";

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

const Spells = ({ cards }: { cards: ISpell[] }) => {
  return (
    <div className="SpellStats">
      <div className="Spell" aria-label="mana_icon"></div>
      <div className="StatsValue" aria-label="spell_value">
        {cards.length}
      </div>
    </div>
  );
};

export const TopMenu = ({ cards }: { cards?: ISpell[] }) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.player) {
    throw new Error("No Data in Context");
  }
  const player = context.gameState.player.data;

  return (
    <div className="TopMenu" aria-label="top_menu">
      <Life max={player.maxLife} current={player.life} />
      <Mana max={player.maxMana} current={player.mana} />
      {cards ? <Spells cards={cards} /> : null}
    </div>
  );
};
