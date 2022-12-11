import * as engine from "../engine/engine";
import { Database } from "sqlite";
import createDb from "../storage/db";
import {
  ICreatePlayerEvent,
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

//jest.mock("../storage/db");

export const setupDb = async (): Promise<Database> => {
  const db = await createDb(":memory:");
  return db;
};

test("Registering user", async () => {
  const db = await setupDb();
  const testGame = { server: baseServer, players: [] };
  const createPlayer: ICreatePlayerEvent = {
    playerId: 1,
    eventId: 0,
    created: Date.now(),
    type: "CREATEPLAYER",
    playerName: "Test player 1",
  };
  const startLevel: IStartLevelEvent = {
    playerId: 1,
    eventId: 1,
    created: Date.now(),
    type: "STARTLEVEL",
    chapterId: 0,
    storyId: 0,
    adventureId: 0,
  };
  const winLevel: IWinLevelEvent = {
    playerId: 1,
    eventId: 1,
    created: Date.now(),
    type: "WINLEVEL",
    chapterId: 0,
    storyId: 0,
    adventureId: 0,
  };

  // Create player
  const playerName = await engine.applyEvent(db, testGame, createPlayer);
  expect(playerName.players[0].name).toEqual("Test player 1");
  expect(playerName.players[0].materials[INDEXOFENERGY].quantity).toEqual(50);
  expect(playerName.players[0].materials[INDEXOFGOLD].quantity).toEqual(0);
  expect(playerName.players[0].materials[INDEXOFEXPERIENCE].quantity).toEqual(
    0
  );
  expect(playerName.players[0].materials[INDEXOFJADE].quantity).toEqual(0);
  expect(
    playerName.players[0].adventures[0].stories[0].chapters[0].state
  ).toEqual("open");

  // Start first level - spend energy
  const startLevel1 = await engine.applyEvent(db, playerName, startLevel);
  expect(startLevel1.players[0].materials[INDEXOFENERGY].quantity).toEqual(45);
  expect(startLevel1.players[0].materials[INDEXOFGOLD].quantity).toEqual(0);
  expect(startLevel1.players[0].materials[INDEXOFEXPERIENCE].quantity).toEqual(
    0
  );
  expect(startLevel1.players[0].materials[INDEXOFJADE].quantity).toEqual(0);

  // Win first level - get rewards
  const winLevel1 = await engine.applyEvent(db, startLevel1, winLevel);
  expect(winLevel1.players[0].materials[INDEXOFENERGY].quantity).toEqual(45);
  expect(winLevel1.players[0].materials[INDEXOFGOLD].quantity).toEqual(50);
  expect(winLevel1.players[0].materials[INDEXOFEXPERIENCE].quantity).toEqual(
    30
  );
  expect(winLevel1.players[0].materials[INDEXOFJADE].quantity).toEqual(50);
  expect(
    winLevel1.players[0].adventures[0].stories[0].chapters[0].state
  ).toEqual("complete");
  expect(
    winLevel1.players[0].adventures[0].stories[0].chapters[1].state
  ).toEqual("open");

  // Start Level 1 again - spend energy
  const startLevel2 = await engine.applyEvent(db, winLevel1, startLevel);
  expect(startLevel2.players[0].materials[INDEXOFENERGY].quantity).toEqual(40);

  // Win first level again - get less rewards
  const winLevel2 = await engine.applyEvent(db, startLevel2, winLevel);
  expect(winLevel2.players[0].materials[INDEXOFENERGY].quantity).toEqual(40);
  expect(winLevel2.players[0].materials[INDEXOFGOLD].quantity).toEqual(75);
  expect(winLevel2.players[0].materials[INDEXOFEXPERIENCE].quantity).toEqual(
    33
  );
  expect(winLevel2.players[0].materials[INDEXOFJADE].quantity).toEqual(75);
  expect(
    winLevel2.players[0].adventures[0].stories[0].chapters[0].state
  ).toEqual("complete");
  expect(
    winLevel2.players[0].adventures[0].stories[0].chapters[1].state
  ).toEqual("open");
});
