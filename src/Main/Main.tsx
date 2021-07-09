import React, { useState } from "react";
import "./Main.css";

import { Settings } from "../UI/Settings";
import { SettingsButton } from "../UI/SettingsButton";

import {
  Adventure,
  Card,
  Character,
  GameState,
  Resource,
} from "../utils/types";
import { Heroes } from "./Heroes";

type mainScreenState = "heroes" | "adventures" | "spells" | "college";

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

const SpellPanel = ({
  character,
  image,
}: {
  character: Character | null;
  image: string | null;
}) => {
  return (
    <div className="SpellPanel" style={{ backgroundImage: `url("${image}")` }}>
      {character ? character.name : "Base"}
    </div>
  );
};

const Spells = ({
  spells,
  heroes,
}: {
  spells: Card[];
  heroes: Character[];
}) => {
  const characters = spells
    .map((s: Card) => s.character)
    .filter((v: any, i: any, a: any) => a.indexOf(v) === i && v);
  return (
    <div className="Spells">
      <h2>Your Spells</h2>
      <div className="SpellsList">
        <SpellPanel character={null} image={"../img/base_spells.png"} />
        {characters.sort().map((s: string | null, i: number) => (
          <SpellPanel
            key={i}
            character={heroes.find((h: Character) => h.id === s) || null}
            image={heroes.find((h: Character) => h.id === s)?.image || null}
          />
        ))}
      </div>
    </div>
  );
};

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
