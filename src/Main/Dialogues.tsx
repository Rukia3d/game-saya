import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import { CloseButton } from "../UI/CloseButton";
import { DialogueLine } from "../utils/types";
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
    !context.setDialogue
  ) {
    throw new Error("No data");
  }
  const dialogue = context.dialogue;
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
      <DialogueLines
        lines={dialogue.lines}
        close={() => context.setDialogue(null)}
      />
    </div>
  );
};
