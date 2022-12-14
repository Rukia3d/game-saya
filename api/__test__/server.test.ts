import { app } from "../server";
import request from "supertest";

test.skip("It should response the GET method", async () => {
  const response = await request(app).get("/api/players/0");
  expect(response.statusCode).toBe(200);
});
