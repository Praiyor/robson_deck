import express from "express";
import { deckRoutes } from "./routes/deckRoutes.js";
import client from "prom-client";

const app = express();

const PORT = 4052;

app.use(express.json());
app.use('/decks', deckRoutes);

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})