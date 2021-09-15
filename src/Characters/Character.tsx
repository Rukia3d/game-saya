import React, { useContext } from "react";
import { GameContext } from "../App";
import { HeroSpell } from "../Fight/HeroSpellWithInfo";
import { ElementSpellUpdate } from "../Spells/ElementSpellUpdates";
import { Spell, SpellUpdate } from "../utils/types";
import "./Character.css";

export const Character = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.character ||
    !context.gameState ||
    !context.setCharacter
  ) {
    throw new Error("No data");
  }
  const character = context.character;
  const element = character.element;
  if (!character || !element) {
    throw new Error("Incorrectly formatted character");
  }
  const spells =
    context.gameState.player.spells.filter(
      (s: Spell) => s.element === element
    ) || [];
  const updates =
    context.gameState.player.spellUpdates.filter(
      (u: SpellUpdate) => u.element === element
    ) || [];
  return (
    <div
      className="CharacterFull"
      aria-label="character_card"
      onClick={() => context.setCharacter(null)}
    >
      <h1 aria-label="character_name">{character?.name} joined the party</h1>
      <h2>New spells</h2>
      <div className="CharacterFullSpells" aria-label="character_spells">
        {spells.map((c: Spell, i: number) => (
          <HeroSpell card={c} element={element} key={i} />
        ))}
      </div>
      <h2>New spell updates</h2>
      <div className="CharacterFullUpdates" aria-label="character_spells">
        {updates.map((u: SpellUpdate, i: number) => (
          <ElementSpellUpdate update={u} key={i} />
        ))}
      </div>
    </div>
  );
};
