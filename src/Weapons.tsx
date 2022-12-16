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
  if (!context || !context.player || context.screen.screen !== "weapons") {
    throw new Error("No data in context");
  }

  const selectWeapon = (w: IWeapon, m: IWeaponMaterial) => {
    console.log("selectWeapon", w);
    context.setScreen({
      screen: "weapons",
      weapon: w,
      material: m,
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
          <Weapon weapon={context.screen.weapon} />
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
