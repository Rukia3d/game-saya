import React from "react";
import { Spell } from "../utils/types";
import "./ElementSpells.css";

export const ElementSpellFrame = ({ card }: { card: Spell }) => {
  let frame: JSX.Element | null = null;
  switch (card.updates.length) {
    case 1:
      frame = (
        <img
          className="SmallCardFrame"
          src={"../img/Spells/L1frame.png"}
          alt={`spellimage_frame${card.updates.length}`}
        />
      );
      break;
    case 2:
      frame = (
        <img
          className="SmallCardFrame"
          src={"../img/Spells/L2frame.png"}
          alt={`spellimage_frame${card.updates.length}`}
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
        src={`../img/Spells/${card.image}.jpg`}
        alt={`spellimage_${card.id}`}
      />
      {frame ? frame : null}
    </>
  );
};
