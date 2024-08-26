FROM node:18-slim as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.22-alpine
WORKDIR /app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/bomben-spiel /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
