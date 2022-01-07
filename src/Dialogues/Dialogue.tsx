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
  return (
    <div
      className="DialogueCharacter"
      style={style}
      aria-label={`character_image_${hero}`}
    ></div>
  );
};

const DialogueSingleLayout = ({
  line,
  backImgUrl,
}: {
  line: IDialogueLine;
  backImgUrl: string;
}) => {
  const panelImgUrl = `/img/Dialogues/backg_singular.jpg`;
  return (
    <div className="DialogueSingleBorder">
      <div
        className="DialogueSingle"
        style={{
          backgroundImage: `url(${panelImgUrl})`,
        }}
      >
        <DialogueImage hero={line.character} image={line.image} />
      </div>
    </div>
  );
};

const DialogueDoubleLayout = ({
  line,
  backImgUrl,
}: {
  line: IDialogueLine;
  backImgUrl: string;
}) => {
  const [rChar, setRChar] = useState<IDialogueLine | null>(null);
  const [lChar, setLChar] = useState<IDialogueLine | null>(null);

  useEffect(() => {
    setRChar(line.pos === "R" ? line : null);
    setLChar(line.pos === "L" ? line : null);
  }, [line]);

  const panelImgUrl = `/img/Dialogues/backg_double.jpg`;
  return (
    <div
      className="DialogueDouble"
      style={{
        backgroundImage: `url(${backImgUrl})`,
      }}
    >
      <div
        className="DialogueDoubleBorderLeft"
        style={{ opacity: `${lChar ? 1 : 0.3}` }}
      >
        <div
          className="DialogueDoubleLeft"
          style={{
            backgroundImage: `url(${panelImgUrl})`,
          }}
        >
          <DialogueImage hero={lChar?.character} image={lChar?.image} />
        </div>
      </div>
      <div
        className="DialogueDoubleBorderRight"
        style={{ opacity: `${rChar ? 1 : 0.3}` }}
      >
        <div
          className="DialogueDoubleRight"
          style={{
            backgroundImage: `url(${panelImgUrl})`,
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
  backImgUrl,
}: {
  line: IDialogueLine;
  backImgUrl: string;
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
    backImgUrl: string;
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

  // making sure only dialogues can be rendered
  if (context.story && context.story.type !== "dialogue") {
    throw new Error("Incorrect type of the story");
  }
  const CurrentDialogueLayout = dialLayouts[dialogue.layout];
  const imgUrl = `/img/Backgrounds/dialogue-screen.jpg`;

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
  const isNotActionable = !context.story;
  const nextLine = () => {
    res = lines.indexOf(line);
    if (res >= lines.length - 1) {
      isNotActionable ? setDialogue(null) : finishDialogue();
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
      aria-label="dialogue-screen"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <CloseButton onClick={finishDialogueWithStory} />
      <div className="Dialogue">
        <div className="DialogueTopBorder">
          <div className="DialogueTop">
            <CurrentDialogueLayout
              backImgUrl={`/img/Dialogues/${dialogue.background}.jpg`}
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
