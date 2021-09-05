import React, { useState } from "react";
import "./Main.css";

import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";

import { Intro } from "./Intro";
import { Heroes } from "./Heroes";
import { Adventures } from "./Adventures";
import { Spells } from "./Spells";
import { Shop } from "./Shop";

type mainScreenState = "city" | "heroes" | "adventures" | "library" | "shop";

type MainScreensType = {
  [key in mainScreenState]: React.FC;
};
const mainScreens: MainScreensType = {
  city: Intro,
  heroes: Heroes,
  adventures: Adventures,
  library: Spells,
  shop: Shop,
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
        "city" as "city",
        "heroes" as "heroes",
        "adventures" as "adventures",
        "library" as "library",
        "shop" as "shop",
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
  const [selected, setSelected] = useState<mainScreenState>("city");
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
