import { useContext } from "react";
import { IArcana } from "../api/engine/types";
import { GameContext } from "./App";
import "./Menu.scss";
export const Menu = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.setArcana) {
    throw new Error("No data in context");
  }

  const selectArcana = (i: number) => {
    context.setArcana(i);
    context.changeMainScreen("arcana");
  };
  return (
    <div className="Menu">
      <div className="Chars">
        {context.player.arcanas.map((c: IArcana, i: number) => (
          <div className="Character" key={i} onClick={() => selectArcana(i)}>
            {c.characterName}
          </div>
        ))}
      </div>
      <div className="Sections">
        <div
          className="Section"
          onClick={() => context.changeMainScreen("arena")}
        >
          Arena
        </div>
        <div className="Section">Longe</div>
        <div className="Section">Shop</div>
      </div>
      <div className="Additional">
        <div className="Button">INV</div>
        <div className="Button">MIS</div>
        <div className="Button">MES</div>
      </div>
    </div>
  );
};
