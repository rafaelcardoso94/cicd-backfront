# Stage 1: Build
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY ./src ./src
COPY ./public ./public

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
