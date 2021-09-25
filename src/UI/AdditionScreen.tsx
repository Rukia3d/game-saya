import React, { useContext } from "react";
import { GameContext } from "../App";
import { Hero, Spell, SpellUpdate } from "../utils/types";
import "./AdditionScreen.css";
import { ElementSpell } from "../Spells/ElementSpell";
import { ElementSpellUpdate } from "../Spells/ElementSpellUpdate";

const Update = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.addition ||
    !context.gameState ||
    !context.setAdditionScreen
  ) {
    throw new Error("No data");
  }
  const spellUpdate = context.addition;
  const element = spellUpdate.element;
  const updates =
    context.gameState.player.spellUpdates.filter(
      (u: SpellUpdate) => u.element === element
    ) || [];
  return (
    <div
      className="CharacterFull"
      aria-label="character_card"
      onClick={() => context.setAdditionScreen(null)}
    >
      <h1>New spell updates</h1>
      <div className="CharacterFullUpdates" aria-label="character_spells">
        {updates.map((u: SpellUpdate, i: number) => (
          <ElementSpellUpdate update={u} key={i} />
        ))}
      </div>
    </div>
  );
};

const Character = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.addition ||
    !context.gameState ||
    !context.setAdditionScreen
  ) {
    throw new Error("No data");
  }
  const character = context.addition;
  const element = character.element;
  if (!character || !element) {
    throw new Error("Incorrectly formatted character");
  }
  const spells =
    context.gameState.player.spells.filter(
      (s: Spell) => s.element === element
    ) || [];
  return (
    <div
      className="CharacterFull"
      aria-label="character_card"
      onClick={() => context.setAdditionScreen(null)}
    >
      <h1 aria-label="character_name">{character?.name} joined the party</h1>
      <h2>New spells</h2>
      <div className="CharacterFullSpells" aria-label="character_spells">
        {spells.map((c: Spell, i: number) => (
          <ElementSpell card={c} element={element} key={i} />
        ))}
      </div>
    </div>
  );
};

type additionScreenState = "character" | "update";

type AdditionScreensType = {
  [key in additionScreenState]: React.FC;
};

export const AdditionScreen = () => {
  const context = useContext(GameContext);
  if (!context || !context.addition || !context.setAdditionScreen) {
    throw new Error("No data");
  }
  const screen = "resource_base" in context.addition ? "update" : "character";
  const additionScreens: AdditionScreensType = {
    character: Character,
    update: Update,
  };
  const CurrentScreen = additionScreens[screen];
  return <CurrentScreen />;
};
