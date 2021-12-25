import React, { useState } from "react";
import "./Heroes.scss";
// Types
import { ISpell } from "../utils/types";
// Utils
// Components
import { ScrollButton } from "../UI/ScrollButton";
import { Spell } from "../Spells/Spell";

const SpellsList = ({ spells }: { spells: ISpell[] }) => {
  const parsedSpells = [];
  let i,
    j,
    temporary,
    chunk = 5;
  for (i = 0, j = spells.length; i < j; i += chunk) {
    temporary = spells.slice(i, i + chunk);
    // do whatever
    parsedSpells.push(temporary);
  }
  const [groupIndex, setGroupIndex] = useState(0);
  const scrollSpells = (d: string) => {
    if (d === "r" && groupIndex < parsedSpells.length - 1) {
      setGroupIndex(groupIndex + 1);
    }
    if (d === "l" && groupIndex > 0) {
      console.log("Will scroll left");
      setGroupIndex(groupIndex - 1);
    }
  };

  return (
    <div className="SpellsList">
      <ScrollButton onClick={() => scrollSpells("r")} direction="r" />
      <div className="SpellsData">
        {parsedSpells[groupIndex].map((s: ISpell) => (
          <Spell spell={s} />
        ))}
      </div>
      <ScrollButton onClick={() => scrollSpells("l")} direction="l" />
    </div>
  );
};

export const HeroesSpells = ({ spells }: { spells: ISpell[] }) => {
  return (
    <div className="SpellsPreview">
      <SpellsList spells={spells} />
    </div>
  );
};
