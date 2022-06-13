import { useContext } from "react";
import { ISpell } from "../../api/engine/types";
import { GameContext } from "../App";
import { CloseButton } from "../UIElements/UIButtons";
import "./Elements";

export const ElementSpells = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.element === null) {
    throw new Error("No data in context");
  }
  const spells = context.player.spells.filter(
    (s: ISpell) => s.elementId === context.element
  );
  return (
    <div>
      <CloseButton onClick={() => context.changeElementScreen("element")} />
      <div>
        <div>{context.player.elements[context.element].element}</div>
        {spells.map((s: ISpell, i: number) => (
          <div key={i}>{s.name}</div>
        ))}
      </div>
    </div>
  );
};
