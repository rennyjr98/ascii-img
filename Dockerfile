FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.17.10-alpine
EXPOSE 80
COPY --from=builder /app/dist/media-ascii /usr/share/nginx/html