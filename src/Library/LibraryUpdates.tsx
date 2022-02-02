import React, { useContext } from "react";
import { GameContext } from "../App";
import "../Main/Library.scss";
// Types
import { IHero, ISpell, ISpellUpdate } from "../utils/types";
// Utils
// Components
import { SpellUpdates } from "../Spells/SpellUpdates";

export const LibraryUpdates = ({
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
  const allUpdates = context.gameState.player.spellUpdates;
  const heroUpdates = allUpdates.filter(
    (s: ISpellUpdate) => s.school === hero.school
  );

  return (
    <div className="LibraryUpdates">
      <SpellUpdates spellUpgrades={heroUpdates} updateInfo={setInfo} />
    </div>
  );
};
