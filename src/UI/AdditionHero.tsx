import React from "react";
import { CurrentScreenProps } from "./AdditionScreen";
import "./AdditionScreen.css";
// Types
import { ISpell } from "../utils/types";
// Utils
// Components
import { Spell } from "../Spells/Spell";

export const AdditionHero = ({ props }: { props: CurrentScreenProps }) => {
  const character = props.item;
  const isUpdate = "resource_base" in character;
  if (isUpdate) {
    throw new Error(
      "Character component should not be used to dsplay Update screen"
    );
  }

  if (!character || !character.element) {
    throw new Error("Incorrectly formatted character");
  }

  const spells =
    props.playerSpells.filter((s: ISpell) => s.element === character.element) ||
    [];
  const element = character.element;
  return (
    <div
      className="CharacterFull"
      aria-label="character_card"
      onClick={() => props.setAdditionScreen(null)}
    >
      <h1 aria-label="character_name">{character?.name} joined the party</h1>
      <h2>New spells</h2>
      <div className="CharacterFullSpells" aria-label="character_spells">
        {spells.map((c: ISpell, i: number) => (
          <Spell spell={c} element={element} key={i} />
        ))}
      </div>
    </div>
  );
};
