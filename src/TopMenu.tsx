import React, { useContext } from "react";
import { GameContext } from "./App";

export const TopMenu = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const items = [
    ["energy", context.player.energy],
    ["experience", context.player.exprience],
    [context.player.materials[0].name, context.player.materials[0].quantity],
  ];
  return (
    <div className="TopMenu" data-testid="top-menu">
      {items.map((m: any, n: number) => (
        <div className="Material" key={n}>
          {m[0]}
          <br />
          {m[1]}
        </div>
      ))}
    </div>
  );
};
