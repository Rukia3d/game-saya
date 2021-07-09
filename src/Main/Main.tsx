import React, { useState } from "react";
import "./Main.css";

import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";

import { Adventure, Card, GameState, Resource } from "../utils/types";
import { Heroes } from "./Heroes";
import { Adventures } from "./Adventures";
import { Spells } from "./Spells";

type mainScreenState = "heroes" | "adventures" | "spells" | "college";

const College = ({
  spells,
  resources,
}: {
  spells: Card[];
  resources: Resource[];
}) => {
  return (
    <div className="College">
      <h1>College</h1>
    </div>
  );
};

const MainMenu = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (s: mainScreenState) => void;
}) => {
  return (
    <div className="MainMenu">
      <button
        style={{
          backgroundColor: selected === "heroes" ? "aquamarine" : "grey",
        }}
        onClick={() => setSelected("heroes")}
      >
        Heroes
      </button>
      <button
        style={{
          backgroundColor: selected === "adventures" ? "aquamarine" : "grey",
        }}
        onClick={() => setSelected("adventures")}
      >
        Adventures
      </button>
      <button
        style={{
          backgroundColor: selected === "spells" ? "aquamarine" : "grey",
        }}
        onClick={() => setSelected("spells")}
      >
        Spells
      </button>
      <button
        style={{
          backgroundColor: selected === "college" ? "aquamarine" : "grey",
        }}
        onClick={() => setSelected("college")}
      >
        College
      </button>
    </div>
  );
};
export const Main = ({
  gameState,
  setAdventure,
}: {
  gameState: GameState;
  setAdventure: (a: Adventure) => void;
}) => {
  const [selected, setSelected] = useState("heroes");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const changeScreen = (screen: string) => {
    setSettingsOpen(false);
    setSelected(screen);
  };
  return (
    <div className="Main">
      <SettingsButton onClick={() => setSettingsOpen(!settingsOpen)} />
      {settingsOpen ? <Settings /> : null}
      {selected === "heroes" ? (
        <Heroes characters={gameState.sceneCharacters} />
      ) : null}
      {selected === "adventures" ? (
        <Adventures
          adventures={gameState.adventures}
          setAdventure={setAdventure}
        />
      ) : null}
      {selected === "spells" ? (
        <Spells
          heroes={gameState.player.heroes}
          spells={gameState.player.cards}
        />
      ) : null}
      {selected === "college" ? (
        <College
          spells={gameState.player.cards}
          resources={gameState.player.resources}
        />
      ) : null}
      <MainMenu selected={selected} setSelected={changeScreen} />
    </div>
  );
};
