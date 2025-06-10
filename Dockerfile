FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4052

CMD ["npm", "run", "dev"]
