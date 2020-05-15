import * as express from "express";
import * as schedule from "node-schedule";
const app = express();

// Types
import { Coin } from "./types";

import {
  getCoinListings,
  writeJson,
  updateLog,
  getCoins,
} from "./services/coinService";

// Price auto update every 5 minutes
schedule.scheduleJob("*/5 * * * *", async function () {
  try {
    const result = await getCoinListings();
    writeJson("coins.json", result.data);
    updateLog();
  } catch (error) {
    `Error with scheduled job ${error}`;
  }
});

app.get("/coins", (req: express.Request, res: express.Response) => {
  const coins: [Coin] = getCoins();
  res.status(200).json(coins);
});

app.get("/coin/:coin", (req: express.Request, res: express.Response) => {
  const coins: Coin[] = getCoins();
  const result = coins.find(
    (coin: Coin) => coin.name.toLowerCase() == req.params.coin.toLowerCase()
  );
  result ? res.status(200).json(result) : res.status(404).send("Not found");
});

// Resource not found
app.get("*", function (req: express.Request, res: express.Response) {
  res.status(404).send("☢☢☢ You Shall not pass ☢☢☢");
});

// Starting server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Service started in port ${port}`));
