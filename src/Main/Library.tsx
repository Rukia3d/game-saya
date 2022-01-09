import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import "./Library.scss";
// Types
import { IEnemy, IHero, ISpell, ISpellUpdate } from "../utils/types";
// Utils
// Components
import { HeroSelection } from "../Heroes/HeroSelection";
import { InfoCard } from "../Info/InfoCard";
import { LibraryHero } from "../Library/LibraryHero";
import { LibrarySpells } from "../Library/LibrarySpells";
import { LibraryUpdates } from "../Library/LibraryUpdates";
import { LibraryResources } from "../Library/LibraryResources";
import { capitalizeFirstLetter } from "../utils/helpers";

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
  const menuItems: libraryScreenState[] = [
    "hero",
    "spells",
    "updates",
    "resources",
  ];
  return (
    <div className="LibraryMenu">
      {menuItems.map((item: libraryScreenState, i: number) => (
        <button
          key={i}
          className={selected === item ? "active" : "inactive"}
          onClick={() => setSelected(item)}
        >
          {capitalizeFirstLetter(item.toString())}
        </button>
      ))}
    </div>
  );
};
export const Library = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }
  const player = context.gameState.player;

  const [info, setInfo] = useState<
    null | ISpell | ISpellUpdate | IEnemy | IHero
  >(null);
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
      <HeroSelection selectHero={setHero} required={required} />
      <LibraryContent selected={selected} hero={hero} setInfo={setInfo} />
      <LibraryMenu selected={selected} setSelected={setSelected} />
    </div>
  );
};
