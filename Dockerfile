# Node.js 16
FROM node:gallium-alpine

WORKDIR /usr/src/app

RUN apk add --update openssl ca-certificates && \
        rm -rf /var/cache/apk/*

COPY package*.json .

RUN npm install --production

COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "run" ]
CMD ["start"]