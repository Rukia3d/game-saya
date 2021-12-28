import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import "./Library.scss";
// Types
import {
  IEnemy,
  IHero,
  IOwnedResource,
  IResource,
  ISpell,
  ISpellUpdate,
} from "../utils/types";
import { Heroes } from "../Heroes/Heroes";
import { HeroesSpells } from "../Heroes/HeroesSpells";
import { SpellUpdate } from "../Spells/SpellUpdate";
import { SpellUpdates } from "../Spells/SpellUpdates";
import { InfoCard } from "../Info/InfoCard";
import { Resources, ResourcesImages } from "../Spells/Resources";
// Utils
// Components

const LibraryHero = ({ hero }: { hero: IHero }) => {
  return (
    <div className="LibraryHeroBorder">
      <div className="LibraryHero">
        <h3>{hero.name}</h3>
        <div>{hero.description}</div>
      </div>
    </div>
  );
};

const LibrarySpells = ({
  hero,
  setInfo,
}: {
  hero: IHero;
  setInfo?: (s: ISpell | ISpellUpdate | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }

  const allSpells = context.gameState.player.spells;
  const heroSpells = allSpells.filter(
    (s: ISpell) => s.element === hero.element
  );
  return (
    <div className="LibrarySpells">
      <HeroesSpells spells={heroSpells} setInfo={setInfo} />
    </div>
  );
};

const LibraryUpdates = ({
  hero,
  setInfo,
}: {
  hero: IHero;
  setInfo?: (s: ISpell | ISpellUpdate | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }
  const allUpdates = context.gameState.player.spellUpdates;
  const heroUpdates = allUpdates.filter(
    (s: ISpellUpdate) => s.element === hero.element
  );
  return (
    <div className="LibraryUpdates">
      <SpellUpdates spellUpgrades={heroUpdates} updateInfo={setInfo} />
    </div>
  );
};

const LibraryResources = ({ hero }: { hero: IHero }) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }
  const ownedResources = context.gameState.player.resources;
  const heroResources = ownedResources.filter(
    (r: IOwnedResource) => r.element === hero.element
  );
  return (
    <div className="LibraryResources">
      {<ResourcesImages resources={heroResources} />}
    </div>
  );
};

type libraryScreenState = "hero" | "spells" | "updates" | "resources";

type LibraryScreensType = {
  [key in libraryScreenState]: React.FC<{
    hero: IHero;
    setInfo?: (s: ISpell | ISpellUpdate | null) => void;
  }>;
};
const mainScreens: LibraryScreensType = {
  hero: LibraryHero,
  spells: LibrarySpells,
  updates: LibraryUpdates,
  resources: LibraryResources,
};
const LibraryContent = ({
  hero,
  setInfo,
  selected,
}: {
  hero: IHero;
  setInfo?: (s: ISpell | ISpellUpdate | null) => void;
  selected: libraryScreenState;
}) => {
  const CurrentScreen = mainScreens[selected];
  return (
    <div className="LibraryContent">
      <CurrentScreen hero={hero} setInfo={setInfo} />
    </div>
  );
};

const LibraryMenu = ({
  selected,
  setSelected,
}: {
  selected: libraryScreenState;
  setSelected: (s: libraryScreenState) => void;
}) => {
  return (
    <div className="LibraryMenu">
      <button
        className={selected === "hero" ? "active" : "inactive"}
        onClick={() => setSelected("hero")}
      >
        Hero
      </button>
      <button
        className={selected === "spells" ? "active" : "inactive"}
        onClick={() => setSelected("spells")}
      >
        Spells
      </button>
      <button
        className={selected === "updates" ? "active" : "inactive"}
        onClick={() => setSelected("updates")}
      >
        Updates
      </button>
      <button
        className={selected === "resources" ? "active" : "inactive"}
        onClick={() => setSelected("resources")}
      >
        Resources
      </button>
    </div>
  );
};
export const Library = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data");
  }
  const player = context.gameState.player;

  const [info, setInfo] = useState<
    null | ISpell | ISpellUpdate | IEnemy | IHero
  >(player.spells[1]);
  const [hero, setHero] = useState<IHero>(player.heroes[0]);
  const [selected, setSelected] = useState<libraryScreenState>("hero");
  let required: IHero[] | undefined = undefined;
  if (player.heroes.length < 3) {
    required = player.heroes;
  }

  const imgUrl = `/img/Backgrounds/library_background.jpg`;
  return (
    <div
      className="Library"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      <Heroes selectHero={setHero} required={required} />
      <LibraryContent selected={selected} hero={hero} setInfo={setInfo} />
      <LibraryMenu selected={selected} setSelected={setSelected} />
    </div>
  );
};
