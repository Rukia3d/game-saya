import React from "react";
import "./InfoCard.css";

export const InfoCard = ({
  item,
  setInfo,
}: {
  item: any;
  setInfo: (s: any) => void;
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
