import React, { useContext } from "react";
import "./Main.scss";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { IElement } from "../api/engine/types";

export const Items = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const items: mainScreenState[] = [
    "weapons",
    "inventory",
    "goals",
    "collections",
    "messages",
  ];
  return (
    <div className="Home-Items" data-testid="home-items">
      {items.map((i: mainScreenState, n: number) => (
        <button key={n} onClick={() => setScreen(i)}>
          {i}
        </button>
      ))}
    </div>
  );
};

export const Adventures = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const elements = context.player.elements;
  return (
    <div className="Home-Adventures" data-testid="home-adventures">
      {elements.map((e: IElement, n: number) => (
        <button key={n}>{e.character.element}</button>
      ))}
    </div>
  );
};

export const Menues = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const menues: mainScreenState[] = ["arena", "market", "aliance", "studio"];
  return (
    <div className="Home-Menues" data-testid="home-menues">
      {menues.map((i: mainScreenState, n: number) => (
        <button key={n} onClick={() => setScreen(i)}>
          {i}
        </button>
      ))}
    </div>
  );
};

export const Home = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  return (
    <div className="Home" data-testid="home-screen">
      <Items setScreen={setScreen} />
      <Adventures setScreen={setScreen} />
      <Menues setScreen={setScreen} />
    </div>
  );
};
