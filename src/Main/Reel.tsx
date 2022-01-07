import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import "./Reel.css";
// Types
import { IReel, IReelGroup } from "../utils/types";
// Utils
// Components
import { CloseButton } from "../UI/CloseButton";
import { ScrollButton } from "../UI/ScrollButton";
import { findReel } from "../utils/helpers";

const ReelLayoutFour = ({ reel }: { reel: IReelGroup }) => {
  return (
    <div className="ReelImageGroup">
      <div className="ReelImageGroupVert">
        <div className="ReelImage1"></div>
        <div className="ReelImage2"></div>
      </div>
      <div className="ReelImageGroupHorz">
        <div className="ReelImage3"></div>
        <div className="ReelImage4"></div>
      </div>
    </div>
  );
};

const ReelLayoutTree = ({ reel }: { reel: IReelGroup }) => {
  return (
    <div className="ReelImageGroup">
      <div className="ReelImageGroupHorz">
        <div className="ReelImage5"></div>
        <div className="ReelImage6"></div>
      </div>
      <div className="ReelImageGroupVert">
        <div className="ReelImage7"></div>
      </div>
    </div>
  );
};

const ReelLayoutTwo = ({ reel }: { reel: IReelGroup }) => {
  return (
    <div className="ReelImageGroup">
      <div className="ReelImageGroupVert">
        <div className="ReelImage8"></div>
        <div className="ReelImage7"></div>
      </div>
    </div>
  );
};

const ReelLayoutOne = ({ reel }: { reel: IReelGroup }) => {
  return (
    <div className="ReelImageGroup">
      <div className="ReelImageGroupVert">
        <div className="ReelImage9"></div>
      </div>
    </div>
  );
};

const CurrentReel = ({ reel }: { reel: IReelGroup }) => {
  switch (reel.layout) {
    case 4:
      return <ReelLayoutFour reel={reel} />;
    case 3:
      return <ReelLayoutTree reel={reel} />;
    case 2:
      return <ReelLayoutTwo reel={reel} />;
    default:
      return <ReelLayoutOne reel={reel} />;
  }
};

export const Reel = ({
  reel,
  setReel,
}: {
  reel: IReel;
  setReel: (r: IReel | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.story || !context.gameState) {
    throw new Error("No data");
  }

  const [reelGroup, setReelGroup] = useState<IReelGroup>(reel.imageGroups[0]);

  const isLast = () => {
    return reelGroup.id === reel.imageGroups.length;
  };

  const nextReel = (): IReelGroup => {
    const nextIndex = reelGroup.id + 1;
    const next = reel.imageGroups.find((r: IReelGroup) => r.id === nextIndex);

    if (!next) throw new Error("Can't find next reel group to display");
    return next;
  };

  const backToMain = () => {
    setReel(null);
    context.setStory(null);
  };
  return (
    <div className="ReelScreen" aria-label="reel-screen">
      {isLast() ? (
        <CloseButton onClick={backToMain} />
      ) : (
        <ScrollButton onClick={() => setReelGroup(nextReel())} direction="r" />
      )}
      <CurrentReel reel={reelGroup} />
    </div>
  );
};
