import React from "react";
import "./Spells.scss";
// Types
import { ISpell, ISpellUpdate } from "../utils/types";
// Utils
// Components
import { SpellUpdated } from "./SpellUpdated";

export const SpellDescription = ({ spell }: { spell: ISpell }) => {
  return (
    <div>
      <h3 aria-label="card_name_header">{spell.name}</h3>
      <p>Strength: {spell.strength}</p>
      <p>{spell.element ? "Element " + spell.element : null}</p>
      <p>{spell.selected ? "Equiped" : null}</p>
      <p>{spell.mana ? "Special" : null}</p>
      {spell.updates.length > 0
        ? spell.updates.map((u: ISpellUpdate, i: number) => (
            <SpellUpdated update={u} key={i} />
          ))
        : null}
    </div>
  );
};
