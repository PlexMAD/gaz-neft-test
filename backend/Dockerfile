FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm rebuild sqlite3

COPY . .

CMD ["npm", "start"]
