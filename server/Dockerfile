FROM node:16

# Create app directory
WORKDIR /upload-file-app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
# CMD npm start
CMD [ "node", "server.js" ]