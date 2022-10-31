import React, { useContext, useState } from "react";
import "./Main.scss";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { IWeapon, weaponName } from "../api/engine/types";
import { TopMenu } from "./TopMenu";
import { CloseButton, PopUp } from "./PopUp";

interface WeaponById {
  id: number;
  name: weaponName;
  elements: IWeapon[];
}
const weaponsById = (weapons: IWeapon[]): WeaponById[] => {
  let newWepons: WeaponById[] = [];
  weapons.forEach((w: IWeapon) => {
    if (!newWepons[w.id]) {
      newWepons[w.id] = { id: w.id, name: w.name, elements: [w] };
    } else {
      newWepons[w.id].elements.push(w);
    }
  });
  return newWepons;
};

export const WeaponList = ({
  weapon,
  setWeapon,
}: {
  weapon: WeaponById;
  setWeapon: (w: null | WeaponById) => void;
}) => {
  const [element, setElement] = useState<null | IWeapon>(weapon.elements[0]);
  const close = () => {
    setElement(null);
    setWeapon(null);
  };

  const selected = (w: IWeapon) => {
    return element && element.elementId === w.elementId;
  };
  return (
    <div className="WeaponList" data-testid="weapon-popup">
      <CloseButton close={close} />
      {weapon.elements.map((w: IWeapon, n: number) => (
        <div
          key={n}
          data-testid="weapon-screen"
          className={`${selected(w) ? "WeaponDetail" : "WeaponItem"}`}
        >
          {w.name} : {w.elementName}
          {selected(w) ? (
            <span>
              {w.charge} out of {w.maxCharge}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export const Weapons = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const weapons = weaponsById(context.player.weapons);
  const [weapon, setWeapon] = useState<null | WeaponById>(null);

  const close = () => {
    setWeapon(null);
    setScreen("main");
  };

  return (
    <div className="WeaponsContainer" data-testid="weapons-screen">
      <TopMenu />
      {weapon ? (
        <PopUp close={close}>
          <WeaponList weapon={weapon} setWeapon={setWeapon} />
        </PopUp>
      ) : (
        <>
          <h3>Weapons</h3>
          <CloseButton close={() => setScreen("main")} />
          <div className="Weapons" data-testid="weapons-list">
            {weapons.map((w: WeaponById, n: number) => (
              <div
                className="Weapon"
                key={n}
                onClick={() => setWeapon(w)}
                data-testid="weapon-selection"
              >
                {w.name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
