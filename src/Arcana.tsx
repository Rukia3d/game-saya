import React, { useContext, useState } from "react";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";

export const PopUp = ({
  close,
  children,
}: {
  close: any;
  children: JSX.Element;
}) => {
  return (
    <div className="PopUp">
      <div className="CloseButton" onClick={close}>
        X
      </div>
      {children}
    </div>
  );
};

export const TopMenu = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const items = [
    ["energy", context.player.energy],
    ["experience", context.player.exprience],
    [context.player.materials[0].name, context.player.materials[0].quantity],
    [context.player.materials[1].name, context.player.materials[1].quantity],
    [context.player.materials[2].name, context.player.materials[2].quantity],
  ];
  return (
    <div className="TopMenu">
      {items.map((m: any, n: number) => (
        <div className="Material" key={n}>
          {m[0]}
          <br />
          {m[1]}
        </div>
      ))}
    </div>
  );
};

export const Arcana = ({
  arcana,
  setArcana,
  setScreen,
}: {
  arcana: number | null;
  setArcana: (n: number | null) => void;
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const labels: mainScreenState[] = [
    "story",
    "endless",
    "quest",
    "spells",
    "legend",
    "creation",
  ];

  return (
    <div className="Arcana">
      <TopMenu />
      <PopUp close={() => setScreen("menus")}>
        <div className="Adventures">
          {labels.map((l: mainScreenState, n: number) => (
            <div className="AdventureType" key={n}>
              <button onClick={() => setScreen(l)}>{l}</button>
            </div>
          ))}
        </div>
      </PopUp>
    </div>
  );
};
