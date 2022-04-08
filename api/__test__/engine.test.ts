import { applyUserEvents } from "../engine/engine";

test("Data read for the create user event correctly", async () => {
  const res = await applyUserEvents("1");
  expect(res.player.id).toEqual(1);
  expect(res.adventures?.length).not.toBe(0);
  expect(res.heroes?.length).not.toBe(0);
  expect(res.spells?.length).not.toBe(0);
});
