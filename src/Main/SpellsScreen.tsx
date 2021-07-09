import React from "react";
import "./AdventureScreen.css";

import { CloseButton } from "../UI/CloseButton";

import { Character, Spell } from "../utils/types";

export const SpellsScreen = ({
  spells,
  character,
  clearScreen,
}: {
  spells: Spell[];
  character: Character | null;
  clearScreen: () => void;
}) => {
  return (
    <div className="Spells">
      <CloseButton onClick={clearScreen} />
      <h2>{character ? character.name : "Base spells"}</h2>
      <div className="SpellsList">
        {spells.map((s: Spell, i: number) => (
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
