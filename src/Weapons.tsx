import React, { useContext } from "react";
import "./Main.scss";
import { GameContext } from "./App";
import { IWeapon } from "../api/engine/types";
import { TopMenu } from "./TopMenu";
import { CloseButton, PopUp } from "./PopUp";
const Weapon = ({ weapon }: { weapon: IWeapon }) => {
  return (
    <div className="Weapon" data-testid="weapon-popup">
      <CloseButton close={() => {}} />
      <div>Weapon</div>
    </div>
  );
};

export const Weapons = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.screen.screen !== "weapons" ||
    !context.screen.weapon
  ) {
    throw new Error("No data in context");
  }

  const weapon = context.screen.weapon;

  const selectWeapon = (w: IWeapon | null) => {
    console.log("selectWeapon", w);
    context.setScreen({
      screen: "weapons",
      weapon: weapon,
      material: null,
    });
  };

  const closeWeapon = () => {
    console.log("closeWeapon");
    context.setScreen({
      screen: "weapons",
      weapon: null,
      material: null,
    });
  };

  return (
    <div className="WeaponsContainer" data-testid="weapons-screen">
      <TopMenu />
      {context.screen.weapon ? (
        <PopUp close={closeWeapon}>
          <Weapon weapon={weapon} />
        </PopUp>
      ) : (
        <>
          <h3>Weapons</h3>
          <CloseButton close={() => context.setScreen({ screen: "main" })} />
          <div className="Weapons" data-testid="weapons-list">
            {context.player.weapons.map((w: IWeapon, n: number) => (
              <div
                className="Weapon"
                key={n}
                onClick={() => selectWeapon(w)}
                data-testid="weapon-selection"
              >
                <div>{w.name}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
