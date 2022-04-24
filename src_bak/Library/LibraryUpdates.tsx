import React, { useContext } from "react";
import { GameContext } from "../App";
import "../Main/Library.scss";
// Types
import {
  IHero,
  IPlayerHero,
  IPlayerSpell,
  IPlayerSpellUpdate,
  ISpell,
  ISpellUpdate,
} from "../utils/types";
// Utils
// Components
import { SpellUpdates } from "../Spells/SpellUpdates";

export const LibraryUpdates = ({
  hero,
  setInfo,
}: {
  hero: IPlayerHero;
  setInfo?: (s: IPlayerSpell | IPlayerSpellUpdate | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }
  const allUpdates = context.gameState.player.updates;
  const heroUpdates = allUpdates.filter(
    (s: ISpellUpdate) => s.school === hero.element.school
  );

  return (
    <div className="LibraryUpdates">
      <SpellUpdates spellUpgrades={heroUpdates} updateInfo={setInfo} />
    </div>
  );
};
