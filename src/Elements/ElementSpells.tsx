import { useContext } from "react";
import { ISpell } from "../../api/engine/types";
import { GameContext } from "../Main";
import { CloseButton } from "../UIElements/UIButtons";
import "./Elements";

export const ElementSpells = ({
  setSpells,
}: {
  setSpells: (b: boolean) => void;
}) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    !context.changeScreen ||
    context.element === null
  ) {
    throw new Error("No data in context");
  }
  const spells = context.player.spells.filter(
    (s: ISpell) => s.elementId === context.element
  );
  return (
    <div>
      <CloseButton onClick={() => setSpells(false)} />
      <div>
        <div>{context.player.elements[context.element].element}</div>
        {spells.map((s: ISpell, i: number) => (
          <div key={i}>{s.name}</div>
        ))}
      </div>
    </div>
  );
};
