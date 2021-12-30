import React, { useContext, useEffect, useState } from "react";
import "./Dialogue.scss";

// Types
import { dialogueLayout, IDialogue, IDialogueLine } from "../utils/types";
// Utils
import { isValidAction } from "../utils/helpers";
import { displayAddedHero, displayAddedUpdate } from "../utils/screenLogic";
import { finishStory } from "../utils/gamelogic";

// Components
import { CloseButton } from "../UI/CloseButton";
import { GameContext } from "../App";

const DialogueLine = ({ line, i }: { line: IDialogueLine; i: number }) => {
  return (
    <div className="DialogueLine" aria-label={`dialogue_line_${i}`}>
      {line.text}
    </div>
  );
};

export const DialogueImage = ({
  hero,
  image,
}: {
  hero: string | undefined;
  image: string | undefined;
}) => {
  const imgUrl = `../img/Dialogues/${hero}_${image}.png`;
  const style =
    hero && image
      ? {
          backgroundImage: `url(${imgUrl})`,
        }
      : {};
  return <div className="DialogueCharacter" style={style}></div>;
};

const DialogueSingleLayout = ({
  line,
  imgUrl,
}: {
  line: IDialogueLine;
  imgUrl: string;
}) => {
  return (
    <div className="DialogueSingleBorder">
      <div
        className="DialogueSingle"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <DialogueImage hero={line.character} image={line.image} />
      </div>
    </div>
  );
};

const DialogueDoubleLayout = ({
  line,
  imgUrl,
}: {
  line: IDialogueLine;
  imgUrl: string;
}) => {
  const [rChar, setRChar] = useState<IDialogueLine | null>(null);
  const [lChar, setLChar] = useState<IDialogueLine | null>(null);

  useEffect(() => {
    setRChar(line.pos === "R" ? line : null);
    setLChar(line.pos === "L" ? line : null);
  }, [line]);

  return (
    <div className="DialogueDouble">
      <div className="DialogueDoubleBorderLeft">
        <div
          className="DialogueDoubleLeft"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        >
          <DialogueImage hero={lChar?.character} image={lChar?.image} />
        </div>
      </div>
      <div className="DialogueDoubleBorderRight">
        <div
          className="DialogueDoubleRight"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        >
          <DialogueImage hero={rChar?.character} image={rChar?.image} />
        </div>
      </div>
    </div>
  );
};

const DialogueTripleLayout = ({
  line,
  imgUrl,
}: {
  line: IDialogueLine;
  imgUrl: string;
}) => {
  return (
    <div className="DialogueTopBorder">
      <div className="DialogueTop"></div>
    </div>
  );
};

type DialogueLayoutsType = {
  [key in dialogueLayout]: React.FC<{
    line: IDialogueLine;
    imgUrl: string;
  }>;
};
const dialLayouts: DialogueLayoutsType = {
  single: DialogueSingleLayout,
  double: DialogueDoubleLayout,
  triple: DialogueTripleLayout,
};

export const Dialogue = ({
  dialogue,
  setDialogue,
}: {
  dialogue: IDialogue;
  setDialogue: (d: IDialogue | null) => void;
}) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.setStory ||
    !context.gameState.heroes
  ) {
    throw new Error("No data");
  }

  const CurrentDialogueLayout = dialLayouts[dialogue.layout];
  const imgUrl = `/img/Backgrounds/dialogue_background.jpg`;

  const finishDialogue = () => {
    if (context.gameState?.player && context.story) {
      isValidAction(context.story.action);
      displayAddedUpdate(
        context.gameState.player.spellUpdates,
        context.gameState.spellUpdates,
        context.story.action,
        context.setAdditionScreen
      );
      displayAddedHero(
        context.gameState.player.heroes,
        context.gameState.heroes,
        context.story.action,
        context.setAdditionScreen
      );
      context.setGameState({
        ...context.gameState,
        player: finishStory(context.gameState, context.story),
      });
    }
    context.setStory(null);
  };
  const lines = dialogue.lines;
  const [line, setLine] = useState(lines[0]);
  let res = lines.indexOf(line);

  const nextLine = () => {
    res = lines.indexOf(line);
    if (res >= lines.length - 1) {
      dialogue.layout === "single" ? setDialogue(null) : finishDialogue();
    } else {
      setLine(lines[res + 1]);
    }
  };

  const finishDialogueWithStory = () => {
    setDialogue(null);
    context.setStory(null);
  };

  return (
    <div
      className="Dialogues"
      aria-label="dialogue_background"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <CloseButton onClick={finishDialogueWithStory} />
      <div className="Dialogue">
        <div className="DialogueTopBorder">
          <div className="DialogueTop">
            <CurrentDialogueLayout
              imgUrl={`/img/Dialogues/${dialogue.background}.jpg`}
              line={line}
            />
          </div>
        </div>
        <div className="DialogueBottomBorder">
          <div className="DialogueBottom">
            <div
              className="DialogueLines"
              onClick={nextLine}
              aria-label="lines_next"
            >
              <DialogueLine line={line} i={res} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
