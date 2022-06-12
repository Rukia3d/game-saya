import { useContext, useState } from "react";
import { IEvent, IStory } from "../api/engine/types";
import { BigPopup, CloseButton } from "./UIElements/UIButtons";
import { Game, GameLevels } from "./Game";
import "./Element.scss";
import { GameContext } from "./Main";

const ElementStatic = ({
  element,
  setPopup,
  setGameSelect,
}: {
  element: number;
  setPopup: (s: boolean) => void;
  setGameSelect: (s: boolean) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  return (
    <div className="Static">
      <div className="Info" onClick={() => setGameSelect(true)}>
        {context.player.elements[element].characterName} Main Quest
      </div>
      <div
        className="Info"
        onClick={() => setPopup(true)}
      >{`${context.player.elements[element].characterName} story`}</div>
      <div className="Info">{`${context.player.elements[element].characterName} spells`}</div>
    </div>
  );
};

const ElementEvent = ({
  events,
  setGame,
}: {
  events: IEvent[];
  setGame: (s: IStory | IEvent | null) => void;
}) => {
  const tournament = events[0];
  const tower = events[1];
  return (
    <div className="Event">
      <div className="EventType" onClick={() => setGame(tournament)}>
        Tournament Lv{tournament.id}
      </div>
      <div className="EventType" onClick={() => setGame(tower)}>
        Tower Lv{tower.id}
      </div>
    </div>
  );
};

const ElementQuest = ({ quests }: { quests: IStory[] }) => {
  return (
    <div className="Quests">
      <div className="Generate">Generate Quest</div>
      <div className="Generated">
        {quests.map((q: IStory, i: number) => (
          <div className="Quest" key={i}>
            {q.id} - {q.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ElementScreen = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.setElement) {
    throw new Error("No data in context");
  }

  const [popup, setPopup] = useState(false);
  const [game, setGame] = useState<IStory | IEvent | null>(null);
  const [gameSelect, setGameSelect] = useState(false);

  const backToMain = () => {
    context.setElement(null);
    context.changeScreen("main");
    setPopup(false);
    setGameSelect(false);
  };

  if (context.element === null) {
    throw new Error("OMG");
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

  return (
    <div className="Element" data-testid="element-screen">
      {popup ? (
        <div className="Content">
          <BigPopup onClick={backToMain}>
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
      ) : (
        <>
          <CloseButton onClick={backToMain} />
          <div className="Content">
            <ElementStatic
              element={context.element}
              setPopup={setPopup}
              setGameSelect={setGameSelect}
            />
            <ElementEvent
              events={[
                context.player.elements[context.element].currentTournament,
                context.player.elements[context.element].currentTower,
              ]}
              setGame={setGame}
            />
            <ElementQuest
              quests={context.player.elements[context.element].currentQuests}
            />
          </div>
        </>
      )}
    </div>
  );
};
