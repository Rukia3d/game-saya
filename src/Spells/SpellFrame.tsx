import React from "react";
import "./Spells.css";
// Types
import { ISpell } from "../utils/types";
// Utils
// Components

export const SpellFrame = ({ spell }: { spell: ISpell }) => {
  let frame: JSX.Element | null = null;
  switch (spell.updates.length) {
    case 1:
      frame = (
        <img
          className="SmallCardFrame"
          src={"../img/Spells/L1frame.png"}
          alt={`spellimage_frame${spell.updates.length}`}
        />
      );
      break;
    case 2:
      frame = (
        <img
          className="SmallCardFrame"
          src={"../img/Spells/L2frame.png"}
          alt={`spellimage_frame${spell.updates.length}`}
        />
      );
      break;
    default:
      frame = null;
  }
  return (
    <>
      <img
        className="SmallCardImage"
        src={`../img/Spells/${spell.image}.jpg`}
        alt={`spellimage_${spell.id}`}
      />
      {frame ? frame : null}
    </>
  );
};
