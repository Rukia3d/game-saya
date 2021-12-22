import React, { useContext } from "react";
import "./Dialogue.scss";
import { GameContext } from "../App";
// Types
// Utils
import { finishStory } from "../utils/gamelogic";
import { findDialogue, isValidAction } from "../utils/helpers";
import { displayAddedHero, displayAddedUpdate } from "../utils/screenLogic";
// Components
import { CloseButton } from "../UI/CloseButton";
import { DialogueLines } from "./DialogueLines";

export const Dialogue = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.story ||
    !context.setStory ||
    !context.gameState.heroes
  ) {
    throw new Error("No data");
  }
  const dialogue = findDialogue(context.gameState.dialogues, context.story.id);

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
  // console.log(
  //   "game state DIALOGUE",
  //   //@ts-ignore
  //   JSON.parse(JSON.stringify(context.gameState?.adventures[0].stories[0]))
  // );
  return (
    <div className="Dialogues" aria-label="dialogue_background">
      <CloseButton onClick={() => context.setStory(null)} />
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
