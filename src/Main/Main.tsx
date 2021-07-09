import React, { useContext, useState } from "react";
import "./Main.css";

import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";

import { Heroes } from "./Heroes";
import { Adventures } from "./Adventures";
import { Spells } from "./Spells";
import { GameContext } from "../App";

type mainScreenState = "heroes" | "adventures" | "spells" | "college";

const College = () => {
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
export const Main = () => {
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
      {selected === "heroes" ? <Heroes /> : null}
      {selected === "adventures" ? <Adventures /> : null}
      {selected === "spells" ? <Spells /> : null}
      {selected === "college" ? <College /> : null}
      <MainMenu selected={selected} setSelected={changeScreen} />
    </div>
  );
};
