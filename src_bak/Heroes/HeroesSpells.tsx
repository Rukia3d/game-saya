import React, { useState } from "react";
import "./Heroes.scss";
// Types
import { IPlayerSpell, ISpell } from "../utils/types";
// Utils
// Components
import { ScrollButton } from "../UI/ScrollButton";
import { Spell } from "../Spells/Spell";

const SPELLSPERSCROLL = 4;

const SpellsList = ({
  spells,
  setInfo,
}: {
  spells: IPlayerSpell[];
  setInfo?: (s: IPlayerSpell | null) => void;
}) => {
  const parsedSpells = [];
  let i,
    j,
    temporary,
    chunk = SPELLSPERSCROLL;
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
      setGroupIndex(groupIndex - 1);
    }
  };
  return (
    <div className="SpellsList">
      <ScrollButton onClick={() => scrollSpells("r")} direction="r" />
      <div className="SpellsData">
        {/* {parsedSpells[groupIndex].map((s: ISpell, i: number) => (
          <Spell spell={s} withBorder withName spellInfo={setInfo} key={i} />
        ))} */}
      </div>
      <ScrollButton onClick={() => scrollSpells("l")} direction="l" />
    </div>
  );
};

export const HeroesSpells = ({
  spells,
  setInfo,
}: {
  spells: IPlayerSpell[];
  setInfo?: (s: IPlayerSpell | null) => void;
}) => {
  return (
    <div className="SpellsPreview">
      <SpellsList spells={spells} setInfo={setInfo} />
    </div>
  );
};
