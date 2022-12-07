import React, { useContext } from "react";
import "./Main.scss";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { IAdventure } from "../api/engine/types";

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
    <div className="Items" data-testid="home-items">
      {items.map((i: mainScreenState, n: number) => (
        <div className="Item" key={n} onClick={() => setScreen(i)}>
          {i}
        </div>
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
  const adventures = context.player.adventures;
  return (
    <div className="Adventures" data-testid="home-adventures">
      {adventures.map((e: IAdventure, n: number) => (
        <div
          className="Adventure"
          key={n}
          onClick={() => setScreen("adventure")}
        >
          {e.character.name}
        </div>
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
    <div className="Menues" data-testid="home-menues">
      {menues.map((i: mainScreenState, n: number) => (
        <div className="Menu" key={n} onClick={() => setScreen(i)}>
          {i}
        </div>
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
    <div className="HomeContainer" data-testid="home-screen">
      <Items setScreen={setScreen} />
      <Adventures setScreen={setScreen} />
      <Menues setScreen={setScreen} />
    </div>
  );
};
