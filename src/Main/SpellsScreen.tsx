import React from "react";
import "./AdventureScreen.css";

import { CloseButton } from "../UI/CloseButton";

import { Card, Character } from "../utils/types";

export const SpellsScreen = ({
  spells,
  character,
  clearScreen,
}: {
  spells: Card[];
  character: Character | null;
  clearScreen: () => void;
}) => {
  return (
    <div className="Spells">
      <CloseButton onClick={clearScreen} />
      <h2>{character ? character.name : "Base spells"}</h2>
      <div className="SpellsList">
        {spells.map((s: Card, i: number) => (
          <div key={i} onClick={() => {}}>
            <img
              src={s.image}
              alt={`spell_${s.id}`}
              className="Spell"
              style={{ opacity: s.selected ? 0.5 : 1 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
