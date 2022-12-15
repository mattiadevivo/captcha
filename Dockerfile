FROM node:16 as build
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install -g npm
RUN npm ci
COPY . .
RUN npm run build

FROM node:16 as release
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm
RUN npm ci --omit=dev
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