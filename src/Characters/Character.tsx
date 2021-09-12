import React, { useContext } from "react";
import { GameContext } from "../App";
import { HeroSpell, HeroSpellWithInfo } from "../Fight/HeroSpellWithInfo";
import { ElementSpells } from "../Spells/ElementSpells";
import { HeroSpellUpdate } from "../Spells/Spells";
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
  if (!character || !character.element || !context.gameState.player.spells) {
    throw new Error("Character is incorrectly formated");
  }
  const element = character.element;
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
          <HeroSpellUpdate update={u} key={i} />
        ))}
      </div>
    </div>
  );
};
