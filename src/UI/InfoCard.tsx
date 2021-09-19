import React from "react";
import {
  HeroSpellDescription,
  HeroSpellUpdate,
} from "../Spells/SpellUpdateOptions";
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
        <HeroSpellDescription card={item} />
        {item.updates.map((s: string) => (
          <HeroSpellUpdate updateId={s} />
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
