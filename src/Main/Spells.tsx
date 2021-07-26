import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import { TopMenu } from "../UI/TopMenu";
import { Character, Spell } from "../utils/types";
import { CharacterSpells } from "./CharacterSpells";
import "./Spells.css";

const SpellPanel = ({
  character,
  image,
  setHero,
}: {
  character: Character | null;
  image: boolean;
  setHero: (s: Character | null | "Base") => void;
}) => {
  return (
    <div
      className={image ? "SpellPanel" : "SpellPanel_basic"}
      onClick={() => setHero(character ? character : "Base")}
    >
      <img
        src={
          character
            ? `../img/${character.id}_spells.png`
            : "../img/base_spells.png"
        }
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
          hero={hero}
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
      <TopMenu />
      <SpellPanel character={null} image={false} setHero={setHero} />
      <div className="SpellsList">
        {characters.sort().map((s: string | null, i: number) => (
          <SpellPanel
            key={i}
            character={heroes.find((h: Character) => h.id === s) || null}
            image
            setHero={setHero}
          />
        ))}
      </div>
    </div>
  );
};
