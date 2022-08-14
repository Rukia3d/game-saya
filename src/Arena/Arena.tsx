import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContext, useEffect, useState } from "react";
import { IArena } from "../../api/engine/types";
import { GameContext } from "../App";
import { CloseButton } from "../UIElements/UIButtons";

import "./Arena.scss";
dayjs.extend(relativeTime);

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

const fromNowTillTime = (now: dayjs.Dayjs, time: number) => {
  let diffDate = dayjs(time).diff(now, "second");
  let diffSec = diffDate % 60;
  let diffMins = Math.floor((diffDate / 60) % 60);
  let diffHrs = Math.floor(diffDate / 3600);
  return diffHrs + "h, " + diffMins + "min, " + diffSec + "sec";
};

const stillInFuture = (time: number) => {
  const d = dayjs();
  if (d.isBefore(dayjs(time))) {
    return d;
  } else {
    return null;
  }
};

export const ArenaType = ({ arena }: { arena: IArena }) => {
  const [now, setNow] = useState<dayjs.Dayjs | null>(
    stillInFuture(arena.resultTime)
  );

  setTimeout(() => {
    setNow(stillInFuture(arena.resultTime));
  }, 1000);

  if (now === null) {
    return <div className="ArenaType">CALCULATING ARENA RESULTS</div>;
  }

  const res = fromNowTillTime(now, arena.resultTime);
  return (
    <div className="ArenaType">
      ARENA {arena.type} result in {res}
    </div>
  );
};
