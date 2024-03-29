import React, { useContext } from "react";
import "./Main.scss";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { IAdventure } from "../api/engine/types";
import { TopMenu } from "./TopMenu";

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

  const menuR = ["оружие", "инвентарь", "цели", "коллекция", "сообщения"];
  return (
    <div className="Items" data-testid="home-items">
      {items.map((i: mainScreenState, n: number) => (
        <div className="Item" key={n} onClick={() => context.setScreen(i)}>
          <img src={`../pics/main/left_${n}_black.png`} alt={i.screen} />
          <div>{menuR[n]}</div>
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
          <img
            src={`../pics/main/hero_${n}_black.png`}
            alt={e.character.material.name}
          />
          <div>{e.character.name}</div>
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

  const menuR = ["арена", "маркет", "альянс", "студио"];
  return (
    <div className="Menues" data-testid="home-menues">
      {menues.map((i: mainScreenState, n: number) => (
        <div className="Menu" key={n} onClick={() => context.setScreen(i)}>
          <img src={`../pics/main/right_${n}_black.png`} alt={i.screen} />
          <div>{menuR[n]}</div>
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
      <TopMenu />
      <div className="Home">
        <Items />
        <Adventures />
        <Menues />
      </div>
    </div>
  );
};
