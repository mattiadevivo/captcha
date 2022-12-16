FROM node:16 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt update -y && apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
RUN npm install -g npm
RUN npm ci --build-from-source
COPY . ./
RUN npm run build

FROM node:16 as release
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt update -y && apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
RUN npm install -g npm
RUN npm ci --omit=dev --build-from-source
COPY --from=build /usr/src/app/dist/ dist/
EXPOSE 3000
ENV SERVER_PORT=
ENV REDIS_HOST=
ENV REDIS_PORT=
ENV REDIS_USER=
ENV REDIS_PASSWORD=
ENV REDIS_DB=
ENTRYPOINT [ "npm", "run" ]
CMD ["start"]
