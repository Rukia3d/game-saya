import dayjs from "dayjs";
import axios from "axios";
import { useContext, useState } from "react";
import {
  IArena,
  IArenaEvent,
  IArenaEventWithTime,
  IInventoryQuant,
} from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";
import { enoughToPay } from "./utils/helpers";

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

export const ArenaStartConfirmation = ({
  sucess,
  startArena,
  cancelArena,
}: {
  sucess: boolean;
  startArena: () => void;
  cancelArena: () => void;
}) => {
  if (sucess) {
    return (
      <div>
        <h4>Confirm your stake</h4>
        <button onClick={startArena}>Yes, start</button>
        <button onClick={cancelArena}>No, cancel</button>
      </div>
    );
  } else {
    return (
      <div>
        NOT ENOUGH TO STAKE
        <br />
        <button onClick={cancelArena}>Got it</button>
      </div>
    );
  }
};

export const ArenaStake = ({
  arenaEvent,
}: {
  arenaEvent: IArenaEventWithTime;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const canCompete = enoughToPay(context.player.materials, arenaEvent.stake);
  const visual = `Stake ${canCompete ? "Active" : "Inactive"}`;
  return (
    <div className={visual} onClick={() => {}}>
      <div>
        {arenaEvent.stake.map((s: IInventoryQuant, n: number) => (
          <h3 key={n}>
            Stake {s.name}: {s.quantity}
          </h3>
        ))}
      </div>
      <div>Tries: {arenaEvent.results?.length}</div>
      <div>
        {arenaEvent.rewardPool.map((s: IInventoryQuant, n: number) => (
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
  setArena,
}: {
  arena: IArenaEventWithTime;
  setArena: (a: IArenaEventWithTime | null) => void;
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
        ARENA {arena.mode} result in {res}
      </div>
      <div className="Stakes">
        <ArenaStake arenaEvent={arena} />
      </div>
      <button onClick={() => setArena(arena)}>Stake</button>
    </div>
  );
};

export const Arena = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const [arena, setArena] = useState<IArenaEventWithTime | null>(null);

  const startArena = async () => {
    if (!arena) {
      throw new Error("No arena in context");
    }
    await axios.post(`/api/players/${context.player.id}/startArena`, {
      eventMode: arena.mode,
      eventIndx: arena.index,
    });

    //context.setGame(arena);
    //setScreen("game");

    await context.mutate();
  };

  const cancelArena = () => {
    setArena(null);
    context.setScreen({ screen: "main" });
  };

  const events = [context.server.arenaRun, context.server.arenaFight];
  const canCompete: boolean =
    arena !== null && enoughToPay(context.player.materials, arena.stake);

  return (
    <div className="ArenaContainer">
      {arena ? (
        <PopUp close={cancelArena}>
          <ArenaStartConfirmation
            sucess={canCompete}
            startArena={startArena}
            cancelArena={cancelArena}
          />
        </PopUp>
      ) : null}
      <TopMenu />
      <PopUp close={() => context.setScreen({ screen: "main" })}>
        <div className="ArenaEvents">
          {events.map((a: IArena, n: number) => (
            <div className="ArenaType" key={n}>
              {a.events.map((e: IArenaEvent, m: number) => {
                const event: IArenaEventWithTime = {
                  ...e,
                  resultTime: a.resultTime,
                };
                return <ArenaEvent arena={event} key={m} setArena={setArena} />;
              })}
            </div>
          ))}
        </div>
      </PopUp>
    </div>
  );
};
