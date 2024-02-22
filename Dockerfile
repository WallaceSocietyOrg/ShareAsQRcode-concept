# Build stage
FROM node:20-alpine as build-stage

WORKDIR /app

RUN node -v
COPY package*.json ./

ENV VITE_BUILD_MODE=production
RUN npm install

COPY . .

RUN npm run build

# Serve stage
FROM nginx:stable-alpine as serve-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
