import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { id } from "../api/jest.config";
import { ICell } from "../api/levelgen";
import { GameContext } from "./App";
import { ComingSoon, mainScreenState } from "./Main";
import { CloseButton } from "./PopUp";

export const Panel = () => {
  return <h1>Panel</h1>;
};

export const Player = ({ position }: { position: number }) => {
  return <div className="Player"></div>;
};

export const Level = ({
  position,
  level,
}: {
  position: number;
  level: ICell[][];
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.game) {
    throw new Error("No data in context");
  }

  return (
    <div className="GameLevelMap">
      <div className="GameLevel" style={{ bottom: `-${position}px` }}>
        {level.map((m: ICell[], n: number) => (
          <div className="MapRow" key={n}>
            {m.map((c: ICell, j: number) => (
              <div className={`MapCell ${c.type}`} key={j}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const screenToMap = (
  xS: number,
  yS: number,
  map: ICell[][]
): [number, number] => {
  const xP = Math.floor(xS / 80);
  const yP = Math.floor(map.length - yS / 80);
  return [xP, yP];
};

export const Game = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.game) {
    throw new Error("No data in context");
  }
  // const [confirmation, setConfirmation] = useState(false);
  const [position, setPosition] = useState(0);
  const [current, setCurrent] = useState(context.game.level.levels[0]);

  //useEffect(() => {}, []);

  const winLevel = async () => {
    console.log("WinLevel");
    if (context.game && "id" in context.game) {
      await axios.post(`/api/players/${context.player.id}/winLevel`, {
        storyId: context.game.id,
      });

      await context.mutate();
      setScreen("adventure");
      context.setGame(null);
    }
  };

  const looseLevel = () => {
    setScreen("adventure");
    context.setGame(null);
  };

  setTimeout(() => {
    setPosition(position + 1);
    collision();
  }, 50);
  const bottomLeft = screenToMap(160, position, current.map);
  const topLeft = screenToMap(160, position + 79, current.map);
  const topRight = screenToMap(160 + 79, position + 79, current.map);
  const bottomRight = screenToMap(160 + 79, position, current.map);

  const isDangerous = (level: ICell[][], coord: [number, number]) => {
    console.log(coord);
    //console.log("level[coord[0]][coord[1]]", level[coord[0]][coord[1]]);
    return level[coord[1]][coord[0]].type !== "space";
  };
  const collision = () => {
    if (isDangerous(current.map, bottomLeft)) {
      console.log(
        "COLLISION BOTTOM LEFT",
        current.map[bottomLeft[1]][bottomLeft[0]].type
      );
    }
    if (isDangerous(current.map, topLeft)) {
      console.log(
        "COLLISION TOP LEFT",
        current.map[topLeft[1]][topLeft[0]].type
      );
    }
    if (isDangerous(current.map, topRight)) {
      console.log(
        "COLLISION TOP RIGHT",
        current.map[topRight[1]][topRight[0]].type
      );
    }
    if (isDangerous(current.map, bottomRight)) {
      console.log(
        "COLLISION BOTTOM RIGHT",
        current.map[bottomRight[1]][bottomRight[0]].type
      );
    }
  };

  if (context.game.mode === "story") {
    return (
      <div className="GameContainer" data-testid="game-screen">
        <div className="GameUI">
          <CloseButton close={() => setScreen("adventure")} />
          <button onClick={winLevel}>Win</button>
          <button onClick={looseLevel}>Loose</button>
          <Player position={position} />
        </div>
        <Level position={position} level={current.map} />
      </div>
    );
  }

  return <ComingSoon setScreen={setScreen} />;
};
