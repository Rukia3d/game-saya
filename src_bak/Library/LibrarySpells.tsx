import React, { useContext } from "react";
import { GameContext } from "../App";
import "../Main/Library.scss";
// Types
import {
  IHero,
  IPlayerSpell,
  IPlayerSpellUpdate,
  ISpell,
  ISpellUpdate,
} from "../utils/types";
// Utils
// Components
import { HeroesSpells } from "../Heroes/HeroesSpells";

export const LibrarySpells = ({
  hero,
  setInfo,
}: {
  hero: IHero;
  setInfo?: (s: IPlayerSpell | IPlayerSpellUpdate | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }

  const allSpells = context.gameState.player.spells;
  const heroSpells = allSpells.filter(
    (s: IPlayerSpell) => s.element.color === hero.element.color
  );
  return (
    <div className="LibrarySpells">
      <HeroesSpells spells={heroSpells} setInfo={setInfo} />
    </div>
  );
};
