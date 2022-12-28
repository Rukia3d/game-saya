import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { GameContext } from "./App";
import { CloseButton } from "./PopUp";
import { Reel } from "./Reel";
import { Gameplay, initGameplay, updateGameplay } from "./gameplay";
import {
  ICell,
  IReel,
  IRun,
  IDialogue,
  IMapEnemyCell,
  IMapTriggerCell,
} from "../api/engine/types";

export const useGameplay = (gameplay: Gameplay): [Gameplay, () => void] => {
  const [, setTime] = useState(0);

  const tick = () => {
    setTime((prevTime) => {
      updateGameplay(gameplay);
      return prevTime + 1;
    });
  };
  return [gameplay, tick];
};

export const Player = ({ gameplay }: { gameplay: Gameplay }) => {
  return (
    <div
      className="Player"
      style={{
        left: `${gameplay.player.x}px`,
        bottom: `${gameplay.player.y}px`,
      }}
    ></div>
  );
};

const Trigger = ({ trigger }: { trigger: IMapTriggerCell }) => {
  return (
    <div
      className="trigger"
      style={{ left: `${trigger.x}px`, bottom: `${trigger.y}px` }}
    />
  );
};

const Enemy = ({ enemy }: { enemy: IMapEnemyCell }) => {
  return (
    <div
      className="enemy"
      style={{ left: `${enemy.x}px`, bottom: `${enemy.y}px` }}
    />
  );
};

export const Controls = ({ gameplay }: { gameplay: Gameplay }) => {
  const moveLeft = () => {
    console.log("moveLeft");
    gameplay.moveLeft();
  };
  const moveRight = () => {
    console.log("moveRight");
    gameplay.moveRight();
  };

  return (
    <div className="Control">
      <div className="Left" onClick={moveLeft}></div>
      <div className="Right" onClick={moveRight}></div>
    </div>
  );
};

export const Level = ({ gameplay }: { gameplay: Gameplay }) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.screen.screen !== "game" ||
    context.screen.adventureId == null ||
    context.screen.storyId == null ||
    context.screen.gameId == null
  ) {
    throw new Error("No data in context");
  }

  const { level, player } = gameplay;
  const staticCells = level.map;
  const enemies = level.enemies.coordinates;
  const triggers = level.triggers.coordinates;

  return (
    <div className="GameLevelMap">
      <div className="GameLevel" style={{ bottom: `-${player.y}px` }}>
        {staticCells.map((m: ICell[], n: number) => (
          <div className="MapRow" key={n}>
            {m.map((c: ICell, j: number) => (
              <div className={`MapCell ${c.type}`} key={j}></div>
            ))}
          </div>
        ))}
        {enemies.map((enemy, n) => (
          <Enemy key={n} enemy={enemy} />
        ))}
        {triggers.map((trigger, n) => (
          <Trigger key={n} trigger={trigger} />
        ))}

        <Player gameplay={gameplay} />
      </div>
    </div>
  );
};

export const GameDialogue = ({
  dialogue,
  setDialogue,
  gameplay,
}: {
  dialogue: IDialogue;
  setDialogue: (d: IDialogue | null) => void;
  gameplay: Gameplay;
}) => {
  const [line, setLine] = useState(0);
  const [text, setText] = useState(0);

  const nextLine = () => {
    const lastLine = dialogue.lines.length - 1;
    const lastText = dialogue.lines[line].text.length - 1;
    // More text - switch text
    if (text < lastText) {
      console.log("switch text");
      setText(text + 1);
    }
    // Last text - switch line
    else if (line < lastLine) {
      console.log("switch line");
      setLine(line + 1);
    }
    // Last line - turn off dialogue
    else {
      console.log("dialogue off");
      setDialogue(null);
      gameplay.dialogue = null;
      gameplay.state = "run";
    }
  };

  return (
    <div className="DialogueUI">
      <div className="DialogueImage">
        <img
          className="DialogueBackground"
          src={`../pics/dialogues/backgrounds/${dialogue.background}.png`}
          alt={dialogue.background}
        />
        <img
          className="DialogueCharacter"
          src={`../pics/dialogues/characters/${dialogue.lines[line].image}.png`}
          alt={dialogue.background}
        />
      </div>
      <div className="DialogueText" onClick={nextLine}>
        {dialogue.lines[line].text[text]}
      </div>
    </div>
  );
};

export const GamePlay = ({
  winLevel,
  looseLevel,
  setReel,
  gameplay: levelGameplay,
}: {
  winLevel: () => void;
  looseLevel: () => void;
  setReel: (r: undefined | IReel[]) => void;
  gameplay: Gameplay;
}) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.screen.screen !== "game" ||
    context.screen.adventureId == null ||
    context.screen.storyId == null ||
    context.screen.gameId == null
  ) {
    throw new Error("No data in context");
  }

  const [gameplay, tick] = useGameplay(levelGameplay);
  const [dialogue, setDialogue] = useState<IDialogue | null>(null);
  const { lives } = gameplay;
  console.log("gameplay.state", gameplay.state);

  useEffect(() => {
    let myTimeout: any = null;
    switch (gameplay.state) {
      case "run":
        myTimeout = setTimeout(tick, 25);
        break;
      case "stop":
        setDialogue(gameplay.dialogue);
        break;
    }

    return () => {
      if (myTimeout) {
        clearTimeout(myTimeout);
      }
    };
  }, [gameplay.dialogue, gameplay.state, tick]);
  console.log("GamePlay dialogue", dialogue);

  if (dialogue) {
    return (
      <div className="GameContainer" data-testid="game-screen">
        <GameDialogue
          dialogue={dialogue}
          setDialogue={setDialogue}
          gameplay={gameplay}
        />
      </div>
    );
  }

  return (
    <div className="GameContainer" data-testid="game-screen">
      <div className="GameUI">
        <CloseButton
          close={() =>
            context.setScreen({
              screen: "adventure",
              adventureId: null,
              storyId: null,
            })
          }
        />
        <button onClick={winLevel}>Win</button>
        <button onClick={looseLevel}>Loose</button>
        <div>Lives: {lives}</div>
        <Controls gameplay={gameplay} />
      </div>
      <Level gameplay={gameplay} />
    </div>
  );
};

export const Game = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.screen.screen !== "game" ||
    context.screen.adventureId == null ||
    context.screen.storyId == null ||
    context.screen.gameId == null
  ) {
    throw new Error("No data in context");
  }
  const adventure = context.player.adventures[context.screen.adventureId];
  const story = adventure.stories[context.screen.storyId];
  const game = story.chapters[context.screen.storyId];

  const winLevel = async () => {
    console.log("WinLevel");
    await axios.post(`/api/players/${context.player.id}/winLevel`, {
      adventureId: adventure.id,
      storyId: story.id,
      chapterId: game.id,
    });

    await context.mutate();

    context.setScreen({
      screen: "adventure",
      adventureId: adventure.id,
      storyId: story.id,
    });
  };

  const looseLevel = () => {
    context.setScreen({
      screen: "adventure",
      adventureId: adventure.id,
      storyId: story.id,
    });
  };

  const [reel, setReel] = useState(game.level.opening);

  if (reel === undefined) {
    const level = game.level.levels[0];
    const gameplay = initGameplay(level as IRun);

    return (
      <GamePlay
        gameplay={gameplay}
        setReel={setReel}
        winLevel={winLevel}
        looseLevel={looseLevel}
      />
    );
  }
  return (
    <div className="ReelContainer" data-testid="reel-screen">
      <CloseButton close={() => setReel(undefined)} />
      <Reel reel={reel} setReel={setReel} />
    </div>
  );
};
