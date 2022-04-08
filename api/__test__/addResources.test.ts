import { addResources } from "../engine/actions";
import { testPlayerResources, testResources } from "./testdata";

test("addResources creates a new resource if none exists", () => {
  const res = addResources(null, testPlayerResources, [
    { resource_id: 1, quantity: 5 },
  ]);
  expect(res.length).toBe(1);
  expect(res[0].id).toEqual(1);
  expect(res[0].quantity).toEqual(5);
});

test("addResources adds more resources to the existing ones", () => {
  const res = addResources(testPlayerResources.slice(0, 3), testResources, [
    { resource_id: 1, quantity: 5 },
    { resource_id: 3, quantity: 5 },
  ]);
  expect(res.length).toBe(4);
  expect(res[0].quantity).toEqual(10);
  expect(res[1].quantity).toEqual(15);
  expect(res[3].quantity).toEqual(5);
});

test("addResources throws an error if resource is not found", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    addResources(null, testResources, [{ resource_id: 8, quantity: 5 }])
  ).toThrow("Can't find resource 8 in resource database");
  jest.restoreAllMocks();
});
