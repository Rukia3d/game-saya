import React, { useContext } from "react";
import { GameContext } from "../App";
import "../Main/Library.scss";
// Types
import { IHero, ISpell, ISpellUpdate } from "../utils/types";
// Utils
// Components
import { HeroesSpells } from "../Heroes/HeroesSpells";

export const LibrarySpells = ({
  hero,
  setInfo,
}: {
  hero: IHero;
  setInfo?: (s: ISpell | ISpellUpdate | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }

  const allSpells = context.gameState.player.spells;
  const heroSpells = allSpells.filter((s: ISpell) => s.element === hero.color);
  return (
    <div className="LibrarySpells">
      <HeroesSpells spells={heroSpells} setInfo={setInfo} />
    </div>
  );
};
