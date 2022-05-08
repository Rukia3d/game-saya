import { applyUserEvents } from "../engine/engine";
import { setupDb } from "./db.test";

test("Data read for the create user event correctly", async () => {
  const db = await setupDb();
  const res = await applyUserEvents("1", db);
  expect(res.player.id).toEqual(1);
  expect(res.adventures?.length).not.toBe(0);
  expect(res.heroes?.length).not.toBe(0);
  expect(res.spells?.length).not.toBe(0);
});
