import React, { Children } from "react";
import { Enemy, Spell } from "./Fight";
import "./InfoCard.css";

export const InfoCard = ({
  item,
  setInfo,
}: {
  item: null | Spell | Enemy;
  setInfo: (s: Spell | Enemy | null) => void;
}) => {
  return (
    <div
      className="InfoCard"
      aria-label="info_card"
      onClick={() => setInfo(null)}
    >
      <h1 aria-label="item_name">{item?.name}</h1>
    </div>
  );
};
