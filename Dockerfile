FROM node:14
WORKDIR /player-service
COPY package.json .
RUN npm install
COPY . .
CMD npm start