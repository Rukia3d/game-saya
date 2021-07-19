import React, { useContext } from "react";
import { GameContext } from "../App";
import { OwnedResource } from "../utils/types";
import "./TopMenu.css";

const Resource = ({ resource }: { resource: OwnedResource }) => {
  return (
    <div className="Resource" aria-label="top_resource">
      {resource.name}: {resource.quantity}
    </div>
  );
};

const Resources = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.gameState.player ||
    !context.gameState.player.resources
  ) {
    throw new Error("No resources to load");
  }
  const existing = context.gameState.player.resources.filter(
    (r: OwnedResource) => r.quantity > 0
  );
  return (
    <div className="Resources" aria-label="top_resources">
      {existing.map((r: OwnedResource, i: number) => (
        <Resource resource={r} key={i} />
      ))}
    </div>
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
      <Resources />
    </div>
  );
};
