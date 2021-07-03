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
    <div className="InfoCard" onClick={() => setInfo(null)}>
      <h1>{item?.name}</h1>
    </div>
  );
};
