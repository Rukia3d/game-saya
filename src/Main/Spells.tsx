import React from "react";
import { Card, Character } from "../utils/types";
import "./Spells.css";

const SpellPanel = ({
  character,
  image,
}: {
  character: Character | null;
  image: string | null;
}) => {
  return (
    <div className={image ? "SpellPanel" : "SpellPanel_basic"}>
      <img
        src={image ? image : "../img/base_spells.png"}
        alt={`image_${character?.id}`}
      />
    </div>
  );
};

export const Spells = ({
  spells,
  heroes,
}: {
  spells: Card[];
  heroes: Character[];
}) => {
  const characters = spells
    .map((s: Card) => s.character)
    .filter((v: any, i: any, a: any) => a.indexOf(v) === i && v);
  return (
    <div className="Spells">
      <SpellPanel character={null} image={null} />
      <div className="SpellsList">
        {characters.sort().map((s: string | null, i: number) => (
          <SpellPanel
            key={i}
            character={heroes.find((h: Character) => h.id === s) || null}
            image={heroes.find((h: Character) => h.id === s)?.image || null}
          />
        ))}
      </div>
    </div>
  );
};
