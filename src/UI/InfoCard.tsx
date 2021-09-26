import React from "react";
import { ElementSpellDescription } from "../Spells/ElementSpellDescription";
import { ElementSpellUpdated } from "../Spells/ElementSpellUpdated";
import { SpellUpdate } from "../utils/types";
import "./InfoCard.css";

export const InfoCard = ({
  item,
  setInfo,
}: {
  item: any;
  setInfo: (s: any) => void;
}) => {
  if (item.updates) {
    return (
      <div
        className="InfoCard"
        aria-label="info_card"
        onClick={() => setInfo(null)}
      >
        <ElementSpellDescription card={item} />
        {item.updates.map((s: SpellUpdate, i: number) => (
          <ElementSpellUpdated update={s} key={i} />
        ))}
      </div>
    );
  }
  return (
    <div
      className="InfoCard"
      aria-label="info_card"
      onClick={() => setInfo(null)}
    >
      <h1>I am not a card</h1>
    </div>
  );
};
