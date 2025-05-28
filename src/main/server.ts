import express from "express";
import { deckRoutes } from "./routes/deckRoutes.js";

const app = express();

const PORT = 4052;

app.use(express.json());
app.use('/decks', deckRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})