import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Robson Deck API',
      version: '1.0.0',
      description: 'Documentação da API do projeto Robson Deck',
    },
    servers: [
        {
            url: 'http://localhost:4052',
        },
    ],
  },
  apis: ['./src/main/routes/*.ts'],
});

if (process.env.GENERATE_SWAGGER === 'true') {
  fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));
  console.log('✅ swagger.json gerado com sucesso.');
}