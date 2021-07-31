import React, { useContext } from "react";
import { GameContext } from "../App";
import { OwnedResource } from "../utils/types";
import "./TopMenu.css";

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

const Resource = ({ resource }: { resource: OwnedResource }) => {
  return (
    <div className="Resource" aria-label="top_resource">
      {resource.name}: {resource.quantity}
    </div>
  );
};

const Resources = ({ resources }: { resources: OwnedResource[] }) => {
  const existing = resources.filter((r: OwnedResource) => r.quantity > 0);
  return (
    <div className="Resources" aria-label="top_resources">
      {existing.map((r: OwnedResource, i: number) => (
        <Resource resource={r} key={i} />
      ))}
    </div>
  );
};

const Life = ({ max, current }: { max: number; current: number }) => {
  return (
    <div className="Stats">
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
    <div className="Stats">
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
    throw new Error("No data");
  }
  const player = context.gameState.player.data;

  return (
    <div className="TopMenu" aria-label="top_menu">
      <Mana max={player.maxMana} current={player.mana} />
      <Life max={player.maxLife} current={player.life} />
      <Resources resources={context.gameState.player.resources} />
    </div>
  );
};
