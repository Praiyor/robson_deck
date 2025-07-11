import express from "express";
import { deckRoutes } from "./routes/deckRoutes.js";
import client from "prom-client";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./config/swagger.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = 4052;

app.use(express.json());
app.use('/decks', deckRoutes);
if(process.env.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger UI habilitado em /api-docs');
}


const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger em: http://localhost:${PORT}/api-docs`)
})