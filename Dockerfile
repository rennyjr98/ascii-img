FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

EXPOSE 80
CMD [ "node", "server.js" ]