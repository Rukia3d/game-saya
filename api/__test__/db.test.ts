import * as engine from "../engine/engine";
import { Database } from "sqlite";
import createDb from "../storage/db";
import {
  IArenaEndEvent,
  IArenaStartEvent,
  IClaimRewardEvent,
  ICreatePlayerEvent,
  IServerArenaEndDB,
  IServerArenaEndEvent,
  IServerArenaStartEvent,
  IStartLevelEvent,
  IWinLevelEvent,
} from "../engine/types";
import { baseServer } from "../storage/testDB";
import {
  INDEXOFENERGY,
  INDEXOFEXPERIENCE,
  INDEXOFGOLD,
  INDEXOFJADE,
} from "../config";
import dayjs from "dayjs";
import { ARENAEVENTINTERVAL } from "../cronjobs";
import exp from "constants";

//jest.mock("../storage/db");

export const setupDb = async (): Promise<Database> => {
  const db = await createDb(":memory:");
  return db;
};

test("Registering user", async () => {
  const db = await setupDb();
  const testGame = { server: baseServer, players: [] };
  const ARENARUN = 60;
  const PLAYERNAME = "TestPlayerAutomated";
  const createPlayerEv: ICreatePlayerEvent = {
    playerId: 1,
    eventId: 0,
    created: Date.now(),
    type: "CREATEPLAYER",
    playerName: PLAYERNAME,
  };
  const startLevelEv: IStartLevelEvent = {
    playerId: 1,
    eventId: 1,
    created: Date.now(),
    type: "STARTLEVEL",
    chapterId: 0,
    storyId: 0,
    adventureId: 0,
  };
  const winLevelEv: IWinLevelEvent = {
    playerId: 1,
    eventId: 2,
    created: Date.now(),
    type: "WINLEVEL",
    chapterId: 0,
    storyId: 0,
    adventureId: 0,
  };
  const startLevelEv1: IStartLevelEvent = {
    playerId: 1,
    eventId: 1,
    created: Date.now(),
    type: "STARTLEVEL",
    chapterId: 0,
    storyId: 0,
    adventureId: 0,
  };
  const winLevelEv1: IWinLevelEvent = {
    playerId: 1,
    eventId: 2,
    created: Date.now(),
    type: "WINLEVEL",
    chapterId: 0,
    storyId: 0,
    adventureId: 0,
  };
  const resultTime = dayjs(1671007301809 + ARENAEVENTINTERVAL).valueOf();
  const serverArenaStartEv: IServerArenaStartEvent = {
    eventId: 3,
    created: 1671007301809,
    type: "SERVERARENASTART",
    start: 1671007301809,
    end: resultTime,
  };
  const startArenaEv: IArenaStartEvent = {
    playerId: 1,
    eventId: 4,
    created: Date.now(),
    type: "ARENASTART",
    mode: "run",
    index: 0,
  };
  const endArenaEv: IArenaEndEvent = {
    playerId: 1,
    eventId: 5,
    created: dayjs(Date.now() + ARENARUN).valueOf(),
    type: "ARENAEND",
    mode: "run",
    index: 0,
  };
  const startArenaEv1: IArenaStartEvent = {
    playerId: 1,
    eventId: 4,
    created: Date.now(),
    type: "ARENASTART",
    mode: "run",
    index: 0,
  };
  const endArenaEv1: IArenaEndEvent = {
    playerId: 1,
    eventId: 5,
    created: dayjs(Date.now() + ARENARUN * 2).valueOf(),
    type: "ARENAEND",
    mode: "run",
    index: 0,
  };
  const serverArenaEndEv: IServerArenaEndEvent = {
    eventId: 6,
    created: Date.now(),
    type: "SERVERARENAEND",
  };
  const claimRewardEv: IClaimRewardEvent = {
    eventId: 7,
    playerId: 1,
    created: Date.now(),
    type: "CLAIMREWARD",
    claimId: 0,
  };

  // Create player
  const game_1 = await engine.applyEvent(db, testGame, createPlayerEv);
  expect(game_1.players[0].name).toEqual(PLAYERNAME);
  expect(game_1.players[0].materials[INDEXOFENERGY].quantity).toEqual(50);
  expect(game_1.players[0].materials[INDEXOFGOLD].quantity).toEqual(0);
  expect(game_1.players[0].materials[INDEXOFEXPERIENCE].quantity).toEqual(0);
  expect(game_1.players[0].materials[INDEXOFJADE].quantity).toEqual(0);
  expect(game_1.players[0].adventures[0].stories[0].chapters[0].state).toEqual(
    "open"
  );

  // Start first level - spend energy
  const game_2 = await engine.applyEvent(db, game_1, startLevelEv);
  expect(game_2.players[0].materials[INDEXOFENERGY].quantity).toEqual(45);
  expect(game_2.players[0].materials[INDEXOFGOLD].quantity).toEqual(0);
  expect(game_2.players[0].materials[INDEXOFEXPERIENCE].quantity).toEqual(0);
  expect(game_2.players[0].materials[INDEXOFJADE].quantity).toEqual(0);

  // Win first level - get rewards
  const game_3 = await engine.applyEvent(db, game_2, winLevelEv);
  expect(game_3.players[0].materials[INDEXOFENERGY].quantity).toEqual(45);
  expect(game_3.players[0].materials[INDEXOFGOLD].quantity).toEqual(50);
  expect(game_3.players[0].materials[INDEXOFEXPERIENCE].quantity).toEqual(30);
  expect(game_3.players[0].materials[INDEXOFJADE].quantity).toEqual(50);
  expect(game_3.players[0].adventures[0].stories[0].chapters[0].state).toEqual(
    "complete"
  );
  expect(game_3.players[0].adventures[0].stories[0].chapters[1].state).toEqual(
    "open"
  );

  // Start Level 1 again - spend energy
  const game_4 = await engine.applyEvent(db, game_3, startLevelEv1);
  expect(game_4.players[0].materials[INDEXOFENERGY].quantity).toEqual(40);

  // Win first level again - get less rewards
  const game_5 = await engine.applyEvent(db, game_4, winLevelEv1);
  expect(game_5.players[0].materials[INDEXOFENERGY].quantity).toEqual(40);
  expect(game_5.players[0].materials[INDEXOFGOLD].quantity).toEqual(75);
  expect(game_5.players[0].materials[INDEXOFEXPERIENCE].quantity).toEqual(33);
  expect(game_5.players[0].materials[INDEXOFJADE].quantity).toEqual(75);
  expect(game_5.players[0].adventures[0].stories[0].chapters[0].state).toEqual(
    "complete"
  );
  expect(game_5.players[0].adventures[0].stories[0].chapters[1].state).toEqual(
    "open"
  );

  // Start Arena on the server
  const game_6 = await engine.applyEvent(db, game_5, serverArenaStartEv);
  expect(game_6.server.arenaRun).toBeDefined();
  expect(game_6.server.arenaRun).toBeDefined();

  expect(game_6.server.arenaRun.events.length).toEqual(3);
  expect(game_6.server.arenaRun.events[0].stake.length).toEqual(2);
  expect(game_6.server.arenaRun.resultTime).toEqual(resultTime);

  // Participate in Arena
  game_6.players[0].materials[8].quantity = 10;
  const game_7 = await engine.applyEvent(db, game_6, startArenaEv);
  expect(game_7.server.arenaRun.events[0].stake[1].id).toEqual(
    game_7.server.arenaRun.events[0].rewardPool[1].id
  );
  expect(game_7.server.arenaRun.events[0].stake[1].quantity).toEqual(
    game_7.server.arenaRun.events[0].rewardPool[1].quantity
  );
  expect(game_7.players[0].materials[1].quantity).toEqual(50);
  expect(game_7.players[0].materials[8].quantity).toEqual(5);

  // Submit time to Arena
  const game_8 = await engine.applyEvent(db, game_7, endArenaEv);
  expect(game_8.server.arenaRun.events[0].results.length).toEqual(1);
  expect(game_8.server.arenaRun.events[0].results[0].playerName).toEqual(
    PLAYERNAME
  );
  expect(game_8.server.arenaRun.events[0].results[0].time).toEqual(ARENARUN);

  // Participate in Arena Again
  const game_9 = await engine.applyEvent(db, game_8, startArenaEv1);
  expect(game_9.server.arenaRun.events[0].stake[1].id).toEqual(
    game_9.server.arenaRun.events[0].rewardPool[1].id
  );
  expect(game_9.server.arenaRun.events[0].stake[1].quantity * 2).toEqual(
    game_9.server.arenaRun.events[0].rewardPool[1].quantity
  );
  expect(game_9.players[0].materials[1].quantity).toEqual(25);
  expect(game_9.players[0].materials[8].quantity).toEqual(0);

  // Submit time to Arena
  const game_10 = await engine.applyEvent(db, game_9, endArenaEv1);
  expect(game_10.server.arenaRun.events[0].results[0].playerName).toEqual(
    PLAYERNAME
  );
  expect(game_10.server.arenaRun.events[0].results[0].time).toEqual(ARENARUN);

  // Result
  const game_11 = await engine.applyEvent(db, game_10, serverArenaEndEv);
  expect(game_11.players[0].claims[0].prize[0].id).toEqual(1);
  expect(game_11.players[0].claims[0].prize[0].quantity).toEqual(25);
  expect(game_11.players[0].claims[0].prize[1].id).toEqual(8);
  expect(game_11.players[0].claims[0].prize[1].quantity).toEqual(5);
  expect(game_11.players[0].claims[0].claimed).toBeFalsy();

  // Claim received reward
  const game_12 = await engine.applyEvent(db, game_11, claimRewardEv);
  expect(game_12.players[0].claims[0].claimed).toBeTruthy();
  expect(game_12.players[0].materials[1].quantity).toEqual(50);
  expect(game_12.players[0].materials[8].quantity).toEqual(5);
});
