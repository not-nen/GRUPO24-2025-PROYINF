FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm install

ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "start", "--", "--host","0.0.0.0"]