import React, { useContext } from "react";
import "./Main.scss";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { IAdventure } from "../api/engine/types";

export const Items = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const items: mainScreenState[] = [
    { screen: "weapons", weaponId: null, materialId: null },
    { screen: "inventory" },
    { screen: "goals" },
    { screen: "collections" },
    { screen: "messages" },
  ];
  return (
    <div className="Items" data-testid="home-items">
      {items.map((i: mainScreenState, n: number) => (
        <div className="Item" key={n} onClick={() => context.setScreen(i)}>
          {i.screen}
        </div>
      ))}
    </div>
  );
};

export const Adventures = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const adventures = context.player.adventures;

  const selectAdventure = (a: IAdventure) => {
    console.log("selectAdventure", a);
    context.setScreen({
      screen: "adventure",
      adventureId: a.id,
      storyId: null,
    });
  };

  return (
    <div className="Adventures" data-testid="home-adventures">
      {adventures.map((e: IAdventure, n: number) => (
        <div className="Adventure" key={n} onClick={() => selectAdventure(e)}>
          {e.character.name}
        </div>
      ))}
    </div>
  );
};

export const Menues = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const menues: mainScreenState[] = [
    { screen: "arena" },
    { screen: "market" },
    { screen: "aliance" },
    { screen: "studio" },
  ];
  return (
    <div className="Menues" data-testid="home-menues">
      {menues.map((i: mainScreenState, n: number) => (
        <div className="Menu" key={n} onClick={() => context.setScreen(i)}>
          {i.screen}
        </div>
      ))}
    </div>
  );
};

export const Home = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  return (
    <div className="HomeContainer" data-testid="home-screen">
      <Items />
      <Adventures />
      <Menues />
    </div>
  );
};
