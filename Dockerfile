FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

EXPOSE 8080
CMD [ "node", "server.js" ]