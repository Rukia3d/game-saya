import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import { CloseButton } from "../UI/CloseButton";
import { finishStory } from "../utils/gamelogic";
import { findCharacter } from "../utils/helpers";
import { DialogueLine, Hero, StoryAction } from "../utils/types";
import "./Dialogues.css";

const DialogueLines = ({
  lines,
  close,
}: {
  lines: DialogueLine[];
  close: () => void;
}) => {
  const [line, setLine] = useState(lines[0]);
  const nextLine = () => {
    const res = lines.indexOf(line);
    if (res >= lines.length - 1) {
      close();
    } else {
      setLine(lines[res + 1]);
    }
  };
  return (
    <div className="DialogueLines" onClick={nextLine}>
      <div className="DialogueCharacter">
        {line.image ? (
          <img
            src={`../img/Dialogues/${line.character}_${line.image}.png`}
            alt={`character_image_${line.character}`}
          />
        ) : null}
      </div>
      <div
        className="DialogueLine"
        aria-label={`dialogue_line_${lines.indexOf(line)}`}
      >
        {line.text}
      </div>
    </div>
  );
};

export const Dialogues = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.dialogue ||
    !context.setDialogue ||
    !context.gameState.heroes
  ) {
    throw new Error("No data");
  }
  const dialogue = context.dialogue;
  const allHeroes = context.gameState.heroes;

  const addHero = (actions: StoryAction[]) => {
    const addingHero = actions.filter((a: StoryAction) => a.type === "addHero");
    if (addingHero.length > 1)
      throw new Error("Trying to add more than 1 hero");
    if (addingHero.length === 1) {
      const action = addingHero[0];
      console.log("This action requires us to add a Hero");
      const hero = findCharacter(allHeroes, action.id);
      console.log("Hero", hero);
      context.setCharacter(hero);
    }
  };

  const finishDialogue = () => {
    if (
      context.gameState &&
      context.gameState.player &&
      context.dialogue?.action
    ) {
      context.setGameState({
        ...context.gameState,
        player: finishStory(context.gameState, context.dialogue?.action),
      });
      addHero(context.dialogue?.action);
    }

    context.setDialogue(null);
  };
  // console.log(
  //   "game state DIALOGUE",
  //   //@ts-ignore
  //   JSON.parse(JSON.stringify(context.gameState?.adventures[0].stories[0]))
  // );
  return (
    <div className="Dialogues" aria-label="dialogue_background">
      <CloseButton onClick={context.backToStory} />
      {dialogue.background ? (
        <img
          className="DialogueBackground"
          src={`../img/Dialogues/${dialogue.background}`}
          alt="dialogue_background"
        />
      ) : null}
      <DialogueLines lines={dialogue.lines} close={finishDialogue} />
    </div>
  );
};
