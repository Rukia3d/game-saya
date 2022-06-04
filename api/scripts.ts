import { applyEvents, readEvents } from "./engine/engine";

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

app.get("/api/players/:id", async (req: any, res: any) => {
  const events = readEvents(req.params.id);
  const player = applyEvents(events);
  res.send(player);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
