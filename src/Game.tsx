import { CloseButton } from "./UIElements/UIButtons";

export const GameRun = () => {
  return <div className="Run"></div>;
};

export const GameFight = () => {
  return <div className="Fight"></div>;
};

export const Game = ({ setGame }: { setGame: any }) => {
  return (
    <div className="Game">
      <CloseButton onClick={() => setGame(null)} />
    </div>
  );
};
