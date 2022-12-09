import React, { useContext } from "react";
import { GameContext } from "./App";

export const TopMenu = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  return (
    <div className="TopMenu" data-testid="top-menu">
      {context.player.materials.map((m: any, n: number) => (
        <div className="Material" key={n}>
          {m[0]}
          <br />
          {m[1]}
        </div>
      ))}
    </div>
  );
};
