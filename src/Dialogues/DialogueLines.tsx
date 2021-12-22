import React, { useState } from "react";
import "./Dialogue.scss";
// Types
import { IDialogueLine } from "../utils/types";
// Utils
// Components

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
      <DialogueLine line={line} i={res} />
    </div>
  );
};
