import React, { useState } from "react";
import "./CharacterSpells.css";

import { CloseButton } from "../UI/CloseButton";

import { Character, Spell } from "../utils/types";
import { InfoCard } from "../UI/InfoCard";
import { HeroSpellWithInfo } from "../Fight/HeroBlock";

export const CharacterSpells = ({
  hero,
  spells,
  setHero,
}: {
  hero: Character | "Base";
  spells: Spell[];
  setHero: (s: Character | null | "Base") => void;
}) => {
  const [info, setInfo] = useState<null | Spell>(null);
  const selectCard = (s: Spell) => {};
  return (
    <div className="CharacterSpells">
      <h1>{`${hero !== "Base" ? hero.name : "Basic"} spells`}</h1>
      <CloseButton onClick={() => setHero(null)} />
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      <div className="AllCharacterSpells" aria-label="character_spells">
        {spells.map((c: Spell, i: number) => (
          <HeroSpellWithInfo
            key={i}
            selectCard={selectCard}
            setInfo={setInfo}
            card={c}
          />
        ))}
      </div>
    </div>
  );
};
