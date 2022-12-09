import { app } from "../server";
import request from "supertest";

test("Get player test", async () => {
  const response = await request(app).get("/api/players/1");
  expect(response.statusCode).toBe(200);
});

test("Create player test", async () => {
  const response = await request(app).post("/api/players/new");
  expect(response.statusCode).toBe(200);
});
