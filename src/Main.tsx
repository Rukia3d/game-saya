import React, { useState } from "react";
import { Adventure, Character, GameState, SettingsButton } from "./App";
import "./Main.css";
import { Settings } from "./Settings";

type mainScreenState = "heroes" | "adventures" | "spells";

const Heroes = ({ characters }: { characters: Character[] }) => {
  return (
    <div className="Heroes">
      <h2>Your Heroes</h2>
      <div className="HeroesList">
        {characters.map((c: Character, i: number) => (
          <div key={i} onClick={() => console.log("hero clicked")}>
            <img className="Hero" src={c.image} alt={`hero_${c.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Adventures = ({
  adventures,
  setAdventure,
}: {
  adventures: Adventure[];
  setAdventure: (a: Adventure) => void;
}) => {
  const selectAdventure = (a: Adventure) => {
    if (a.state === "open") {
      setAdventure(a);
    }
  };
  return (
    <div className="Adventures">
      <h2>Your Adventures</h2>
      <div className="AdventuresList">
        {adventures.map((a: Adventure, i: number) => (
          <div key={i} onClick={() => selectAdventure(a)}>
            <img
              className="Adventure"
              style={{ opacity: a.state === "closed" ? 0.5 : 1 }}
              src={a.image}
              alt={`adventure_${a.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Spells = () => {
  return (
    <div className="Spells">
      <h1>Spells</h1>
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
      {selected === "spells" ? <Spells /> : null}
      <MainMenu selected={selected} setSelected={changeScreen} />
    </div>
  );
};
