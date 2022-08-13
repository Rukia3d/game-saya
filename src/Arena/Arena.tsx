import { useContext, useEffect, useState } from "react";
import { IArena } from "../../api/engine/types";
import { GameContext } from "../App";
import { CloseButton, SmallPopup } from "../UIElements/UIButtons";

import "./Arena.scss";

export const Arena = () => {
  const context = useContext(GameContext);
  const [arena, setArena] = useState(true);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const close = () => {
    setArena(false);
    context.changeMainScreen("main");
  };

  return (
    <div className="arena" data-testid="arena-screen">
      {/* {win ? (
        <SmallPopup onClick={closeWin} content={<WonMaterials />} />
      ) : (
        <CurrentScreen />
      )} */}
      <ArenaTypes close={close} />
    </div>
  );
};

export const ArenaTypes = ({ close }: { close: () => void }) => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.player.arena) {
    throw new Error("No data in context");
  }
  const arenas = context.player.arena;
  console.log("arenas", arenas.length);
  return (
    <>
      <CloseButton onClick={close} />
      <div className="Content">
        {arenas.map((a: IArena, i: number) => (
          <ArenaType key={i} arena={a} />
        ))}
      </div>
    </>
  );
};

export const ArenaType = ({ arena }: { arena: IArena }) => {
  let timeNow = new Date().valueOf();
  var diffMs = new Date(arena.resultTime).valueOf() - timeNow; // milliseconds between now & Christmas
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000); // minutes
  var diffSec = Math.floor(((diffMs % 86400000) % 3600000) / 60000 / 60000); // minutes
  const res =
    diffDays +
    "d, " +
    diffHrs +
    "h, " +
    diffMins +
    "min, " +
    diffSec +
    "sec until result";
  console.log(
    `Now is ${new Date(timeNow)} and the result is in ${new Date(
      arena.resultTime
    )}`
  );

  //   useEffect(() => {
  //     const timeDiffMS = arena.resultTime.getTime() - new Date().getTime();
  //     console.log("newTimeDiff", newTimeDiff);
  //   }, []);

  return (
    <div className="ArenaType">
      ARENA {arena.type} result in {res}
    </div>
  );
};
