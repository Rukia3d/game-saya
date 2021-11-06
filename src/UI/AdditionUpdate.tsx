import React from "react";
import { CurrentScreenProps } from "./AdditionScreen";
import "./AdditionScreen.css";
// Types
import { ISpellUpdate } from "../utils/types";
// Utils
// Components
import { SpellUpdate } from "../Spells/SpellUpdate";

export const AdditionUpdate = ({ props }: { props: CurrentScreenProps }) => {
  const isUpdate = "resource_base" in props.item;
  if (!isUpdate) {
    throw new Error(
      "Update component should not be used to dsplay Hero screen"
    );
  }
  const spellUpdate = props.item;
  return (
    <div
      className="CharacterFull"
      aria-label="character_card"
      onClick={() => props.setAdditionScreen(null)}
    >
      <h1>New spell updates</h1>
      <div className="CharacterFullUpdates" aria-label="character_spells">
        <SpellUpdate update={spellUpdate as ISpellUpdate} />
      </div>
    </div>
  );
};
