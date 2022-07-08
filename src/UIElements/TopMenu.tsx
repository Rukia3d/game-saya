import { useContext } from "react";
import { IMaterialQuant } from "../../api/engine/types";
import { GameContext } from "../App";
import "./TopMenu.scss";

export const TopMenu = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  return (
    <div className="Top">
      <div>Energy: {context.player.energy}</div>
      <div>Exp: {context.player.exprience}</div>
      {context.player.materials.map((m: IMaterialQuant, i: number) => (
        <div key={i}>
          {m.name}: {m.quantity}
        </div>
      ))}
    </div>
  );
};
