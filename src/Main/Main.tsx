import React, { useState } from "react";
import "./Main.scss";

// Types
// Utils
// Components
import { Lives, Settings } from "../UI/Settings";
import { LivesButton, SettingsButton } from "../UI/SettingsButton";
import { City } from "./City";
import { Adventures } from "./Adventures";
import { Library } from "./Library";
import { Shop } from "./Shop";

type mainScreenState = "city" | "adventures" | "library" | "shop";

type MainScreensType = {
  [key in mainScreenState]: React.FC;
};
const mainScreens: MainScreensType = {
  city: City,
  adventures: Adventures,
  library: Library,
  shop: Shop,
};

const MainMenuCity = ({
  screen,
  selected,
  setSelected,
}: {
  screen: mainScreenState;
  selected: mainScreenState;
  setSelected: (s: mainScreenState) => void;
}) => {
  const imgUrl = `/img/Backgrounds/main_background.jpg`;
  return (
    <div
      className="MainMenuCityBorder"
      onClick={() => setSelected(screen)}
      style={{
        backgroundColor: selected === screen ? "white" : "black",
      }}
    >
      <div
        className="MainMenuCity"
        style={{
          backgroundImage: `url(${imgUrl})`,
          opacity: selected === screen ? 1 : 0.8,
        }}
      ></div>
    </div>
  );
};

const MainMenuAdventures = ({
  screen,
  selected,
  setSelected,
}: {
  screen: mainScreenState;
  selected: mainScreenState;
  setSelected: (s: mainScreenState) => void;
}) => {
  const imgUrl = `/img/Backgrounds/adventure_background.jpg`;
  return (
    <div
      className="MainMenuAdventuresBorder"
      onClick={() => setSelected(screen)}
      style={{
        backgroundColor: selected === screen ? "white" : "black",
      }}
    >
      <div
        className="MainMenuAdventures"
        style={{
          backgroundImage: `url(${imgUrl})`,
          opacity: selected === screen ? 1 : 0.5,
        }}
      ></div>
    </div>
  );
};

const MainMenuLibrary = ({
  screen,
  selected,
  setSelected,
}: {
  screen: mainScreenState;
  selected: mainScreenState;
  setSelected: (s: mainScreenState) => void;
}) => {
  const imgUrl = `/img/Backgrounds/library_background.jpg`;
  return (
    <div
      className="MainMenuLibraryBorder"
      onClick={() => setSelected(screen)}
      style={{
        backgroundColor: selected === screen ? "white" : "black",
      }}
    >
      <div
        className="MainMenuLibrary"
        style={{
          backgroundImage: `url(${imgUrl})`,
          opacity: selected === screen ? 1 : 0.5,
        }}
      ></div>
    </div>
  );
};

const MainMenuShop = ({
  screen,
  selected,
  setSelected,
}: {
  screen: mainScreenState;
  selected: mainScreenState;
  setSelected: (s: mainScreenState) => void;
}) => {
  const imgUrl = `/img/Backgrounds/shop_background.jpg`;
  return (
    <div
      className="MainMenuShopBorder"
      onClick={() => setSelected(screen)}
      style={{
        backgroundColor: selected === screen ? "white" : "black",
      }}
    >
      <div
        className="MainMenuShop"
        style={{
          backgroundImage: `url(${imgUrl})`,
          opacity: selected === screen ? 1 : 0.5,
        }}
      ></div>
    </div>
  );
};

const MainMenu = ({
  selected,
  setSelected,
}: {
  selected: mainScreenState;
  setSelected: (s: mainScreenState) => void;
}) => {
  return (
    <div className="MainMenu">
      <div className="MainMenuColums">
        <MainMenuCity
          setSelected={setSelected}
          screen={"city"}
          selected={selected}
        />
        <MainMenuAdventures
          setSelected={setSelected}
          screen={"adventures"}
          selected={selected}
        />
      </div>
      <div className="MainMenuRows">
        <MainMenuLibrary
          setSelected={setSelected}
          screen={"library"}
          selected={selected}
        />
        <MainMenuShop
          setSelected={setSelected}
          screen={"shop"}
          selected={selected}
        />
      </div>
    </div>
  );
};

export const Main = () => {
  const [selected, setSelected] = useState<mainScreenState>("city");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [livesOpen, setLivesOpen] = useState(false);

  const changeScreen = (screen: mainScreenState) => {
    setSettingsOpen(false);
    setSelected(screen);
  };

  const CurrentScreen = mainScreens[selected];
  return (
    <div className="Main">
      {new Array(50).fill(0).map((x, n) => (
        <div className="snow" key={n}></div>
      ))}
      <LivesButton onClick={() => setLivesOpen(!livesOpen)} />
      <SettingsButton onClick={() => setSettingsOpen(!settingsOpen)} />
      {settingsOpen ? <Settings /> : null}
      {livesOpen ? <Lives /> : null}
      {CurrentScreen ? <CurrentScreen /> : null}
      <MainMenu selected={selected} setSelected={changeScreen} />
    </div>
  );
};
