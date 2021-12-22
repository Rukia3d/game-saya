import React from "react";
import "./Dialogue.scss";

// Types
import { dialogueLayout, IDialogue, IDialogueLine } from "../utils/types";
// Utils
// Components
import { CloseButton } from "../UI/CloseButton";
import { DialogueLines } from "./DialogueLines";

const DialogueImage = ({ hero, image }: { hero: string; image: string }) => {
  const imgUrl = `../img/Dialogues/${hero}_${image}.png`;
  return (
    <div
      className="DialogueCharacter"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    ></div>
  );
};

const DialogueSingleLayout = ({
  dialogue,
  images,
  setDialogue,
}: {
  dialogue: IDialogue;
  images: { hero: string; image: string }[];
  setDialogue: (d: IDialogue | null) => void;
}) => {
  const imgUrl = `/img/Dialogues/${dialogue.background}.jpg`;
  return (
    <div className="DialogueSingleBorder">
      <div
        className="DialogueSingle"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <DialogueImage hero={images[0].hero} image={images[0].image} />
      </div>
    </div>
  );
};

const DialogueDoubleLayout = ({
  dialogue,
  setDialogue,
}: {
  dialogue: IDialogue;
  setDialogue: (d: IDialogue | null) => void;
}) => {
  const imgUrl = `/img/Dialogues/${dialogue.background}.jpg`;
  return (
    <div className="DialogueTopBorder">
      <div className="DialogueTop"></div>
    </div>
  );
};

const DialogueTripleLayout = ({
  dialogue,
  setDialogue,
}: {
  dialogue: IDialogue;
  setDialogue: (d: IDialogue | null) => void;
}) => {
  return (
    <div className="DialogueTopBorder">
      <div className="DialogueTop"></div>
    </div>
  );
};

type DialogueLayoutsType = {
  [key in dialogueLayout]: React.FC<{
    dialogue: IDialogue;
    setDialogue: (d: IDialogue | null) => void;
    images: { hero: string; image: string }[];
  }>;
};
const dialLayouts: DialogueLayoutsType = {
  single: DialogueSingleLayout,
  double: DialogueDoubleLayout,
  triple: DialogueTripleLayout,
};

export const DialogueCity = ({
  dialogue,
  setDialogue,
}: {
  dialogue: IDialogue;
  setDialogue: (d: IDialogue | null) => void;
}) => {
  const CurrentDialogueLayout = dialLayouts[dialogue.layout];
  const imgUrl = `/img/Backgrounds/dialogue_background.jpg`;

  const combineImages = () => {
    const allImages: { hero: string; image: string }[] = [];
    dialogue.lines.forEach((l: IDialogueLine) =>
      allImages.push({ hero: l.character, image: l.image })
    );
    return allImages.filter((v, i, a) => a.indexOf(v) === i);
  };

  return (
    <div
      className="Dialogues"
      aria-label="dialogue_background"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <CloseButton onClick={() => setDialogue(null)} />
      <div className="Dialogue">
        <div className="DialogueTopBorder">
          <div className="DialogueTop">
            <CurrentDialogueLayout
              dialogue={dialogue}
              setDialogue={setDialogue}
              images={combineImages()}
            />
          </div>
        </div>
        <div className="DialogueBottomBorder">
          <div className="DialogueBottom">
            <DialogueLines
              lines={dialogue.lines}
              close={() => setDialogue(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
