import React, { useContext } from "react";
import "./Main.scss";
import { GameContext } from "./App";
import { IWeapon, IWeaponMaterial } from "../api/engine/types";
import { TopMenu } from "./TopMenu";
import { CloseButton, PopUp } from "./PopUp";

const materialState = (m: IWeaponMaterial): string => {
  if (m.state == "closed") return "Closed";
  if (m.charge < m.maxCharge * 0.3) return "Drained";
  if (m.charge > m.maxCharge * 0.7) return "Full";
  return "Charged";
};

const Weapon = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.screen.screen !== "weapons" ||
    context.screen.weaponId == null
  ) {
    throw new Error("No data in context");
  }
  const weapon = context.player.weapons[context.screen.weaponId];

  return (
    <div className="Weapon" data-testid="weapon-popup">
      <CloseButton close={() => {}} />
      <div>Weapon</div>
    </div>
  );
};

export const Weapons = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.screen.screen !== "weapons") {
    throw new Error("No data in context");
  }

  const selectWeapon = (w: IWeapon, m: IWeaponMaterial) => {
    console.log("selectWeapon", w);
    context.setScreen({
      screen: "weapons",
      weaponId: w.id,
      materialId: m.id,
    });
  };

  const closeWeapon = () => {
    console.log("closeWeapon");
    context.setScreen({
      screen: "weapons",
      weaponId: null,
      materialId: null,
    });
  };

  return (
    <div className="WeaponsContainer" data-testid="weapons-screen">
      <TopMenu />
      {context.screen.weaponId !== null ? (
        <PopUp close={closeWeapon}>
          <Weapon />
        </PopUp>
      ) : (
        <>
          <h3>Weapons</h3>
          <CloseButton close={() => context.setScreen({ screen: "main" })} />
          <div className="Weapons" data-testid="weapons-list">
            {context.player.weapons.map((w: IWeapon, n: number) => (
              <div className="Weapon" key={n}>
                <div>{w.name}</div>
                <div className="WeaponElements">
                  {w.materials.map((m: IWeaponMaterial) => (
                    <div
                      onClick={() => selectWeapon(w, m)}
                      data-testid="weapon-selection"
                      className={`${materialState(m)}`}
                    >
                      {m.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
