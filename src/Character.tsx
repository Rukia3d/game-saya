import { useState } from "react";
import { ICharacter, IEvent, IStory } from "../api/engine/types";
import { BigPopup, CloseButton } from "./UIElements/UIButtons";
import "./Character.scss";

const CharacterStatic = ({
  character,
  setPopup,
}: {
  character: ICharacter;
  setPopup: any;
}) => {
  return (
    <div className="Static">
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
    <div className="Quest">
      <div className="Generate">Generate Quest</div>
      {quests.map((q: IStory, i: number) => (
        <div key={i}>
          {q.id} - {q.name}
        </div>
      ))}
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
  console.log("Character", character);
  return (
    <div className="Element">
      {popup ? (
        <div className="Main">
          <BigPopup onClick={() => setPopup(false)}>
            <div>Popup</div>
          </BigPopup>
        </div>
      ) : (
        <>
          <CloseButton onClick={() => setCharacter(null)} />
          <div className="Content">
            <CharacterStatic character={character} setPopup={setPopup} />
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
