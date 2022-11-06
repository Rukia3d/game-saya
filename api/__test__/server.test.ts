import { app } from "../server";
import request from "supertest";

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/api/players/1");
    expect(response.statusCode).toBe(200);
  });
});
