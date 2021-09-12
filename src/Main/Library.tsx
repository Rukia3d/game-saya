import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import { ElementSpells } from "../Spells/ElementSpells";
import { TopMenu } from "../UI/TopMenu";
import { elementType, Spell } from "../utils/types";
import "./Library.css";

const LibraryPanel = ({
  element,
  image,
  setElement,
}: {
  element: elementType;
  image: boolean;
  setElement: (s: elementType) => void;
}) => {
  return (
    <div className="SpellPanel" onClick={() => setElement(element)}>
      <img
        src={`../img/Spells/${element}_spellsAll.png`}
        alt={`image_${element}_spells`}
      />
    </div>
  );
};

export const Library = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data");
  }
  const spells = context.gameState.player.spells;

  const [element, setElement] = useState<elementType | null>(null);
  const elements = spells
    .map((s: Spell) => s.element)
    .filter((v: any, i: any, a: any) => a.indexOf(v) === i && v);

  if (element) {
    return (
      <div className="Spells">
        <TopMenu />
        <ElementSpells
          element={element}
          setElement={setElement}
          spells={spells.filter((s: Spell) => s.element === element)}
        />
      </div>
    );
  }

  return (
    <div className="Spells">
      <TopMenu />
      <div className="SpellsList">
        {elements.sort().map((s: elementType, i: number) => (
          <LibraryPanel key={i} element={s} image setElement={setElement} />
        ))}
      </div>
    </div>
  );
};
