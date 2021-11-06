import React, { useState } from "react";
import "./Dialogue.css";
// Types
import { IDialogueLine } from "../utils/types";
// Utils
// Components

const DialogueImage = ({ line, i }: { line: IDialogueLine; i: number }) => {
  return (
    <div className="DialogueCharacter">
      {line.image ? (
        <img
          className={line.pos}
          src={`../img/Dialogues/${line.character}_${line.image}.png`}
          alt={`character_image_${line.character}`}
        />
      ) : null}
    </div>
  );
};

const DialogueLine = ({ line, i }: { line: IDialogueLine; i: number }) => {
  return (
    <div className="DialogueLine" aria-label={`dialogue_line_${i}`}>
      {line.text}
    </div>
  );
};

export const DialogueLines = ({
  lines,
  close,
}: {
  lines: IDialogueLine[];
  close: () => void;
}) => {
  const [line, setLine] = useState(lines[0]);
  let res = lines.indexOf(line);

  const nextLine = () => {
    res = lines.indexOf(line);
    if (res >= lines.length - 1) {
      close();
    } else {
      setLine(lines[res + 1]);
    }
  };
  return (
    <div className="DialogueLines" onClick={nextLine} aria-label="lines_next">
      <DialogueImage line={line} i={res} />
      <DialogueLine line={line} i={res} />
    </div>
  );
};
