import { useState } from "react";
import { ICharacter, IEvent, IStory } from "../api/engine/types";
import { BigPopup, CloseButton } from "./UIElements/UIButtons";
import "./Character.scss";
import { Game } from "./Game";

const CharacterStatic = ({
  character,
  setPopup,
  setGame,
}: {
  character: ICharacter;
  setPopup: any;
  setGame: any;
}) => {
  return (
    <div className="Static">
      <div className="Info" onClick={() => setGame()}>
        {character.name} Main Quest
      </div>
      <div className="Info" onClick={() => setPopup(true)}>
        {character.name} story
      </div>
      <div className="Info">{character.element} spells</div>
    </div>
  );
};

const CharacterEvent = ({ events }: { events: IEvent[] }) => {
  const tournament = events[0];
  const tower = events[1];
  return (
    <div className="Event">
      <div className="EventType">Tournament Lv{tournament.id}</div>
      <div className="EventType">Tower Lv{tower.id}</div>
    </div>
  );
};

const CharacterQuest = ({ quests }: { quests: IStory[] }) => {
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

export const CharacterScreen = ({
  character,
  setCharacter,
}: {
  character: ICharacter;
  setCharacter: (s: number | null) => void;
}) => {
  const [popup, setPopup] = useState(false);
  const [game, setGame] = useState<IStory | IEvent | null>(null);
  console.log("Character", character);

  if (game) return <Game setGame={setGame} />;

  return (
    <div className="Element">
      {popup ? (
        <div className="Main">
          <BigPopup onClick={() => setPopup(false)}>
            <div>
              <div>{character.name}</div>
              {character.legend.map((s: string, i: number) => (
                <div key={i}>{s}</div>
              ))}
            </div>
          </BigPopup>
        </div>
      ) : (
        <>
          <CloseButton onClick={() => setCharacter(null)} />
          <div className="Content">
            <CharacterStatic
              character={character}
              setPopup={setPopup}
              setGame={setGame}
            />
            <CharacterEvent
              events={[character.currentTournament, character.currentTower]}
            />
            <CharacterQuest quests={character.currentQuests} />
          </div>
        </>
      )}
    </div>
  );
};
