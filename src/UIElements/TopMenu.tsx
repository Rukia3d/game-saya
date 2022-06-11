import { useContext } from "react";
import { IMaterialOwned } from "../../api/engine/types";
import { GameContext } from "../Main";
import "./TopMenu.scss";

export const TopMenu = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  return (
    <div className="Top">
      <div>Energy: {context.player.energy}</div>
      {context.player.materials.map((m: IMaterialOwned, i: number) => (
        <div key={i}>
          {m.name}: {m.quantity}
        </div>
      ))}
    </div>
  );
};
