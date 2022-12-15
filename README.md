# Captcha

Express application used for Captcha creation and validation.
It uses Redis as a storage for captchas since the service does not store the captcha image but only its correct word together with its key (and for the sake of simplicity).

# Missing things

-   instructions regarding Docker
-   upload Docker image

## Run locally

-   run `npm install` to install dependencies
-   run `docker-compose up -d` to start Redis Docker container used as cache storage by the service
-   run `npm run dev` to run the project locally

### Docker run

## Run Tests

Test are written using `mocha` (and `chai` as assertion library) and resides under `test` folder.
You can run tests using `npm run test`.

## Want to see the Captcha Image?

Copy and paste from `captchaImage` value from json body of POST `captchas/` response and paste it [here](https://onlineimagetools.com/convert-data-uri-to-image).
