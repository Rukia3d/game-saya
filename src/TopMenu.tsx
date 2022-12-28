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
      <div className="Player">Hello, {context.player.name}</div>
      <div className="Materials">
        {context.player.materials.map((m: IInventoryQuant, n: number) => (
          <div className="Material" key={n}>
            <img src={`../pics/icons/${m.name}.png`} alt={m.name} />
            <div>{m.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
