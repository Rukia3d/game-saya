import React, { useContext } from "react";
import { GameContext } from "../App";
import { Spell, SpellUpdate } from "../utils/types";
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
  const isUpdate = "resource_base" in context.addition;
  if (!isUpdate) {
    throw new Error(
      "Update component should not be used to dsplay Hero screen"
    );
  }
  const spellUpdate = context.addition;
  return (
    <div
      className="CharacterFull"
      aria-label="character_card"
      onClick={() => context.setAdditionScreen(null)}
    >
      <h1>New spell updates</h1>
      <div className="CharacterFullUpdates" aria-label="character_spells">
        <ElementSpellUpdate update={spellUpdate as SpellUpdate} />
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
  const isUpdate = "resource_base" in context.addition;
  if (isUpdate) {
    throw new Error(
      "Character component should not be used to dsplay Update screen"
    );
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
