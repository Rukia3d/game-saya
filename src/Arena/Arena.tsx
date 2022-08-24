import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContext, useState } from "react";
import { IArena, IArenaEvent, IMaterialQuant } from "../../api/engine/types";
import { GameContext } from "../App";
import { ArenaStartPopup } from "../Game/ArenaStartPopup";
import { GameArena } from "../Game/Game";
import { CloseButton, SmallPopup } from "../UIElements/UIButtons";
import { enoughToPay } from "../utils/helpers";

import "./Arena.scss";
dayjs.extend(relativeTime);

export const Arena = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const [arenaEvent, setArenaEvent] = useState<IArenaEvent | null>(null);

  const close = () => {
    setArenaEvent(null);
    context.changeMainScreen("main");
  };
  console.log("Is there a game", context.game);
  if (
    context &&
    context.game &&
    context.game.mode === "run" &&
    "index" in context.game
  ) {
    return <GameArena />;
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
              />
            }
          />
        ) : (
          <>
            <ArenaEvent
              arena={context.player.arenaRun}
              setArenaEvent={setArenaEvent}
            />
            <ArenaEvent
              arena={context.player.arenaFight}
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
      <div>Participants: {arenaEvent.participants}</div>
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
    !context.player.arenaRun ||
    !context.player.arenaFight
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
