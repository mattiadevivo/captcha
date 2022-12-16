# Captcha

[![Docker Image CI](https://github.com/mattiadevivo/captcha/actions/workflows/docker-image.yml/badge.svg?branch=master)](https://github.com/mattiadevivo/captcha/actions/workflows/docker-image.yml)

Express application used for Captcha creation and validation.
It uses Redis as a storage for captchas since the service does not store the captcha image but only its correct word together with its key (and for the sake of simplicity).

## Run

-   run `docker-compose up -d` to start both _Redis container_ and _captcha service container_
-   captcha service will be listening at `http//localhost:3000`
-   see [openapi.yml](./openapi.yml) for endpoints documentation

You can also pull the image with `docker pull mattiadevivo/captcha:latest` since the image is deployed in a public [DockerHub repo](https://hub.docker.com/r/mattiadevivo/captcha).

### Want to see the Captcha Image?

Copy and paste the `captchaImage` value from json body of POST `captchas/` response and paste it [here](https://onlineimagetools.com/convert-data-uri-to-image) (do not include `"`).

## Run Tests

Test are written using `mocha` (and `chai` as assertion library) and resides under `test` folder.
You can run tests using `npm run test` (first install dependencies using `npm install`).
