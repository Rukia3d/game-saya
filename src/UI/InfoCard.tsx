import React from "react";
import { ElementSpellDescription } from "../Spells/ElementSpellDescription";
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
