import { useContext } from "react";
import { IElement } from "../api/engine/types";
import { GameContext } from "./App";
import "./Menu.scss";
export const Menu = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.setElement) {
    throw new Error("No data in context");
  }

  const selectElement = (i: number) => {
    context.setElement(i);
    context.changeMainScreen("element");
  };
  return (
    <div className="Menu">
      <div className="Chars">
        {context.player.elements.map((c: IElement, i: number) => (
          <div className="Character" key={i} onClick={() => selectElement(i)}>
            {c.characterName}
          </div>
        ))}
      </div>
      <div className="Sections">
        <div className="Section">Arena</div>
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
