FROM node:18

WORKDIR /app

# dependencies install
COPY package*.json ./
RUN npm install

# project copy
COPY . .


# env variables
ENV CLOUD_NAME=dhq7imdob \
    CLOUD_API_KEY=229246335247513 \
    CLOUD_API_SECRET=8T_wtTu4OsXwih_edU1FBZvpl0A

# port expose
EXPOSE 5000

# start app
CMD ["node", "server.js"]