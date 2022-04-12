FROM node:14

WORKDIR /app
COPY . .
RUN npm install yarn && yarn install && npm run build
COPY . .
CMD npm start
