import { useContext } from "react";
import { IStory } from "../../api/engine/types";
import { GameContext } from "../App";
import "./Elements.scss";

export const ElementQuest = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.element === null) {
    throw new Error("No data in context");
  }
  const quests = context.player.elements[context.element].currentQuests;
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
