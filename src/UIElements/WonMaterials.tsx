import { useContext } from "react";
import { IMaterialQuant } from "../../api/engine/types";
import { GameContext } from "../App";
import "./WonMaterials.scss";

export const WonMaterials = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.player.currentState.materials) {
    throw new Error("No data in context");
  }

  return (
    <div className="WonMaterials">
      <h2>YOU WIN</h2>
      {context.player.currentState.materials.map(
        (m: IMaterialQuant, i: number) => (
          <div key={i}>
            {m.name}: {m.quantity}
          </div>
        )
      )}
    </div>
  );
};
