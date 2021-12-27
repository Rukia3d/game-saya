import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import "./Library.scss";
// Types
import { IEnemy, IHero, ISpell, ISpellUpdate } from "../utils/types";
import { Heroes } from "../Heroes/Heroes";
import { HeroesSpells } from "../Heroes/HeroesSpells";
import { SpellUpdate } from "../Spells/SpellUpdate";
import { SpellUpdates } from "../Spells/SpellUpdates";
import { InfoCard } from "../Info/InfoCard";
// Utils
// Components

const LibraryHero = ({ hero }: { hero: IHero }) => {
  return (
    <div className="LibraryHero">
      <h3>{hero.name}</h3>
      <div>{hero.description}</div>
    </div>
  );
};

const LibrarySpells = ({ hero }: { hero: IHero }) => {
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
      <HeroesSpells spells={heroSpells} />
    </div>
  );
};

const LibraryUpdates = ({ hero }: { hero: IHero }) => {
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
      <SpellUpdates spellUpgrades={heroUpdates} />
    </div>
  );
};

const LibraryResources = ({ hero }: { hero: IHero }) => {
  return <div className="LibraryResources"></div>;
};

type libraryScreenState = "hero" | "spells" | "updates" | "resources";

type LibraryScreensType = {
  [key in libraryScreenState]: React.FC<{ hero: IHero }>;
};
const mainScreens: LibraryScreensType = {
  hero: LibraryHero,
  spells: LibrarySpells,
  updates: LibraryUpdates,
  resources: LibraryResources,
};
const LibraryContent = ({
  hero,
  selected,
}: {
  hero: IHero;
  selected: libraryScreenState;
}) => {
  const CurrentScreen = mainScreens[selected];
  return (
    <div className="LibraryContentBorder">
      <div className="LibraryContent">
        <div className="LibraryDetails">
          <CurrentScreen hero={hero} />
        </div>
      </div>
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
  >(player.spells[0]);
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
      <LibraryContent selected={selected} hero={hero} />
      <LibraryMenu selected={selected} setSelected={setSelected} />
    </div>
  );
};
