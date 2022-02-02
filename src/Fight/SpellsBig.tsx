import React from "react";
import "./Fight.scss";
// Types
import { colorType, ISpell } from "../utils/types";
// Utils
// Components
import { SpellBig } from "./SpellBig";

export const SpellsBig = ({
  enemySpell,
  heroSpell,
  element,
}: {
  enemySpell: ISpell | null;
  heroSpell: ISpell | null;
  element: colorType;
}) => {
  return (
    <div className="SpellsBig">
      {enemySpell ? (
        <SpellBig
          spell={enemySpell}
          transparency={enemySpell !== null && heroSpell !== null}
        />
      ) : null}
      {enemySpell && heroSpell ? <SpellBig spell={heroSpell} /> : null}
    </div>
  );
};
