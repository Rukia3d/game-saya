import React, { useState } from "react";
import "./Main.scss";

// Types
// Utils
// Components
import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";
import { City } from "./City";
import { Heroes } from "./Heroes";
import { Adventures } from "./Adventures";
import { Library } from "./Library";
import { Shop } from "./Shop";
import { elementType, ISpell } from "../utils/types";
import { mayaCard, spellUpdates } from "../utils/testobjects";
import { InfoCard } from "../UI/InfoCard";

type mainScreenState = "city" | "heroes" | "adventures" | "library" | "shop";

type MainScreensType = {
  [key in mainScreenState]: React.FC;
};
const mainScreens: MainScreensType = {
  city: City,
  heroes: Heroes,
  adventures: Adventures,
  library: Library,
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
      {/* {settingsOpen ? <Settings /> : null} */}
      {CurrentScreen ? <CurrentScreen /> : null}
      <MainMenu selected={selected} setSelected={changeScreen} />
    </div>
  );
};
