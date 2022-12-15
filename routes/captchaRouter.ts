import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createCaptcha, validateCaptcha } from '../services/captchaService';
import { get, set } from '../persistence/store';

const captchaRouter = express.Router();

captchaRouter.use(bodyParser.json());
captchaRouter.post('/', async (_req: Request, res: Response) => {
    try {
        const captcha = await createCaptcha(set);
        return res.status(200).json(captcha);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'error while creating captcha' });
    }
});
captchaRouter.put(
    '/:captchaId',
    async (
        req: Request<{ captchaId: string }, object, { captcha: string }>,
        res: Response
    ) => {
        try {
            const captchaId = req.params.captchaId;
            const userGuess = req.body.captcha;
            const isCorrect = await validateCaptcha(get, captchaId, userGuess);
            return isCorrect
                ? res.status(200).json()
                : res.status(401).json({
                      error: 'captcha does not match or does not exist',
                  });
        } catch (err) {
            res.status(500).send({
                error: 'error while validating captcha',
            });
        }
    }
);

export { captchaRouter };
