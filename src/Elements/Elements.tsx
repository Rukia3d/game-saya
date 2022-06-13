import { useContext, useState } from "react";
import { IStory, IEvent } from "../../api/engine/types";
import { GameLevels, Game } from "../Game";
import { GameContext } from "../Main";
import { BigPopup, CloseButton } from "../UIElements/UIButtons";
import { ElementEvent } from "./ElementEvent";
import { ElementQuest } from "./ElementQuests";
import { ElementSpells } from "./ElementSpells";
import { ElementStory } from "./ElementsStory";

export const Elements = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.setElement) {
    throw new Error("No data in context");
  }

  const [popup, setPopup] = useState(false);
  const [game, setGame] = useState<IStory | IEvent | null>(null);
  const [gameSelect, setGameSelect] = useState(false);
  const [spells, setSpells] = useState(false);

  const backToMain = () => {
    context.setElement(null);
    context.changeScreen("main");
    setPopup(false);
    setGameSelect(false);
  };

  const backToStory = () => {
    context.changeScreen("element");
    setPopup(false);
    setGameSelect(false);
  };

  if (context.element === null) {
    throw new Error("OMG HOW DID WE GET HERE");
  }

  if (gameSelect)
    return (
      <GameLevels
        setGame={setGame}
        setGameSelect={setGameSelect}
        element={context.element}
      />
    );
  if (game)
    return (
      <Game
        element={context.element}
        game={game}
        setGame={setGame}
        setGameSelect={setGameSelect}
      />
    );

  if (spells) return <ElementSpells setSpells={setSpells} />;

  if (popup && context.element !== null) {
    return (
      <div className="Element" data-testid="element-screen">
        <div className="Content">
          <BigPopup onClick={backToStory}>
            <div>
              <div>
                {context.player.elements[context.element].characterName}
              </div>
              {context.player.elements[context.element].legend.map(
                (s: string, i: number) => (
                  <div key={i}>{s}</div>
                )
              )}
            </div>
          </BigPopup>
        </div>
      </div>
    );
  }

  return (
    <div className="Element" data-testid="element-screen">
      <>
        <CloseButton onClick={backToMain} />
        <div className="Content">
          <ElementStory
            setPopup={setPopup}
            setSpells={setSpells}
            setGameSelect={setGameSelect}
          />
          <ElementEvent setGame={setGame} />
          <ElementQuest />
        </div>
      </>
    </div>
  );
};
