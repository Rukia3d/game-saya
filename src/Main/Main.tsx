import React, { useState } from "react";
import "./Main.css";

import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";

import { Intro } from "./Intro";
import { Heroes } from "./Heroes";
import { Adventures } from "./Adventures";
import { Spells } from "./Spells";
import { College } from "./College";

type mainScreenState = "intro" | "heroes" | "adventures" | "spells" | "college";

type MainScreensType = {
  [key in mainScreenState]: React.FC;
};
const mainScreens: MainScreensType = {
  intro: Intro,
  heroes: Heroes,
  adventures: Adventures,
  spells: Spells,
  college: College,
};

const MainMenuButton = ({
  selected,
  screen,
  setSelected,
}: {
  selected: boolean;
  screen: mainScreenState;
  setSelected: (s: mainScreenState) => void;
}) => {
  return (
    <div className="MenuButtonBorder" onClick={() => setSelected(screen)}>
      <div
        className="MenuButton"
        style={{
          backgroundColor: selected ? "aquamarine" : "lightgrey",
        }}
      >
        {screen.toUpperCase()}
      </div>
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
      {[
        "intro" as "intro",
        "heroes" as "heroes",
        "adventures" as "adventures",
        "spells" as "spells",
        "college" as "college",
      ].map((s: mainScreenState, i: number) => (
        <MainMenuButton
          key={i}
          setSelected={setSelected}
          selected={selected === s}
          screen={s}
        />
      ))}
    </div>
  );
};

export const Main = () => {
  const [selected, setSelected] = useState<mainScreenState>("intro");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const changeScreen = (screen: mainScreenState) => {
    setSettingsOpen(false);
    setSelected(screen);
  };

  const CurrentScreen = mainScreens[selected];

  return (
    <div className="Main">
      <SettingsButton onClick={() => setSettingsOpen(!settingsOpen)} />
      {settingsOpen ? <Settings /> : null}
      {CurrentScreen ? <CurrentScreen /> : null}
      <MainMenu selected={selected} setSelected={changeScreen} />
    </div>
  );
};
