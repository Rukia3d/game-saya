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

const elementState = (e: IWeapon) => {
  if (e.state === "open" && e.charge >= e.maxCharge / 2) {
    return "Open";
  }

  if (e.state === "open" && e.charge < e.maxCharge / 2 && e.charge > 0) {
    return "Charge";
  }

  if (e.state === "open" && e.charge <= 0) {
    return "NoCharge";
  }

  return "Closed";
};

export const WeaponList = ({
  weapon,
  setWeapon,
  element,
  setElement,
}: {
  weapon: WeaponById;
  setWeapon: (w: null | WeaponById) => void;
  element: null | IWeapon;
  setElement: (w: null | IWeapon) => void;
}) => {
  const [selected, setSelected] = useState(element);

  const changeElement = (w: IWeapon) => {
    setSelected(w);
    setElement(w);
  };

  const close = () => {
    setElement(null);
    setWeapon(null);
  };

  return (
    <div className="WeaponList" data-testid="weapon-popup">
      <CloseButton close={close} />
      {weapon.elements.map((w: IWeapon, n: number) => (
        <div
          onClick={() => changeElement(w)}
          key={n}
          data-testid="weapon-screen"
          className={`${
            selected?.element.id === w.element.id
              ? "WeaponDetail"
              : "WeaponItem"
          }`}
        >
          {w.name} : {w.element.name}
          {selected?.element.id === w.element.id ? (
            <div className="Weapon">
              <div className="WeaponImage"></div>
              <div className="WeaponText">
                {w.state === "open" ? (
                  <span>
                    {w.charge} out of {w.maxCharge}
                  </span>
                ) : (
                  <span>Closed</span>
                )}
              </div>
            </div>
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
  const [weponElement, setWeaponElement] = useState<null | IWeapon>(null);
  const elements = ["Jade", "Garnet", "Obsidian", "Moonstone", "Amber"];

  const close = () => {
    setWeaponElement(null);
    setWeapon(null);
    setScreen("main");
  };

  return (
    <div className="WeaponsContainer" data-testid="weapons-screen">
      <TopMenu />
      {weapon ? (
        <PopUp close={close}>
          <WeaponList
            weapon={weapon}
            setWeapon={setWeapon}
            element={weponElement}
            setElement={setWeaponElement}
          />
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
                <div onClick={() => setWeapon(w)}>{w.name}</div>
                <div className="WeaponElements">
                  {elements.map((e: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setWeaponElement(w.elements[i])}
                      className={elementState(w.elements[i])}
                    >
                      {e}
                    </button>
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
