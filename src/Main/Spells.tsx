import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import { HeroSpellWithInfo } from "../Fight/HeroBlock";
import { CloseButton } from "../UI/CloseButton";
import { InfoCard } from "../UI/InfoCard";
import { Character, Spell } from "../utils/types";
import "./Spells.css";

const CharacterSpells = ({
  spells,
  setHero,
}: {
  spells: Spell[];
  setHero: (s: Character | null | "Base") => void;
}) => {
  const [info, setInfo] = useState<null | Spell>(null);
  const selectCard = (s: Spell) => {};
  return (
    <div className="CharacterSpells">
      <h1>hero spells</h1>
      <CloseButton onClick={() => setHero(null)} />
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      <div className="AllCharacterSpells">
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

const SpellPanel = ({
  character,
  image,
  setHero,
}: {
  character: Character | null;
  image: string | null;
  setHero: (s: Character | null | "Base") => void;
}) => {
  return (
    <div
      className={image ? "SpellPanel" : "SpellPanel_basic"}
      onClick={() => setHero(character ? character : "Base")}
    >
      <img
        src={image ? image : "../img/base_spells.png"}
        alt={`image_${character ? character.id : "base"}_spells`}
      />
    </div>
  );
};

export const Spells = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data");
  }
  const spells = context.gameState.player.cards;
  const heroes = context.gameState.player.heroes;

  const [hero, setHero] = useState<null | Character | "Base">(null);
  const characters = spells
    .map((s: Spell) => s.character)
    .filter((v: any, i: any, a: any) => a.indexOf(v) === i && v);

  if (hero) {
    return (
      <div className="Spells">
        <CharacterSpells
          setHero={setHero}
          spells={
            hero === "Base"
              ? spells.filter((s: Spell) => s.character === null)
              : spells.filter((s: Spell) => s.character === hero.id)
          }
        />
      </div>
    );
  }
  return (
    <div className="Spells">
      <SpellPanel character={null} image={null} setHero={setHero} />
      <div className="SpellsList">
        {characters.sort().map((s: string | null, i: number) => (
          <SpellPanel
            key={i}
            character={heroes.find((h: Character) => h.id === s) || null}
            image={heroes.find((h: Character) => h.id === s)?.image || null}
            setHero={setHero}
          />
        ))}
      </div>
    </div>
  );
};
