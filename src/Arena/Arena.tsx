import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContext, useState } from "react";
import {
  IArena,
  IArenaEvent,
  IArenaResult,
  IMaterialQuant,
} from "../../api/engine/types";
import { GameContext } from "../App";
import { ArenaStartPopup } from "../Game/ArenaStartPopup";
import { GameArena } from "../Game/Game";
import { CloseButton, SmallPopup } from "../UIElements/UIButtons";
import { enoughToPay } from "../utils/helpers";

import "./Arena.scss";
dayjs.extend(relativeTime);

export const displayPlayerTime = (timeResult: number) => {
  let leftMlSec = timeResult % 1000;
  let allInSec = Math.floor(timeResult / 1000);
  let leftSec = allInSec % 60;
  let allInMin = Math.floor(allInSec / 60);
  return `${allInMin}m ${leftSec}.${leftMlSec}sec`;
};

export const ArenaResult = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.server) {
    throw new Error("No data in context");
  }
  if (!context.player.currentState.arenaResult) {
    throw new Error(
      "No time found for a player result, something went very wrong"
    );
  }
  const closeResult = () => {
    context.changeMainScreen("arena");
  };

  return (
    <div>
      <h3>
        YOUR RESULT:{" "}
        {displayPlayerTime(context.player.currentState.arenaResult?.result)}
      </h3>
      <h4>Top 3</h4>
      <div>
        {context.player.currentState.arenaResult?.results.map(
          (r: IArenaResult, n: number) => (
            <div>{r.playerName + ": " + displayPlayerTime(r.time)}</div>
          )
        )}
      </div>
    </div>
  );
};

export const Arena = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const [arenaEvent, setArenaEvent] = useState<IArenaEvent | null>(null);
  const [game, setGame] = useState<IArenaEvent | null>(null);
  const [win, setWin] = useState(false);

  const close = () => {
    setArenaEvent(null);
    context.changeMainScreen("main");
  };
  if (game) {
    return (
      <>
        {win ? <SmallPopup onClick={close} content={<ArenaResult />} /> : null}
        <GameArena game={game} setWin={setWin} />
      </>
    );
  }

  return (
    <div className="arena" data-testid="arena-screen">
      <CloseButton onClick={close} />
      <div className="Content">
        {arenaEvent !== null ? (
          <SmallPopup
            onClick={() => {
              setArenaEvent(null);
              context.changeArcanaScreen("arcana");
            }}
            content={
              <ArenaStartPopup
                setArenaEvent={setArenaEvent}
                arenaEvent={arenaEvent}
                setGame={setGame}
              />
            }
          />
        ) : (
          <>
            <ArenaEvent
              arena={context.server.arenaRun}
              setArenaEvent={setArenaEvent}
            />
            <ArenaEvent
              arena={context.server.arenaFight}
              setArenaEvent={setArenaEvent}
            />
          </>
        )}
      </div>
    </div>
  );
};

const timeDifference = (now: dayjs.Dayjs, time: number) => {
  let diffDate = dayjs(time).diff(now, "second");
  let diffSec = diffDate % 60;
  let diffMins = Math.floor((diffDate / 60) % 60);
  let diffHrs = Math.floor(diffDate / 3600);
  return [diffHrs, diffMins, diffSec];
};

const fromNowTillTime = (now: dayjs.Dayjs, time: number) => {
  const res = timeDifference(now, time);
  return res[0] + "h, " + res[1] + "min, " + res[2] + "sec";
};

const stillInFuture = (time: number) => {
  const d = dayjs();
  if (d.isBefore(dayjs(time))) {
    return d;
  } else {
    return null;
  }
};

const blockParticipation = (now: dayjs.Dayjs, time: number) => {
  const res = timeDifference(now, time);
  let block = true;
  if (res[0] > 0) block = false;
  if (res[1] >= 5) block = false;
  return block;
};

export const ArenaStake = ({
  arenaEvent,
  setArenaEvent,
}: {
  arenaEvent: IArenaEvent;
  setArenaEvent: (a: IArenaEvent) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const canCompete = enoughToPay(context.player.materials, arenaEvent.stake);
  const visual = `Stake ${canCompete ? "Active" : "Inactive"}`;
  return (
    <div className={visual} onClick={() => setArenaEvent(arenaEvent)}>
      <div>
        {arenaEvent.stake.map((s: IMaterialQuant, n: number) => (
          <h3 key={n}>
            Stake {s.name}: {s.quantity}
          </h3>
        ))}
      </div>
      <div>Tries: {arenaEvent.results?.length}</div>
      <div>
        {arenaEvent.rewardPool.map((s: IMaterialQuant, n: number) => (
          <div key={n}>
            {s.name}: {s.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ArenaEvent = ({
  arena,
  setArenaEvent,
}: {
  arena: IArena;
  setArenaEvent: (a: IArenaEvent | null) => void;
}) => {
  const context = useContext(GameContext);
  const [now, setNow] = useState<dayjs.Dayjs | null>(
    stillInFuture(arena.resultTime)
  );

  if (
    !context ||
    !context.player ||
    !context.server.arenaRun ||
    !context.server.arenaFight
  ) {
    throw new Error("No data in context");
  }

  setTimeout(() => {
    setNow(stillInFuture(arena.resultTime));
  }, 1000);

  if (now === null) {
    return <div className="ArenaEvent">RESULTS</div>;
  }

  if (blockParticipation(now, arena.resultTime)) {
    return <div className="ArenaEvent">CALCULATING ARENA RESULTS</div>;
  }

  const res = fromNowTillTime(now, arena.resultTime);
  return (
    <div className="ArenaEvent">
      <div>
        ARENA {arena.type} result in {res}
      </div>
      <div className="Stakes">
        {arena.events.map((l: IArenaEvent, n: number) => (
          <ArenaStake key={n} arenaEvent={l} setArenaEvent={setArenaEvent} />
        ))}
      </div>
    </div>
  );
};
