import React from "react";
import { ElementSpellDescription } from "../Spells/ElementSpellDescription";
import { ElementSpellUpdated } from "../Spells/ElementSpellUpdated";
import "./InfoCard.css";

export const InfoCard = ({
  item,
  setInfo,
}: {
  item: any;
  setInfo: (s: any) => void;
}) => {
  console.log("item.updates", item.updates);
  if (item.updates) {
    return (
      <div
        className="InfoCard"
        aria-label="info_card"
        onClick={() => setInfo(null)}
      >
        <ElementSpellDescription card={item} />
        {item.updates.map((s: string) => (
          <ElementSpellUpdated updateId={s} />
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
