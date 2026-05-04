FROM node:18

WORKDIR /app

# dependencies install
COPY package*.json ./
RUN npm install

# project copy
COPY . .

# port expose
EXPOSE 5000

# start app
CMD ["node", "server.js"]