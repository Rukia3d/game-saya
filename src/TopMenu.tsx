import React, { useContext } from "react";
import { IInventoryQuant } from "../api/engine/types";
import { GameContext } from "./App";

export const TopMenu = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  return (
    <div className="TopMenu" data-testid="top-menu">
      {context.player.materials.map((m: IInventoryQuant, n: number) => (
        <div className="Material" key={n}>
          {m.name.substring(0, 4)} {m.quantity}
        </div>
      ))}
    </div>
  );
};
