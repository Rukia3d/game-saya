import { CloseButton } from "../UI/CloseButton";
import { IDialogue } from "../utils/types";
import { DialogueLines } from "./DialogueLines";

export const DialogueCity = ({
  dialogue,
  setDialogue,
}: {
  dialogue: IDialogue;
  setDialogue: (d: IDialogue | null) => void;
}) => {
  return (
    <div className="Dialogues" aria-label="dialogue_background">
      <CloseButton onClick={() => setDialogue(null)} />
      <img
        className="DialogueBackground"
        src={`../img/Dialogues/${dialogue.background}`}
        alt="dialogue_background"
      />
      <DialogueLines lines={dialogue.lines} close={() => setDialogue(null)} />
    </div>
  );
};
