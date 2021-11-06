import React from "react";
import "./InfoCard.css";
// Types
// Utils
// Components
import { SpellDescription } from "../Spells/SpellDescription";

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
        <SpellDescription spell={item} />
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
