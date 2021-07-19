import React from "react";
import "./ForgeCard.css";
import { Spell } from "../utils/types";

export const ForgeCard = ({
  item,
  setForge,
}: {
  item: Spell;
  setForge: (s: null | Spell) => void;
}) => {
  return <div className="ForgeCard"></div>;
};
