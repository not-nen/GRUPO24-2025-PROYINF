FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "start"]